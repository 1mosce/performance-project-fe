import { useSelector, useDispatch } from "react-redux";
import "../styles/pages/welcomePage/index.scss";
import { useEffect } from "react";
import { compareAccessTokens } from "../functions/apiFunctions";
import { setUserData } from "../store/features/globalFeatures/globalSlice";
import { Divider } from "@mui/material";

const WelcomePage = () => {
  const dispatch = useDispatch();

  const user_name = useSelector((state) => state.global.user_name);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    async function fetchToken() {
      if (userToken !== "" && userToken != null) {
        const compareResult = await compareAccessTokens(userToken);
        if (!compareResult) {
          localStorage.removeItem("token");
        } else {
          dispatch(setUserData());
        }
      }
    }
    fetchToken();
  }, [userToken]);

  return (
    <div className="welcomePage_main">
      <h1>Welcome to our services!</h1>
      <Divider />
      {user_name === "" ? (
        <h2>You are not logined! Please login!</h2>
      ) : (
        <h2>Welcome, {user_name}</h2>
      )}
    </div>
  );
};

export default WelcomePage;
