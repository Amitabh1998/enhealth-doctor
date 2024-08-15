import React, { useEffect, useState } from "react";
import DefaultInput from "../../Inputs/DefaultInput";
import ImageUploaderInput from "../../Inputs/ImageUploaderInput";
import FileUploadInput from "../../Inputs/FileUploadInput";
import MapAutocomplete from "../../Inputs/MapAutocomplete";
import { toast } from "react-toastify";
import { authUser, completeOnboarding } from "../../../apis/auth";
import { useRouter } from "next/router";
import OnboardingStep1Form from "../OnboardingStep1Form";
import OnboardingStep2Form from "../OnboardingStep2Form";
import OnboardingStep3Form from "../OnboardingStep3Form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OnboardingForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState({});
  const [front, setFront] = useState({});
  const [back, setBack] = useState({});
  const [registrationCertificate, setRegistrationCertificate] = useState({});
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [cord, setCord] = useState([]);
  const [venueOpen, setVenueOpen] = useState(false);
  const [authorisation, setAuthorisation] = useState({});
  const [certificate, setCertificate] = useState({});
  const [labPics, setLabPics] = useState([]);

  const authHandler = async () => {
    try {
      const response = await authUser();
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("enhealthDoctorToken", response.accessToken);

      if (response.user?.profile === null) {
        setStep(1);
      } else if (response.user?.profile?.languages?.length === 0) {
        console.log(response.user.profile);
        setStep(2);
      } else if (response.user?.profile?.languages?.length > 0) {
        setStep(3);
      }
    } catch (error) {
      toast.error(
        error && error === "accessToken is required"
          ? "Access denied! Login to continue"
          : "Something went wrong"
      );
      router.push("/");
    }
  };

  useEffect(() => {
    console.log(front);
    console.log(registrationCertificate);
    authHandler();
  }, [front, registrationCertificate]);

  return (
    <div className="w-full p-4 flex flex-col h-full justify-center">
      <div className="mx-auto w-max flex">
        <div className="flex items-center">
          <div
            className={classNames(
              step === 1 || step === 2 || step === 3
                ? "bg-bluePrimary text-white"
                : "bg-gray-200 text-gray-500",
              "w-10 h-10 text-sm rounded-full flex justify-center items-center"
            )}
          >
            1
          </div>
          <div
            className={classNames(
              step === 2 || step === 3
                ? "bg-bluePrimary text-white"
                : "bg-gray-200 text-gray-500",
              "h-1 w-40 bg-bluePrimary"
            )}
          ></div>
        </div>
        <div className="flex items-center">
          <div
            className={classNames(
              step === 2 || step === 3
                ? "bg-bluePrimary text-white"
                : "bg-gray-200 text-gray-500",
              "w-10 h-10 text-sm rounded-full flex justify-center items-center"
            )}
          >
            2
          </div>
          <div
            className={classNames(
              step === 3
                ? "bg-bluePrimary text-white"
                : "bg-gray-200 text-gray-500",
              "h-1 w-40 bg-bluePrimary"
            )}
          ></div>
        </div>
        <div className="flex items-center">
          <div
            className={classNames(
              step === 3
                ? "bg-bluePrimary text-white"
                : "bg-gray-200 text-gray-500",
              "w-10 h-10 text-sm rounded-full flex justify-center items-center"
            )}
          >
            3
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="text-center w-full my-3">
          <div className="font-bold text-gray-800">
            Registration Certificate
          </div>
          <div className="text-gray-500 w-3/5 mx-auto">
            Your information will be shared with our Medical Expert team who
            will verify your identity.
          </div>
        </div>
        {step === 1 ? (
          <OnboardingStep1Form step={step} setStep={setStep} />
        ) : step === 2 ? (
          <OnboardingStep2Form step={step} setStep={setStep} />
        ) : (
          <OnboardingStep3Form step={step} setStep={setStep} />
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;
