import { useDispatch, useSelector } from "react-redux";
import { setSpinnerLoading } from "../store/features/registerFeatures/registerSlice";
import "../styles/pages/register/index.scss";
import { Button, CircularProgress, TextField, Snackbar } from "@mui/material";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  API_PATH_LOGIN,
  API_ROUTE_DEV,
  LOGIN_SUCCESS,
} from "../constants/constants";
import { signInRequest } from "../functions/apiFunctions";
import {
  classifyResponseMessageOnLogin,
  classifyResponseTypeOnLogin,
  simulateDelay,
} from "../functions/functions";
import { hybernateUserInformation } from "../store/features/signInFeatures/signInSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldNumberError, setFieldErrorNumber] = useState();

  const isSpinnerLoading = useSelector(
    (state) => state.register.isSpinnerLoading
  );

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(setSpinnerLoading(true));

    let connectionString = API_ROUTE_DEV + API_PATH_LOGIN;
    let payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    let response = await signInRequest(connectionString, payload);

    if (!response.data.success) {
      let scenario = classifyResponseTypeOnLogin(response);
      setErrorMessage(classifyResponseMessageOnLogin(scenario));
      await simulateDelay(500);
      setFieldErrorNumber(scenario);
      dispatch(setSpinnerLoading(false));
      return;
    } else {
      localStorage.setItem("token", response.data.accessToken);
      dispatch(hybernateUserInformation(response.data));
      setErrorMessage(LOGIN_SUCCESS);
      await simulateDelay(500);
      dispatch(setSpinnerLoading(false));
      navigate("/");
    }

    // let data = {
    //   userActionPerformed: "login",
    //   email: e.target.email.value,
    //   password: e.target.password.value,
    // };

    // let response = userLoginLogic(data);

    // if (response === ERR_EMAIL_NOT_EXISTS_ON_LOGIN) {
    //   setErrorMessage(response);
    //   setFieldErrorNumber(1);
    //   await delay(500);
    //   dispatch(setSpinnerLoading(false));
    //   return;
    // } else if (response === ERR_PASSWORD_DOES_NOT_MATCH_ON_LOGIN) {
    //   setErrorMessage(response);
    //   setFieldErrorNumber(2);
    //   await delay(500);
    //   dispatch(setSpinnerLoading(false));
    //   return;
    // } else {
    //   response = {
    //     ...response,
    //     userActionPerformed: "login",
    //   };
    //   dispatch(setUserData(response));
    //   await delay(1500);
    //   dispatch(setSpinnerLoading(false));
    //   navigate("/");
    // }

    // await delay(500);
  }

  return (
    <div className="register_main">
      {isSpinnerLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSpinnerLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="register_main_block">
          <form onSubmit={handleSubmit}>
            <Snackbar
              open={errorMessage != ""}
              autoHideDuration={6000}
              message={errorMessage}
            />
            <span>Login to our services</span>
            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              name="email"
              required
              error={fieldNumberError === 1}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              error={fieldNumberError === 2}
              name="password"
              required
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
