import { useState, useEffect } from "react";
// import { authCookieName, consultChatsService } from "../../apis/rest.app";
import { useSnackbar } from "notistack";
// import { useUser } from "../../store/UserContext";
import moment from "moment";
import socketio from "@feathersjs/socketio-client";
import feathers from "@feathersjs/feathers";
import io from "socket.io-client";
import { getData } from "@/apis/common";
import { toast } from "react-toastify";

function ConsultationChatView({ id }) {
  const [data, setData] = useState([]);
  const [text, setText] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState([]);
  let token = "";

  /// SOCKETTTT
  const socket = io("https://api.test.vitmeds.com");
  const socketApp = feathers();

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("vitmedsDoctorUser"));
    console.log(JSON.parse(localStorage.getItem("vitmedsDoctorUser")));
    if (_user) setUser(_user);
  }, [user]);

  const getMessages = async () => {
    try {
      const response = await getData(
        -1,
        0,
        `consultation/consultation-message?consultationBooking=${id}&$sort[createdAt]=-1`
      );
      console.log(response);
      setData(res);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      token = localStorage.getItem("token");
      // consultChatsService
      //   .find({
      //     query: {
      //       bookingId: id,
      //       $limit: -1,
      //       "$sort[createdAt]": -1,
      //     },
      //   })
      //   .then((res) => {
      //     setData(res);
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      getMessages();
    }
  }, [id]);

  // useEffect(() => {
  //   // console.log("USE EFFECT WHYY");
  //   socketApp.configure(
  //     socketio(socket, {
  //       transports: ["websocket"],
  //     })
  //   );

  //   socket.on("connect", () => {
  //     // console.log("STEP 1 : ON CONNECT-------------");
  //     socket.emit(
  //       "create",
  //       "authentication",
  //       {
  //         strategy: "jwt",
  //         accessToken: token,
  //       },
  //       initiateListeners
  //     );
  //   });
  // }, [id]);

  const initiateListeners = async (e, res) => {
    // console.log("STEP 2 : ON initiateListeners -- ", res);
    socketApp.service("v1/consultation-message").on("created", (message) => {
      console.log("CHAT CREATED APP : ", message);
      console.log(data);
      if (message.createdBy === user._id) return;

      if (data) {
        console.log("DATAAA VITEAEERE:", data);
        // console.log(
        //   "tempData:",
        //   `${data?.filter((e) => e._id !== message._id)}`
        // );

        const findIndex = data?.findIndex((a) => a._id === message._id);
        findIndex !== -1 && data?.splice(findIndex, 1);

        // const tempData = data?.filter((e) => e._id !== message._id);
        // let tempData = data;
        // tempData.splice(0, 0, message);
        // setData([...tempData]);

        console.log("DATAAA BEFORE:", data);

        setData((prevChats) => [message, ...prevChats]);

        console.log("DATAAA AFTER:", data);
      }
    });

    // socket.on('"v1/consultation-message created', function (message) {
    //   console.log("CHAT CREATED : ", message);
    // });
  };

  const sendMessage = async () => {
    if (text === null || text?.length === 0) return;

    let tempData = data;
    tempData.splice(0, 0, {
      _id: `${user._id}___${text}${moment().milliseconds}`,
      text,
      user: user._id,
      createdBy: user._id,
    });
    setData([...tempData]);

    consultChatsService
      .create({
        bookingId: id,
        text,
      })
      .then((res) => {
        setText("");
        setData([...data]);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`${error}`, {
          variant: "warning",
        });
        tempData.shift();
        setData([...tempData]);
      });
  };

  return (
    <div className="flex flex-col justify-end h-full">
      {/* <div>{`this is data :${data}`}</div> */}
      <div className="h-full overflow-hidden overflow-y-scroll flex flex-col-reverse max-h-[100vh]">
        <div className="mt-1" />

        {data !== null && data?.length === 0 && (
          <div className="flex justify-center flex-col items-center h-full">
            <img src="/images/dog-login.svg" height={200} />
            <div className="mt-2 font-medium">No Conversations Yet</div>
          </div>
        )}
        {id &&
          data &&
          data.length > 0 &&
          data?.map((e) => (
            <div
              key={`${e._id}`}
              // sx={{
              //   backgroundColor:
              //     user._id === e.createdBy ? "#ffffff" : "#F0A65E",
              //   padding: 2,
              //   color: user._id !== e.createdBy ? "#ffffff" : "black",
              //   fontWeight: 500,
              //   my: 1,
              //   ml: user._id === e.createdBy ? "15%" : 2,
              //   mr: user._id === e.createdBy ? 2 : "15%",
              // }}
              className={`${
                user._id === e.createdBy
                  ? "bg-[#ffffff] text-black ml-[15%] mr-2"
                  : "bg-[#F0A65E] text-white ml-2 mr-[15%]"
              } p-2 my-1 font-medium`}
            >
              {`${e.text}`}
            </div>
          ))}
        <div className="mt-2" />
      </div>
      <div
        // display={"flex"}
        // flexDirection={"row"}
        // alignItems={"center"}
        // p={1}
        // sx={{ backgroundColor: "white" }}
        className="flex flex-row items-center p-1 bg-white"
      >
        <input
          // hintText={"Type something"}
          // id="outlined-basic"
          // sx={{ width: "100%", backgroundColor: "white" }}
          className="w-full bg-white p-2 rounded-md border outline-none"
          value={text}
          onChange={(c) => setText(c.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div className="ml-1" onClick={sendMessage}>
          <img src="/icons/video_call/send_btn.svg" />
        </div>
      </div>
    </div>
  );
}

export default ConsultationChatView;
