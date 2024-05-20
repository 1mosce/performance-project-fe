import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: {},
    projectsList: [],
    companyName: "",
    tasksList: [],
  },
  reducers: {
    setCompanyProjectsList: (state, action) => {
      state.projectsList = [...state.projectsList, action.payload];
    },
    setCompanyTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    addTask: (state, action) => {
      state.tasksList.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasksList.findIndex(
        (task) => task.serializedId === action.payload.serializedId
      );
      if (index !== -1) {
        state.tasksList[index] = action.payload;
      }
    },
    fullFillCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
  },
});

export const {
  setCompanyProjectsList,
  fullFillCompanyData,
  setCompanyTasksList,
  addTask,
  editTask,
} = companySlice.actions;

export default companySlice.reducer;
