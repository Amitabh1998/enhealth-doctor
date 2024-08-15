import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import OtpInput from "../../OtpInput";
import PrimaryButton from "../../Buttons/PrimaryButton";
import Link from "next/link";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { verifyOtp } from "@/apis/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const generateDeviceId = () => {
  return Math.random().toString(36).substring(7);
};

export default function OtpDialog({ open, setOpen, phone, action }) {
  const [otp, setOtp] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [verifyDialog, setVerifyDialog] = useState(false);
  const router = useRouter();
  const uuid = uuidv4();

  const closeModal = () => {
    setOpen(false);
    setVerifyDialog(false);
  };

  const loginHandler = async () => {
    try {
      setLoading(false);
      const deviceId = Cookies.get("device_id") || generateDeviceId();
      Cookies.set("device_id", deviceId, { expires: 365 });
      console.log(uuid);
      console.log(deviceId);

      const response = await verifyOtp(phone, otp, action, deviceId, uuid);
      console.log(response);
      localStorage.setItem("vitmedsDoctorToken", response.accessToken);
      localStorage.setItem("vitmedsDoctorUser", JSON.stringify(response.user));

      if (response?.user?.profile !== null) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error ? error : "Something went wrong");
    }
  };

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId); // Clear the interval when seconds reach 0
          return prevSeconds;
        }
      });
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [seconds]);

  const resendHandler = () => {
    setSeconds(30);
    toast("OTP resent on your Phone Number!");
  };

  return (
    <Transition appear show={open} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-80" />
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
              <Dialog.Panel className="w-full max-w-sm text-center transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-semibold leading-6 text-gray-900"
                  >
                    Verification
                  </Dialog.Title>
                  <p className="text-xs text-gray-500 mb-5">
                    Please check you message for a six-digit security code and
                    enter it below.
                  </p>
                  <OtpInput otp={otp} setOtp={setOtp} />
                  <div className="text-xs text-gray-500 mt-5">
                    Waiting for OTP... {seconds} Sec
                  </div>
                  <div className="my-5" onClick={() => loginHandler(true)}>
                    <PrimaryButton text={"Verify"} color={"bg-[#575AE5]"} />
                  </div>
                  <button
                    disabled={seconds > 0}
                    onClick={resendHandler}
                    className="disabled:bg-gray-200 text-xs mx-auto text-bluePrimary disabled:text-gray-400  font-semibold cursor-pointer hover:bg-slate-100 px-2 py-2 rounded-md disabled:shadow w-max"
                  >
                    RESEND OTP
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
