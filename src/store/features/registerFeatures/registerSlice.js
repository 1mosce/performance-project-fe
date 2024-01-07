import { createSlice } from "@reduxjs/toolkit";

export const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    email: "",
    password: "",
  },
  reducers: {
    saveRegisterData: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
    },
  },
});

export const { saveRegisterData } = RegisterSlice.actions;

export default RegisterSlice.reducer;
