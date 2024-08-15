import { HandIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { getData } from "@/apis/common";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Rating from "react-rating";
import SpinnerLoader from "../SpinnerLoader";
import FeedbackDialog from "../Dialogs/FeedbackDialog";

const ratings = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feedback = () => {
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState();
  const [open, setOpen] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        "consultation/consultation-rating?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$sort[createdAt]=-1"
      );
      const response2 = await getData(
        limit,
        skip,
        "consultation/get-doctor-rating-statistics"
      );
      console.log(response);
      setReviews(response.data);
      setStats(response2);
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
    <>
      {loading ? (
        <div className="w-full flex justify-center py-10">
          <SpinnerLoader />
        </div>
      ) : (
        <div>
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <div className="sm:flex justify-between w-full items-center mb-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Customer Reviews:
              </h2>
              <button
                onClick={() => setOpen(true)}
                className="mt-3 sm:mt-0 px-10 py-2 rounded-md text-white bg-bluePrimary"
              >
                Write a review
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="w-max">
                <div className="mt-3 flex flex-col justify-center items-center">
                  <div className="text-3xl my-1 text-gray-800 font-bold">
                    {stats?.averageRating}/5
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Rating
                        initialRating={stats?.averageRating}
                        readonly={true}
                        emptySymbol={
                          <img src="/images/starEmpty.svg" className="icon" />
                        }
                        fullSymbol={
                          <img src="/images/starFilled.svg" className="icon" />
                        }
                      />
                    </div>
                  </div>
                  <div className="text-gray-500 mt-1 text-sm">
                    ({stats?.totalRatings} Ratings)
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <dl className="space-y-3">
                  {stats?.ratings?.map((count) => (
                    <div
                      key={count.rating}
                      className="flex items-center text-sm"
                    >
                      <dt className="flex-1 flex items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {count.rating}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div
                          aria-hidden="true"
                          className="ml-1 flex-1 flex items-center"
                        >
                          <StarIcon
                            className={classNames(
                              count.ratingCount > 0
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "flex-shrink-0 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />

                          <div className="ml-3 relative flex-1">
                            <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                            {count.ratingCount > 0 ? (
                              <div
                                className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                                style={{
                                  width: `calc(${count.percentage}%)`,
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                        {Math.round(count.percentage)}%
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              {/* <div className="pl-5">
            <button className="px-5 rounded-md py-2 bg-yellow-400 text-gray-800 hover:bg-yellow-500">
              Write a review
            </button>
          </div> */}
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-2">
            Top Reviews:
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((item, index) => (
              <div className="rounded-md shadow-lg bg-white p-3">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full w-12 h-12 flex justify-center items-center text-lg text-gray-800 font-bold border-2 border-indigo-700">
                    {item?.user?.name ? item.user?.name[0] : "N/A"}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-semibold">
                      {item?.user?.name ? item.user?.name : "N/A"}
                    </div>
                    <div className="text-pink-500">
                      {moment(item?.createdAt).format("MMMM Do YYYY")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center my-1">
                  <Rating
                    initialRating={item.rating}
                    readonly={true}
                    emptySymbol={
                      <img src="/images/starEmpty.svg" className="icon" />
                    }
                    fullSymbol={
                      <img src="/images/starFilled.svg" className="icon" />
                    }
                  />
                </div>
                <div className="text-sm text-gray-600">{item?.review}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <FeedbackDialog on={open} setOn={setOpen} />
    </>
  );
};

export default Feedback;
