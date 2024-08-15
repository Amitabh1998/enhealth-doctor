import Blogs from "@/components/Blogs";
import ClinicSlots from "@/components/Forms/ClinicSlots";
import HomeSlots from "@/components/Forms/HomeSlots";
import OnlineSlots from "@/components/Forms/OnlineSlots";
import Forums from "@/components/Forums";
import Videos from "@/components/Videos";
import { Switch } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const Day = ({ day, handleSwitchChange, enabled }) => {
  return (
    <div className="grid md:grid-cols-2 mt-4">
      <div className="p-3 rounded-md shadow bg-white">
        <div className="items-center flex justify-between mb-3">
          <div className="font-semibold">{day}</div>
          <Switch
            checked={enabled[index]} // Use the enabled state for the current index
            onChange={() => handleSwitchChange(index)} // Pass the index to the handler
            className={`${enabled[index] ? "bg-green-500" : "bg-gray-600"}
                      relative inline-flex h-6 w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled[index] ? "translate-x-7" : "translate-x-0"}
                      pointer-events-none inline-block h-6 w-6 -mt-[2px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <div className="flex-1 grid md:grid-cols-11 gap-4">
          <div className="md:col-span-5">
            <input
              type="time"
              placeholder="From: 10:00 AM"
              className="p-2 rounded-md w-full border"
            />
          </div>
          <div className="md:col-span-5">
            <input
              placeholder="To: 11:00 PM"
              className="p-2 rounded-md w-full border"
            />
          </div>
          <div className="md:col-span-1 flex justify-end ">
            <div className="cursor-pointer w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const index = () => {
  const [tab, setTab] = useState(1);

  const [enabled, setEnabled] = useState([]); // Initialize enabled state array

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
      _id: "65018aa256f788defb8713f4",
    },
    {
      day: 1,
      slots: [],
      _id: "65018aa256f788defb8713f6",
    },
    {
      day: 2,
      slots: [],
      _id: "65018aa256f788defb8713f7",
    },
    {
      day: 3,
      slots: [],
      _id: "65018aa256f788defb8713f8",
    },
    {
      day: 4,
      slots: [],
      _id: "65018aa256f788defb8713f9",
    },
    {
      day: 5,
      slots: [],
      _id: "65018aa256f788defb8713fa",
    },
    {
      day: 6,
      slots: [],
      _id: "65018aa256f788defb8713fb",
    },
  ]);

  const handleSwitchChange = (index) => {
    const updatedEnabled = [...enabled]; // Create a copy of the enabled state array
    updatedEnabled[index] = !updatedEnabled[index]; // Toggle the value of the corresponding index
    setEnabled(updatedEnabled); // Update the enabled state
  };

  const addSlot = async () => {};

  return (
    <div>
      {/* BREAD CRUM */}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Slot Management
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* --------TABS------------ */}
      <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>Home</div>
          {tab === 1 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 2
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(2)}
        >
          <div>Clinic</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 3
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(3)}
        >
          <div>Online</div>
          {tab === 3 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div>

      <div>
        {tab === 1 ? (
          // <div className="w-full">
          //   <Day
          //     day={"Monday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Tuesday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Wednesday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Thursday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Friday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Saturday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          //   <Day
          //     day={"Sunday"}
          //     enabled={enabled}
          //     setEnabled={setEnabled}
          //     handleSwitchChange={handleSwitchChange}
          //   />
          // </div>
          <HomeSlots />
        ) : tab === 2 ? (
          <ClinicSlots />
        ) : (
          <OnlineSlots />
        )}
      </div>
    </div>
  );
};

export default index;
