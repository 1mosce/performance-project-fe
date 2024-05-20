import React, { useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCreationModal from "./ProjectCreationModal";
import "../../styles/components/MainPageProjectsContainer.scss";

function AddProjectBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="block pointer" onClick={handleOpenModal}>
        <div className="block_data">
          <AddIcon />
          <span>Add new project</span>
        </div>
      </div>
      <ProjectCreationModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default AddProjectBlock;
