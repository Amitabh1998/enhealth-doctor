import { getData, getDataWithourLimit, updateCommonData } from "@/apis/common";
import EmrForm from "@/components/Forms/EmrForm";
import DefaultInput from "@/components/Inputs/DefaultInput";
import SpinnerLoader from "@/components/SpinnerLoader";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();

  const [emrData, setEmrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [consultData, setConsultData] = useState(null);
  const [medications, setMedications] = useState([]);
  const [medTitle, setMedTitle] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getDataWithourLimit(
        `consultation/user-emr?user=${router.query.id}`
      );
      setEmrData(response.data[0]);
      console.log(response.data[0]);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      getAllData();
    }
  }, [router]);

  const addMedications = () => {
    let _medications = medications;
    _medications = [..._medications, { name: medTitle, dosage: medDosage }];
    setMedications([..._medications]);
    setMedTitle("");
    setMedDosage("");
  };
  const addTests = () => {
    let _tests = tests;
    _tests = [..._tests, test];
    setTests([..._tests]);
    setTest("");
  };

  const saveHandler = async () => {
    try {
      console.log({
        patientProblem: description,
        prescribedMedicines: medications,
        prescribedTests: tests,
        followUpDate: date,
      });
      setSaveLoading(true);
      const response = await updateCommonData(
        {
          patientProblem: description,
          prescribedMedicines: medications,
          prescribedTests: tests,
          followUpDate: date,
        },
        `consultation/consultation-booking/${router?.query?.consultationId}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      toast.success("Health record has been updated successfully");
      setSaveLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSaveLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* BREAD CRUM */}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Health Record
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-1 gap-5 mt-5">
          {/* EMR */}
          <EmrForm />
          {/* New Consultation */}
          <div className="w-full mt-10 p-3 bg-orange-100 rounded-md">
            <div className="bg-white rounded-md p-3">
              <div className="font-semibold text-xl">Patient Problem</div>
              <DefaultInput
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="bg-white rounded-md mt-5 p-3">
              <div className="font-semibold text-xl">Medications</div>
              {medications?.map((item, index) => (
                <div
                  key={index}
                  className="w-full grid md:grid-cols-11 gap-5 mt-5"
                >
                  <div className="col-span-5">
                    <DefaultInput
                      label="Title"
                      value={item.name}
                      onChange={(e) => {
                        const _emrData = [...medications];
                        _emrData[index].name = e.target.value;
                        setMedications([..._emrData]);
                      }}
                    />
                  </div>
                  <div className="col-span-5">
                    <DefaultInput
                      label="Dosage"
                      value={item.dosage}
                      onChange={(e) => {
                        const _emrData = [...medications];
                        _emrData[index].dosage = e.target.value;
                        setMedications([..._emrData]);
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end items-end w-full">
                    <button
                      onClick={() => {
                        const _emr = [...medications];
                        _emr.splice(index, 1);
                        setMedications([..._emr]);
                      }}
                      className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-2xl font-bold text-white disabled:bg-gray-400"
                    >
                      <TrashIcon className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="w-full grid md:grid-cols-11 gap-5 mt-5">
                <div className="col-span-5">
                  <DefaultInput
                    label="Title"
                    value={medTitle}
                    onChange={(e) => setMedTitle(e.target.value)}
                  />
                </div>
                <div className="col-span-5">
                  <DefaultInput
                    label="Dosage"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                  />
                </div>

                <div className=" flex justify-end items-end w-full">
                  <button
                    disabled={medTitle.trim() === "" || medDosage.trim() === ""}
                    onClick={() => addMedications()}
                    className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl disabled:bg-gray-400 font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md mt-5 p-3">
              <div className="font-semibold text-xl">Prescribed Tests</div>
              {tests?.map((item, index) => (
                <div
                  key={index}
                  className="w-full grid md:grid-cols-11 gap-5 my-3"
                >
                  <div className="col-span-10">
                    <DefaultInput
                      value={item}
                      onChange={(e) => {
                        const _emrData = [...tests];
                        _emrData[index] = e.target.value;
                        setTests([..._emrData]);
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end items-end w-full">
                    <button
                      onClick={() => {
                        const _emr = [...tests];
                        _emr.splice(index, 1);
                        setTests([..._emr]);
                      }}
                      className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-2xl font-bold text-white disabled:bg-gray-400"
                    >
                      <TrashIcon className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex space-x-2">
                <div className="flex-1">
                  <DefaultInput
                    value={test}
                    onChange={(e) => setTest(e.target.value)}
                  />
                </div>
                <button
                  disabled={test.trim() === ""}
                  onClick={() => addTests()}
                  className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl disabled:bg-gray-400 font-bold text-white"
                >
                  +
                </button>
              </div>
            </div>
            <div className="bg-white rounded-md mt-5 p-3">
              <div className="font-semibold text-xl">
                Follow up Appointments
              </div>
              <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
                <div>
                  <div>Follow up date</div>
                  <input
                    type="date"
                    defaultValue={moment().format("YYYY-MM-DD")}
                    className="w-full rounded-md border p-2"
                    value={moment(date).format("YYYY-MM-DD")}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={() => saveHandler()}
            className="w-full rounded-md bg-yellow-500 p-2 font-semibold"
          >
            {saveLoading ? <SpinnerLoader color={"white"} /> : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default index;
