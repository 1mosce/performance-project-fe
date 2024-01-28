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

//SUCCESS MESSAGES
export const SUCCESS_USR_EXISTS = "This username is available!";
export const API_SUCCESS_REGISTER_MESSAGE = "User registered successfully";
export const LOGIN_SUCCESS = "Login Success!";

//API ROUTE
export const API_ROUTE_DEV = "http://localhost:5181";

//API PATH
export const API_PATH_REGISTER = "/register";

export const API_PATH_LOGIN = "/login";
