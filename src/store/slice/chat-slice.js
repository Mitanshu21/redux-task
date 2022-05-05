import { createSlice } from "@reduxjs/toolkit";

const initialChat = {
  users: [],
  conversations: [],
  changed: false,
};

const chatSlice = createSlice({
  name: "conversation",
  initialState: initialChat,
  reducers: {
    replaceChat(state, action) {
      state.users = action.payload.users;
      state.conversations = action.payload.conversations;
    },
    addConversation(state, action) {
      const newItem = action.payload;
      const index = state.conversations.findIndex(
        (item) =>
          (item.usr1_email === newItem[0].usr1_email ||
            item.usr2_email === newItem[0].usr1_email) &&
          (item.usr2_email === newItem[0].usr2_email ||
            item.usr1_email === newItem[0].usr2_email)
      );

      if (index !== -1) {
        state.conversations[index].message.unshift(newItem[0].message[0]);
      } else {
        state.conversations.push(newItem[0]);
      }
      state.changed = true;
    },
    addUser(state, action) {
      state.users.push(action.payload);
      state.changed = true;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
