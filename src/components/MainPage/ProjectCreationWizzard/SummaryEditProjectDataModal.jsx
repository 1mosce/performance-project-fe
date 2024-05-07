import { Button, Modal, Select, TextField, MenuItem } from "@mui/material";
import "../../../styles/pages/dashboard/ProjectsCreationWizzard/index.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Component } from "react";
import { updateProjectValueOnSummary } from "../../../store/features/projectCreationWizzardFeatures/projectCreationWizzardSlice";
import {
  temp_EmployeeCount,
  temp_Methodologies,
} from "../../../constants/database";

const defineModalTitle = (elementToEdit) => {
  switch (elementToEdit) {
    case "project_name":
      return <h1>Change project name</h1>;
    case "project_mainMethodology":
      return <h1>Change project methodology</h1>;
    case "project_employeeCount":
      return <h1>Change project employee count</h1>;
    case "project_description":
      return <h1>Change project description</h1>;
  }
};

const DefineModalContent = ({ elementToEdit, handleModalClose }) => {
  const [newValue, setNewValue] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (updatedValue) => {
    setNewValue(updatedValue.target.value);
  };

  const handleOkButtonClick = () => {
    const newValueObject = { type: elementToEdit, value: newValue };
    if (newValue !== "") {
      dispatch(updateProjectValueOnSummary(newValueObject));
    }
    handleModalClose();
  };

  if (elementToEdit === "project_name") {
    return (
      <>
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth
          onChange={handleInputChange}
          inputProps={{ maxLength: 50 }}
        />
        <Button onClick={handleOkButtonClick}>Ok</Button>
      </>
    );
  }
  if (elementToEdit === "project_mainMethodology") {
    return (
      <>
        <Select onChange={handleInputChange} fullWidth>
          {temp_Methodologies.map((item) => (
            <MenuItem value={item.value}>{item.value}</MenuItem>
          ))}
        </Select>
        <Button onClick={handleOkButtonClick}>Ok</Button>
      </>
    );
  }
  if (elementToEdit === "project_employeeCount") {
    return (
      <>
        <Select onChange={handleInputChange} fullWidth>
          {temp_EmployeeCount.map((item) => (
            <MenuItem value={item.value}>{item.value}</MenuItem>
          ))}
        </Select>
        <Button onClick={handleOkButtonClick}>Ok</Button>
      </>
    );
  }
  if (elementToEdit === "project_description") {
    return (
      <>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          multiline
          rows={5}
          id="outlined-basic"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button onClick={handleOkButtonClick}>Ok</Button>
      </>
    );
  }
};

const SummaryEditProjectDataModal = ({
  openModal,
  handleModalClose,
  currentElementToEdit,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-box">
        {defineModalTitle(currentElementToEdit)}
        <DefineModalContent
          elementToEdit={currentElementToEdit}
          handleModalClose={handleModalClose}
        />
      </div>
    </Modal>
  );
};

export default SummaryEditProjectDataModal;
