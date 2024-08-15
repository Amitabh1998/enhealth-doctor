import React, { useEffect, useState } from "react";
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/solid";
import { getData } from "@/apis/common";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SpinnerLoader from "../SpinnerLoader";
import moment from "moment";

const Forums = () => {
  const router = useRouter();

  // ----------State For storing the blogs which we will get from api
  const [forums, setForums] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        "knowledge-center/get-all-forums"
      );
      console.log(response);
      setForums(response.data);
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
      {loading ? (
        <div className="w-full py-10 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="  mx-auto w-full mt-5">
          {forums?.map((item, index) => (
            <div className="mt-5 rounded-lg bg-white shadow-xl p-3 w-full flex justify-between space-x-2">
              <div className="flex-1 flex flex-col">
                <div className="text-lg font-semibold text-gray-700">
                  {item?.title}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                  className="flex-1 text-textGray text-sm mb-2"
                ></div>
                <div className="flex w-full justify-between">
                  <div className="flex space-x-3">
                    <div>
                      <img
                        src={item?.createdBy?.avatar?.link}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <div>{item?.createdBy?.name}</div>
                      <div className="text-xs text-gray-400">
                        {moment(item?.createdAt).format("Do, MMMM YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    {/* <div className="text-xs text-gray-500">44350 Views</div> */}
                    <div className="text-xs text-gray-500">
                      {item.commentCount} Comments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forums;
