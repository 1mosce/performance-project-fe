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
  editProjectTask,
  getCompanyEmployeesFromAPI,
  getCompanyProjectsFromAPI,
  performPutRequestToApi, // Add this function to perform PUT request
} from "../../functions/apiFunctions";
import RenderProjectName from "./RenderProjectName";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../store/features/companyFeatures/companySlice";

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

function EditTaskOnProjectModal({
  open,
  onClose,
  task,
  projectEndDate,
  projectStartDate,
}) {
  const [assignee, setAssignee] = useState(task?.assigneeId || "");
  const [relatedProject, setRelatedProject] = useState(task?.projectId || "");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );
  const [taskDueDate, setTaskDueDate] = useState(task?.dueDate || "");
  const [taskStatus, setTaskStatus] = useState(task?.statusId || "");

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
  }, [task, projectsList]);

  useEffect(() => {
    // Update state when task prop changes
    if (task) {
      setAssignee(task.assigneeId || "");
      setRelatedProject(task.projectId || "");
      setTaskTitle(task.title || "");
      setTaskDescription(task.description || "");
      const dueDateObj = new Date(task.dueDate);
      const formattedDueDate = `${dueDateObj.getFullYear()}-${String(
        dueDateObj.getMonth() + 1
      ).padStart(2, "0")}-${String(dueDateObj.getDate()).padStart(2, "0")}`;
      setTaskDueDate(formattedDueDate);
      setTaskStatus(task.statusId || "");
    }
  }, [task]);

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
    const updatedTask = {
      id: {},

      title: taskTitle,
      description: taskDescription,
      assigneeId: assignee,
      projectId: relatedProject,
      statusId: null,
      priorityId: null,
      dueDate: taskDueDate,
    };

    try {
      const result = await editProjectTask(updatedTask, task.serializedId);
      if (result === 204) {
        updatedTask.serializedId = task.serializedId;
        updatedTask.statusId = taskStatus;
        dispatch(editTask(updatedTask));
        onClose();
      }
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Task</Typography>
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
              onChange={handleDueDateChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: {
                  min: projectStartDate,
                  max: projectEndDate,
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

export default EditTaskOnProjectModal;
