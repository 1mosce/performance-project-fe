import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import dayjs from "dayjs";

function EditProjectDatesDialog({ open, onClose, mainProject, onSave }) {
  const [newProjectStartDate, setNewProjectStartDate] = useState(
    dayjs(mainProject.startDate, "YYYY-MM-DD")
  );
  const [newProjectEndDate, setNewProjectEndDate] = useState(
    dayjs(mainProject.endDate, "YYYY-MM-DD")
  );
  const [indefiniteChecked, setIndefiniteChecked] = useState(false);

  const handleStartDateChange = (date) => setNewProjectStartDate(date);
  const handleEndDateChange = (date) => setNewProjectEndDate(date);
  const handleIndefiniteChecked = (value) => setIndefiniteChecked(value);

  async function handleSaveNewProjectDates() {
    if (!newProjectStartDate || !newProjectEndDate) {
      return;
    }
    const payload = {
      id: {},
      name: mainProject.name,
      description: mainProject.description,
      startDate: newProjectStartDate.format("YYYY-MM-DD"),
      endDate: indefiniteChecked
        ? "0001-01-01"
        : newProjectEndDate.format("YYYY-MM-DD"),
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
      <DialogTitle>Edit project dates</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Start Date"
          type="date"
          disabled
          value={
            newProjectStartDate ? newProjectStartDate.format("YYYY-MM-DD") : ""
          }
          onChange={(e) => handleStartDateChange(dayjs(e.target.value))}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project End Date"
          type="date"
          value={
            newProjectEndDate ? newProjectEndDate.format("YYYY-MM-DD") : ""
          }
          onChange={(e) => handleEndDateChange(dayjs(e.target.value))}
          InputProps={{
            inputProps: {
              min: newProjectStartDate
                ? newProjectStartDate.format("YYYY-MM-DD")
                : "",
            },
          }}
          InputLabelProps={{ shrink: true }}
          fullWidth
          disabled={indefiniteChecked}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={indefiniteChecked}
              onChange={(event) =>
                handleIndefiniteChecked(event.target.checked)
              }
            />
          }
          label="Indefinite"
          name="project_indefinite_checked"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveNewProjectDates} type="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProjectDatesDialog;
