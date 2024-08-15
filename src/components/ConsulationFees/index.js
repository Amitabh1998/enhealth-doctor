import React, { useEffect, useState } from "react";
import DefaultInput from "../Inputs/DefaultInput";
import { updateCommonData } from "@/apis/common";
import { toast } from "react-toastify";

const ConsultationFees = ({ data }) => {
  const [tab, setTab] = useState(1);
  const [home, setHome] = useState("");
  const [online, setOnline] = useState("");
  const [clinic, setClinic] = useState("");

  const updateConsultation = async () => {
    try {
      const response = await updateCommonData(
        tab === 1
          ? { consultationFee: { homeConsultationFee: home } }
          : tab === 2
          ? { consultationFee: { clinicConsultationFee: clinic } }
          : { consultationFee: { onlineConsultationFee: online } },
        "profile/doctor-profile-management"
      );
      toast.success("Your fees updated successfully");
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    console.log(data.profile.consultationFee);
    if (data?.profile?.consultationFee?.homeConsultationFee) {
      setHome(data.profile.consultationFee.homeConsultationFee);
    } else {
      setHome("");
    }
    if (data?.profile?.consultationFee?.clinicConsultationFee) {
      setClinic(data.profile.consultationFee.clinicConsultationFee);
    } else {
      setClinic("");
    }
    if (data?.profile?.consultationFee?.onlineConsultationFee) {
      setOnline(data.profile.consultationFee.onlineConsultationFee);
    } else {
      setOnline("");
    }
  }, []);

  return (
    <div>
      <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>Home</div>
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
          <div>Clinic</div>
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
          <div>Online</div>
          {tab === 3 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div>
      <div className="max-w-sm">
        {tab === 1 ? (
          <div className="flex flex-col">
            <DefaultInput
              label="Home Consultation Charges"
              value={home}
              onChange={(e) => setHome(e.target.value)}
            />
            <button
              onClick={() => updateConsultation()}
              className="mt-3 bg-bluePrimary text-white rounded-md px-10 py-2 self-end"
            >
              Save
            </button>
          </div>
        ) : tab === 2 ? (
          <div className="flex flex-col">
            <DefaultInput
              label="Clinic Consultation Charges"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
            />
            <button
              onClick={() => updateConsultation()}
              className="mt-3 bg-bluePrimary text-white rounded-md px-10 py-2 self-end"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <DefaultInput
              label="Online Consultation Charges"
              value={online}
              onChange={(e) => setOnline(e.target.value)}
            />
            <button
              onClick={() => updateConsultation()}
              className="mt-3 bg-bluePrimary text-white rounded-md px-10 py-2 self-end"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationFees;
