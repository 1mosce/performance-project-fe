import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/registerFeatures/registerSlice";
import globalSlice from "./features/globalFeatures/globalSlice";
import SignInSlice from "./features/signInFeatures/signInSlice";

export default configureStore({
  reducer: {
    register: registerSlice,
    signIn: SignInSlice,
    global: globalSlice,
  },
});
