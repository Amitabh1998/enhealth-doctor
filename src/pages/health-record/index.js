// import { ChevronRightIcon } from "@heroicons/react/solid";
// import React from "react";

// const index = () => {
//   return (
//     <div className="w-full">
//       {/* BREAD CRUM */}
//       <nav className="flex h-max" aria-label="Breadcrumb">
//         <ol className="inline-flex items-center space-x-1 md:space-x-1">
//           <li className="inline-flex items-center">
//             <a
//               href="/dashboard"
//               className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary dark:text-gray-400 dark:hover:text-white"
//             >
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <div className="flex items-center">
//               <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
//               <a
//                 href="#"
//                 className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
//               >
//                 Health Record
//               </a>
//             </div>
//           </li>
//         </ol>
//       </nav>
//       <div className="w-full grid md:grid-cols-1 gap-5 mt-5">
//         <div className="w-full p-3 bg-purple-100 rounded-md">
//           <div className="bg-white rounded-md p-3">
//             <div className="font-semibold text-xl">Patient Details</div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Full Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Gender</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Age</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="font-semibold text-xl">Medication</div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Title</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Dosage</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>

//               <div className="md:col-span-2 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="font-semibold text-xl">Screening Time</div>
//             <div className="w-full grid md:grid-cols-3 gap-5 mt-5">
//               <div>
//                 <div>Test Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Value</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Date of last Screening</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>

//               <div className="md:col-span-3 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div className="font-semibold text-xl">Surgery</div>
//               <div className="font-semibold text-xl">Allergy</div>
//               <div>
//                 <div>Surgery Type</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Allergy Type</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>

//               <div className="md:col-span-1 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>

//               <div className="md:col-span-1 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* New Consultation */}
//         <div className="w-full mt-10 p-3 bg-orange-100 rounded-md">
//           <div className="bg-white rounded-md p-3">
//             <div className="font-semibold text-xl">Patient Details</div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Full Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Date</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Patient Complaint</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="font-semibold text-xl">Medicines</div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Full Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Field Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>

//               <div className="md:col-span-2 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="font-semibold text-xl">
//               Diagnostic Test Presentation{" "}
//             </div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Field Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//               <div>
//                 <div>Field Name</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>

//               <div className="md:col-span-2 flex justify-end w-full">
//                 <div className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-md mt-5 p-3">
//             <div className="font-semibold text-xl">Follow up Appointments</div>
//             <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
//               <div>
//                 <div>Follow up date</div>
//                 <input className="w-full rounded-md border p-2" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SAVE BUTTON */}
//         <button className="w-full rounded-md bg-yellow-500 p-2 font-semibold">SAVE</button>
//       </div>
//     </div>
//   );
// };

// export default index;

import DefaultInput from "@/components/Inputs/DefaultInput";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const index = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="h-[calc(100vh-110px)] w-full flex flex-col">
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
                Health Record
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 flex h-full  justify-center items-center">
        <div className="max-w-sm w-full mx-5 rounded-md bg-white p-3">
          <DefaultInput
            label="Patient Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <DefaultInput
            label="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="w-full p-2 mt-5 bg-bluePrimary rounded-md text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
