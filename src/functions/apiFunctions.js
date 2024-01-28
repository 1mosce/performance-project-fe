import axios from "axios";

export async function compareAccessTokens(accessToken) {
  //MAKE A REQUEST TO VALIDATE LIFE OF ACCESS TOKEN
  //FOR TEST - STAY AT TRUE

  return true;
}

export async function signInRequest(connectionString, payload) {
  return await axios.post(connectionString, payload).catch((error) => {
    return error.response.data;
  });
}

export async function registerNewUserRequest(connectionString, payload) {
  return await axios.post(connectionString, payload).catch((error) => {
    return error.response.data;
  });
}
