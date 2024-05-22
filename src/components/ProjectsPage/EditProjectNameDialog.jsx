import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ERR_PROJECT_NAME_INVALID } from "../../constants/constants";

function EditProjectNameDialog({ open, onClose, mainProject, onSave }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectNameError, setNewProjectNameError] = useState("");

  const handleNewProjectInput = (input) =>
    setNewProjectName(input.target.value);

  async function handleSaveNewProjectName() {
    if (!newProjectName || newProjectName === "") {
      setNewProjectNameError(ERR_PROJECT_NAME_INVALID);
      return;
    }
    const payload = {
      id: {},
      name: newProjectName,
      description: mainProject.description,
      startDate: mainProject.startDate,
      endDate: mainProject.endDate,
      mainMethodology: mainProject.mainMethodology,
      companyId: mainProject.companyId,
      statusId: null,
      teamId: mainProject.teamId,
    };
    const result = await onSave(mainProject.serializedId, payload);
    if (result === 204) {
      payload.serializedId = mainProject.serializedId;
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit project name</DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{ maxLength: 50 }}
          error={newProjectNameError !== "" ? newProjectNameError : false}
          helperText={newProjectNameError}
          variant="standard"
          onChange={(e) => handleNewProjectInput(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveNewProjectName} type="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProjectNameDialog;
