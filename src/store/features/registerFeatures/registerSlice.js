import { createSlice } from "@reduxjs/toolkit";

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    user_name: "",
    email: "",
    password: "",
    company_name: "",
    registerResponseMessageAfterRequest: "",
    isSpinnerLoading: false,
  },
  reducers: {
    setSpinnerLoading: (state, action) => {
      state.isSpinnerLoading = action.payload;
    },
  },
});

export const { setSpinnerLoading } = RegisterSlice.actions;

export default RegisterSlice.reducer;
