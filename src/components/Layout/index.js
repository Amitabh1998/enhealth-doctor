/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  LogoutIcon,
  MenuAlt2Icon,
  PhoneIncomingIcon,
  PlusIcon,
  UserCircleIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Appointments",
    href: "/appointments",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Staff Management",
    href: "/staff-management",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Upcoming Appointments",
    href: "/upcoming-appointments",
    icon: CalendarIcon,
    current: false,
  },
  { name: "Analytics", href: "/analytics", icon: InboxIcon, current: false },
  {
    name: "Free Consults",
    href: "/free-consults",
    icon: InboxIcon,
    current: false,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    current: false,
  },
  { name: "logout", href: "/", icon: LogoutIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children, isConnected, setConnected }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = () => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      console.log(_user);
      setUser(_user);
    }
  };

  useEffect(() => {
    getUser();
  }, [router, router.asPath]);

  const vibrationAnimation = {
    // x: [0, -5, 5, -5, 5, -3, 3, 0], // Horizontal movement
    rotate: [-20, 20, -17, 17, -15, 15, 0], // Adjusted rotation values in degrees
    transition: {
      duration: 0.8, // Duration of each animation cycle
      repeat: Infinity, // Repeat indefinitely  };
    },
  };

  const colorVariants = {
    connected: {
      color: "#00FF00", // Green color when connected
    },
    connecting: {
      color: "#FFA500", // Orange color when connecting
    },
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-10 w-auto"
                    src="/images/logo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        {/* NAVBAR */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white  shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="flex  flex-shrink-0 items-center">
                <img
                  className="h-10 w-auto"
                  src="/images/logo.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:flex items-center md:ml-32">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative pl-2  border rounded-full border-gray-400 text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
                    <SearchIcon
                      className="h-5 w-5 text-orange-400 font-light"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block w-80 pr-2 h-full rounded-full pl-8  py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search patient, health issue..."
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 hidden md:flex items-center md:ml-6 space-x-4">
              {/* Profile dropdown */}
              <div className="flex space-x-2 items-center">
                <div className="text-right">
                  <div className="text-gray-800 font-semibold tracking-wide">
                    Dr. {user ? user?.name : ""}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user ? user?.phone : ""}
                  </div>
                </div>
              </div>
            </div>
            {/* new line of code ......................................*/}
          </div>
        </div>
        {/* Static sidebar for desktop */}
        <SideBar />
        <div className="lg:pl-64 bg-green flex flex-col flex-1">
          <main className="flex-1 min-h-[calc(100vh-64px)] h-auto bg-offWhite p-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
