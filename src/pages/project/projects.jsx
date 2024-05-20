import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, CircularProgress, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MainPageProjectsContainer from "../../components/MainPage/MainPageProjectsContainer";
import "../../styles/pages/dashboard/mainPage/index.scss";
import { simulateDelay } from "../../functions/functions";
import { getCompanyProjectsFromAPI } from "../../functions/apiFunctions";
import "../../styles/pages/dashboard/projects/index.scss";
import AddProjectBlock from "../../components/ProjectsPage/AddProjectBlock";

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          <Box className="projectsGrid">
            {companyProjectsList?.map((item) => (
              <Link
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
    </Container>
  );
}

export default Projects;
