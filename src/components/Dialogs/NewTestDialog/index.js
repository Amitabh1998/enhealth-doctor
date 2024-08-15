import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
// import NewtestsForm from "../../Forms/newtestsForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import NewTestForm from "../../Forms/newTestForm";

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

export default function NewTestsDialog({ isOpen, setIsOpen, tests, setTests }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(subCategories[0]);
  const [amount, setAmount] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  const saveHandler = () => {
    const _tests = [...tests];
    setTests([
      ..._tests,
      {
        id: tests?.length + 1,
        name: name,
        category: category.name,
        subCategory: subCategory.name,
        amount: amount,
      },
    ]);

    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex  min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col  h-[70vh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Add New Tests</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <div className="mt-2 flex-1">
                  {/* <NewtestsForm
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    role={role}
                    setRole={setRole}
                  /> */}
                  <NewTestForm
                    name={name}
                    setName={setName}
                    amount={amount}
                    setAmount={setAmount}
                    category={category}
                    setCategory={setCategory}
                    setSubCategory={setSubCategory}
                    subCategory={subCategory}
                  />
                </div>

                <div className="w-full mt-5" onClick={() => saveHandler()}>
                  <PrimaryButton text={"Save"} color={"bg-bluePrimary"} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
