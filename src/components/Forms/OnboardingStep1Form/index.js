import { onboardingFirstStep } from "@/apis/onboarding";
import DefaultInput from "@/components/Inputs/DefaultInput";
import DeafultRadio from "@/components/Inputs/DefaultRadio";
import ImageUploaderInput from "@/components/Inputs/ImageUploaderInput";
import MapAutocomplete from "@/components/Inputs/MapAutocomplete";
import React, { useState } from "react";
import { toast } from "react-toastify";

const options = [
  { name: "Male", value: 1 },
  { name: "Female", value: 2 },
  { name: "Others", value: 3 },
];

const OnboardingStep1Form = ({ step, setStep }) => {
  const [avatar, setAvatar] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(options[0]);
  const [address, setAddress] = useState("");
  const [cord, setCord] = useState([]);

  const validate = () => {
    if (Object.keys(avatar).length === 0) {
      toast.error("Profile Picture is required");
      return false;
    } else if (address.trim() === "") {
      toast.error("Address is required");
      return false;
    } else if (cord.length === 0) {
      toast.error("Plaese select location from the map");
      return false;
    } else {
      return true;
    }
  };

  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const saveHandler = async () => {
    if (validate() === true) {
      try {
        const response = await onboardingFirstStep({
          name: name,
          email: email,
          phone: phone,
          avatar: avatar,
          gender: gender.value,
          address: {
            addressLine1: address,
            landmark: landmark,
            city: city,
            state: state,
            pinCode: pincode,
            coordinates: cord,
          },
        });

        if (Object.keys(response).length > 0) {
          setStep(2);
        }
      } catch (error) {
        console.log(error);
        toast.error(error ? error : "Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <ImageUploaderInput
        label={"Upload Profile Pic"}
        data={avatar}
        setData={setAvatar}
      />
      {/* <DefaultInput
        label={"Full Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      <DefaultInput
        type="number"
        label={"Phone"}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <DeafultRadio
        label={"Gender"}
        options={options}
        data={gender}
        setData={setGender}
        direction="row"
      />

      <DefaultInput
        label={"Address Line 1 "}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <DefaultInput
        label={"Landmark"}
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
      />
      <DefaultInput
        label={"State"}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <DefaultInput
        label={"City"}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <DefaultInput
        label={"Pincode"}
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <MapAutocomplete cord={cord} setCord={setCord} />

      <button
        onClick={() => saveHandler()}
        className=" mt-16 w-full p-2 rounded-md bg-bluePrimary text-white"
      >
        Next
      </button>
    </div>
  );
};

export default OnboardingStep1Form;
