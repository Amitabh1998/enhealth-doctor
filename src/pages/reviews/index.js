import { getData } from "@/apis/common";
import Feedback from "@/components/Feedback";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        "consultation/consultation-rating?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$sort[createdAt]=-1"
      );
      console.log(response);
      setReviews(response.data);
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
                href="/reviews"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Reviews
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <Feedback />
    </div>
  );
};

export default index;
