import { getData, getDataWithourLimit, updateCommonData } from "@/apis/common";
import DefaultInput from "@/components/Inputs/DefaultInput";
import SpinnerLoader from "@/components/SpinnerLoader";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmrForm = () => {
  const router = useRouter();

  const [emrData, setEmrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [consultData, setConsultData] = useState(null);
  const [medTitle, setMedTitle] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [testName, setTestName] = useState("");
  const [value, setValue] = useState("");
  const [screening, setScreening] = useState(new Date());
  const [surgery, setSurgery] = useState("");
  const [allergy, setAllergy] = useState("");

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
    let _medications = emrData?.medications;

    _medications = [..._medications, { name: medTitle, dosage: medDosage }];

    setEmrData({ ...emrData, medications: _medications });
    setMedTitle("");
    setMedDosage("");
  };

  const addSurgery = () => {
    let _surgery = emrData?.surgery;

    _surgery = [..._surgery, surgery];
    console.log(surgery);
    console.log(_surgery);

    setEmrData({ ...emrData, surgery: _surgery });
    setSurgery("");
  };

  const addAllergy = () => {
    let _allergy = emrData?.allergy;

    _allergy = [..._allergy, allergy];
    console.log(allergy);
    console.log(_allergy);

    setEmrData({ ...emrData, allergy: _allergy });
    setAllergy("");
  };

  const addScreening = () => {
    let _screening = emrData?.screeningHistory;

    _screening = [
      ..._screening,
      { name: testName, value: value, date: screening },
    ];
    setEmrData({ ...emrData, screeningHistory: _screening });

    setTestName("");
    setValue("");
    setScreening("");
  };

  const saveHandler = async () => {
    try {
      console.log(emrData);
      setLoading(true);
      const response = await updateCommonData(
        { emrDetails: emrData },
        `consultation/consultation-booking/${router?.query?.consultationId}?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender`
      );
      toast.success("EMR has been updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full grid md:grid-cols-1 gap-5 mt-5">
        {/* EMR */}
        <div className="w-full p-3 bg-purple-100 rounded-md">
          <div className="bg-white rounded-md p-3">
            <div className="font-semibold text-xl">Patient Details</div>
            <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <div>Full Name</div>
                <input
                  value={emrData?.name}
                  className="w-full rounded-md border p-2 outline-none"
                  readOnly
                />
              </div>
              <div>
                <div>Gender</div>
                <input
                  value={
                    emrData?.gender === 1
                      ? "Male"
                      : emrData?.gender === 2
                      ? "Female"
                      : emrData?.gender === 3
                      ? "Others"
                      : ""
                  }
                  readOnly
                  className="w-full rounded-md border p-2 outline-none"
                />
              </div>
              <div>
                <div>Age</div>
                <input
                  value={emrData?.age}
                  className="w-full rounded-md border p-2 outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md mt-5 p-3">
            <div className="font-semibold text-xl">Medications</div>
            {emrData?.medications?.map((item, index) => (
              <div
                key={index}
                className="w-full grid md:grid-cols-11 gap-5 mt-5"
              >
                <div className="col-span-5">
                  <DefaultInput
                    label="Title"
                    value={item.name}
                    onChange={(e) => {
                      const _emrData = [...emrData.medications];
                      _emrData[index].name = e.target.value;
                      setEmrData({
                        ...emrData,
                        medications: _emrData,
                      });
                    }}
                  />
                </div>
                <div className="col-span-5">
                  <DefaultInput
                    label="Dosage"
                    value={item.dosage}
                    onChange={(e) => {
                      const _emrData = [...emrData.medications];
                      _emrData[index].dosage = e.target.value;
                      setEmrData({
                        ...emrData,
                        medications: _emrData,
                      });
                    }}
                  />
                </div>
                <div className="col-span-1 flex justify-end items-end w-full">
                  <button
                    onClick={() => {
                      const _emr = [...emrData.medications];
                      _emr.splice(index, 1);
                      setEmrData({ ...emrData, medications: [..._emr] });
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
            <div className="font-semibold text-xl">Screening Time</div>
            {emrData?.screeningHistory?.map((item, index) => (
              <div
                key={index}
                className="w-full grid md:grid-cols-10 gap-5 mt-5"
              >
                <div className="col-span-3">
                  <DefaultInput
                    label="Test Name"
                    value={item?.name}
                    onChange={(e) => {
                      const _emrData = [...emrData.screeningHistory];
                      _emrData[index].name = e.target.value;
                      setEmrData({
                        ...emrData,
                        screeningHistory: _emrData,
                      });
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <DefaultInput
                    label="Value"
                    value={item?.value}
                    onChange={(e) => {
                      const _emrData = [...emrData.screeningHistory];
                      _emrData[index].value = e.target.value;
                      setEmrData({
                        ...emrData,
                        screeningHistory: _emrData,
                      });
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <div>Screening Time</div>
                  <input
                    type="date"
                    className="w-full rounded-md border p-2"
                    value={moment(item.date).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const _emrData = [...emrData.screeningHistory];
                      _emrData[index].date = e.target.value;
                      setEmrData({
                        ...emrData,
                        screeningHistory: _emrData,
                      });
                    }}
                  />
                </div>
                <div className="col-span-1 flex justify-end items-end w-full">
                  <button
                    onClick={() => {
                      const _emr = [...emrData.screeningHistory];
                      _emr.splice(index, 1);
                      setEmrData({ ...emrData, screeningHistory: [..._emr] });
                    }}
                    className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-2xl font-bold text-white disabled:bg-gray-400"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}

            <div className="w-full grid md:grid-cols-10 gap-5 mt-5">
              <div className="col-span-3">
                <DefaultInput
                  label="Test Name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <DefaultInput
                  label="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <div>Screening Time</div>
                <input
                  type="date"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  className="w-full rounded-md border p-2"
                  value={moment(screening).format("YYYY-MM-DD")}
                  onChange={(e) => setScreening(e.target.value)}
                />
              </div>

              <div className="col-span-1 flex justify-end items-end w-full">
                <button
                  disabled={
                    testName.trim() === "" ||
                    value.trim() === "" ||
                    screening.trim() === ""
                  }
                  onClick={() => addScreening()}
                  className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white disabled:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md mt-5 p-3">
            <div className="w-full grid md:grid-cols-2 gap-5 mt-5">
              <div className="font-semibold text-xl">Surgery</div>
              <div className="font-semibold text-xl">Allergy</div>
              <div>
                <div>Surgery Type</div>
                {emrData?.surgery?.map((item, index) => (
                  <div key={index} className="flex-1 mb-2">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <DefaultInput
                          value={item}
                          onChange={(e) => {
                            const _emrData = emrData.surgery;
                            _emrData[index] = e.target.value;
                            setEmrData({ ...emrData, surgery: _emrData });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          const _emr = [...emrData.surgery];
                          _emr.splice(index, 1);
                          console.log(_emr);
                          setEmrData({ ...emrData, surgery: [..._emr] });
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
                      value={surgery}
                      onChange={(e) => setSurgery(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={surgery.trim() === ""}
                    onClick={() => addSurgery()}
                    className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white disabled:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <div>Allegy Type</div>
                {emrData?.allergy?.map((item, index) => (
                  <div key={index} className="flex-1 mb-2">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <DefaultInput
                          value={item}
                          onChange={(e) => {
                            const _emrData = emrData.allergy;
                            _emrData[index] = e.target.value;
                            setEmrData({ ...emrData, allergy: _emrData });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          const _emr = [...emrData.allergy];
                          _emr.splice(index, 1);
                          console.log(_emr);
                          setEmrData({ ...emrData, allergy: [..._emr] });
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
                      value={allergy}
                      onChange={(e) => setAllergy(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={allergy.trim() === ""}
                    onClick={() => addAllergy()}
                    className="w-10 h-10 rounded-full bg-bluePrimary flex justify-center text-2xl font-bold text-white disabled:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* SAVE BUTTON */}
          <button
            onClick={saveHandler}
            className="w-full rounded-md bg-yellow-500 p-2 font-semibold"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmrForm;
