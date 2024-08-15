import axios from "axios";

export const onboardingFirstStep = async (_data) => {
  try {
    const token = localStorage.getItem("enhealthDoctorToken");

    let data = JSON.stringify(_data);

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/profile/doctor-profile-management`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};

export const onboardingSecondStep = async (_data) => {
  try {
    const token = localStorage.getItem("enhealthDoctorToken");

    let data = JSON.stringify(_data);
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/profile/doctor-profile-management`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const onboardingThirdStep = async (_data) => {
  try {
    const token = localStorage.getItem("enhealthDoctorToken");

    let data = JSON.stringify(_data);
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL_V1}/profile/doctor-profile-management`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
