import React, { useState, useEffect } from "react";
import { Modal, Box, Button, CircularProgress, Backdrop } from "@mui/material";
import StepOne from "../MainPage/ProjectCreationWizzard/StepOne";
import StepTwo from "../MainPage/ProjectCreationWizzard/StepTwo";
import StepThree from "../MainPage/ProjectCreationWizzard/StepThree";
import Summary from "../MainPage/ProjectCreationWizzard/Summary";
import Finalize from "../MainPage/ProjectCreationWizzard/Finalize";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function ProjectCreationModal({ open, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={handleNextStep} />;
      case 2:
        return <StepTwo onNext={handleNextStep} onBack={handlePreviousStep} />;
      case 3:
        return (
          <StepThree onNext={handleNextStep} onBack={handlePreviousStep} />
        );
      case 4:
        return <Summary onNext={handleNextStep} onBack={handlePreviousStep} />;
      case 5:
        return <Finalize />;
      default:
        return <StepOne onNext={handleNextStep} />;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>{renderStepContent()}</Box>
    </Modal>
  );
}

export default ProjectCreationModal;
