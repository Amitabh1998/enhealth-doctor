import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";

const categories = [
  { name: "Cat 1" },
  { name: "Cat 2" },
  { name: "Cat 3" },
  { name: "Cat 4" },
  { name: "Cat 5" },
];

const subCategories = [
  { name: "Sub cat 1" },
  { name: "Sub cat 2" },
  { name: "Sub cat 3" },
  { name: "Sub cat 4" },
  { name: "Sub cat 5" },
];

const NewTestForm = ({
  name,
  setName,
  category,
  setCategory,
  setSubCategory,
  subCategory,
  amount,
  setAmount,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full ">
        <label
          for="first_name"
          class="block mb-1 text-sm font-normal text-gray-600 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="first_name"
          className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label
          for="first_name"
          class="block mb-1 z-50 text-sm font-normal text-gray-600 dark:text-white"
        >
          Category
        </label>
        <Listbox value={category} onChange={(e) => setCategory(e)}>
          <div className="relative mt-1">
            <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
              <span className="block truncate">{category.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-50 absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((role, roleIdx) => (
                  <Listbox.Option
                    key={roleIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={role}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {role.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div>
        <label
          for="first_name"
          class="block mb-1 text-sm font-normal text-gray-600 dark:text-white"
        >
          Sub Category
        </label>
        <Listbox value={subCategory} onChange={(e) => setSubCategory(e)}>
          <div className="relative mt-1">
            <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
              <span className="block truncate">{subCategory.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {subCategories.map((role, roleIdx) => (
                  <Listbox.Option
                    key={roleIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={role}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {role.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="w-full ">
        <label
          for="first_name"
          class="block mb-1 text-sm font-normal text-gray-600 dark:text-white"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewTestForm;
