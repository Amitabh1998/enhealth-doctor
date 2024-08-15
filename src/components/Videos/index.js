// import React, { useState } from "react";
// import PrimaryButton from "../Buttons/PrimaryButton";
// import NewVideo from "../Dialogs/NewVideo";

// const Videos = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <div className="w-full flex justify-end my-4">
//         <button
//           className={
//             "rounded-md bg-indigo-600 text-white w-40 py-2 hover:bg-indigo-800"
//           }
//           onClick={() => setIsOpen(true)}
//         >
//           Add new video
//         </button>
//       </div>
//       <div className="grid md:grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map((video, index) => (
//           <div>
//             <iframe
//               className="rounded-lg"
//               src="https://www.youtube.com/embed/lCAWXPeIPTw"
//               title="YouTube video player"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowfullscreen
//             ></iframe>
//           </div>
//         ))}
//       </div>
//       <NewVideo isOpen={isOpen} setIsOpen={setIsOpen} />
//     </div>
//   );
// };

// export default Videos;

import React from "react";
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/solid";

const Videos = () => {
  return (
    <div className=" w-full mt-10">
      <div className="grid md:grid-cols-4 gap-5 ">
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

export default Videos;
