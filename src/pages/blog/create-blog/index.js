import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ChevronRightIcon } from "@heroicons/react/solid";
import SpinnerLoader from "@/components/SpinnerLoader";
import ImageUploaderInput from "@/components/Inputs/ImageUploaderInput";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { addCommonData } from "@/apis/common";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center py-20">
      <SpinnerLoader />
    </div>
  ),
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
    [{ size: ["small", "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["blockquote"],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    console.log("Blog content:", content);

    // try {
    //   const response = await addCommonData(
    //     {
    //       title: title,
    //       description: content,
    //       coverImage: attachment,
    //     },
    //     "knowledge-center/blog"
    //   );
    //   toast.success("Blog created successfully");
    //   router.push("/community");
    // } catch (error) {
    //   toast.error(error ? error : "Something went wrong");
    // }
  };

  return (
    <div>
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="cms"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Blogs
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Create Blog
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="w-full mt-4 text-left text-2xl font-semibold text-gray-800">
        Create new blog
      </div>{" "}
      <div className="my-5">
        <label className="text-gray-600">Title</label>
        <input
          className="text-4xl text-gray-400 bg-white w-full p-2 rounded-md border outline-0 placeholder-slate-200"
          placeholder="Enter the Title of the Blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="text-gray-600">Cover Image</label>
        <ImageUploaderInput data={attachment} setData={setAttachment} />
      </div>
      <div className="my-5">
        {/* {typeof window !== "undefined" ? ( */}
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
          style={{
            height: "60vh",
            backgroundColor: "#ffffff",
          }}
        />
        {/* ) : (
          <div className="w-full flex justify-center py-20">
            <SpinnerLoader />
          </div>
        )} */}
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleSave}
          className="my-10 px-10 bg-bluePrimary rounded-md py-2 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
