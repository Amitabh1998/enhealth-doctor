import React, { useEffect, useState } from "react";
import DayForm from "../DayForm";
import { getData } from "@/apis/common";
import { toast } from "react-toastify";
import SpinnerLoader from "@/components/SpinnerLoader";

const numberToDay = (number) => {
  if (number === 0) {
    return "Sunday";
  } else if (number === 1) {
    return "Monday";
  } else if (number === 2) {
    return "Tuesday";
  } else if (number === 3) {
    return "Wednesday";
  } else if (number === 4) {
    return "Thursday";
  } else if (number === 5) {
    return "Friday";
  } else if (number === 6) {
    return "Saturday";
  }
};

const HomeSlots = () => {
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailablity] = useState([
    {
      day: 0,
      slots: [
        // {
        //   fromTime: "2023-09-13T16:40:37.529Z",
        //   toTime: "2023-09-13T19:40:37.529Z",
        //   _id: "65018aa256f788defb8713f5",
        // },
      ],
    },
    {
      day: 1,
      slots: [],
    },
    {
      day: 2,
      slots: [],
    },
    {
      day: 3,
      slots: [],
    },
    {
      day: 4,
      slots: [],
    },
    {
      day: 5,
      slots: [],
    },
    {
      day: 6,
      slots: [],
    },
  ]);

  const getAvailability = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        "consultation/doctor-slot?consultationType=3"
      );
      console.log(response.data[0]);
      setAvailablity(response.data[0].availability);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(availability);
  }, [availability]);

  useEffect(() => {
    getAvailability();
  }, []);

  return (
    <div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="grid mt-4">
          {availability.map((item, index) => (
            <DayForm
              key={index}
              day={numberToDay(item.day)}
              dayNum={item.day}
              availability={availability}
              setAvailablity={setAvailablity}
              slotsData={item.slots}
              // setSlotsData={}
              consultationType={3}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSlots;
