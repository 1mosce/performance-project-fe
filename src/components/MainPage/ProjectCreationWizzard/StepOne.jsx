import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function StepOne() {
  const navigate = useNavigate();
  const preFetchedData = useSelector((state) => state.company.projectsList);

  useEffect(() => {
    if (preFetchedData.length > 0) {
      navigate("/dashboard");
    }
  }, [preFetchedData]);

  return (
    <>
      <div className="dashboardMainPage_welcomeText">
        <h2 className="dashboardMainPage_welcomeText_title no-projects">
          Welcome to your Dashboard, CompanyName
        </h2>
        <h3 className="dashboardMainPage_welcomeText_span no-projects">
          It looks like that you don’t have an active project right now. Do you
          want to create a new project?
        </h3>
      </div>
      <div className="ButtonsContainer">
        <Link to="/dashboard/project-creation-wizzard/step-two">
          <Button variant="contained" className="ButtonsContainer_nextStep">
            Next Step
          </Button>
        </Link>
      </div>
    </>
  );
}

export default StepOne;
