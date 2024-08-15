import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.clear();
    router.push("/");
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("vitmedsDoctorUser"));

    if (user) {
      if (user?.status === 2) {
        return;
      } else if (user?.status === 1) {
        router.push("/dashboard");
      }
    }
  };

  useEffect(() => {
    getUser()
  },[])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-lg w-full">
        <div className="text-xl lg:text-3xl font-semibold mb-5 text-center text-gray-500">
          Application under review
        </div>
        <img src={"/images/pending.svg"} className="w-11/12" />
        <div className="text-center text-gray-500">
          Our Medical Expert will check and confirm about your profile within
          2-3 business day.
        </div>
        <div className="mx-auto w-max justify-self-center mt-5">
          <button
            onClick={() => logoutHandler()}
            className="py-2 px-10 rounded-md text-white mx-auto bg-bluePrimary w-max"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

index.layout = null;
export default index;
