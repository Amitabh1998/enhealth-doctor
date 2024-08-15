import PrimaryButton from "@/components/Buttons/PrimaryButton";
import PrescriptionUploadInput from "@/components/Inputs/PrescriptionUploadInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateCommonData } from "@/apis/common";

const index = () => {
  const [prescription, setPrescription] = useState({});
  const [data, setClearData] = useState("");
  const [consultationId, setConsultationId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.cid) {
      setConsultationId(router?.query?.cid);
    } else {
      return;
    }
  }, [router.query]);

  console.log("prescription>>", prescription);
  return (
    <div className="flex items-center justify-center h-auto w-full">
      <div className="bg-white p-10 rounded-lg shadow-md ">
        <div className="text-center text-xl">Upload Prescription</div>
        <div className="grid place-items-center gap-4">
          <img
            src="/images/upload-prescription.png"
            alt="Prescription"
            className="w-96 h-94 object-cover"
          />
          <div className="flex flex-col items-center justify-evenly w-full space-y-4">
            <PrescriptionUploadInput
              label={""}
              data={prescription}
              setData={setPrescription}
            />

            {/* <button
              className="w-28 p-2 bg-red-500 rounded-lg text-white"
              onClick={() => {
                if (Object.keys(prescription).length) {
                  setPrescription({});
                  setClearData({});
                }
              }}
            >
              Cancel
            </button> */}

            <button
              className="w-28 p-2 bg-green-700 rounded-lg text-white"
              onClick={() => {
                updateCommonData(
                  {
                    prescription: prescription ?? undefined,
                  },
                  `consultation/consultation-booking/${consultationId}`
                );

                router.push("/appointments");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
