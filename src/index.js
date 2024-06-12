import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "./pages/layout";
import WelcomePage from "./pages/welcomePage";
import Register from "./pages/Register";
import AboutUs from "./pages/aboutUs";
import ErrorPage from "./pages/404";
import LoginPage from "./pages/Login";
import DashboardLayout from "./pages/dashboardLayout";
import DashboardMainPage from "./pages/dashboard/mainPage";
import "./index.css";
import store from "./store/store";
import TasksPage from "./pages/dashboard/tasksPage";
import MainPageProjectCreationWizzard from "./components/MainPage/MainPageProjectCreationWizzard";
import StepOne from "./components/MainPage/ProjectCreationWizzard/StepOne";
import StepTwo from "./components/MainPage/ProjectCreationWizzard/StepTwo";
import StepThree from "./components/MainPage/ProjectCreationWizzard/StepThree";
import Summary from "./components/MainPage/ProjectCreationWizzard/Summary";
import Finalize from "./components/MainPage/ProjectCreationWizzard/Finalize";
import ProjectPage from "./pages/project/projectPage";
import Projects from "./pages/project/projects";
import Statistics from "./pages/reports/StatisticsPage";
import { useEffect } from "react";
import {
  API_ROUTE_DEV,
  API_PATH_GET_COMPANY_BY_ID,
  API_COMPANYID_TESTING,
} from "./constants/constants";
import { fullFillCompanyData } from "./store/features/companyFeatures/companySlice";
import {
  loadCompanyProjectsFromAPI,
  loadCompanyTasksFromAPI,
  loadCompanyUsersFromAPI,
} from "./functions/functions";
import { performGetRequestToApi } from "./functions/apiFunctions";

function App() {
  const { companyData } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(companyData).length === 0) {
      fetchData();
    }

    async function fetchData() {
      const connectionString =
        API_ROUTE_DEV + API_PATH_GET_COMPANY_BY_ID + API_COMPANYID_TESTING;
      let company_response = await performGetRequestToApi(connectionString);
      if (company_response.status === 200) {
        localStorage.setItem("company_data", company_response.data[0]);
        dispatch(fullFillCompanyData(company_response.data));
        await loadCompanyProjectsFromAPI();
        await loadCompanyTasksFromAPI();
        await loadCompanyUsersFromAPI();
      }
    }
  }, []);

  return (
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
          <Route path="project/:serializedId" element={<ProjectPage />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
