import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";

function TestsTable({ tests, setTests, selectedIds, setSelectedIds }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");

  const handleCheckboxChange = (id) => {
    const index = selectedIds.indexOf(id);
    if (index === -1) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDeleteClick = (id) => {
    setTests(tests.filter((row) => row.id !== id));
    setSelectedIds(selectedIds?.filter((selectedId) => selectedId !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border bg-white ">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-1 text-xs md:text-base md:p-2 text-left">
              <input
                type="checkbox"
                checked={selectedIds?.length === tests.length}
                onChange={() => {
                  if (selectedIds?.length === tests.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(tests.map((row) => row.id));
                  }
                }}
              />
            </th>
            <th className="p-1 text-xs md:text-base md:p-2">Name</th>
            <th className="p-1 text-xs md:text-base md:p-2">Category</th>
            <th className="p-1 text-xs md:text-base md:p-2">Subcategory</th>
            <th className="p-1 text-xs md:text-base md:p-2">Amount</th>
            <th className="p-1 text-xs md:text-base md:p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((row) => (
            <tr
              key={row.id}
              className={`${
                selectedIds?.includes(row.id) ? "bg-gray-200" : ""
              } hover:bg-gray-50`}
            >
              <td className="p-1 text-xs md:text-base md:p-2">
                <input
                  type="checkbox"
                  checked={selectedIds?.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td className="p-1 text-xs md:text-base md:p-2">{row.name}</td>
              <td className="p-1 text-xs md:text-base md:p-2">{row.category}</td>
              <td className="p-1 text-xs md:text-base md:p-2">{row.subCategory}</td>
              <td className="p-1 text-xs md:text-base md:p-2">{row.amount}</td>
              <td className="p-1 text-xs md:text-base md:p-2">
                <button
                  onClick={() => {
                    setOn(true);
                    setCurrentRow(row.id);
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
        callback={() => handleDeleteClick(currentRow)}
      />
    </>
  );
}

export default TestsTable;
