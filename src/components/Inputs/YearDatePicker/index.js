import React from "react";

const YearDatePicker = ({ selectedYear, onChange, label }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, index) => currentYear - index);

  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <select
        value={selectedYear}
        onChange={onChange}
        className="block bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
      >
        <option value="">Select a year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearDatePicker;
