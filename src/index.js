import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./pages/layout";
import WelcomePage from "./pages/welcomePage";
import Register from "./pages/Register";
import AboutUs from "./pages/aboutUs";
import ErrorPage from "./pages/404";
import LoginPage from "./pages/Login";
import DashboardLayout from "./pages/dashboardLayout";
import DashboardMainPage from "./pages/dashboard/mainPage";
//import "./styles/index.scss";
import "./index.css";
import store from "./store/store";
import TasksPage from "./pages/dashboard/tasksPage";
import MainPageProjectCreationWizzard from "./components/MainPage/MainPageProjectCreationWizzard";
import StepOne from "./components/MainPage/ProjectCreationWizzard/StepOne";
import StepTwo from "./components/MainPage/ProjectCreationWizzard/StepTwo";
import StepThree from "./components/MainPage/ProjectCreationWizzard/StepThree";
import Summary from "./components/MainPage/ProjectCreationWizzard/Summary";
import Finalize from "./components/MainPage/ProjectCreationWizzard/Finalize";

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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path="project-creation-wizzard"
              element={<MainPageProjectCreationWizzard />}
            >
              <Route index element={<StepOne />} />
              <Route path="step-two" element={<StepTwo />} />
              <Route path="step-three" element={<StepThree />} />
              <Route path="summary" element={<Summary />} />
              <Route path="finalize" element={<Finalize />} />
            </Route>
            <Route index element={<DashboardMainPage />} />
            <Route path="tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
