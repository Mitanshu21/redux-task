import React, { useState } from "react";
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import ReceiverMsg from "./ReceiverMsg";
import SenderMsg from "./SenderMsg";
import { chatAddConversation } from "../../../store/action/chat-action";
import ChatBox from "./ChatBox";
import ChatBoxDash from "./ChatBoxDash";

// return current time in 10:23 PM format
const getTime = () => {
  let time = new Date();
  let currentTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return currentTime;
};

function Chat() {
  const [msg, setMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const userData = useSelector((state) => state.auth.user);

  const allUsers = [...chatData.users];

  // filter loggedin user
  const users = allUsers.filter((e) => e.email !== userData.email);
  // get loggedin user
  const loggedInUser = allUsers.find((e) => e.email === userData.email);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.trim() === "") return;
    dispatch(
      chatAddConversation([
        {
          usr1_email: userData.email,
          usr2_email: selectedUser.email,
          message: [
            {
              time: getTime(),
              msg: msg.trim(),
              sender: userData.email,
              id: Date.now(),
            },
          ],
          changed: true,
        },
      ])
    );
    setMsg("");
  };

  const indexOfSelectedUsr = chatData.conversations.findIndex(
    (usr) =>
      (usr.usr2_email === selectedUser.email ||
        usr.usr1_email === selectedUser.email) &&
      (usr.usr1_email === userData.email || usr.usr2_email === userData.email)
  );

  const ChatListData =
    indexOfSelectedUsr === -1 ? (
      <p className="text-center">No chat history</p>
    ) : (
      (chatData.conversations[indexOfSelectedUsr].message || []).map((msg) => {
        if (msg.sender !== userData.email) {
          return <ReceiverMsg msg={msg.msg} time={msg.time} key={msg.id} />;
        } else {
          return <SenderMsg msg={msg.msg} time={msg.time} key={msg.id} />;
        }
      })
    );

  return (
    <div className="flex flex-col items-start justify-center w-full bg-gray-100 text-gray-800 p-5 sm:flex-col md:flex-row lg:flex-row">
      <SideBar
        loggedInUser={loggedInUser}
        usersList={users}
        selectedUser={selectedUser}
        changeSelectedUser={setSelectedUser}
      />

      {Object.keys(selectedUser).length > 0 && (
        <ChatBox
          ChatListData={ChatListData}
          msg={msg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {Object.keys(selectedUser).length === 0 && <ChatBoxDash />}
    </div>
  );
}

export default Chat;
