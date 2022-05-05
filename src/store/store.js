import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import chatSlice from "./slice/chat-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
