import {
  ERR_EMAIL_NOT_EXISTS_ON_LOGIN,
  ERR_PASSWORD_DOES_NOT_MATCH_ON_LOGIN,
  ERR_USR_EXISTS,
  SUCCESS_USR_EXISTS,
  API_ERROR_USERNAME_ALREADY_EXIST_ON_REGISTER,
  API_ERROR_PASSWORD_MUST_CONTAIN_SPEC_CHARACTER,
  ERR_NOT_IDENTIFIED,
  API_SUCCESS_REGISTER_MESSAGE,
  API_ERROR_LOGIN_INVALID_EMAIL_OR_PASSWORD,
  TASK_COMPLETED_MESSAGE,
  TASK_DELETED_MESSAGE,
  TASK_IN_PROGRESS_MESSAGE,
  ROLE_SFTWR,
  ROLE_LEAD,
  ROLE_QA,
  API_ROUTE_DEV,
  API_COMPANYID_TESTING,
  API_PATH_GET_COMPANY_BY_ID,
  API_PATH_TASKS,
} from "../constants/constants";
import { temp_userList } from "../constants/database";
import {
  getCompanyEmployeesFromAPI,
  performGetRequestToApi,
} from "./apiFunctions";
import companySlice, {
  fullFillCompanyData,
  setCompanyEmployees,
  setCompanyProjectsList,
  setCompanyTasksList,
} from "../store/features/companyFeatures/companySlice";
import store from "../store/store";

const dataset = temp_userList;

export function checkUsernameAvailability(incomingData) {
  if (dataset.some((item) => item.user_name === incomingData.user_name)) {
    return ERR_USR_EXISTS;
  } else {
    return SUCCESS_USR_EXISTS;
  }
}

export function userLoginLogic(incomingData) {
  // CHECK if user is existing

  let userToReturn = {};

  if (dataset.some((item) => item.email === incomingData.email)) {
    if (
      dataset.some((item) => {
        return (
          item.password === incomingData.password &&
          item.email === incomingData.email
        );
      })
    ) {
      userToReturn = dataset.find((item) => item.email === incomingData.email);
      return userToReturn; // Return true if login is successful
    } else {
      return ERR_PASSWORD_DOES_NOT_MATCH_ON_LOGIN;
    }
  } else {
    return ERR_EMAIL_NOT_EXISTS_ON_LOGIN;
  }
}

export function classifyResponseTypeOnRegister(incomingResponse) {
  switch (incomingResponse) {
    case API_ERROR_USERNAME_ALREADY_EXIST_ON_REGISTER:
      return 1;
    case API_ERROR_PASSWORD_MUST_CONTAIN_SPEC_CHARACTER:
      return 2;
    default:
      return 0;
  }
}

export function classifyResponseMessageOnRegister(incomingData) {
  switch (incomingData) {
    case 0:
      return API_SUCCESS_REGISTER_MESSAGE;
    case 1:
      return API_ERROR_USERNAME_ALREADY_EXIST_ON_REGISTER;
    case 2:
      return API_ERROR_PASSWORD_MUST_CONTAIN_SPEC_CHARACTER;
    default:
      return ERR_NOT_IDENTIFIED;
  }
}

export function classifyResponseTypeOnLogin(incomingResponse) {
  switch (incomingResponse) {
    case API_ERROR_LOGIN_INVALID_EMAIL_OR_PASSWORD:
      return 1;
    default:
      return ERR_NOT_IDENTIFIED;
  }
}

export function classifyResponseMessageOnLogin(incomingData) {
  switch (incomingData) {
    case API_ERROR_LOGIN_INVALID_EMAIL_OR_PASSWORD:
      return 1;
  }
}

export async function simulateDelay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function defineStatusContainerColor(status) {
  switch (status) {
    case TASK_COMPLETED_MESSAGE:
      return "completed";
    case TASK_IN_PROGRESS_MESSAGE:
      return "in_progress";
    case TASK_DELETED_MESSAGE:
      return "deleted";
    default:
      return "";
  }
}

export function definePersonRoleContainerColor(role) {
  switch (role) {
    case ROLE_SFTWR:
      return "sftwr";
    case ROLE_LEAD:
      return "lead";
    case ROLE_QA:
      return "qa";
    default:
      return "";
  }
}

export async function loadCompanyProjectsFromAPI() {
  const connectionString =
    API_ROUTE_DEV +
    API_PATH_GET_COMPANY_BY_ID +
    API_COMPANYID_TESTING +
    "/projects";

  const result = await performGetRequestToApi(connectionString);

  if (result.data) {
    result.data.forEach((item) => {
      console.log(item);
      store.dispatch(setCompanyProjectsList(item));
    });
  }
}

export async function getProjectTasksFromAPI(id) {
  const connectionString = API_ROUTE_DEV + API_PATH_TASKS;

  const result = await performGetRequestToApi(connectionString);

  if (result.data) {
    const filteredTasks = result.data.filter((item) => item.projectId === id);
    store.dispatch(setCompanyTasksList(filteredTasks));
  }
}

export async function loadCompanyTasksFromAPI() {
  const connectionString = API_ROUTE_DEV + API_PATH_TASKS;

  const result = await performGetRequestToApi(connectionString);
  if (result.data) {
    const currentDate = new Date();
    const updatedData = result.data.map((task) => {
      const dueDate = new Date(task.dueDate);
      let statusId = task.statusId;

      if (dueDate < currentDate) {
        statusId = "in_progress";
      } else {
        statusId = Math.random() > 0.1 ? "completed" : "in_progress";
      }

      return {
        ...task,
        statusId,
      };
    });

    store.dispatch(setCompanyTasksList(updatedData));
  }
}

export async function loadCompanyUsersFromAPI() {
  const result = await getCompanyEmployeesFromAPI();

  if (result) {
    store.dispatch(setCompanyEmployees(result));
  }
}

export async function handleAppReload() {
  const connectionString =
    API_ROUTE_DEV + API_PATH_GET_COMPANY_BY_ID + API_COMPANYID_TESTING;
  let company_response = await performGetRequestToApi(connectionString);
  if (company_response.status === 200) {
    localStorage.setItem("company_data", company_response.data[0]);
    store.dispatch(fullFillCompanyData(company_response.data));
    await loadCompanyProjectsFromAPI();
    await loadCompanyTasksFromAPI();
  }
}
