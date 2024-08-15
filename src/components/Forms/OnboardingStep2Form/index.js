import { getData } from "@/apis/common";
import { onboardingSecondStep } from "@/apis/onboarding";
import DefaultAutocomplete from "@/components/Inputs/DefaultAutocomplete";
import DefaultInput from "@/components/Inputs/DefaultInput";
import YearDatePicker from "@/components/Inputs/YearDatePicker";
import { XIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OnboardingStep2Form = ({ step, setStep }) => {
  const [loading, setLoading] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomsLoading, setSymptomsLoading] = useState(false);
  const [surgeons, setSurgeons] = useState([]);
  const [selectedSurgeons, setSelectedSurgeons] = useState([]);
  const [surgeonsLoading, setSurgronsLoading] = useState(false);
  const [hospital, setHospital] = useState("");
  const [experience, setExperience] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [role, setRole] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getSpecialities = async () => {
    try {
      setLoading(true);
      const response = await getData(
        -1,
        0,
        "master-data/speciality?$select[0]=name"
      );
      setSpecialities(response);
      console.log(response);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };
  const getLanguages = async () => {
    try {
      setLanguageLoading(true);
      const response = await getData(
        -1,
        0,
        "master-data/language?$select[0]=name"
      );
      setLanguages(response);
      console.log(response);
      setLanguageLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLanguageLoading(false);
    }
  };
  const getSymptoms = async () => {
    try {
      setSymptomsLoading(true);
      const response = await getData(
        -1,
        0,
        "master-data/symptom?$select[0]=name"
      );
      setSymptoms(response);
      console.log(response);
      setSymptomsLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSymptomsLoading(false);
    }
  };
  const getSurgeons = async () => {
    try {
      setSurgronsLoading(true);
      const response = await getData(
        -1,
        0,
        "master-data/surgeon?$select[0]=name"
      );
      setSurgeons(response);
      console.log(response);
      setSurgronsLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSurgronsLoading(false);
    }
  };

  const experienceAddHandler = () => {
    const _data = [...experience];

    setExperience([
      ..._data,
      {
        from: from,
        to: to,
        role: role,
        hospital: hospital,
      },
    ]);

    setRole("");
    setTo("");
    setFrom("");
    setHospital("");
  };

  const deleteHandler = (e) => {
    const _data = [...data];
    setData([..._data.filter((item, index) => item !== e)]);
  };

  const saveHandler = async () => {
    console.log("DEBUG reached here");
    try {
      setSaveLoading(true);
      const experienceData = [
        ...experience,
        // {
        //   from: from,
        //   to: to,
        //   role: role,
        //   hospital: hospital,
        // },
      ];

      console.log("DEBUG experience", experienceData, {
        specialities: data,
        languages: selectedLanguages,
        // surgeonSpecializations: selectedSurgeons,
        // symptomSpecializations: selectedSymptoms,
        experiences: experienceData,
      });
      const response = await onboardingSecondStep({
        specialities: data,
        languages: selectedLanguages,
        // surgeonSpecializations: selectedSurgeons,
        // symptomSpecializations: selectedSymptoms,
        experiences: experienceData,
      });
      setStep(3);
      setSaveLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    getSpecialities();
    getLanguages();
    getSurgeons();
    getSymptoms();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <DefaultAutocomplete
        loading={loading}
        setLoading={setLoading}
        options={specialities}
        setOptions={setSpecialities}
        data={data}
        setData={setData}
        label={"Specialities"}
        placeholder="Speciality"
      />
      <div className="mt-1" />
      <DefaultAutocomplete
        loading={languageLoading}
        setLoading={setLanguageLoading}
        options={languages}
        setOptions={setLanguages}
        data={selectedLanguages}
        setData={setSelectedLanguages}
        label={"Languages"}
        placeholder="Language"
      />
      {/* <div className="mt-1" />
      <DefaultAutocomplete
        loading={symptomsLoading}
        setLoading={setSymptomsLoading}
        options={symptoms}
        setOptions={setSymptoms}
        data={selectedSymptoms}
        setData={setSelectedSymptoms}
        label={"Symptoms"}
        placeholder="Symptom"
      /> */}
      {/* <div className="mt-1" />
      <DefaultAutocomplete
        loading={surgeonsLoading}
        setLoading={setSurgronsLoading}
        options={surgeons}
        setOptions={setSurgeons}
        data={selectedSurgeons}
        setData={setSelectedSurgeons}
        label={"Surgeons"}
        placeholder="Surgeon"
      /> */}
      <div className="my-3 w-full bg-gray-500 h-px"></div>

      {/* ---------------------EXPERIENCE--------------------- */}
      <div>
        <div className="font-semibold">Clinical Experience</div>
        <div className="mt-1" />
        <DefaultInput
          label={"Hospital"}
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        />
        <div className="mt-1" />
        <div className="grid grid-cols-2 gap-4">
          <YearDatePicker
            label={"From"}
            selectedYear={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <YearDatePicker
            label={"To"}
            selectedYear={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="mt-1" />
        <DefaultInput
          label={"Role"}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <div
          onClick={() => experienceAddHandler()}
          className="flex justify-end w-full mt-2"
        >
          <button className="px-6 py-2 rounded-md bg-bluePrimary text-white">
            Add +
          </button>
        </div>

        <div className="flex flex-wrap">
          {experience?.map((item, index) => (
            <div
              key={index}
              className="rounded-full mr-3 mt-2  px-3 py-2 bg-bluePrimary text-white text-xs flex space-x-4"
            >
              <div>{item.role}</div>
              <XIcon
                className="text-white w-4"
                onClick={() => deleteHandler(item)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={saveHandler}
          className="bg-bluePrimary text-white p-2 w-full rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2Form;
