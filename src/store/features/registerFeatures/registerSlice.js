import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    user_name: "",
    email: "",
    password: "",
    company_name: "",
    isSpinnerLoading: false,
  },
  reducers: {
    saveRegisterData: (state, action) => {
      state.email = action.payload.email;
      state.user_name = action.payload.user_name;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.company_name = action.payload.company_name;
    },

    setSpinnerLoading: (state, action) => {
      state.isSpinnerLoading = action.payload;
    },
  },
});

export const { saveRegisterData, setSpinnerLoading } = RegisterSlice.actions;

export default RegisterSlice.reducer;
