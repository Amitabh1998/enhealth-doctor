import SignUpForm from "@/components/Forms/SignUpForm";
import React from "react";
// import LoginForm from "../components/Forms/LoginForm";

const index = () => {
  return (
    <div className="h-screen w-full grid md:grid-cols-2">
      <div className="w-full bg-white flex flex-col justify-center items-center">
        <div className="h-[70vh] flex flex-col justify-center items-center">
          <div className="h-[10vh] flex justify-center items-center">
            <img src={"/images/logo.svg"} alt="logo" className="h-20" />
          </div>
          <div className="h-[50vh] flex justify-center items-center">
            <img
              src={"/images/Login1.svg"}
              alt="login svg"
              className="h-full"
            />
          </div>
        </div>
        <div className="h-[30vh] w-full bg-[#575AE5] py-5">
          <div className="text-center text-white text-4xl font-semibold">
            Affordable. Accessible. Available.{" "}
          </div>
          {/* <div className="text-center text-white text-4xl font-semibold">
            enhance reputation!
          </div> */}

          <div className="txet-white text-white text-center mt-5 text-3xl">
            Healthcare You Can Trust!
          </div>
        </div>
      </div>
      <div className="bg-gray-50 flex justify-center items-center flex-col">
        {/* <LoginForm /> */}
        <SignUpForm />
      </div>
    </div>
  );
};

index.layout = null;

export default index;
