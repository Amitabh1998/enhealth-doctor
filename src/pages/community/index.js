import Blogs from "@/components/Blogs";
import Forums from "@/components/Forums";
import VideosTable from "@/components/Tables/VideosTable";
import Videos from "@/components/Videos";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { useState } from "react";

const index = () => {
  const [tab, setTab] = useState(1);

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
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Community
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* --------TABS------------ */}
      <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>Blogs</div>
          {tab === 1 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 2
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(2)}
        >
          <div>Videos</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 3
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(3)}
        >
          <div>Forums</div>
          {tab === 3 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div>
      {/* CREATE BUTTONS */}
      <div className="flex justify-end my-5 ">
        {tab === 1 && (
          <Link
            className="text-center px-5 py-2 rounded-md bg-bluePrimary text-white hover:bg-indigo-700"
            href="/blog/create-blog"
          >
            Create New Blog
          </Link>
        )}
      </div>

      <div>
        {tab === 1 ? (
          <div>
            <Blogs />
          </div>
        ) : tab === 2 ? (
          <VideosTable />
        ) : (
          <Forums />
        )}
      </div>
    </div>
  );
};

export default index;
