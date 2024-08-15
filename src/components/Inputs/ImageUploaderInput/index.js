import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import SpinnerLoader from "../../SpinnerLoader";
import { TrashIcon } from "@heroicons/react/outline";
import { FileDrop } from "react-file-drop";

const ImageUploaderInput = ({
  label,
  multiple,
  data,
  setData,
  direction = "row",
}) => {
  const [attachments, setAttachments] = useState([]);
  const [attachmentsUploading, setAttachmentsUploading] = useState(false);
  const [attachmentsUrl, setAttachmentsUrl] = useState([]);
  const [attachmentsThumbnailsUrl, setAttachmentsThumbnailsUrl] = useState("");
  const [attachmentsMetadata, setAttachmentsMetadata] = useState();
  const [image, setImage] = useState(false);

  const attachmentsUpload = async (blob) => {
    const token = localStorage.getItem("enhealthDoctorToken");

    var formdata = new FormData();
    // formdata.append("file", blob);
    blob.map((item) => formdata.append("files", item));
    formdata.append("fileType", "1");
    formdata.append("purpose", "profile");

    console.log(formdata);
    setAttachmentsUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/upload`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.map((item) => item));
        setImage(true);
        setAttachmentsUrl(result.map((item) => item.link));
        setAttachmentsThumbnailsUrl(result.map((item) => item.thumbnail));
        setAttachmentsMetadata(result.map((item) => item.metadata));
        multiple
          ? setData(
              result.map((item) => {
                return {
                  link: item?.link,
                  thumbnail: item?.thumbnail,
                  metadata: item?.metadata,
                };
              })
            )
          : setData({
              link: result[0]?.link,
              thumbnail: result[0]?.thumbnail,
              metadata: result[0]?.metadata,
            });
        console.log(
          result.map((item) => {
            return {
              link: item?.link,
              thumbnail: item?.thumbnail,
              metadata: item?.metadata,
            };
          })
        );
        setAttachmentsUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setAttachmentsUploading(false);
      });
  };

  const onAttachmentsChange = async (imageList) => {
    console.log(imageList);
    setAttachments(imageList);

    const _data = imageList.map((item) => item.file);
    console.log(_data);

    await attachmentsUpload(_data);
  };

  const onAttachmentRemove = (index) => {
    let newImages = [...attachments];
    newImages.splice(index, 1);
    setAttachments(newImages);
  };

  return (
    <div>
      <div className="mt-2">
        <label className="text-gray-500">{label}</label>
        <ImageUploading
          multiple={multiple}
          value={attachments}
          onChange={onAttachmentsChange}
          maxNumber={10}
          dataURLKey="data_url"
          onImageRemove={onAttachmentRemove} // pass the onImageRemove function here
        >
          {({ imageList, onImageUpload, onImageRemoveAll }) => (
            <div
              className={
                direction === "col"
                  ? "flex space-y-3 flex-col"
                  : "flex space-x-3"
              }
            >
              <div className="flex space-x-3">
                {attachmentsUploading ? (
                  <div className="h-32 w-32 flex justify-center items-center">
                    <SpinnerLoader />
                  </div>
                ) : (
                  <button
                    onClick={onImageUpload}
                    className="h-32 w-36 rounded-lg border border-gray-300 bg-white text-gray-600 flex justify-center items-center"
                  >
                    <div className="text-center">
                      <img src={"/images/cloud.svg"} className="w-14" />
                      <div className="text-gray-400 mt-1 text-sm">upload</div>
                    </div>
                  </button>
                )}
                {/* <button
                  onClick={onImageUpload}
                  className="h-32 w-32 rounded-lg border border-white bg-gray-300 bg-opacity-20 text-gray-600 text-3xl font-bold flex justify-center items-center"
                >
                  +
                </button>
                {attachmentsUploading && (
                  <div className="h-32 w-32 flex justify-center items-center">
                    <SpinnerLoader />
                  </div>
                )} */}
              </div>

              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {multiple ? (
                <div className="grid grid-cols-4 gap-4">
                  {!attachmentsUploading &&
                    attachments?.map((image, index) => (
                      <div key={index} className="image-item relative">
                        <img className="h-32" src={image["data_url"]} alt="" />
                        <div className="image-item__btn-wrapper">
                          {!attachmentsUploading &&
                            attachmentsUrl[0]?.trim() !== "" && (
                              <button
                                className="rounded-full absolute bottom-0 right-0 shadow-md p-1 bg-white "
                                onClick={() => onAttachmentRemove(index)}
                              >
                                <TrashIcon className="w-6 text-red-500" />
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="">
                  {attachments?.map((image, index) => (
                    <div key={index} className="image-item relative">
                      <img className="h-32" src={attachmentsUrl} alt="" />
                      <div className="image-item__btn-wrapper">
                        {!attachmentsUploading &&
                          attachmentsUrl[0]?.trim() !== "" && (
                            <button
                              className="rounded-full absolute bottom-0 right-0 shadow-md p-1 bg-white "
                              onClick={() => onAttachmentRemove(index)}
                            >
                              <TrashIcon className="w-6 text-red-500" />
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default ImageUploaderInput;
