import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import NewStaffDialog from "../../components/Dialogs/NewStaffDialog";
import StaffTable from "../../components/Tables/StaffTable";
import { getData } from "@/apis/common";
import { toast } from "react-toastify";
import SpinnerLoader from "@/components/SpinnerLoader";

const StaffManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);

  const handleDeleteClick = () => {
    setStaff(staff.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const getAllData = async () => {
    try {
      setLoading(true);
      const data = await getData(limit, skip, "staff-management");
      setData(data);
      setTableData(data);
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
  }, []);

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
                Staff management
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {loading ? (
        <div className="w-full py-10 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
          {tableData?.length > 0 ? (
            <div className="w-full">
              <div className="flex justify-between w-full mb-2 items-center space-x-3">
                <div className="text-xl font-semibold">Staff Management</div>
                <div className="w-40" onClick={() => setIsOpen(true)}>
                  <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
                </div>
              </div>

              <div className="w-full max-w-xs sm:max-w-none overflow-hidden">
                <StaffTable
                  staff={tableData}
                  setStaff={setTableData}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                />
              </div>
            </div>
          ) : (
            <div>
              <img src={"/images/staff1.png"} />
              <div onClick={() => setIsOpen(true)}>
                <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
              </div>
            </div>
          )}
        </div>
      )}
      {isOpen && (
        <NewStaffDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          staff={tableData}
          setStaff={setTableData}
        />
      )}
    </div>
  );
};

export default StaffManagement;
