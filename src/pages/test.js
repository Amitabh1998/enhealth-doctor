import React from "react";

const test = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div className="p-4 rounded-md shadow bg-white  space-y-3">
          <div className="flex justify-between space-x-3">
            <div className="flex space-x-3">
              <img src="/images/cloud.svg" className="w-16" />
              <div>
                <div className="text-lg font-medium">Tom Cook</div>
                <div className="text-gray-500 text-base">@tom_cook</div>
              </div>
            </div>
            <div className="text-gray-500 text-xs">21st July 2023</div>
          </div>
          <div className="h-px w-full bg-gray-300 my-3"></div>
          <p className="text-gray-500 text-base font-">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum
            rerum voluptatem quo recusandae magni placeat saepe molestiae, sed
            excepturi cumque corporis perferendis hic.
          </p>
          <button className="bg-orange-300 w-full h-10 text-white rounded">
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
};

export default test;
