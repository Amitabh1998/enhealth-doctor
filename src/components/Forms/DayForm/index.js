import { addCommonData } from "@/apis/common";
import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const convertISOToHHMM = (isoTime) => {
  console.log(isoTime);
  const date = new Date(isoTime);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Pad single-digit hours and minutes with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Create the "HH:MM" formatted time string
  const hhmmFormattedTime = `${formattedHours}:${formattedMinutes}`;

  return hhmmFormattedTime;
};

const DayForm = ({
  value,
  setValue,
  day,
  slotsData,
  setSlotsData,
  availability,
  setAvailability,
  dayNum,
  consultationType,
}) => {
  const [slots, setSlots] = useState([]);
  const [add, setAdd] = useState(false);
  const [from, setFrom] = useState(moment().format("HH:mm"));
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(dayNum);
  // console.log(moment().format("HH:mm"));

  useEffect(() => {
    // Create a new Date object with the time zone set to India
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const currentIndianTime = new Date().toLocaleTimeString("en-US", options);

    // Create a new Date object for the current time and add 3 hours to it
    const currentTimeInUTC = new Date();
    currentTimeInUTC.setHours(currentTimeInUTC.getHours() + 3);

    // Format the time in "HH:MM" format
    const formattedTimePlus3Hours = currentTimeInUTC.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );
    console.log(formattedTimePlus3Hours);
    setTo(formattedTimePlus3Hours);
  }, []);

  useEffect(() => {
    console.log(availability.filter((item) => item.day === dayNum)[0].slots);
    setSlots(availability.filter((item) => item.day === dayNum)[0].slots);
  }, []);

  const convertTimeToISOFormat = (time) => {
    // Get the current date
    const currentDate = new Date();

    // Split the time into hours and minutes
    const [hours, minutes] = time.split(":").map(Number);

    // Set the hours and minutes of the current date
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    // Convert the date to ISO format
    const isoFormattedTime = currentDate.toISOString();
    console.log(isoFormattedTime);
    return isoFormattedTime;
  };

  const [convertedFromTime, setConvertedFromTime] = useState("");
  const [convertedToTime, setConvertedToTime] = useState("");

  const handleInputFromChange = (event) => {
    const { value } = event.target;
    setFrom(value);

    // Convert the input time to the desired format
    const isoFormattedTime = convertTimeToISOFormat(value);
    setConvertedFromTime(
      moment(isoFormattedTime).format("dddd, MMMM D, YYYY h:mm:ss A [GMT]Z")
    );
  };

  const handleInputToChange = (event) => {
    const { value } = event.target;
    setTo(value);

    // Convert the input time to the desired format
    const isoFormattedTime = convertTimeToISOFormat(value);
    console.log(
      moment(isoFormattedTime).format("dddd, MMMM D, YYYY h:mm:ss A [GMT]Z")
    );
    setConvertedToTime(
      moment(isoFormattedTime).format("dddd, MMMM D, YYYY h:mm:ss A [GMT]Z")
    );
  };

  const addSlotHandler = async () => {
    if (convertedFromTime.trim() === "" && convertedToTime.trim() === "") {
      console.log(slots);
      console.log({
        day: dayNum,
        slots: [
          ...slots,
          {
            from: moment(convertTimeToISOFormat(from)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
            to: moment(convertTimeToISOFormat(to)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
          },
        ],
      });
      const _slots = [...slots];
      // setSlots([
      //   ..._slots,
      //   {
      //     fromTime: moment(convertTimeToISOFormat(from)).format(
      //       "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
      //     ),
      //     toTime: moment(convertTimeToISOFormat(to)).format(
      //       "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
      //     ),
      //   },
      // ]);

      const newArray = [...availability]; // Clone the existing array
      newArray[dayNum] = {
        day: dayNum,
        slots: [
          ...slots,
          {
            fromTime: moment(convertTimeToISOFormat(from)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
            toTime: moment(convertTimeToISOFormat(to)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
          },
        ],
      };
      // setAvailability(newArray);

      console.log(newArray);

      try {
        setLoading(true);
        const response = await addCommonData(
          {
            consultationType: consultationType,
            availability: newArray,
          },
          "consultation/doctor-slot"
        );

        console.log(response);
        const _data = [...slots];
        setSlots([...response.availability[dayNum].slots]);
        // setSlots([
        //   ..._slots,
        //   {
        //     fromTime: moment(convertTimeToISOFormat(from)).format(
        //       "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
        //     ),
        //     toTime: moment(convertTimeToISOFormat(to)).format(
        //       "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
        //     ),
        //   },
        // ]);
        toast.success("Your slot is created successfully");
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "N/A");
        setLoading(false);
      }
    } else if (convertedFromTime.trim() === "") {
      const _slots = [...slots];

      const newArray = [...availability]; // Clone the existing array
      newArray[dayNum] = {
        day: dayNum,
        slots: [
          ...slots,
          {
            fromTime: moment(convertTimeToISOFormat(from)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
            toTime: convertedToTime,
          },
        ],
      };
      // setAvailability(newArray);

      console.log(newArray);

      try {
        setLoading(true);
        const response = await addCommonData(
          {
            consultationType: consultationType,
            availability: newArray,
          },
          "consultation/doctor-slot"
        );

        console.log(response);
        const _data = [...slots];
        setSlots([...response.availability[dayNum].slots]);
        toast.success("Your slot is created successfully");
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "N/A");
        setLoading(false);
      }
    } else if (convertedToTime.trim() === "") {
      // setSlotsData([
      //   ...slotsData,
      //   {
      //     from: convertedFromTime,
      //     to: moment(convertTimeToISOFormat(to)).format(
      //       "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
      //     ),
      //   },
      // ]);

      const _slots = [...slots];

      const newArray = [...availability]; // Clone the existing array
      newArray[dayNum] = {
        day: dayNum,
        slots: [
          ...slots,
          {
            fromTime: convertedFromTime,
            toTime: moment(convertTimeToISOFormat(to)).format(
              "dddd, MMMM D, YYYY h:mm:ss A [GMT]Z"
            ),
          },
        ],
      };
      // setAvailability(newArray);

      console.log(newArray);

      try {
        setLoading(true);
        const response = await addCommonData(
          {
            consultationType: consultationType,
            availability: newArray,
          },
          "consultation/doctor-slot"
        );

        console.log(response);
        const _data = [...slots];
        setSlots([...response.availability[dayNum].slots]);
        toast.success("Your slot is created successfully");
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "N/A");
        setLoading(false);
      }
    } else {
      const _slots = [...slots];

      const newArray = [...availability]; // Clone the existing array
      newArray[dayNum] = {
        day: dayNum,
        slots: [
          ...slots,
          { fromTime: convertedFromTime, toTime: convertedToTime },
        ],
      };
      // setAvailability(newArray);

      console.log(newArray);

      try {
        setLoading(true);
        const response = await addCommonData(
          {
            consultationType: consultationType,
            availability: newArray,
          },
          "consultation/doctor-slot"
        );

        console.log(response);
        const _data = [...slots];
        setSlots([...response.availability[dayNum].slots]);
        toast.success("Your slot is created successfully");
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "N/A");
        setLoading(false);
      }
    }
    setAdd(false);
  };

  const deleteSlotHandler = async (item, index) => {
    try {
      setLoading(true);
      const _slots = [...slots];
      console.log([..._slots.filter((slot) => slot._id !== item._id)]);

      const newArray = [...availability];
      newArray[dayNum].slots = [
        ..._slots.filter((slot) => slot._id !== item._id),
      ];
      const response = await addCommonData(
        {
          consultationType: consultationType,
          availability: newArray,
        },
        "consultation/doctor-slot"
      );

      console.log(response);
      const _data = [...slots];
      // setSlots([response, ..._data]);
      setSlots([..._slots.filter((slot) => slot._id !== item._id)]);
      toast.success("Your slot is deleted successfully");

      console.log(newArray);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "N/A");
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 mt-4">
      <div className="p-3 rounded-md shadow bg-white">
        <div className="items-center flex justify-between mb-3">
          <div className="font-semibold">{day}</div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {slots.length > 0 &&
          slots.map((item, index) => (
            <div key={index} className="flex-1 my-2 grid md:grid-cols-11 gap-4">
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="From: 10:00 AM"
                  className="p-2 rounded-md w-full border"
                  value={moment(item.fromTime).format("HH:mm")}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="To: 11:00 PM"
                  className="p-2 rounded-md w-full border"
                  value={moment(item.toTime).format("HH:mm")}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="md:col-span-1 flex justify-end ">
                <div
                  onClick={() => deleteSlotHandler(item, index)}
                  className="cursor-pointer w-8 h-8 rounded-full bg-red-500 flex justify-center text-2xl font-bold text-white"
                >
                  <TrashIcon className="w-5 h-5 text-white self-center" />
                </div>
              </div>
            </div>
          ))}
        <div>
          {/* {slots.map((item, index) => (
            <div key={index} className="flex-1 grid md:grid-cols-11 gap-4">
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="From: 10:00 AM"
                  className="p-2 rounded-md w-full border"
                  value={item.from}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="To: 11:00 PM"
                  className="p-2 rounded-md w-full border"
                  value={item.to}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="md:col-span-1 flex justify-end ">
                <div className="cursor-pointer w-8 h-8 rounded-full bg-red-500 flex justify-center text-2xl font-bold text-white">
                  <TrashIcon className="w-5 h-5 text-white self-center" />
                </div>
              </div>
            </div>
          ))} */}
          {add === false ? (
            <button
              onClick={() => setAdd(true)}
              className="w-full p-2 rounded-md border "
            >
              Add
            </button>
          ) : (
            <div className="flex-1 grid md:grid-cols-11 gap-4">
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="From: 10:00 AM"
                  className="p-2 rounded-md w-full border"
                  value={from}
                  onChange={(e) => handleInputFromChange(e)}
                />
              </div>
              <div className="md:col-span-5">
                <input
                  type="time"
                  placeholder="To: 11:00 PM"
                  className="p-2 rounded-md w-full border"
                  value={to}
                  onChange={(e) => handleInputToChange(e)}
                />
              </div>
              <div className="md:col-span-1 flex justify-end ">
                <div
                  onClick={() => addSlotHandler()}
                  className="cursor-pointer w-8 h-8 self-center rounded-full bg-bluePrimary flex justify-center items-center "
                >
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayForm;
