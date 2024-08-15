import React, { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import SpinnerLoader from "../../SpinnerLoader";

const PrescriptionUploadInput = ({ label, data, setData }) => {
  const [files, setFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef(null);

  const onFileDrop = async (newFiles) => {
    // data for submit

    console.log(newFiles);
    setFiles(newFiles);

    const _data = newFiles.map((file) => file.file);

    await fileUpload(_data);
  };

  const fileUpload = async (files) => {
    const token = localStorage.getItem("enhealthDoctorToken");
    var formdata = new FormData();
    files.forEach((file) => formdata.append("files", file));
    formdata.append("fileType", "4");
    formdata.append("purpose", "prescription");
    console.log(formdata);
    setFileUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_V1}/upload`,
        requestOptions
      );
      const result = await response.json();
      console.log(result[0].link);
      console.log(result[0].metadata);
      console.log(result);
      // Assuming result is an array of file paths
      setFileUrl(result.map((item) => item.link)[0]);

      setData({
        link: result[0].link,
        metadata: result[0].metadata,
      });
    } catch (error) {
      console.log("error", error);
    }
    setFileUploading(false);
  };
  const handleFiles = async (newFiles) => {
    // data for submit
    console.log(newFiles);
    setFiles(Array.from(newFiles)); // Convert FileList to an array

    const _data = Array.from(newFiles).map((file) => file);

    await fileUpload(_data);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    handleFiles(selectedFiles);
  };

  return (
    <div>
      <div className="mb-2">
        <p className="text-gray-500 pt-2 ">{label}</p>

        <div className="flex w-full justify-between items-center p-1 rounded-md border border-gray-300">
          <div className="flex-1 break-words">
            {files?.map((file, index) => (
              <div className="break-words" key={index}>
                {file.name?.slice(0, 20)}...
              </div>
            ))}
          </div>
          <FileDrop onDrop={onFileDrop}>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <button
                className="w-28 p-2 bg-bluePrimary rounded-md text-white"
                onClick={() => fileInputRef.current.click()}
              >
                {fileUploading ? <SpinnerLoader /> : "Upload"}
              </button>
            </div>
          </FileDrop>
        </div>

        {fileUploading && <SpinnerLoader />}
        {fileUrl?.trim() !== "" && (
          <p className="text-green-500">File uploaded</p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUploadInput;
