import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { toast } from "react-toastify";
import { deleteData } from "@/apis/common";
import SpinnerLoader from "@/components/SpinnerLoader";

function StaffTable({ staff, setStaff, selectedIds, setSelectedIds }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      const response = await deleteData(`staff-management/${id}`);

      const _staff = [...staff];
      console.log(response, id, [
        ..._staff.filter((row) => row._id !== response._id),
      ]);
      setStaff([..._staff.filter((row) => row._id !== response._id)]);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
    // setStaff(staff.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            {/* <th className=" p-1 text-xs md:text-base md:p-2 text-left">
              <input
                type="checkbox"
                checked={selectedIds?.length === staff.length}
                onChange={() => {
                  if (selectedIds?.length === staff.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(staff.map((row) => row.id));
                  }
                }}
              />
            </th> */}
            <th className=" p-1 text-xs md:text-base md:p-2">Name</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Role</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Phone Number</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((row) => (
            <tr
              key={row._id}
              className={`${
                selectedIds?.includes(row.id) ? "bg-gray-200" : ""
              } hover:bg-gray-50`}
            >
              {/* <td className=" p-1 text-xs md:text-base md:p-2">
                <input
                  type="checkbox"
                  checked={selectedIds?.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td> */}
              <td className=" p-1 text-xs md:text-base md:p-2">{row.name}</td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row?.permissions[0]?.masterRole?.name
                  ? row?.permissions[0]?.masterRole?.name
                  : "N/A"}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">{row.phone}</td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <button
                  onClick={() => {
                    setOn(true);
                    setCurrentRow(row._id);
                  }}
                  className="rounded-sm p-1 bg-red-500"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        on={on}
        setOn={setOn}
        loading={loading}
        callback={() => handleDeleteClick(currentRow)}
      />
    </>
  );
}

export default StaffTable;
