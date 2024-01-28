import { createSlice } from "@reduxjs/toolkit";
import { FALSE } from "sass";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    isUserLoggedIn: false,
    user_name: "",
    company_name: "",
    user_role: "",
    isSpinnerLoading: false,
    userActionPerformed: "",
  },
  reducers: {
    setSpinnerLoadingTrue: (state) => {
      state.isSpinnerLoading = true;
    },

    setSpinnerLoadingFalse: (state) => {
      state.isSpinnerLoading = false;
    },

    setUserData: (state) => {
      state.isUserLoggedIn = true;
      state.user_name = "1mosce";
      state.company_name = "test company";
      state.user_role = "owner";
    },

    unsetUserData: (state) => {
      state.isUserLoggedIn = false;
      state.user_name = "";
      state.company_name = "";
      state.user_role = "";
    },
  },
});

export const {
  setSpinnerLoadingTrue,
  setSpinnerLoadingFalse,
  setUserData,
  unsetUserData,
} = globalSlice.actions;

export default globalSlice.reducer;
