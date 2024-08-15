import { ShoppingBagIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addCommonData } from "../../../apis/common";
import moment from "moment";

const DailyOrderCards = ({ date }) => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1);

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          appointmentCount: {
            type: "daily",
            date: moment(date).format("MM/DD/YYYY"),
          },
        },
        "analytics/doctor-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.appointmentAnalytics;

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
        <div className="w-full bg-gray-200 rounded-xl pt-0 animate-pulse"></div>
      ) : (
        <div className="w-full bg-bluePrimary rounded-xl pt-0">
          <div className="w-full grid grid-cols-2">
            <div className="p-4 w-max flex flex-col items-center">
              {/* <img src={"/images/CoininHand.svg"} className="w-12 h-12" /> */}
              <ShoppingBagIcon className="w-12 h-12 text-white" />
              <div className="text-white text-xl font-bold">Bookings</div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <div className=" text-white text-2xl font-bold">
                  {data[0]?.totalConsultations}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyOrderCards;
