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
} from "../constants/constants";
import { temp_userList } from "../constants/database";

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
      return "inProgress";
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
