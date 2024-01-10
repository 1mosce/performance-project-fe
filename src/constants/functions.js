import {
  ERR_EMAIL_NOT_EXISTS_ON_LOGIN,
  ERR_PASSWORD_DOES_NOT_MATCH_ON_LOGIN,
  ERR_USR_EXISTS,
  SUCCESS_USR_EXISTS,
} from "./constants";
import { temp_userList } from "./database";

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
