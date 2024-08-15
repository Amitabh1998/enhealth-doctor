import { getData } from "@/apis/common";
import SupportDialog from "@/components/Dialogs/SupportDialog";
import SpinnerLoader from "@/components/SpinnerLoader";
import { ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();
  const [on, setOn] = useState(false);

  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        "help-center/support-ticket?$sort[createdAt]=-1&$populate=createdBy"
      );
      console.log(response);
      setData(response.data);
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
  }, []);

  return (
    <div>
      {/* BREAD CRUM */}
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
                href="/support"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Support
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="md:flex justify-between mt-5 items-center w-full ">
        <div className="text-2xl font-semibold">Support</div>
        <div>
          <button
            onClick={() => setOn(true)}
            className="px-10 py-2 rounded-md bg-bluePrimary text-white"
          >
            Create New Ticket
          </button>
        </div>
      </div>
      {loading ? (
        <div className="w-full py-10 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-4 mt-5">
          {data.map((item, index) => (
            <div
              onClick={() => router.push(`/chat/${item._id}`)}
              className="flex flex-col cursor-pointer hover:shadow-xl p-3 rounded-md bg-white shadow "
            >
              <div className="flex justify-between items-center">
                <div className="text-green-500 text-sm">
                  #{item.supportTicketId}
                </div>
                <div className="text-gray-500 text-sm">
                  {moment(item?.createdAt).format("MMM Do, YYYY")}
                </div>
              </div>
              <div className="text-gray-500 text-xs my-1 flex-1">
                {item.description}
              </div>
              {/* <div className="bg-orange-400 px-4 py-1 rounded-full text-xs bg-opacity-40 font-semibold">
                Unresolved
              </div> */}

              <div className="flex justify-between items-end">
                <div className=" items-center space-x-2">
                  {item?.attachments?.length > 0 && (
                    <div className="flex space-x-2 items-center">
                      {item.attachments.map((item, index) => (
                        <img
                          key={index}
                          src={item.link}
                          className="w-14 h-14 rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                className={
                  "disabled:bg-[#ccc] rounded-md mt-5 bg-bluePrimary text-white w-full py-2 hover:bg-indigo-800"
                }
              >
                Have a chat
              </button>
            </div>
          ))}
        </div>
      )}
      <SupportDialog on={on} setOn={setOn} data={data} setData={setData} />
    </div>
  );
};

export default index;
