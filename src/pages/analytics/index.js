import DailyOrderCards from "@/components/Graphs/DailyOrdersCards";
import RevenueGraph from "@/components/Graphs/RevenueGraph";
import DailyRevenueCards from "@/components/Graphs/RevenueGraph/DailyRevenueCards";
import SpinnerLoader from "@/components/SpinnerLoader";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { addCommonData } from "@/apis/common";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dailyDate, setDailyDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setDailyDate(date);
  };

  console.log(moment(dailyDate).add("day", 7).format("MM/DD/YYYY"));

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          revenueStats: {
            type: "weekly",
            fromDate: moment(dailyDate).format("MM/DD/YYYY"),
            toDate: moment(dailyDate).add("day", 7).format("MM/DD/YYYY"),
          },
        },
        "analytics/doctor-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.revenueAnalytics;
      console.log(combinedRevenueData);

      setData(combinedRevenueData);
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getDetails();
  }, [dailyDate]);

  return (
    <div>
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Analytics
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Analytics
        </div>
      </div>
      {data === null ? (
        <SpinnerLoader />
      ) : (
        <div>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <div className="w-full text-left text-xl font-semibold text-gray-800 mb-4">
                Daily Analytics
              </div>
              <div className="relative">
                <DatePicker
                  selected={dailyDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Select a date"
                  className="border border-gray-300 rounded px-3 py-2 pr-10 w-full"
                />
                <CalendarIcon className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10 mt-5">
              <DailyRevenueCards date={dailyDate} />
              <DailyOrderCards date={dailyDate} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <RevenueGraph data={data} title="Revenue Analytics" />
          </div>

          <div className=""></div>
        </div>
      )}
    </div>
  );
};

export default index;
