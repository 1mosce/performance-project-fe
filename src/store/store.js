import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/registerFeatures/registerSlice";
import globalSlice from "./features/globalFeatures/globalSlice";
import SignInSlice from "./features/signInFeatures/signInSlice";
import companySlice from "./features/companyFeatures/companySlice";
import projectCreationWizzardSlice from "./features/projectCreationWizzardFeatures/projectCreationWizzardSlice";

export default configureStore({
  reducer: {
    register: registerSlice,
    signIn: SignInSlice,
    global: globalSlice,
    company: companySlice,
    projectCreationWizzard: projectCreationWizzardSlice,
  },
});
