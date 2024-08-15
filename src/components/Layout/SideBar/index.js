import { Fragment, useState } from "react";
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
  PlusIcon,
  StarIcon,
  TicketIcon,
  UserAddIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  // {
  //   name: "Slots Management",
  //   href: "/slot-management",
  //   icon: CalendarIcon,
  //   current: false,
  // },
  {
    name: "Appointments",
    href: "/appointments",
    icon: ViewGridIcon,
    current: false,
  },
  // {
  //   name: "Staff Management",
  //   href: "/staff-management",
  //   icon: UserAddIcon,
  //   current: false,
  // },
  // {
  //   name: "Upcoming Appointments",
  //   href: "/upcoming-appointments",
  //   icon: CalendarIcon,
  //   current: false,
  // },
  // {
  //   name: "Health Record",
  //   href: "/health-record",
  //   icon: CalendarIcon,
  //   current: false,
  // },
  // { name: "Analytics", href: "/analytics", icon: InboxIcon, current: false },
  // // { name: "Community", href: "/community", icon: UsersIcon, current: false },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
    current: false,
  },
  // {
  //   name: "Reviews",
  //   href: "/reviews",
  //   icon: StarIcon,
  //   current: false,
  // },
  // {
  //   name: "Support",
  //   href: "/support",
  //   icon: TicketIcon,
  //   current: false,
  // },
  { name: "logout", href: "/", icon: LogoutIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SideBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}

      <div className="flex flex-col flex-grow border-r border-gray-200 pt-16 bg-white overflow-y-auto">
        {/* <div className="flex  flex-shrink-0 px-4">
              <img
                className="h-10 w-auto"
                src="/images/logo.svg"
                alt="Workflow"
              />
            </div> */}
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item, index) => (
              <Link href={item.href} legacyBehavior key={index}>
                <a
                  key={item.name}
                  onClick={item.name === "logout" ? handleLogout : null}
                  className={classNames(
                    item.href === router.pathname
                      ? "bg-bluePrimary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.href === router.pathname
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
