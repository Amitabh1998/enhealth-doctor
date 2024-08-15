import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PlayVideoDialog from "@/components/Dialogs/PlayVideoDialog";
import { getData } from "@/apis/common";
import SpinnerLoader from "@/components/SpinnerLoader";
import { toast } from "react-toastify";
import CreateVideoDialog from "@/components/Dialogs/CreateVideoDialog";

const data = [
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
];

const tabs2 = [
  {
    name: "All Videos",
    status: 1,
  },
  {
    name: "My Videos",
    status: 2,
  },
  {
    name: "Pending",
    status: 3,
  },
];

function VideosTable({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();
  const [status2, setStatus2] = useState(1);

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  // ----------State For storing the blogs which we will get from api
  const [videos, setVideos] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getAllData = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("vitmedsDoctorUser")).profile
        ._id;

      setLoading(true);
      const response = await getData(
        limit,
        skip,
        status2 === 1
          ? "knowledge-center/get-all-videos"
          : status2 === 2
          ? `knowledge-center/get-all-videos?doctorProfile=${id}`
          : "knowledge-center/get-all-videos?status=2"
      );
      console.log(response);
      setVideos(response.data);
      setTotal(response.total);
      setSkip(response.skip);
      setLimit(response.limit);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [status2]);

  return (
    <>
      {loading ? (
        <div className="w-full py-20 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="w-full ">
          <div className="w-full grid grid-cols-3  mb-5 text-gray-500 font-medium">
            {tabs2.map((item, index) => (
              <div
                onClick={() => setStatus2(item.status)}
                key={index}
                className={`border-r ${
                  index !== tabs2.length - 1
                    ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                    : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
                } ${
                  item.status === status2 &&
                  "border-b-2  border-b-bluePrimary text-bluePrimary"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>

          {status2 === 2 && (
            <div className="flex justify-end w-full my-5">
              <button
                onClick={() => setOpen(true)}
                className="px-5 py-2 bg-bluePrimary text-white rounded-md"
              >
                Add new video
              </button>
            </div>
          )}

          <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
            <thead className="rounded-t-md">
              <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
                <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
                  S No.
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Thumbnail</th>
                <th className=" p-1 text-xs md:text-base md:p-2">
                  Uploaded By
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Title</th>
                <th className=" p-1 text-xs md:text-base md:p-2">
                  Description
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Status</th>
                <th className=" p-1 text-xs md:text-base md:p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {videos?.length > 0 ? (
                videos?.map((row, index) => (
                  <tr key={row.id} className={`hover:bg-gray-50`}>
                    <td className=" p-1 text-xs md:text-base md:p-2">
                      {index + 1}
                    </td>
                    <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                      <img
                        src={row.attachment.thumbnail}
                        className="w-10 h-10 rounded-md"
                      />
                    </td>
                    <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                      {row.uploadedBy.name}
                    </td>
                    <td className=" p-1 text-xs md:text-base md:p-2">
                      {row.title}
                    </td>
                    <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                      {row.description}
                    </td>
                    <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                      {row.status === 1 ? (
                        <div>Approved</div>
                      ) : row.status === 2 ? (
                        <div>Pending</div>
                      ) : (
                        <div>Rejected</div>
                      )}
                    </td>
                    <td className=" p-1 text-xs md:text-base md:p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          // router.push("doctors");
                          setCurrentRow(row);
                          setOn(true);
                        }}
                        className="px-3 p-1 bg-green-500 text-white rounded-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex w-full justify-center py-20 text-gray-500">
                  No Videos Found
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {on && <PlayVideoDialog on={on} setOn={setOn} current={currentRow} />}
      {open && (
        <CreateVideoDialog
          on={open}
          setOn={setOpen}
          data={videos}
          setData={setVideos}
        />
      )}
    </>
  );
}

export default VideosTable;
