import React, { useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import OtpDialog from "../../Dialogs/OtpDialog";
import {
  sendOtp,
  sendOtpHandler,
  signupRequestHandler,
} from "../../../apis/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import SpinnerLoader from "../../SpinnerLoader";
import Link from "next/link";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.trim() === "") {
      toast.error("Name is required");
      setLoading(false);
      return false;
    } else if (email.trim() === "") {
      toast.error("Email is required");
      setLoading(false);
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Email address is invalid");
      setLoading(false);
      return false;
    } else if (password.trim() === "") {
      toast.error("Password is required");
      setLoading(false);
      return false;
    } else if (confirmPassword.trim() === "") {
      toast.error("Please confirm your password");
      setLoading(false);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate() === true) {
      const signUpData = {
        name,
        email,
        password,
        role: 4,
      };

      try {
        const response = await signupRequestHandler(signUpData);
        localStorage.setItem("enhealthDoctorToken", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        // if (response?.user?.profile !== null) {
        //   router.push("/dashboard");
        // } else {
        //   router.push("/onboarding");
        // }
        router.push("/onboarding");

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error(err ? err : "Something went wrong", "bottom-right");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="text-center w-full flex justify-center">
        <div className="w-full max-w-[360px]">
          <form className="space-y-4 my-6" onSubmit={handleSubmit}>
            <p className="md:text-3xl text-2xl font-medium text-center ">
              Welcome!
            </p>

            <div>
              <label className="text-base font-medium text-left flex-1 flex">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md outline-none"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-left flex-1 flex">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="w-full p-2 border rounded-md outline-none"
                  placeholder="Enter Email"
                  value={email}
                  autoComplete="new-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium flex-1 flex">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full p-2 border rounded-md outline-none"
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium flex-1 flex">
                Re-enter Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full p-2 border rounded-md outline-none"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* <button className=" rounded-lg  w-full max-w-[360px] p-2 flex items-center justify-evenly bg-[#575AE5] hover:bg-[#6264e5] text-white text-lg">
              Sign up
            </button> */}
            <div onClick={() => null}>
              <PrimaryButton
                loading={loading}
                text={"Signup"}
                color={loading ? "bg-[#cccccc]" : "bg-[#575AE5]"}
              />
            </div>
            <div className="flex items-start  w-full">
              <span className="text-[#393939] font-medium">
                You have an account?{" "}
              </span>
              <Link href="/" className="font-medium ml-2">
                Sign in now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
