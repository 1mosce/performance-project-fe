import "../../styles/pages/dashboard/mainPage/index.scss";
import { CircularProgress, Container, Button } from "@mui/material";
import MainPageProjectsContainer from "../../components/MainPage/MainPageProjectsContainer";
import { useEffect, useState } from "react";
import { simulateDelay } from "../../functions/functions";
import { dev_companyLastUpdatedTasks } from "../../constants/database";
import { Navigate, useNavigate } from "react-router-dom";
import MainPageTasksContainer from "../../components/MainPage/MainPageTasksContainer";
import MainPageProjectCreationWizzard from "../../components/MainPage/MainPageProjectCreationWizzard";
import { useDispatch, useSelector } from "react-redux";

function DashboardMainPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyProjectsList, setCompanyProjectsList] = useState([]);

  const companyProjectsList_toSet = useSelector(
    (state) => state.company.projectsList
  );

  useEffect(() => {
    async function fetchDataAndNavigate() {
      setIsLoading(true);
      await simulateDelay(3000);
      setCompanyProjectsList(companyProjectsList_toSet);
      setIsLoading(false);
      if (companyProjectsList_toSet.length === 0) {
        navigate("/dashboard/project-creation-wizzard");
      }
    }
    fetchDataAndNavigate();
  }, [companyProjectsList_toSet, navigate]);
  return (
    <Container maxWidth="lg">
      <>
        <div className="dashboardMainPage_welcomeText">
          <h2 className="dashboardMainPage_welcomeText_title">Welcome back</h2>
          <h3 className="dashboardMainPage_welcomeText_span">
            On-going projects in Company Name
          </h3>
        </div>
        <div className="dashboardMainPage_companyItemsShowcase">
          {isLoading ? (
            <CircularProgress />
          ) : (
            companyProjectsList?.map((item) => (
              <MainPageProjectsContainer project={item} />
            ))
          )}
        </div>
        <h3 className="dashboardMainPage_welcomeText_span">
          Latest Updated Tasks
        </h3>
        <div className="dashboardMainPage_companyItemsShowcase">
          {isLoading ? (
            <CircularProgress />
          ) : (
            dev_companyLastUpdatedTasks.map((item) => (
              <MainPageTasksContainer task={item} />
            ))
          )}
        </div>
      </>
    </Container>
  );
}

export default DashboardMainPage;
