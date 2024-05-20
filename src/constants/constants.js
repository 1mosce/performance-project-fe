//PERSON -> ROLES

export const ROLE_SFTWR = "SFTWR";
export const ROLE_LEAD = "LEAD";
export const ROLE_QA = "QA";

//TASKS -> STATUS MESSAGES

export const TASK_COMPLETED_MESSAGE = "Completed";
export const TASK_IN_PROGRESS_MESSAGE = "In progress";
export const TASK_DELETED_MESSAGE = "Deleted";

//PROJECT -> PROJECT CREATION WIZZARD MESSAGES

//ERROR MESSAGES
export const ERR_USR_EXISTS =
  "User with specified username already exists. Please choose another username, or try to login";
export const ERR_EMAIL_NOT_EXISTS_ON_LOGIN =
  "User with specified email does not exist";
export const ERR_PASSWORD_DOES_NOT_MATCH_ON_LOGIN =
  "Password is incorrect. Please try again with different password";

export const ERR_NOT_IDENTIFIED = "Unidentified error. Please try again later";

export const API_ERROR_USERNAME_ALREADY_EXIST_ON_REGISTER =
  "User already exists";

export const API_ERROR_PASSWORD_MUST_CONTAIN_SPEC_CHARACTER =
  "Create user failed Passwords must have at least one non alphanumeric character.";

export const API_ERROR_LOGIN_INVALID_EMAIL_OR_PASSWORD =
  "Invalid email or password";

export const ERR_PROJECT_NAME_INVALID = "Project name is invalid!";

export const ERR_PROJECT_DESCRIPTION_INVALID =
  "Project description is invalid!";

export const ERR_PROJECT_START_DATE_MISSING =
  "Project start date must be specified!";

export const ERR_PROJECT_END_DATE_MISSING =
  "Project end date must be specified";

//SUCCESS MESSAGES
export const SUCCESS_USR_EXISTS = "This username is available!";
export const API_SUCCESS_REGISTER_MESSAGE = "User registered successfully";
export const LOGIN_SUCCESS = "Login Success!";

//API ROUTE
export const API_ROUTE_DEV = "http://localhost:5181";

//API PATH
export const API_PATH_REGISTER = "/api/register";

export const API_PATH_LOGIN = "/api/login";

export const API_PATH_PROJECTS = "/api/projects";

export const API_PATH_TASKS = "/api/tasks";

export const API_PATH_GET_COMPANY_BY_ID = "/api/Companies/";

export const API_PATH_GET_PROJECTS_LIST = "";

export const API_COMPANYID_TESTING = "65e393721c16253e2068c04e";
