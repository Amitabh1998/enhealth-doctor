import { getData } from "@/apis/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpinnerLoader from "../SpinnerLoader";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Blogs() {
  const router = useRouter();

  // ----------State For storing the blogs which we will get from api
  const [blogs, setBlogs] = useState([]);
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
        "knowledge-center/get-all-blogs"
      );
      console.log(response);
      setBlogs(response.data);
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
    <div className="relative h-full bg-gray-50 ">
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="relative ">
          <div className=" max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
            {blogs?.map((post) => (
              <div
                onClick={() => router.push(`/blog/${post?._id}`)}
                key={post._id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-40 w-full object-cover"
                    src={post.coverImage?.thumbnail}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    {/* <p className="text-sm font-medium text-indigo-600">
                      <a className="hover:underline">{post.category.name}</a>
                    </p> */}
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title ? post.title : "N/A"}
                    </p>
                    {/* <p className="mt-3 text-base text-gray-500">
                        {post.description ? post.description : "N/A"}
                      </p> */}
                    {/* <div
                      className="mt-3 text-base text-gray-500"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    ></div> */}
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">
                        {post.uploadedBy.name ? post.uploadedBy.name : "N/A"}
                      </span>
                      {post.uploadedBy.avatar ? (
                        // <img
                        //   className="h-10 w-10 rounded-full"
                        //   src={post.uploadedBy.avatar.thumbnail}
                        //   alt=""
                        // />
                        <Image
                          src={post.uploadedBy.avatar.thumbnail}
                          alt="Avatar"
                          className="h-10 w-10 rounded-full"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center font-bold">
                          {post.uploadedBy.name
                            ? post.uploadedBy.name.slice(0, 1)
                            : ""}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.uploadedBy.name ? post.uploadedBy.name : "N/A"}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.createdAt}>
                          {post.createdAt.slice(0, 10)}
                        </time>
                        {/* <span aria-hidden="true">&middot;</span> */}
                        {/* <span>{post.readingTime} read</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
