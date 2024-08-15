import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import moment from "moment";
import { useRouter } from "next/router";

function AppointmentsTable({
  appointments,
  setAppointments,
  selectedIds,
  setSelectedIds,
}) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setAppointments(appointments.filter((row) => row.id !== id));
    setSelectedIds(selectedIds?.filter((selectedId) => selectedId !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className=" p-1 text-xs md:text-base md:p-2">
              Consultation ID
            </th>
            <th className=" p-1 text-xs md:text-base md:p-2">Patient Name</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Age</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Gender</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Date & time</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Status</th>
          </tr>
        </thead>
        {appointments.length > 0 ? (
          <tbody>
            {appointments.map((row) => (
              <tr
                onClick={() => router.push(`/appointments/${row._id}`)}
                key={row._id}
                className={`${
                  selectedIds?.includes(row.id) ? "bg-gray-200" : ""
                } hover:bg-gray-100 cursor-pointer`}
              >
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row?.code}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row?.patient?.name ? row.patient.name : "N/A"}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row?.patient?.age ? row.patient.age : "N/A"}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row?.patient?.gender === 1
                    ? "Male"
                    : row.patient.gender === 2
                    ? "Female"
                    : row.patient.gender === 3
                    ? "Others"
                    : "N/A"}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {moment(row.createdAt).format("D MMM YYYY")}
                </td>
                {/* <td className=" p-1 text-xs md:text-base md:p-2">
                  {row.consultationType === 1
                    ? "Online"
                    : row.consultationType === 2
                    ? "Clinic"
                    : row.consultationType === 3
                    ? "Home"
                    : "N/A"}
                </td> */}
                {/* <td className=" p-1 text-xs md:text-base md:p-2">
                  {row?.code ? row.code : "N/A"}
                </td> */}
                <td className=" p-1 text-xs md:text-base md:p-2">
                  <div className="border text-center border-green-400 rounded-md px-3 py-1 text-green-400 bg-white">
                    {row.status === 0
                      ? "Initialized"
                      : row.status === 1
                      ? "Booked"
                      : row.status === 2
                      ? "Approved"
                      : row.status === 3
                      ? "Started"
                      : row.status === 4
                      ? "Completed"
                      : row.status === 5
                      ? "Rejected"
                      : row.status === 6
                      ? "Cancelled"
                      : row.status === -1
                      ? "Removed"
                      : "N/A"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colspan="6" className="text-center">
                No consultations found
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {/* <ConfirmationDialog
        on={on}
        setOn={setOn}
        callback={() => handleDeleteClick(currentRow)}
      /> */}
    </>
  );
}

export default AppointmentsTable;
