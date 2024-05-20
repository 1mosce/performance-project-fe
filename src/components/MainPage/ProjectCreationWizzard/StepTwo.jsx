import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import {
  ERR_PROJECT_DESCRIPTION_INVALID,
  ERR_PROJECT_END_DATE_MISSING,
  ERR_PROJECT_NAME_INVALID,
  ERR_PROJECT_START_DATE_MISSING,
} from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setNewProjectData } from "../../../store/features/projectCreationWizzardFeatures/projectCreationWizzardSlice";

function StepTwo() {
  const [indefiniteChecked, setIndefiniteChecked] = useState(false);
  const [applyButtonPressed, setApplyButtonPressed] = useState(false);
  const [projectNameError, setProjectNameError] = useState("");
  const [projectDescriptionError, setProjectDescriptionError] = useState("");
  const [projectStartDateError, setProjectStartDateError] = useState("");
  const [projectEndDateError, setProjectEndDateError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [projectNameValue, setProjectNameValue] = useState("");
  const [projectDescriptionValue, setProjectDescriptionValue] = useState("");
  const [nextStepAvailable, setNextStepAvailable] = useState(false);

  const dispatch = useDispatch();

  const preFetchedProjectData = useSelector(
    (state) => state.projectCreationWizzard
  );

  useEffect(() => {
    if (preFetchedProjectData) {
      const {
        project_name,
        project_description,
        project_start_date,
        project_end_date,
        indefiniteChecked: preFetchedIndefiniteChecked,
      } = preFetchedProjectData;

      setProjectNameValue(project_name || "");
      setProjectDescriptionValue(project_description || "");
      setStartDate(
        project_start_date ? dayjs(project_start_date, "DD/MM/YYYY") : null
      );
      setEndDate(
        project_end_date ? dayjs(project_end_date, "DD/MM/YYYY") : null
      );
      setIndefiniteChecked(preFetchedIndefiniteChecked || false);
      if (
        project_name !== "" &&
        project_description !== "" &&
        project_start_date !== ""
      ) {
        setApplyButtonPressed(true);
        setNextStepAvailable(true);
      }
    }
  }, [preFetchedProjectData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (applyButtonPressed) {
      setApplyButtonPressed(!applyButtonPressed);
      setNextStepAvailable(false);
      return;
    }
    setProjectNameError("");
    setProjectDescriptionError("");
    setProjectStartDateError("");
    setProjectEndDateError("");
    setNextStepAvailable(false);
    if (
      e.target.project_name.value === "" ||
      e.target.project_name.value.trim().length === 0
    ) {
      setProjectNameError(ERR_PROJECT_NAME_INVALID);
      return;
    }

    if (
      e.target.project_description.value === "" ||
      e.target.project_description.value.trim().length === 0
    ) {
      setProjectDescriptionError(ERR_PROJECT_DESCRIPTION_INVALID);
      return;
    }

    if (!startDate) {
      setProjectStartDateError(ERR_PROJECT_START_DATE_MISSING);
      return;
    }

    if (!endDate && !indefiniteChecked) {
      setProjectEndDateError(ERR_PROJECT_END_DATE_MISSING);
      return;
    }

    const formattedStartDate = startDate
      ? dayjs(startDate).format("DD/MM/YYYY")
      : "";
    const formattedEndDate = endDate ? dayjs(endDate).format("DD/MM/YYYY") : "";

    const payload = {
      project_name: e.target.project_name.value,
      project_description: e.target.project_description.value,
      project_start_date: formattedStartDate,
      project_end_date: indefiniteChecked ? "" : formattedEndDate,
      indefiniteChecked: indefiniteChecked,
    };
    dispatch(setNewProjectData(payload));

    setApplyButtonPressed(!applyButtonPressed);
  }

  return (
    <>
      <div className="dashboardMainPage_welcomeText">
        <h2 className="dashboardMainPage_welcomeText_title no-projects centered">
          Let's set up your new project
        </h2>
        <h3 className="dashboardMainPage_welcomeText_span no-projects centered">
          In order to create a successful project, we need to know some stuff
          about it!
        </h3>
      </div>
      <div className="projectCreationContainer">
        <form onSubmit={handleSubmit}>
          <div className="projectCreationContainer-cardContainer">
            <div className="projectCreationContainer-card">
              <h3>Project Title</h3>
              <TextField
                value={projectNameValue}
                inputProps={{ maxLength: 50 }}
                id="standard-basic"
                label="Project Name"
                name="project_name"
                variant="standard"
                disabled={applyButtonPressed}
                error={projectNameError !== "" ? true : false}
                helperText={projectNameError}
                onChange={(e) => setProjectNameValue(e.target.value)}
              />
              <p className="projectCreationContainer-card_helperText">
                This will be your Project name! You can always change it later.
                We recommend using code names instead of real names (e.g.,
                “Project Venera” or “Project X”).
              </p>
            </div>
            <div className="projectCreationContainer-card">
              <h3>Project Description</h3>
              <TextField
                fullWidth
                value={projectDescriptionValue}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => setProjectDescriptionValue(e.target.value)}
                multiline
                rows={5}
                id="outlined-basic"
                name="project_description"
                label="Project Description"
                variant="outlined"
                disabled={applyButtonPressed}
                error={projectDescriptionError !== "" ? true : false}
                helperText={projectDescriptionError}
              />
              <p className="projectCreationContainer-card_helperText">
                This will be your Project Description. Write some words about
                what your project will be. You can always change that later
                also.
              </p>
            </div>
            <div className="projectCreationContainer-card">
              <h3>Due date of project</h3>
              <div className="projectCreationContainer-card_selectInputContainer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start date"
                    name="project_start_date"
                    format="DD/MM/YYYY"
                    value={startDate}
                    disabled={applyButtonPressed}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    slotProps={{
                      field: { readOnly: true },
                      textField: {
                        helperText: projectStartDateError,
                        error: projectStartDateError !== "",
                      },
                    }}
                  />
                  <DatePicker
                    label="End date"
                    name="project_end_date"
                    value={endDate}
                    format="DD/MM/YYYY"
                    disabled={indefiniteChecked || applyButtonPressed}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    slotProps={{
                      field: { readOnly: true },
                      textField: {
                        helperText: projectEndDateError,
                        error: projectEndDateError !== "",
                      },
                    }}
                    minDate={startDate} // This ensures the end date cannot be earlier than the start date
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={indefiniteChecked}
                    onChange={(event) =>
                      setIndefiniteChecked(event.target.checked)
                    }
                  />
                }
                label="Indefinite"
                disabled={applyButtonPressed}
                name="project_indefinite_checked"
              />
              <p className="projectCreationContainer-card_helperText">
                This will be your project due date. If you don't have strict
                terms, you can set it as “Indefinite”, or we recommend setting
                an abstract date (for example, in 2 weeks or some other month),
                so you will get notifications about the upcoming due date.
              </p>
            </div>
          </div>
          <div className="edit-button-container">
            <Button type="submit" className="edit-button">
              {!applyButtonPressed ? "Apply" : "Edit"}
            </Button>
          </div>
        </form>
      </div>
      <div className="ButtonsContainer">
        <Link
          style={{ textDecoration: "none" }}
          to="/dashboard/project-creation-wizzard"
        >
          <Button variant="text" className="ButtonsContainer_goBack">
            Go back
          </Button>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/dashboard/project-creation-wizzard/step-three"
        >
          <Button
            variant="contained"
            className="ButtonsContainer_nextStep"
            disabled={!nextStepAvailable}
          >
            Next Step
          </Button>
        </Link>
      </div>
    </>
  );
}

export default StepTwo;
