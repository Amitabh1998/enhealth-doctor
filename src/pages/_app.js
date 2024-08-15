// import "@/styles/globals.css";
// import Layout from "../components/Layout";
// import React from "react";

// export default function App({ Component, pageProps }) {
//   let DefaultLayout = Layout;
//   if (Component.layout === null) DefaultLayout = React.Fragment;
//   else if (Component.layout) DefaultLayout = Component.layout;
//   return (
//     <DefaultLayout>
//       <Component {...pageProps} />
//     </DefaultLayout>
//   );
// }
import "@/styles/globals.css";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { authUser } from "@/apis/auth";
import { SnackbarProvider } from "notistack";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";

const socket = io("https://api.dev.enhealth.us");
// const socket = io("http://localhost:5001");
const socketApp = feathers();

socketApp.configure(
  socketio(socket, {
    transports: ["websocket"],
  })
);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  let DefaultLayout = Layout;
  if (Component.layout === null) DefaultLayout = React.Fragment;
  else if (Component.layout) DefaultLayout = Component.layout;
  let token = "";
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
    if (["/", "/signup"].includes(router.pathname)) {
      return;
    }
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
  }, [router.pathname]);

  const [isConnected, setConnected] = useState(false);

  const authHandler = async () => {
    try {
      if (["/", "/signup"].includes(router.pathname)) {
        return;
      }
      const response = await authUser();

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("enhealthDoctorToken", response.accessToken);

      if (
        response.user.profile &&
        Object.keys(response.user.profile).length > 0
      ) {
        if (response?.user?.profile?.idProof.length === 0) {
          router.push("/onboarding");
        } else {
          if (response.user.status === 2) {
            router.push("/pending");
          } else {
            return;
          }
        }
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      // toast.error(
      //   error && error === "accessToken is required"
      //     ? "Access denied! Login to continue"
      //     : "Something went wrong"
      // );
      router.push("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("enhealthDoctorToken");
    if (!token) {
      if (router.pathname === "/" || router.pathname === "/signup") {
        return;
      } else {
        router.push("/");
      }
    } else {
      // if (router.pathname === "/" || router.pathname === "/signup") {
      //   return;
      // } else {
      const response = authHandler();
      // }
      // router.push(router.pathname);
    }
  }, [router.pathname]);

  return (
    <>
    
      <ToastContainer />
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <DefaultLayout isConnected={isConnected} setConnected={setConnected}>
          <Component {...pageProps} />
          {isPopupVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div
                className="bg-white p-6 rounded-lg shadow-lg text-center w-[500px] "
                onClick={(e) => e.stopPropagation()}
              >
                <p>Incoming Call..</p>
                <div className="space-x-10">
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      router.push(`/consultation-call/${consultationId}`);
                      setPopupVisible(false);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                    onClick={() => setPopupVisible(false)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
        </DefaultLayout>
      </SnackbarProvider>
    </>
  );
}
