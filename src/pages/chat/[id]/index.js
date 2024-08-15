import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { addCommonData, getData } from "../../../apis/common";
import { toast } from "react-toastify";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import SpinnerLoader from "@/components/SpinnerLoader";
import moment from "moment";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async () => {
    try {
      setLoading(true);
      const data = await getData(
        -1,
        -0,
        `help-center/support-chat?supportTicket=${id}&$sort[createdAt]=1`
      );
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getMessages();
    }
  }, [id]);

  const getUser = () => {
    const _user = JSON.parse(localStorage.getItem("vitmedsDoctorUser"));
    if (_user) {
      console.log(_user);
      setUser(_user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    try {
      setSendLoading(true);
      const response = await addCommonData(
        {
          supportTicket: id,
          message: message,
        },
        "help-center/support-chat"
      );
      console.log(response);
      const _data = [...data];
      const newData = [..._data, response];
      setData([...newData]);
      setMessage("");
      setSendLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setSendLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col justify-between border rounded-xl p-3">
      <div className="w-full flex-grow flex flex-col space-y-2 overflow-y-auto scrollbar-none">
        {data?.map((message, index) => (
          <div
            key={index}
            className={
              message?.createdBy === user?._id ? "self-end" : "self-start"
            }
          >
            <div
              key={index}
              className={
                message?.createdBy === user?._id
                  ? "bg-bluePrimary text-white w-full max-w-4xl py-2 px-5 rounded-md "
                  : "bg-green-400 text-white w-full  max-w-4xl py-2 px-5 rounded-md self-start"
              }
            >
              <div className="">{message?.message}</div>
            </div>
            <div
              className={
                message?.createdBy === user?._id
                  ? "text-xs text-right text-gray-500"
                  : "text-xs text-left text-gray-500"
              }
            >
              {moment(message?.createdAt).format("HH:mm")}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={sendMessageHandler}
        className="flex justify-between items-end space-x-3 w-full"
      >
        <input
          className="flex-1 h-12 rounded-xl border px-5 outline-none border-gray-300 shadow"
          placeholder="Enter your Message"
          name="Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="w-32">
          <button className="flex justify-center px-5 h-12 rounded-xl bg-bluePrimary text-white hover:bg-indigo-900 items-center w-full">
            {sendLoading ? <SpinnerLoader color="white" /> : <div>Send</div>}
            <PaperAirplaneIcon className="w-4 ml-3 text-white rotate-90" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
