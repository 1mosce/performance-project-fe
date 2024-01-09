import { useSelector, useDispatch } from "react-redux";
import store from "../store/store";
import "../styles/pages/welcomePage/index.scss";

const WelcomePage = () => {
  const isLogined = useSelector((state) => state.global.user_name);

  return (
    <div className="welcomePage_main">
      <h1>Welcome to our services!</h1>
      {isLogined === "" ? (
        <h2>You are not logined! Please login!</h2>
      ) : (
        <h2>Welcome, {isLogined}</h2>
      )}
    </div>
  );
};

export default WelcomePage;
