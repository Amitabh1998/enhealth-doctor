import React from "react";

const Experience = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-3 pb-8">
      {/* <div className="text-lg text-gray-800 font-semibold">Experience: </div>
      <div className="text-gray-700 w-11/12">
        The most well-known dummy text is the 'Lorem Ipsum', which is said to
        have originated in the 16th century. Lorem Ipsum is composed in a
        pseudo-Latin language which more or less corresponds to 'proper' Latin.
        It contains a series of real Latin words. This ancient dummy text is
        also incomprehensible, but it imitates the rhythm of most European
        languages in Latin script. The advantage of its Latin origin and the
        relative meaninglessness of Lorum Ipsum is that the text does not
        attract attention to itself or distract the viewer's attention from the
        layout.
      </div> */}
      <div className="mt-3">
        <div className="text-lg text-gray-800 font-semibold">
          Professional Experience:
        </div>
        <div className="grid grid-cols-4 mt-4">
          {data?.profile?.experiences?.map((item, index) => (
            <div className="relative ">
              <div className="h-[2px] rounded-full w-full bg-indigo-500"></div>
              <div className="h-3 w-3 rounded-full bg-indigo-500 -mt-1.5 mx-auto"></div>
              <div className="h-12 w-[2px] mx-auto bg-indigo-500"></div>
              <div className="w-11/12 shadow-xl p-4 rounded-lg mx-auto flex flex-col space-y-2 items-center justify-center">
                <div className="text-gray-500">
                  {item.from} - {item.to}
                </div>
                <div className="font-semibold text-gray-800 text-lg">
                  {item.role}
                </div>
                <div className="text-gray-500">{item.hospital}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
