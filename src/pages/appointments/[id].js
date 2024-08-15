import { addCommonData, getData, updateCommonData } from "@/apis/common";
import FileUploadInput from "@/components/Inputs/FileUploadInput";
import ImageUploaderInput from "@/components/Inputs/ImageUploaderInput";
import SpinnerLoader from "@/components/SpinnerLoader";
import { CalendarIcon } from "@heroicons/react/outline";
import { ChevronRightIcon, DocumentAddIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const appointDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(1);
  const [prescription, setPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const data = await getData(
        -1,
        0,
        `consultation/consultation-booking/${router.query.id}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  const getAllPrescriptions = async () => {
    try {
      // setLoading(true);
      const data = await getData(
        -1,
        0,
        `profile/user-health-record?entityId=${router.query.id}`
      );
      setPrescriptions(data);
      console.log(data);
      // setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      getAllData();
      getAllPrescriptions();
    }
  }, [router]);

  const [actionLoading, setActionLoading] = useState(false);

  const approveHandler = async () => {
    try {
      console.log("approve handler called");
      setActionLoading(true);
      const response = updateCommonData(
        { status: 2 },
        `consultation/consultation-booking/${router?.query?.id}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      setActionLoading(false);
      const _data = { ...data };
      setData({ ..._data, status: 2 });
    } catch (error) {
      console.log(error);
      setActionLoading(false);
      toast.error(error ? error : "Something went wrong");
    }
  };

  const completeAppointment = async () => {
    try {
      console.log("approve handler called");
      setActionLoading(true);
      const response = updateCommonData(
        { status: 4 },
        `consultation/consultation-booking/${router?.query?.id}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      setActionLoading(false);
      const _data = { ...data };
      setData({ ..._data, status: 4 });
      toast.success("Appointment is completed successfully");
    } catch (error) {
      console.log(error);
      setActionLoading(false);
      toast.error(error ? error : "Something went wrong");
    }
  };

  const startConsultationHandler = async () => {
    console.log("continue video call");
    try {
      setActionLoading(true);
      const response = await updateCommonData(
        { status: 3 },
        `consultation/consultation-booking/${router?.query?.id}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      router.push(`/consultation-call/${router?.query?.id}`);
      setActionLoading(false);
    } catch (error) {
      setActionLoading(false);
      toast.error(error ? error : "Something went wrong");
    }
  };

  const savePrescription = async () => {
    try {
      const response = await addCommonData(
        {
          user: data?.user?._id,
          entityType: "consultationBooking",
          entityId: router?.query?.id,
          attachments: [prescription],
        },
        "profile/user-health-record"
      );
      setPrescriptions([...prescriptions, response]);
      toast.success("Prescription added successfully");
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  return (
    <div>
      {" "}
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
                Appointment Details
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="w-full mt-5">
          <div className="bg-white p-3 rounded-md shadow flex  justify-between space-x-5">
            <div className="flex space-x-5 items-center">
              {data?.user?.avatar?.link ? (
                <img
                  className="w-20 h-20 rounded-md object-cover"
                  src={data?.user?.avatar?.link}
                />
              ) : (
                <div className="w-20 h-20 rounded-md bg-green-300 flex justify-center items-center">
                  {data?.user?.name[0]}
                </div>
              )}
              <div>
                <div className="font-semibold">{data?.user?.name}</div>
                <div className="text-gray-600">
                  {data?.user?.gender === 1
                    ? "Male"
                    : data?.user?.gender === 2
                    ? "Female"
                      ? data?.user?.gender === 3
                      : "Others"
                    : "N/A"}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 h-max">
              <div className="px-4 py-2 bg-yellow-400 rounded-md ">
                {data.consultationType === 1
                  ? "Online"
                  : data.consultationType === 2
                  ? "Clinic"
                  : "Home"}
              </div>
              <div className="px-4 py-2 bg-green-400 rounded-md ">
                Code : {data.code}
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white p-3 rounded-md shadow ">
            <div className="flex space-x-3 ">
              <div>
                <CalendarIcon className="w-8 h-8 text-bluePrimary" />
              </div>
              <div className="text-xl w-full  font-semibold">
                Consultation Time
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="mt-4">
                <div className="">
                  <div className="text-gray-600">
                    {moment(data?.startTime).format("Do, MMMM YYYY")}
                  </div>
                </div>
                <div className="flex w-full space-x-2 text-gray-600 font-semibold">
                  <div className="text-gray-600">
                    {moment(data?.startTime).format("hh:mm a")}
                  </div>
                  <div>-</div>
                  <div className="text-gray-600">
                    {moment(data?.endTime).format("hh:mm a")}
                  </div>
                </div>
              </div>
              <div>
                {data?.status === 1 ? (
                  <div className="flex space-x-4 h-max">
                    <button className="text-red-500 rounded-md border border-red-500 px-10 py-1">
                      Reject
                    </button>
                    <button
                      onClick={() => approveHandler()}
                      className="text-white rounded-md border bg-bluePrimary px-10 py-1"
                    >
                      {actionLoading ? <SpinnerLoader /> : "Approve"}
                    </button>
                  </div>
                ) : data?.status === 2 && data?.consultationType === 1 ? (
                  <div>
                    <button
                      onClick={() => startConsultationHandler()}
                      className="text-white rounded-md border bg-bluePrimary px-10 py-1"
                    >
                      Continue with video call
                    </button>
                  </div>
                ) : data?.status === 2 && data?.consultationType === 3 ? (
                  <div>
                    <button
                      onClick={() => completeAppointment()}
                      className="text-white rounded-md border bg-bluePrimary px-10 py-1"
                    >
                      Mark as complete
                    </button>
                  </div>
                ) : data?.status === 4 ? (
                  <div>
                    <div className="text-gray-700 rounded-md border bg-green-100 px-10 py-1 text-center">
                      Completed
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => startConsultationHandler()}
                      className="text-white rounded-md border bg-bluePrimary px-10 py-1"
                    >
                      Continue with video call
                    </button>
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() =>
                      router.push(
                        `/health-record/${data?.user?._id}?consultationId=${router?.query?.id}`
                      )
                    }
                    className="text-white  justify-self-end rounded-md border bg-bluePrimary px-10 py-1"
                  >
                    View health record
                  </button>
                </div>
              </div>
            </div>
          </div>
          {data?.consultationType === 3 && (
            <div className="mt-6 bg-white p-3 rounded-md shadow ">
              <div className="flex space-x-3 ">
                <div>
                  <DocumentAddIcon className="w-8 h-8 text-bluePrimary" />
                </div>
                <div className="text-xl w-full  font-semibold mb-4">
                  Patient's Address
                </div>
              </div>

              <div className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-800 font-semibold">
                    Address Line 1
                  </div>
                  <div className="text-gray-600">
                    {data?.address?.addressLine1}
                  </div>
                  <div className="text-gray-800 font-semibold">
                    Address Line 2
                  </div>
                  <div className="text-gray-600">
                    {data?.address?.addressLine2}
                  </div>
                  <div className="text-gray-800 font-semibold">City</div>
                  <div className="text-gray-600">{data?.address?.city}</div>
                  <div className="text-gray-800 font-semibold">PinCode</div>
                  <div className="text-gray-600">{data?.address?.pinCode}</div>
                  <div className="text-gray-800 font-semibold">State</div>
                  <div className="text-gray-600">{data?.address?.state}</div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 bg-white p-3 rounded-md shadow ">
            <div className="flex space-x-3 ">
              <div>
                <DocumentAddIcon className="w-8 h-8 text-bluePrimary" />
              </div>
              <div className="text-xl w-full  font-semibold mb-4">
                Prescriptions
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-wrap space-x-3">
                {prescriptions?.length === 0 ? (
                  <div className="text-center flex items-center justify-center">
                    No Prescriptions found
                  </div>
                ) : (
                  prescriptions?.map((item, index) =>
                    item?.attachments?.map((item, index) => (
                      <div key={index}>
                        <img src={item?.link} className="h-20" />
                      </div>
                    ))
                  )
                )}
              </div>
              <div>
                <ImageUploaderInput
                  label={"Upload File"}
                  data={prescription}
                  setData={setPrescription}
                />
                <button
                  onClick={savePrescription}
                  className="disabled:bg-gray-300 p-2 bg-bluePrimary rounded-md text-white mt-2 w-full"
                  disabled={!prescription}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default appointDetails;
