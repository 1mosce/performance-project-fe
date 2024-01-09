import { useDispatch, useSelector } from "react-redux";
import {
  saveRegisterData,
  setSpinnerLoading,
} from "../store/features/registerFeatures/registerSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/register/index.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { setUserData } from "../store/features/globalFeatures/globalSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      password: e.target.password.value,
      name: e.target.name.value,
      company_name: e.target.company_name.value,
    };
    await delay(500);
    dispatch(setUserData(data));
    dispatch(setSpinnerLoading(false));
    navigate("/");
  }

  return (
    <div className="register_main">
      {isSpinnerLoading ? (
        <CircularProgress />
      ) : (
        <div className="register_main_block">
          <form onSubmit={handleSubmit}>
            <span>Register to our services today</span>
            <TextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              name="email"
              required
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              required
            />
            <TextField
              id="outlined-basic"
              label="Full name"
              variant="outlined"
              name="name"
              required
            />
            <TextField
              id="outlined-basic"
              label="Company name"
              variant="outlined"
              name="company_name"
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
