import { Outlet, Link } from "react-router-dom";
import "../styles/pages/layout/index.scss";
import PersonIcon from "@mui/icons-material/Person";

const Layout = () => {
  return (
    <>
      <div className="layout_main">
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
        <div className="layout_main_identification">
          <div className="layout_main_identification_section">
            <PersonIcon />
            <Link to="/register">Register</Link>
          </div>
          <div className="layout_main_identification_section">
            <PersonIcon />
            <Link to="/register">Login</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
