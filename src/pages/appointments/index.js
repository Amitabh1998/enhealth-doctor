import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import AppointmentsTable from "@/components/Tables/AppointmentsTable";
import { SearchIcon } from "@heroicons/react/solid";
import { getData, getDataWithourLimit } from "@/apis/common";
import { toast } from "react-toastify";
import moment from "moment";
import SpinnerLoader from "@/components/SpinnerLoader";

const Appointments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "6370882401",
      date: "February 25, 2023, 19:52",
      disease: "Malaria",
    },
    {
      id: 2,
      name: "John Doe",
      phone: "6370882401",
      date: "February 25, 2023, 19:52",
      disease: "Malaria",
    },
    {
      id: 3,
      name: "John Doe",
      phone: "6370882401",
      date: "February 25, 2023, 19:52",
      disease: "Malaria",
    },
  ]);

  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);

  const handleDeleteClick = () => {
    setStaff(staff.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const getAllData = async () => {
    try {
      // setLoading(true);
      // const data = await getData(
      //   limit,
      //   skip,
      //   "consultation/consultation-booking?status[$in]=4"
      // );

      const data = await getDataWithourLimit(
        "consultation/consultation-booking?status[$in]=4"
      );
      setData(data);
      setTableData(data.data);
      setTotal(data.total);
      setSkip(data.skip);
      setLimit(data.limit);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getAllData();
  }, [tab]);

  console.log("data>>>>>>>>>>>>>>>>>>>>>>>>", data);

  return (
    <div className="flex flex-col">
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
                Appointments
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* --------TABS------------ */}
      {/* <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl font-semibold p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>Today Consultations</div>
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
          <div>Upcoming Consultations</div>
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
          <div>Completed Consultations</div>
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
          <div>All consultations</div>
          {tab === 4 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div> */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-">
        {loading ? (
          <SpinnerLoader />
        ) : tableData?.length > 0 ? (
          <div className="w-full">
            <div className="w-full max-w-xs sm:max-w-none overflow-hidden">
              <AppointmentsTable
                appointments={tableData}
                setAppointments={setTableData}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>
          </div>
        ) : (
          <div className="mt-20">
            <img src={"/images/appointments1.png"} />
            <div className="text-center">No appointments right now</div>
          </div>
        )}
      </div>
      {/* {isOpen && (
        <NewAppointmentDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          appointments={appointments}
          setAppointments={setAppointments}
        />
      )} */}
    </div>
  );
};

export default Appointments;
