import { createSlice } from "@reduxjs/toolkit";

export const projectCreationWizzardSlice = createSlice({
  name: "projectCreationWizzard",
  initialState: {
    project_name: "project name",
    project_description: "project description",
    project_start_date: "10/05/2024",
    project_end_date: "12/05/2024",
    indefiniteChecked: false,
    project_mainMethodology: "Kanban",
    project_employeeCount: "10+",
  },
  reducers: {
    setNewProjectData: (state, action) => {
      state.project_name = action.payload.project_name;
      state.project_description = action.payload.project_description;
      state.project_start_date = action.payload.project_start_date;
      state.project_end_date = action.payload.project_end_date;
      state.indefiniteChecked = action.payload.indefiniteChecked;
    },
    setProjectMainMethodology: (state, action) => {
      state.project_mainMethodology = action.payload;
    },
    setProjectEmployeeCount: (state, action) => {
      state.project_employeeCount = action.payload;
    },
    updateProjectValueOnSummary: (state, action) => {
      switch (action.payload.type) {
        case "project_name":
          state.project_name = action.payload.value;
          break;
        case "project_description":
          state.project_description = action.payload.value;
          break;
        case "project_start_date":
          state.project_start_date = action.payload.value;
          break;
        case "project_end_date":
          state.project_end_date = action.payload.value;
          break;
        case "indefiniteChecked":
          state.indefiniteChecked = action.payload.value;
          break;
        case "project_mainMethodology":
          state.project_mainMethodology = action.payload.value;
          break;
        case "project_employeeCount":
          state.project_employeeCount = action.payload.value;
          break;
        default:
          console.error(`Unhandled action type: ${action.payload.type}`);
      }
    },
  },
});

export const {
  setNewProjectData,
  setProjectMainMethodology,
  setProjectEmployeeCount,
  updateProjectValueOnSummary,
} = projectCreationWizzardSlice.actions;

export default projectCreationWizzardSlice.reducer;
