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

    setUserData: (state, action) => {
      if (action.payload.userActionPerformed === "login") {
        state.isUserLoggedIn = true;
        state.user_name = action.payload.user_name;
        state.company_name = action.payload.company_name;
      } else if (action.payload.userActionPerformed === "logout") {
        state.isUserLoggedIn = false;
        state.user_name = "";
        state.company_name = "";
      }
    },
  },
});

export const { setSpinnerLoadingTrue, setSpinnerLoadingFalse, setUserData } =
  globalSlice.actions;

export default globalSlice.reducer;
