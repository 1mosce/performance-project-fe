import "../../styles/pages/dashboard/mainPage/index.scss";
import { CircularProgress, Container, Button, Box } from "@mui/material";
import MainPageProjectsContainer from "../../components/MainPage/MainPageProjectsContainer";
import { useEffect, useState } from "react";
import { simulateDelay } from "../../functions/functions";
import { dev_companyLastUpdatedTasks } from "../../constants/database";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MainPageTasksContainer from "../../components/MainPage/MainPageTasksContainer";
import MainPageProjectCreationWizzard from "../../components/MainPage/MainPageProjectCreationWizzard";
import { useDispatch, useSelector } from "react-redux";
import AddProjectBlock from "../../components/ProjectsPage/AddProjectBlock";

function DashboardMainPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyProjectsList, setCompanyProjectsList] = useState([]);
  const [companyTasksList, setCompanyTasksList] = useState([]);

  const companyProjectsList_toSet = useSelector(
    (state) => state.company.projectsList
  );
  const tasksList = useSelector((state) => state.company.tasksList);
  const companyData = useSelector((state) => state.company.companyData);
  const companyTasksListSet = (value) => setCompanyTasksList(value);

  useEffect(() => {
    async function fetchDataAndNavigate() {
      setIsLoading(true);
      // await simulateDelay(1000);
      setCompanyProjectsList(companyProjectsList_toSet);
      setIsLoading(false);
      if (companyProjectsList_toSet.length === 0) {
        navigate("/dashboard/project-creation-wizzard");
      }
    }
    fetchDataAndNavigate();
  }, [companyProjectsList_toSet, navigate]);

  useEffect(() => {
    if (companyData) {
      console.log(companyData);
    }
  }, [companyData]);

  useEffect(() => {
    companyTasksListSet(tasksList);
  }, [tasksList]);

  return (
    <Container maxWidth="lg">
      <>
        <div className="dashboardMainPage_welcomeText">
          <h2 className="dashboardMainPage_welcomeText_title">Welcome back!</h2>
          <h3 className="dashboardMainPage_welcomeText_span">
            On-going projects in {companyData?.name}
          </h3>
        </div>
        <div className="dashboardMainPage_companyItemsShowcase">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box className="projectsGrid">
              {companyProjectsList?.map((item) => (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/dashboard/project/${item.serializedId}`}
                  key={item.serializedId}
                  className="projectLink"
                >
                  <MainPageProjectsContainer project={item} />
                </Link>
              ))}
              <AddProjectBlock />
            </Box>
          )}
        </div>
        <h3 className="dashboardMainPage_welcomeText_span">
          Latest Updated Tasks
        </h3>
        <div className="dashboardMainPage_companyItemsShowcase">
          {isLoading ? (
            <CircularProgress />
          ) : (
            companyTasksList.map((item) => (
              <MainPageTasksContainer task={item} />
            ))
          )}
        </div>
      </>
    </Container>
  );
}

export default DashboardMainPage;
