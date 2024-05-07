import { useSelector } from "react-redux";
import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SummaryEditProjectDataModal from "./SummaryEditProjectDataModal";

function Summary() {
  const [data, setData] = useState({});
  const [currentElementToEdit, setCurrentElementToEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const preFetchedData = useSelector((state) => state.projectCreationWizzard);

  const handleProjectDataClick = (element) => {
    setCurrentElementToEdit(element.element);
    handleModalOpen();
  };

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  useEffect(() => {
    if (
      preFetchedData.project_name === "" ||
      preFetchedData.project_description === "" ||
      preFetchedData.project_employeeCount === "" ||
      preFetchedData.project_mainMethodology === ""
    ) {
      navigate("/dashboard/project-creation-wizzard");
    }

    if (preFetchedData) {
      setData(preFetchedData);
    }
  }, [preFetchedData]);

  return (
    <>
      <SummaryEditProjectDataModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        currentElementToEdit={currentElementToEdit}
      />
      <div className="dashboardMainPage_welcomeText">
        <h2 className="dashboardMainPage_welcomeText_title no-projects centered">
          Summary
        </h2>
        <h3 className="dashboardMainPage_welcomeText_span no-projects centered">
          Here’s your full Project summary
        </h3>
      </div>
      <div className="summary-container">
        <div className="summary-container_info-section">
          <div className="summary-container_info-section_meeting-data">
            <div className="summary-container_info-section_meeting-data_container">
              <div>
                <p
                  onClick={() =>
                    handleProjectDataClick({
                      element: "project_name",
                      value: data.project_name,
                    })
                  }
                >
                  {data.project_name ? data.project_name : "ERROR"}
                </p>
              </div>
            </div>
            <div className="summary-container_info-section_meeting-data_container">
              <p
                onClick={() =>
                  handleProjectDataClick({
                    element: "project_mainMethodology",
                    value: data.project_mainMethodology,
                  })
                }
              >
                {data.project_mainMethodology
                  ? data.project_mainMethodology
                  : "ERROR"}
              </p>
            </div>
            <div className="summary-container_info-section_meeting-data_container">
              <p
                onClick={() =>
                  handleProjectDataClick({
                    element: "project_employeeCount",
                    value: data.project_employeeCount,
                  })
                }
              >
                {data.project_employeeCount
                  ? data.project_employeeCount
                  : "ERROR"}
              </p>
            </div>
          </div>
          <div className="summary-container_info-section_description-data">
            <p
              onClick={() =>
                handleProjectDataClick({
                  element: "project_description",
                  value: data.project_description,
                })
              }
            >
              {data.project_description ? data.project_description : "ERROR"}
            </p>
          </div>
        </div>
        <div className="summary-container_additional-section"></div>
      </div>
      <div className="ButtonsContainer">
        <Link to="/dashboard/project-creation-wizzard">
          <Button variant="text" className="ButtonsContainer_goBack">
            Go back
          </Button>
        </Link>
        <Link to="/dashboard/project-creation-wizzard/finalize">
          <Button variant="contained" className="ButtonsContainer_nextStep">
            Finalize
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Summary;
