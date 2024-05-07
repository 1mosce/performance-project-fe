import { useDispatch, useSelector } from "react-redux";
import "../styles/pages/register/index.scss";
import { Button, CircularProgress, TextField, Snackbar } from "@mui/material";
import {} from "../constants/constants";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { setSpinnerLoading } from "../store/features/registerFeatures/registerSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/register/index.scss";
import { registerNewUserRequest } from "../functions/apiFunctions";
import { API_PATH_REGISTER, API_ROUTE_DEV } from "../constants/constants";

import {
  classifyResponseMessageOnRegister,
  classifyResponseTypeOnRegister,
  simulateDelay,
} from "../functions/functions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldNumberError, setFieldErrorNumber] = useState();

  let isSpinnerLoading = useSelector(
    (state) => state.register.isSpinnerLoading
  );

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(setSpinnerLoading(true));

    let connectionString = API_ROUTE_DEV + API_PATH_REGISTER;

    let data = {
      email: e.target.email.value,
      username: e.target.username.value,
      name: e.target.name.value,
      password: e.target.password.value,
      confirmPassword: e.target.password.value,
    };

    const response = await registerNewUserRequest(connectionString, data);

    const scenario = classifyResponseTypeOnRegister(response);

    //ERROR HANDLING

    if (scenario > 0) {
      setErrorMessage(classifyResponseMessageOnRegister(scenario));
      await simulateDelay(500);
      setFieldErrorNumber(scenario);
      dispatch(setSpinnerLoading(false));
      return;
    }
    //SUCCESS HANDLING
    else {
      setErrorMessage(classifyResponseMessageOnRegister(scenario));
      await simulateDelay(500);
      dispatch(setSpinnerLoading(false));
      navigate("/login");
    }
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
              open={errorMessage !== ""}
              autoHideDuration={6000}
              message={errorMessage}
            />
            <span>Register to our services today</span>
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
            <TextField
              id="outlined-basic"
              label="Full name"
              variant="outlined"
              error={fieldNumberError === 3}
              name="name"
              required
            />
            <TextField
              id="outlined-basic"
              label="User name"
              variant="outlined"
              error={fieldNumberError === 4}
              name="username"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
