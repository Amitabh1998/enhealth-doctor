import axios from "axios";
const API_URL_V1 = "https://api.test.vitmeds.com/v1";

export const loginHandler = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/authenticate`,
      {
        strategy: "local",
        email,
        role: 4,
        password,
      }
    );

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("enhealthDoctorToken", response.accessToken);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const signupRequestHandler = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/user-management`,
      data
    );

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("enhealthDoctorToken", response.accessToken);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const sendOtp = async (phone, action) => {
  try {
    let data = JSON.stringify({
      phone: phone,
      strategy: "phoneOtp",
      action: action,
      role: 3,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const verifyOtp = async (phone, otp, action, deviceId, uuid) => {
  try {
    let data = JSON.stringify({
      phone: phone,
      otp: otp,
      strategy: "phoneOtp",
      action: action,
      role: 3,
      deviceId: deviceId,
      deviceType: 3,
      deviceName: uuid,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const authUser = async () => {
  try {
    let data = JSON.stringify({
      strategy: "jwt",
      accessToken: localStorage.getItem("enhealthDoctorToken"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
