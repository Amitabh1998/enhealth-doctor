import React from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import SpinnerLoader from "@/components/SpinnerLoader";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const DefaultAutocomplete = ({
  options,
  setOptions,
  data,
  setData,
  loading,
  setLoading,
  label,
  placeholder,
}) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const deleteHandler = (e) => {
    const _data = [...data];
    setData([..._data.filter((item, index) => item !== e)]);
  };

  return (
    <div className="">
      <label className="text-gray-500">{label}</label>
      <Combobox
        value={selected}
        onChange={(e) => {
          const _data = [...data];
          if (_data.includes(e.name)) {
            return;
          } else {
            setData([..._data, e.name]);
          }
          // setSelected(e.name);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default border overflow-hidden shadow-none rounded-md bg-white text-left sm:text-sm">
            <Combobox.Input
              className="w-full p-2 rounded-md border shadow-none outline-none"
              displayValue={(person) => person}
              autoComplete="off"
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
              {loading ? <SpinnerLoader /> : ""}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4  ${
                        data.includes(person.name) &&
                        "text-gray-400 line-through bg-slate-200"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <div className="flex flex-wrap">
        {data?.map((item, index) => (
          <div
            key={index}
            className="rounded-full mr-3 mt-2  px-3 py-2 bg-bluePrimary text-white text-xs flex space-x-4"
          >
            <div>{item}</div>
            <XIcon
              className="text-white w-4"
              onClick={() => deleteHandler(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultAutocomplete;
