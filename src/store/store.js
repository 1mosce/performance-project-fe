import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/registerFeatures/registerSlice";

export default configureStore({
  reducer: {
    register: registerSlice,
  },
});
