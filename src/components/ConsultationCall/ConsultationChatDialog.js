import { Box, TextField, Typography, Dialog } from "@mui/material";
import { useState, useEffect, React } from "react";
import { authCookieName, consultChatsService } from "../../apis/rest.app";
import { useSnackbar } from "notistack";
import { useUser } from "../../store/UserContext";
import moment from "moment";
import socketio from "@feathersjs/socketio-client";
import feathers from "@feathersjs/feathers";
import io from "socket.io-client";

function ConsultationChatDialog({ id, open, handleCloseDialog }) {
  const [data, setData] = useState([]);
  const [text, setText] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useUser();
  let token = "";

  /// SOCKETTTT
  const socket = io("https://api.test.vitmeds.com/v1");
  const socketApp = feathers();

  useEffect(() => {
    if (id) {
      // console.log("API CALL :");
      token = localStorage.getItem(authCookieName);
      consultChatsService
        .find({
          query: {
            bookingId: id,
            $limit: -1,
            "$sort[createdAt]": -1,
          },
        })
        .then((res) => {
          setData(res);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    // console.log("USE EFFECT WHYY");
    socketApp.configure(
      socketio(socket, {
        transports: ["websocket"],
      })
    );

    socket.on("connect", () => {
      // console.log("STEP 1 : ON CONNECT-------------");
      socket.emit(
        "create",
        "authentication",
        {
          strategy: "jwt",
          accessToken: token,
        },
        initiateListeners
      );
    });
  }, [id]);

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
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      onClose={() => {
        handleCloseDialog();
      }}
    >
      <Box
        display={"flex"}
        // justifyContent={"end"}
        flexDirection={"column"}
        height={"100%"}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            py: 1.4,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
            {"Chat"}
          </Typography>

          <img
            src={"/icons/close-circle.svg"}
            alt={"Image"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleCloseDialog();
            }}
          />
        </Box>
        <Box sx={{ width: "100%", border: "1px dashed #66666633" }} />
        <Box
          bgcolor={"#EFEBE6"}
          height={"70vh"}
          sx={{
            overflow: "hidden",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
            // maxHeight: "100%",
          }}
        >
          <Box mt={1} />
          {/* <Typography>{`darta ${data}`}</Typography> */}

          {data !== null && data?.length === 0 && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
              height={"100%"}
            >
              <img src="/images/dog-login.svg" height={200} />
              <Typography mt={2} fontWeight={500}>
                No Conversations Yet
              </Typography>
            </Box>
          )}
          {id &&
            data &&
            data.length > 0 &&
            data?.map((e) => (
              <Box
                key={`${e._id}`}
                sx={{
                  backgroundColor:
                    user._id === e.createdBy ? "#ffffff" : "#F0A65E",
                  padding: 2,
                  color: user._id !== e.createdBy ? "#ffffff" : "black",
                  fontWeight: 500,
                  my: 1,
                  ml: user._id === e.createdBy ? "15%" : 2,
                  mr: user._id === e.createdBy ? 2 : "15%",
                }}
              >
                {`${e.text}`}
              </Box>
            ))}
          <Box mt={2} />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        p={1}
        sx={{ backgroundColor: "white" }}
      >
        <TextField
          id="outlined-basic"
          sx={{ width: "100%", backgroundColor: "white" }}
          value={text}
          onChange={(c) => setText(c.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Box ml={1} mt={0.2} onClick={sendMessage}>
          <img src="/icons/video_call/send_btn.svg" />
        </Box>
      </Box>
    </Dialog>
  );
}

export default ConsultationChatDialog;
