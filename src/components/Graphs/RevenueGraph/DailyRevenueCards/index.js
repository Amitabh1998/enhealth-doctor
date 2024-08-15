import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addCommonData } from "../../../../apis/common";
import moment from "moment";

const DailyRevenueCards = ({ date }) => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1);

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          revenueStats: {
            type: "daily",
            date: moment(date).format("MM/DD/YYYY"),
          },
        },
        "analytics/doctor-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.revenueAnalytics;

      console.log(combinedRevenueData);
      // output :- [ { date: '22/02', orderRevenue: 0, labTestRevenue: 0, appointmentRevenue: 0 } ]

      setData(combinedRevenueData);
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getDetails();
  }, [date]);

  return (
    <div className="w-full">
      {data === null ? (
        <div className="w-full bg-gray-200 rounded-xl pt-0 animate-pulse p-10"></div>
      ) : (
        <div className="w-full bg-bluePrimary rounded-xl pt-0">
          <div className="w-full grid grid-cols-2">
            <div className="p-4 w-max flex flex-col items-center">
              <img src={"/images/CoininHand.svg"} className="w-12 h-12" />
              <div className="text-white text-xl font-bold">Revenue</div>
            </div>
            <div className="flex justify-center items-center text-white text-2xl font-bold">
              INR {data[0]?.revenue}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRevenueCards;
