import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { ERR_PROJECT_DESCRIPTION_INVALID } from "../../constants/constants";

function EditProjectDescriptionDialog({ open, onClose, mainProject, onSave }) {
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectDescriptionError, setNewProjectDescriptionError] =
    useState("");

  const handleNewProjectDescription = (input) =>
    setNewProjectDescription(input.target.value);

  async function handleSaveNewProjectDescription() {
    if (!newProjectDescription || newProjectDescription === "") {
      setNewProjectDescriptionError(ERR_PROJECT_DESCRIPTION_INVALID);
      return;
    }
    const payload = {
      id: {},
      name: mainProject.name,
      description: newProjectDescription,
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
      <DialogTitle>Edit project description</DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{ maxLength: 100 }}
          fullWidth
          id="outlined-basic"
          error={
            newProjectDescriptionError !== ""
              ? newProjectDescriptionError
              : false
          }
          helperText={newProjectDescriptionError}
          variant="standard"
          onChange={(e) => handleNewProjectDescription(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveNewProjectDescription} type="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProjectDescriptionDialog;
