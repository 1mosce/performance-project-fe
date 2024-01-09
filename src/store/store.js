import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import registerSlice from "./features/registerFeatures/registerSlice";
import globalSlice from "./features/globalFeatures/globalSlice";

export default configureStore({
  reducer: {
    register: registerSlice,
    global: globalSlice,
  },
});
