import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    projectsList: [],
    companyName: "",
    tasksList: [],
  },
  reducers: {
    setCompanyProjectsList: (state, action) => {
      state.projectsList.push(action.payload);
    },
  },
});

export const { setCompanyProjectsList } = companySlice.actions;

export default companySlice.reducer;
