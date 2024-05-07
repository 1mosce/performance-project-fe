import { MenuItem, Select, Button, Modal, Box } from "@mui/material";
import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import { useEffect, useState } from "react";
import {
  temp_EmployeeCount,
  temp_Methodologies,
} from "../../../constants/database";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectEmployeeCount,
  setProjectMainMethodology,
} from "../../../store/features/projectCreationWizzardFeatures/projectCreationWizzardSlice";

function StepThree() {
  const [mainMethodology, setMainMethodology] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const preFetchedData = useSelector((state) => state.projectCreationWizzard);

  useEffect(() => {
    if (preFetchedData) {
      const { project_mainMethodology, project_employeeCount } = preFetchedData;
      setMainMethodology(project_mainMethodology || "");
      setEmployeeCount(project_employeeCount || "");
    }
  }, [preFetchedData]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleMethodologyChange = (event) => {
    setMainMethodology(event.target.value);
    dispatch(setProjectMainMethodology(event.target.value));
  };

  const handleEmployeeCountChange = (event) => {
    setEmployeeCount(event.target.value);
    dispatch(setProjectEmployeeCount(event.target.value));
  };
  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box">
          <h2>Be advised!</h2>
          <p>
            You are trying to create project with 10+ employees. If you don’t
            have Premium+ subscription, then your employee count will be set to
            1-3 after project creation. If you wish to create project with
            specified amount of employees without subscription, you can get that
            as “Extra options” on next page
          </p>
          <Button
            onClick={handleModalClose}
            className="okButton"
            variant="contained"
          >
            Ok
          </Button>
        </div>
      </Modal>
      <div className="dashboardMainPage_welcomeText">
        <h2 className="dashboardMainPage_welcomeText_title no-projects centered">
          Almost done!
        </h2>
        <h3 className="dashboardMainPage_welcomeText_span no-projects centered">
          Let’s just specify some leftover details
        </h3>
      </div>
      <div className="projectCreationContainer fixed">
        <form onSubmit={handleSubmit}>
          <div className="projectCreationContainer-cardContainer ">
            <div className="projectCreationContainer-card">
              <h4>What is the main methodology used in this project?</h4>
              <Select
                onChange={(newValue) => handleMethodologyChange(newValue)}
                fullWidth
                value={mainMethodology}
              >
                {temp_Methodologies.map((item) => (
                  <MenuItem value={item.value}>{item.value}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="projectCreationContainer-card">
              <h4>
                How many employees will be there on <br /> this project?
              </h4>
              <Select
                onChange={(newValue) => {
                  handleEmployeeCountChange(newValue);
                  if (
                    newValue.target.value === "10+" ||
                    newValue.target.value === "3-10"
                  ) {
                    handleModalOpen();
                  }
                }}
                fullWidth
                value={employeeCount}
              >
                {temp_EmployeeCount.map((item) => (
                  <MenuItem value={item.value}>{item.value}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </div>
      <div className="ButtonsContainer space-top">
        <Link to="/dashboard/project-creation-wizzard/step-two">
          <Button variant="text" className="ButtonsContainer_goBack">
            Go back
          </Button>
        </Link>
        <Link to="/dashboard/project-creation-wizzard/summary">
          <Button
            variant="contained"
            className="ButtonsContainer_nextStep"
            disabled={
              employeeCount !== "" && mainMethodology !== "" ? false : true
            }
          >
            Next Step
          </Button>
        </Link>
      </div>
    </>
  );
}

export default StepThree;
