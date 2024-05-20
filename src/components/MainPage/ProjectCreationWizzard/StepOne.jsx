import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function StepOne() {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({});
  const preFetchedData = useSelector((state) => state.company.projectsList);

  const companyState = useSelector((state) => state.company);

  const handleCompanyInfoSet = (value) => setCompanyInfo(value);

  useEffect(() => {
    handleCompanyInfoSet(companyState.companyData);
  }, [companyState]);

  useEffect(() => {
    if (preFetchedData.length > 0) {
      navigate("/dashboard");
    }
  }, [preFetchedData]);

  return (
    <>
      <div className="dashboardMainPage_welcomeText">
        <h2 className="dashboardMainPage_welcomeText_title no-projects">
          Welcome to your Dashboard,{" "}
          <span>{companyInfo?.name ? companyInfo?.name : "Company name"}</span>
        </h2>
        <h3 className="dashboardMainPage_welcomeText_span no-projects">
          It looks like that you want to create a project right now. Do you want
          to proceed?
        </h3>
      </div>
      <div className="ButtonsContainer">
        <Link
          to="/dashboard/project-creation-wizzard/step-two"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" className="ButtonsContainer_nextStep">
            Next Step
          </Button>
        </Link>
      </div>
    </>
  );
}

export default StepOne;
