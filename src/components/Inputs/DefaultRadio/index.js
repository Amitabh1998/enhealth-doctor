import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";

export default function DeafultRadio({
  data,
  setData,
  options,
  direction,
  label,
}) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setData(selected);
  }, [selected]);

  return (
    <div className="w-full ">
      <label className="text-gray-500">{label}</label>
      <RadioGroup value={data} onChange={setData}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div
          className={
            direction === "row" ? "grid grid-cols-3 gap-3" : "space-y-2"
          }
        >
          {options.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                }
                  ${checked ? "bg-bluePrimary  text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-md  px-5 py-3 border focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {plan.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
