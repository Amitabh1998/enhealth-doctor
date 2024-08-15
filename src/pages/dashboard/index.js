import Link from "next/link";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import { useRouter } from "next/router";

const socket = io("https://api.dev.enhealth.us");
// const socket = io("http://65.1.125.42:500");
const socketApp = feathers();

socketApp.configure(
  socketio(socket, {
    transports: ["websocket"],
  })
);

const gridData = [
  // {
  //   image: "/images/grid1.svg",
  //   text: "Staff Management",
  //   href: "/staff-management",
  // },
  // {
  //   image: "/images/grid2.svg",
  //   text: "Upcoming Appointments",
  //   href: "/upcoming-appointments",
  // },
  {
    image: "/images/grid2.svg",
    text: "Previous Appointments",
    href: "/appointments",
  },
  // {
  //   image: "/images/grid3.svg",
  //   text: "Analytics",
  //   href: "#",
  // },
  // {
  //   image: "/images/grid4.svg",
  //   text: "Community",
  //   href: "/community",
  // },
];
const Dashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [consultationId, setConsultationId] = useState("");

  const getUserToken = () => {
    return localStorage.getItem("enhealthDoctorToken");
  };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser(_user);
  }, []);

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const handleConnect = () => {
      console.log("Socket connected, authenticating...");
      socket.emit(
        "create",
        "authentication",
        {
          strategy: "jwt",
          accessToken: token,
        },
        function (e, res) {
          if (e) {
            console.error("Authentication error:", e);
          } else {
            console.log("Authenticated:", res);
            socketApp
              .service("v1/consultation/consultation-booking")
              .on("created", (data) => {
                console.log("Message received:", data);

                setPopupVisible(true);
                setConsultationId(data._id.toString());

                // router.push("/consultation-call/667710ec995e2771ce210614");
              });
          }
        }
      );
    };

    // Adding debug log to see if the effect is running
    console.log("Effect triggered, setting up socket connection");

    // Ensure the socket connection is established
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", handleConnect);

    // Cleanup function to remove event listeners
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect", handleConnect);
      socketApp
        .service("v1/consultation/consultation-booking")
        .removeAllListeners("patched");
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-3  py-4 px-4 bg-white shadow-md rounded-sm relative overflow-hidden">
          <div className="text-2xl text-gray-700">Good Morning,</div>
          <div className="text-4xl text-bluePrimary mb-2 font-bold tracking-wide">
            {user?.name}
          </div>
          <div className="text-sm text-gray-500">Have a nice day at work</div>
          <img src={"/images/bg1.png"} className="absolute right-0 top-0" />
        </div>
        <div className="md:col-span-2 w-full p-5 bg-white shadow-md rounded-lg flex justify-between items-center ">
          <div>
            <div className="text-2xl text-gray-700">
              <span className="font-bold">Consults</span> for today
            </div>
            <div className="text-lg text-gray-400 mt-2">5 of 9 completed</div>
          </div>
          <div className="flex justify-center items-center  border-bluePrimary rounded-full h-20 w-20 border-y-[7px] border-r-[7px] text-3xl text-bluePrimary font-bold ">
            15
          </div>
        </div>
      </div>
      {/* Grid cards */}
      {/* GRID CARDS */}
      <div className="grid md:grid-cols-4 gap-5 mt-5">
        {gridData.map((data, index) => (
          <Link
            href={data.href}
            key={index}
            className="w-full hover:shadow-xl flex flex-col justify-center items-center space-y-2 bg-white shadow-md rounded-md px-5 py-5"
          >
            <img src={data.image} className="w-24" />
            <div>{data.text}</div>
          </Link>
        ))}
      </div>

    
    </div>
  );
};

export default Dashboard;
