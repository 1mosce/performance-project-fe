import axios from "axios";
import {
  API_COMPANYID_TESTING,
  API_PATH_GET_COMPANY_BY_ID,
  API_PATH_PROJECTS,
  API_PATH_TASKS,
  API_ROUTE_DEV,
} from "../constants/constants";

export async function compareAccessTokens(accessToken) {
  //MAKE A REQUEST TO VALIDATE LIFE OF ACCESS TOKEN
  //FOR TEST - STAY AT TRUE

  return true;
}

export async function performPostRequestToApi(connectionString, payload) {
  return await axios.post(connectionString, payload).catch((error) => {
    return error.response.data;
  });
}

export async function performGetRequestToApi(connectionString) {
  return await axios.get(connectionString).catch((error) => {
    return error.response.data;
  });
}

export async function performPutRequestToApi(connectionString, payload) {
  return await axios.put(connectionString, payload).catch((error) => {
    return error.response.data;
  });
}

export async function performDeleteRequestToApi(connectionString) {
  return await axios.delete(connectionString).catch((error) => {
    return error.response.data;
  });
}

export async function getCompanyEmployeesFromAPI() {
  const connectionString =
    API_ROUTE_DEV +
    API_PATH_GET_COMPANY_BY_ID +
    API_COMPANYID_TESTING +
    "/users";

  const result = await performGetRequestToApi(connectionString);
  return result.data;
}

export async function getCompanyProjectsFromAPI() {
  const connectionString =
    API_ROUTE_DEV +
    API_PATH_GET_COMPANY_BY_ID +
    API_COMPANYID_TESTING +
    "/projects";

  const result = await performGetRequestToApi(connectionString);
  return result.data;
}

export async function addNewCompanyProject(payload) {
  const connectionString = API_ROUTE_DEV + API_PATH_PROJECTS;

  const result = await performPostRequestToApi(connectionString, payload);
  return result.data;
}

export async function addNewTaskToProject(payload) {
  const connectionString = API_ROUTE_DEV + API_PATH_TASKS;

  const result = await performPostRequestToApi(connectionString, payload);
  return result.data;
}

export async function editProjectTask(payload, taskId) {
  const connectionString = API_ROUTE_DEV + API_PATH_TASKS + "/" + taskId;

  const result = await performPutRequestToApi(connectionString, payload);

  return result.status;
}

export async function editProjectInfo(projectId, payload) {
  const connectionString = API_ROUTE_DEV + API_PATH_PROJECTS + "/" + projectId;

  const result = await performPutRequestToApi(connectionString, payload);

  return result.status;
}

export async function deleteProject(projectId) {
  try {
    // Get all tasks
    const tasksResponse = await performGetRequestToApi(
      API_ROUTE_DEV + API_PATH_TASKS
    );
    const tasks = tasksResponse.data;

    // Filter tasks that belong to the given projectId
    const tasksToDelete = tasks.filter((task) => task.projectId === projectId);

    // Delete each task
    for (const task of tasksToDelete) {
      await performDeleteRequestToApi(
        `${API_ROUTE_DEV + API_PATH_TASKS}/${task.serializedId}`
      );
    }

    // Delete the project
    await performDeleteRequestToApi(
      `${API_ROUTE_DEV + API_PATH_PROJECTS}/${projectId}`
    );

    return 204;
  } catch (error) {
    console.error("Error deleting project and its tasks:", error);
  }
}
