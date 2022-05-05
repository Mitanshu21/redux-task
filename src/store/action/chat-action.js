import { chatActions } from "../slice/chat-slice";
import { CHAT_DATA } from "../../firebase-url";

export const chatAddConversation = (conversation) => {
  return (dispatch) => {
    dispatch(chatActions.addConversation(conversation));
  };
};

export const chatAddUser = (user) => {
  return (dispatch) => {
    dispatch(chatActions.addUser(user));
  };
};

export const fetchChatData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(CHAT_DATA);

      if (!response.ok) {
        throw new Error("Could not fetch chat data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const chatData = await fetchData();
      dispatch(
        chatActions.replaceChat({
          users: chatData.users,
          conversations: chatData.conversations,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendChatData = (chat) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(CHAT_DATA, {
        method: "PUT",
        body: JSON.stringify({
          users: chat.users,
          conversations: chat.conversations,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending chat data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
