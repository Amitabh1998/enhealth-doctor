import React, { useEffect, useState } from "react";
import MapAutocomplete from "../Inputs/MapAutocomplete";

const Locations = ({ data }) => {
  const [cord, setCord] = useState([]);
  console.log("data from location component", data);

  useEffect(() => {
    setCord(data.profile.address.coordinates);
  }, [data]);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-3 grid  lg:grid-cols-10 gap-4">
      <div className="lg:col-span-5">
        <div className="font-semibold text-lg txt-gray-700">Address</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-800 font-semibold">Address Line 1</div>
          <div className="text-gray-600">
            {data?.profile?.address?.addressLine1}
          </div>
          <div className="text-gray-800 font-semibold">City</div>
          <div className="text-gray-600">{data?.profile?.address?.city}</div>
          <div className="text-gray-800 font-semibold">Landmark</div>
          <div className="text-gray-600">
            {data?.profile?.address?.landmark}
          </div>
          <div className="text-gray-800 font-semibold">State</div>
          <div className="text-gray-600">{data?.profile?.address?.state}</div>
        </div>
      </div>
      <div className="lg:col-span-5">
        <MapAutocomplete cord={cord} setCord={setCord} />
      </div>
    </div>
  );
};

export default Locations;
