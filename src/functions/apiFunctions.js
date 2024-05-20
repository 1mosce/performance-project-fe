import axios from "axios";
import {
  API_COMPANYID_TESTING,
  API_PATH_GET_COMPANY_BY_ID,
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
