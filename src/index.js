import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./pages/layout";
import WelcomePage from "./pages/welcomePage";
import Register from "./pages/Register";
import AboutUs from "./pages/aboutUs";
import ErrorPage from "./pages/404";
//import "./styles/index.scss";
import "./index.css";
import store from "./store/store";
import LoginPage from "./pages/Login";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
