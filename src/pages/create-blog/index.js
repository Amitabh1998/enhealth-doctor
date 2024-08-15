// import QuillEditor from "@/components/QuillEditor";
// import React, { useState } from "react";

// const index = () => {
//   const [blogContent, setBlogContent] = useState("");

//   const handleEditorChange = (html) => {
//     setBlogContent(html);
//   };

//   const saveBlog = async () => {
//     console.log(blogContent);
//   };

//   return (
//     <div>
//       <QuillEditor onChange={handleEditorChange} />
//       <button onClick={saveBlog}>Save Blog</button>
//     </div>
//   );
// };

// export default index;

// import React, { useEffect } from "react";

// import { useQuill } from "react-quilljs";
// // or const { useQuill } = require('react-quilljs');

// import "quill/dist/quill.snow.css";

// export default function IndexPage() {
//   const { quill, quillRef } = useQuill();
//   console.log("!");

//   useEffect(() => {
//     // console.log(quill, quillRef);
//     console.log("!");
//     if (quill) quill.setText("123");
//   });

//   return (
//     <div style={{ width: "100%", height: "80vh" }}>
//       <div ref={quillRef} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import DefaultInput from "@/components/Inputs/DefaultInput";
import ImageUploaderInput from "@/components/Inputs/ImageUploaderInput";
import { addCommonData } from "@/apis/common";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function IndexPage() {
  const { quill, quillRef } = useQuill();
  const [editorHtml, setEditorHtml] = useState(""); // State to store the HTML content
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        setEditorHtml(html); // Update the state with the HTML content
      });
    }
  }, [quill]);

  const handleSave = async () => {
    // Log the HTML content when the save button is clicked
    console.log("HTML Content:", editorHtml);
    // You can send this content to your backend for saving to a database or storage.

    try {
      setLoading(true);
      const response = await addCommonData(
        {
          title: title,
          description: editorHtml,
          coverImage: pic,
        },
        "knowledge-center/blog"
      );

      console.log(response);
      toast.success("Your Blog is created successfully");
      router.push("/community");
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "N/A");
      setLoading(false);
    }
  };

  return (
    <div className="h-auto bg-offWhite mb-10">
      <div style={{ width: "100%", height: "75vh" }}>
        <div className="text-xl font-bold text-gray-800 mb-5">Write a blog</div>
        <DefaultInput
          label={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="my-5">
          <ImageUploaderInput
            label="Upload Cover Pic"
            data={pic}
            setData={setPic}
          />
        </div>
        <div ref={quillRef} />
        <div className="flex justify-end w-full mt-5">
          <button
            onClick={handleSave}
            className="px-10 py-2 rounded-md bg-bluePrimary text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
