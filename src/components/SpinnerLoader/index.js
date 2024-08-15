import React from "react";
import { ClipLoader } from "react-spinners";

const SpinnerLoader = ({ color }) => {
  return (
    <ClipLoader size="20px" color={color !== "white" ? "#575AE5" : "#ffffff"} />
  );
};

export default SpinnerLoader;
