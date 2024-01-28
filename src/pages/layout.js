import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/pages/layout/index.scss";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  setSpinnerLoadingFalse,
  setSpinnerLoadingTrue,
  setUserData,
  unsetUserData,
} from "../store/features/globalFeatures/globalSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSpinnerLoading = useSelector(
    (state) => state.global.isSpinnerLoading
  );
  const isUserLoggedIn = useSelector((state) => state.global.isUserLoggedIn);
  const user_name = useSelector((state) => state.global.user_name);

  const [dialogState, setDialogState] = useState(false);

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function handleLogout() {
    dispatch(setSpinnerLoadingTrue());

    dispatch(unsetUserData());

    localStorage.removeItem("token");

    await delay(3000);

    dispatch(setSpinnerLoadingFalse());

    window.location.reload(true);
  }

  return (
    <>
      <div className="layout_main">
        <Dialog
          open={dialogState}
          onClose={() => setDialogState(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm logout?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wanna logout? You will need to re-enter your
              credentials in order to access your profile again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialogState(false);
              }}
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleLogout();
                setDialogState(false);
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {isSpinnerLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isSpinnerLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <></>
        )}
        <div className="layout_main_nav">
          <ul className="layout_main_nav_list">
            <li className="layout_main_nav_list_option">
              <Link to="/">Home</Link>
            </li>
            <li className="layout_main_nav_list_option">
              <Link to="/about-us">About us</Link>
            </li>
          </ul>
        </div>
        {isUserLoggedIn ? (
          <div className="layout_main_identification">
            <div className="layout_main_identification_section">
              <PersonIcon />
              <Link to="/profile">Profile</Link>
            </div>
            <div className="layout_main_identification_section">
              <LogoutIcon />
              <Button
                onClick={() => {
                  setDialogState(true);
                }}
                variant="text"
              >
                Logout
              </Button>
            </div>
            <div className="layout_main_identification_section">
              Welcome, {user_name}
            </div>
          </div>
        ) : (
          <div className="layout_main_identification">
            <div className="layout_main_identification_section">
              <PersonIcon />
              <Link to="/register">Register</Link>
            </div>
            <div className="layout_main_identification_section">
              <PersonIcon />
              <Link to="/login">Login</Link>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
