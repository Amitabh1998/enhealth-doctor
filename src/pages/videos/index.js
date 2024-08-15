import React from "react";
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/solid";

const index = () => {
  return (
    <div className="max-w-7xl px-8 sm:px-6 md:px-4  mx-auto w-full mt-10">
      <div className="text-xl font-semibold my-5">Vitmeds Videos</div>

      <div className="grid md:grid-cols-3 gap-5 md:gap-10">
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <div className="w-full rounded-md">
            <img
              className="aspect-video rounded-md"
              src={`https://source.unsplash.com/random/800x600?sig=${item}`}
            />

            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="font-semibold">Vitmeds video title</div>
                <div className="text-textGray">09:32</div>
              </div>
              <div className="text-xs text-textGray">
                Cillum reprehenderit fugiat exercitation consequat consectetur
                velit qui eiusmod
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
