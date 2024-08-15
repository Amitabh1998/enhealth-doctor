import { addCommonData } from "@/api/common";
import { UsersIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DailyUsersCards = ({ date }) => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1);

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          revenueStats: {
            type: "daily",
            date: date,
          },
        },
        "analytics/admin-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.orderRevenueAnalytics.map(
        (orderItem) => ({
          date: orderItem.date,
          orderRevenue: orderItem.revenue,
          labTestRevenue: response.labTestRevenueAnalytics.find(
            (item) => item.date === orderItem.date
          ).revenue,
          appointmentRevenue: response.appointmentRevenueAnalytics.find(
            (item) => item.date === orderItem.date
          ).revenue,
        })
      );

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
    <div className="w-full h-full">
      {data === null ? (
        <div className="w-full h-full bg-gray-200 rounded-xl pt-0 animate-pulse p-10"></div>
      ) : (
        <div className="w-full h-full bg-bluePrimary rounded-xl pt-0 flex items-center">
          <div className="w-full grid grid-cols-2">
            <div className="p-4 w-max flex flex-col items-center">
              <UsersIcon className="w-12 h-12 text-white" />
              {/* <img src={"/images/CoininHand.svg"} className="w-12 h-12" /> */}
              <div className="text-white text-xl font-bold">Users Joined</div>
            </div>
            <div className="flex justify-center items-center text-white text-2xl font-bold">
              1
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyUsersCards;
