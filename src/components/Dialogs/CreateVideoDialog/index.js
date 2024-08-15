import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SpinnerLoader from "@/components/SpinnerLoader";
import Rating from "react-rating";
import { XCircleIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { addCommonData } from "@/apis/common";
import ImageUploaderInput from "@/components/Inputs/ImageUploaderInput";
import DefaultInput from "@/components/Inputs/DefaultInput";
import FileUploadInput from "@/components/Inputs/FileUploadInput";
import VideoUploaderInput from "@/components/Inputs/VideoUploaderInput";

export default function CreateVideoDialog({ on, setOn, data, setData }) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");

  function closeModal() {
    setOn(false);
  }

  const validate = () => {
    if (title.trim() === "") {
      toast.error("Please provide title of the video");
      return false;
    } else if (description.trim() === "") {
      toast.error("Please provide description");
      return false;
    } else if (video === null) {
      toast.error("Please upload video");
      return false;
    } else {
      return true;
    }
  };

  const saveHandler = async () => {
    if (validate() === true) {
      try {
        setLoading(true);
        const response = await addCommonData(
          {
            title: title,
            description: description,
            attachment: video,
          },
          "knowledge-center/video"
        );

        console.log(response);
        const _data = [...data];
        setData([response, ..._data]);
        toast.success("Video uploaded successfully");
        setLoading(false);
        setOn(false);
      } catch (error) {
        toast.error(error ? error : "N/A");
        setLoading(false);
        setOn(false);
      }
    }
  };

  return (
    <Transition appear show={on} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Give Feedback</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <DefaultInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label={"Title"}
                />

                <div className="w-full ">
                  <label
                    htmlFor="description"
                    className=" block mb-1 text-sm font-normal text-gray-600 "
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    row={10}
                    id="description"
                    className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md outline-none  "
                    required
                    value={description}
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <VideoUploaderInput
                    label={"Upload Video"}
                    data={video}
                    setData={setVideo}
                  />
                </div>
                <div className="mt-4 flex justify-between space-x-2">
                  <div className="w-full" onClick={() => saveHandler()}>
                    <button className="rounded-md bg-bluePrimary text-white w-full py-2 hover:bg-indigo-800">
                      {loading ? <SpinnerLoader color="white" /> : "Save"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
