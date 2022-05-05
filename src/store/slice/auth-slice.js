import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: {},
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    loading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
