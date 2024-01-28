import { createSlice } from "@reduxjs/toolkit";

export const SignInSlice = createSlice({
  name: "signIn",
  initialState: {
    success: false,
    accessToken: "",
    email: "",
    userId: "",
    message: "",
  },
  reducers: {
    hybernateUserInformation: (state, action) => {
      let newState = action.payload;
      state = newState;
    },
  },
});

export const { hybernateUserInformation } = SignInSlice.actions;

export default SignInSlice.reducer;
