import { useDispatch, useSelector } from "react-redux";
import { setSpinnerLoading } from "../store/features/registerFeatures/registerSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/register/index.scss";
import { Button, CircularProgress, TextField, Snackbar } from "@mui/material";
import { setUserData } from "../store/features/globalFeatures/globalSlice";
import { checkUsernameAvailability } from "../constants/functions";
import { ERR_USR_EXISTS } from "../constants/constants";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldNumberError, setFieldErrorNumber] = useState();

  const isSpinnerLoading = useSelector(
    (state) => state.register.isSpinnerLoading
  );

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(setSpinnerLoading(true));

    const data = {
      userActionPerformed: "login",
      email: e.target.email.value,
      user_name: e.target.user_name.value,
      password: e.target.password.value,
      name: e.target.name.value,
      company_name: e.target.company_name.value,
    };

    const check_result = checkUsernameAvailability(data);

    if (check_result === ERR_USR_EXISTS) {
      setErrorMessage(ERR_USR_EXISTS);
      setFieldErrorNumber(2);
      dispatch(setSpinnerLoading(false));
      return;
    }
    await delay(500);

    dispatch(setUserData(data));
    dispatch(setSpinnerLoading(false));

    navigate("/");
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
              label="Username"
              variant="outlined"
              name="user_name"
              error={fieldNumberError === 2}
              required
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              error={fieldNumberError === 3}
              name="password"
              required
            />
            <TextField
              id="outlined-basic"
              label="Full name"
              variant="outlined"
              error={fieldNumberError === 4}
              name="name"
              required
            />
            <TextField
              id="outlined-basic"
              label="Company name"
              variant="outlined"
              name="company_name"
              error={fieldNumberError === 5}
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
