import { onboardingThirdStep } from "@/apis/onboarding";
import DefaultDropdown from "@/components/Inputs/DefaultDropdown";
import DefaultInput from "@/components/Inputs/DefaultInput";
import FileUploadInput from "@/components/Inputs/FileUploadInput";
import YearDatePicker from "@/components/Inputs/YearDatePicker";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const options = [{ name: "Temporary License" }, { name: "Permanent License" }];

const OnboardingStep3Form = () => {
  const [licenseAuthority, setLicenseAuthority] = useState(options[0].name);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiration, setLicenseExpiration] = useState("");
  const [licenseAttachment, setLicenseAttachment] = useState({});
  const [workPlaceId, setWorkplaceId] = useState({});
  const [idProof, setIdProof] = useState({});
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [clinicEstablishment, setClinicEstablishment] = useState({});
  const [registrationCertificate, setRegistrationCertificate] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(licenseAuthority);
    console.log(licenseAttachment);
  }, [licenseAuthority, licenseAttachment]);

  const saveHandler = async () => {
    try {
      setSaveLoading(true);
      const _data = {
        educations: [
          {
            school: school,
            qualification: degree,
            year: year,
          },
        ],
        idProof: [idProof],
        // registrationCertificate: registrationCertificate,
        medicalLicense: {
          licenseAuthority: licenseAuthority,
          licenseNumber: licenseNumber,
          licenseExpiration: licenseExpiration,
          attachment: licenseAttachment,
        },
        clinicalEstablishmentCertificate: clinicEstablishment,
        workPlaceId: workPlaceId,
        awards: [],
      };

      console.log(_data);

      const response = await onboardingThirdStep(_data);
      router.push("/pending");
      setSaveLoading(true);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSaveLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="font-bold">Medical Board License</div>
      <DefaultDropdown
        options={options}
        defaultValue="Select License"
        data={licenseAuthority}
        setData={setLicenseAuthority}
        label={"License Authority"}
      />
      <div className="grid grid-cols-2 gap-3">
        <DefaultInput
          label={"License Number"}
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
        <div className="">
          <label className="text-gray-500">{"License Expiry date"}</label>
          <input
            value={licenseExpiration}
            onChange={(e) => setLicenseExpiration(e.target.value)}
            type="date"
            className="w-full p-2 rounded-md border border-gray-300 outline-none bg-transparent"
            placeholder="Select Expiry date"
          />
        </div>
      </div>
      <FileUploadInput
        label={"Upload License"}
        data={licenseAttachment}
        setData={setLicenseAttachment}
      />
      <div>
        <div className="font-semibold">ID card of workplace (Optional)</div>
        <FileUploadInput
          label={"Upload ID proof"}
          data={workPlaceId}
          setData={setWorkplaceId}
        />
      </div>
      <div>
        <div className="font-semibold">Identity Proof</div>
        <FileUploadInput
          label={"Upload ID proof"}
          data={idProof}
          setData={setIdProof}
        />
      </div>
      <div className="mt-4">
        <div className="font-semibold">Educational Information</div>
        <DefaultInput
          label={"School Name"}
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <div className="grid md:grid-cols-2 gap-3">
          <DefaultInput
            label={"Degree"}
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <YearDatePicker
            label={"Year"}
            selectedYear={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>
      {/* <div>
        <div className="font-semibold">Registraction Certificate </div>
        <FileUploadInput
          label={"Upload ID proof"}
          data={registrationCertificate}
          setData={setRegistrationCertificate}
        />
      </div> */}
      <div className="mt-4">
        <div className="font-semibold">Clicnic Establishment (Optional) </div>
        <FileUploadInput
          label={"Upload ID proof"}
          data={clinicEstablishment}
          setData={setClinicEstablishment}
        />
      </div>

      <div className="mt-5">
        <button
          onClick={saveHandler}
          className="bg-bluePrimary text-white p-2 w-full rounded-md"
        >
          {saveLoading ? <SpinnerLoader color="white" /> : "Register"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3Form;
