import { getData } from "@/apis/common";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    createdAt: "16 April, 2023",
    transactions: [
      {
        id: 1,
        name: "Cerona Metayer",
        status: "Payment Recieved",
        amount: 4000,
      },
      {
        id: 2,
        name: "Surya Shakti",
        status: "Payment Recieved",
        amount: 500,
      },
      {
        id: 3,
        name: "Soumya Ranjan",
        status: "Payment Recieved",
        amount: 2000,
      },
    ],
  },
  {
    id: 2,
    createdAt: "15 April, 2023",
    transactions: [
      {
        id: 1,
        name: "Cerona Metayer",
        status: "Payment Recieved",
        amount: 4000,
      },
      {
        id: 2,
        name: "Surya Shakti",
        status: "Payment Recieved",
        amount: 500,
      },
      {
        id: 3,
        name: "Soumya Ranjan",
        status: "Payment Recieved",
        amount: 2000,
      },
    ],
  },
];

const WalletRecentActivities = () => {
  const [tab, setTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [redeemRequests, setRedeemRequests] = useState([]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const data = await getData(
        limit,
        skip,
        tab === 1
          ? "payment/transaction?entityType[$in]=wallet&entityType[$in]=redeemRequest&$sort[createdAt]=-1"
          : tab === 2
          ? "payment/transaction?entityType[$in]=redeemRequest&$sort[createdAt]=-1"
          : tab === 3
          ? "payment/transaction?entityType[$in]=wallet&$sort[createdAt]=-1"
          : "payment/redeem-request?$sort[createdAt]=-1"
      );
      setData(data.data);
      setTableData(data);
      setTotal(data.total);
      setSkip(data.skip);
      setLimit(data.limit);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [tab]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold txet-gray-800">Recent activities</div>
        {/* <div className="flex space-x-2 items-center p-1 cursor-pointer">
          <div className="text-gray-500">Filter</div>
          <AdjustmentsIcon className="w-5 h-5 text-gray-500" />
        </div> */}
      </div>
      <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl font-semibold p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>All Transactions</div>
          {tab === 1 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 2
              ? "text-gray-800 md:text-2xl font-semibold p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(2)}
        >
          <div>Withdraw Payments</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 3
              ? "text-gray-800 md:text-2xl font-semibold p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(3)}
        >
          <div>Credit Payments</div>
          {tab === 3 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 4
              ? "text-gray-800 md:text-2xl font-semibold p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(4)}
        >
          <div>Redeem Requests</div>
          {tab === 4 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div>
      <div>
        {data?.map((item, index) => (
          <div key={index} className="w-full my-3">
            <div className="rounded-lg shadow-lg bg-white p-3 flex space-x-3 justify-between">
              <div className="w-10 h-10 bg-yellow-400 text-gray-800 font-bold text-xl  flex justify-center items-center rounded-lg">
                {item?.code[0] ? item?.code[0] : "N/A"}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  {tab === 4
                    ? item?.account?.accountHolderName + "-" + item.code
                    : item?.message
                    ? item.message
                    : "N/A"}
                </div>
                <div className="text-gray-500 text-xs">
                  {moment(item.createdAt).format("MMMM Do YYYY")}
                </div>
              </div>
              <div className="text-green-400 font-bold">
                ₹{tab === 4 ? item.amount : item.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletRecentActivities;
