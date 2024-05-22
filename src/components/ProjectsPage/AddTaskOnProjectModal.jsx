import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/pages/dashboard/project/index.scss"; // Ensure this path is correct
import RenderAssignedPerson from "./RenderAssignedPerson";
import RenderProjectNameWithoutApi from "./RenderProjectNameWithoutApi";
import {
  addNewTaskToProject,
  getCompanyEmployeesFromAPI,
  getCompanyProjectsFromAPI,
} from "../../functions/apiFunctions";
import RenderProjectName from "./RenderProjectName";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/features/companyFeatures/companySlice";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function AddTaskOnProjectModal({
  open,
  onClose,
  projectId,
  startDate,
  dueDate,
}) {
  const [assignee, setAssignee] = useState("");
  const [relatedProject, setRelatedProject] = useState(projectId || "");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const { projectsList } = useSelector((state) => state.company);

  const handleAvailableEmployeesSet = (value) => setAvailableEmployees(value);
  const handleAvailableProjectsSet = (value) => setAvailableProjects(value);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const getCompanyEmployeesFromAPI_result =
        await getCompanyEmployeesFromAPI();
      if (getCompanyEmployeesFromAPI_result) {
        handleAvailableEmployeesSet(getCompanyEmployeesFromAPI_result);
      }

      const getCompanyProjectsFromAPI_result =
        await getCompanyProjectsFromAPI();
      if (getCompanyProjectsFromAPI_result) {
        const combinedProjects = [...projectsList];

        handleAvailableProjectsSet(combinedProjects);
      }
    }

    fetchData();
  }, [projectId, projectsList]);

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleRelatedProjectChange = (event) => {
    setRelatedProject(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setTaskDueDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const handleSubmit = async () => {
    const convertToISODateString = (dateString) => {
      const date = new Date(dateString);
      date.setUTCHours(12, 0, 0, 0);
      return date.toISOString();
    };

    const updatedTask = {
      id: {},
      title: taskTitle,
      description: taskDescription,
      assigneeId: assignee,
      projectId: relatedProject,
      statusId: null,
      priorityId: null,
      dueDate: convertToISODateString(taskDueDate),
    };

    try {
      const result = await addNewTaskToProject(updatedTask);
      dispatch(addTask(result));
      onClose();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        <TextField
          fullWidth
          label="Task Title"
          value={taskTitle}
          onChange={handleTitleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Task Description"
          value={taskDescription}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box width="48%">
            <Typography variant="body2">Assigned to:</Typography>
            <Select
              fullWidth
              value={assignee}
              onChange={handleAssigneeChange}
              renderValue={(selected) => (
                <RenderAssignedPerson personId={selected} />
              )}
            >
              {availableEmployees?.map((item, key) => (
                <MenuItem value={item.serializedId} key={key}>
                  <RenderAssignedPerson personId={item.serializedId} />
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width="48%">
            <Typography variant="body2">Due date:</Typography>
            <TextField
              type="date"
              fullWidth
              value={taskDueDate}
              InputProps={{
                inputProps: {
                  min: startDate,
                  max: dueDate,
                },
              }}
              onChange={handleDueDateChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                pointerEvents: "none", // Disable manual input
                "& .MuiInputBase-input": {
                  pointerEvents: "auto", // Enable click for the date picker
                },
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box width="48%">
            <Typography variant="body2">Related Project:</Typography>
            <Select
              fullWidth
              value={relatedProject}
              onChange={handleRelatedProjectChange}
              renderValue={(selected) => (
                <RenderProjectName projectId={selected} />
              )}
            >
              {availableProjects?.map((item, key) => (
                <MenuItem value={item.serializedId} key={key}>
                  <RenderProjectNameWithoutApi projectName={item.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width="48%">
            <Typography variant="body2">Status:</Typography>
            <Select fullWidth value={taskStatus} onChange={handleStatusChange}>
              <MenuItem value="inprogress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddTaskOnProjectModal;
