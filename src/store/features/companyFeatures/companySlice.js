import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: {},
    projectsList: [],
    companyName: "",
    tasksList: [],
    employees: [],
  },
  reducers: {
    setCompanyProjectsList: (state, action) => {
      state.projectsList = [...state.projectsList, action.payload];
    },
    setCompanyTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    setCompanyEmployees: (state, action) => {
      state.employees = action.payload;
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
    editProject: (state, action) => {
      const index = state.projectsList.findIndex(
        (project) => project.serializedId === action.payload.serializedId
      );
      if (index !== -1) {
        state.projectsList[index] = action.payload;
      }
    },
    deleteProjectFromStore: (state, action) => {
      state.projectsList = state.projectsList.filter(
        (project) => project.serializedId !== action.payload
      );
      state.tasksList = state.tasksList.filter(
        (task) => task.projectId !== action.payload
      );
    },
    deleteTask: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.serializedId !== action.payload
      );
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
  setCompanyEmployees,
  addTask,
  editTask,
  editProject,
  deleteProjectFromStore,
  deleteTask,
} = companySlice.actions;

export default companySlice.reducer;
