import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";

export default function NewVideo({ isOpen, setIsOpen, setStaff, staff }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [role, setRole] = useState(roles[0]);

  function closeModal() {
    setIsOpen(false);
  }

  // const saveHandler = () => {
  //   const _staff = [...staff];
  //   setStaff([
  //     ..._staff,
  //     { id: staff?.length + 1, name: name, phone: phone, role: role.name },
  //   ]);
  //   console.log([
  //     ..._staff,
  //     { id: staff?.length + 1, name: name, phone: phone, role: role.name },
  //   ]);
  //   setIsOpen(false);
  // };

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
              <Dialog.Panel className="w-full flex flex-col   max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Upload New Video</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                {/* <div className="mt-2 flex-1">
                  <NewStaffForm
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    role={role}
                    setRole={setRole}
                  />
                </div> */}

                <div className="my-10">
                  <div className="w-full mb-2 ">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      required
                    />
                  </div>

                  <div className="w-full ">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 dark:text-white"
                    >
                      Video URL
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      required
                    />
                  </div>
                </div>

                <div className="w-full mt-5">
                  <PrimaryButton text={"Upload"} color={"bg-bluePrimary"} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
