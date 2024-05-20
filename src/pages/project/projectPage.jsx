import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import "../../styles/pages/dashboard/project/index.scss";
import { DataGrid } from "@mui/x-data-grid";
import { getProjectTasksFromAPI } from "../../functions/functions";
import { ERR_PROJECT_NAME_INVALID } from "../../constants/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditTaskOnProjectModal from "../../components/ProjectsPage/EditTaskOnProjectModal";
import AddTaskOnProjectModal from "../../components/ProjectsPage/AddTaskOnProjectModal";
import RenderProjectName from "../../components/ProjectsPage/RenderProjectName";
import RenderAssignedPerson from "../../components/ProjectsPage/RenderAssignedPerson";

function ProjectPage() {
  const { serializedId } = useParams();
  const [mainProject, setMainProject] = useState();
  const [projectTasks, setProjectTasks] = useState();
  const [activeButton, setActiveButton] = useState(1);
  const [editTitleActive, setEditTitleActive] = useState(false);
  const [newProjectName, setNewProjectName] = useState();
  const [newProjectNameError, setNewProjectNameError] = useState("");
  const [selectedTask, setSelectedTask] = useState();
  const [editTaskActive, setEditTaskActive] = useState(false);
  const [addTaskActive, setAddTaskActive] = useState(false); // State for add task modal

  const handleButtonClick = (button) => () => setActiveButton(button);

  const projectList = useSelector((state) => state.company.projectsList);
  const taskList = useSelector((state) => state.company.tasksList);

  useEffect(() => {
    if (projectList && serializedId) {
      const project = projectList.find(
        (project) => project.serializedId === serializedId
      );
      setMainProject(project);
    }
  }, [projectList, serializedId]);

  useEffect(() => {
    if (taskList && serializedId) {
      const filteredTasks = taskList.filter(
        (task) => task.projectId === serializedId
      );
      setProjectTasks(filteredTasks);
    }
  }, [taskList, serializedId]);

  const handleNewProjectInput = (input) =>
    setNewProjectName(input.target.value);

  const handleRowSelection = (item) => setSelectedTask(item.row);

  function handleSaveNewProjectName() {
    if (!newProjectName || newProjectName === "") {
      setNewProjectNameError(ERR_PROJECT_NAME_INVALID);
      return;
    }

    setEditTitleActive(false);
  }

  const renderContent = () => {
    switch (activeButton) {
      case 1:
        return (
          <div className="projectDataRenderContainer">
            <DataGrid
              autoHeight
              onCellClick={(item) => handleRowSelection(item)}
              columns={[
                { field: "id", headerName: "ID", width: 150 },
                {
                  field: "title",
                  headerName: "Task Name",
                  width: 150,
                },
                {
                  field: "projectId",
                  headerName: "Project ID",
                  minWidth: 250,
                  renderCell: (params) => (
                    <RenderProjectName projectId={params.value} />
                  ),
                },
                {
                  field: "assigneeId",
                  headerName: "Assigned to",
                  minWidth: 175,
                  renderCell: (params) => (
                    <RenderAssignedPerson personId={params.value} />
                  ),
                },
                { field: "dueDate", headerName: "Due Date", width: 150 },
              ]}
              rows={projectTasks.map((task) => ({
                ...task,
                id: task.serializedId,
              }))}
              pageSize={5}
            />
            <div className="projectRenderDataOption">
              {selectedTask ? (
                <>
                  <span>Selected task : {selectedTask?.title} </span>
                  <div
                    className="projectRenderDataOption-button"
                    onClick={() => setEditTaskActive(true)}
                  >
                    Edit task
                    <EditIcon />
                  </div>
                  <div className="projectRenderDataOption-button delete-button">
                    Delete <DeleteIcon />
                  </div>
                </>
              ) : (
                ""
              )}
              <div
                className="projectRenderDataOption-button"
                onClick={() => setAddTaskActive(true)} // Set add task modal to active
              >
                Create Task
                <AddIcon />
              </div>
            </div>
          </div>
        );
      case 2:
        return <h1>Im second</h1>;
      case 3:
        return <h1>Im thirds</h1>;
    }
  };

  return (
    <>
      {mainProject ? (
        <>
          <Container maxWidth="lg">
            <EditTaskOnProjectModal
              open={editTaskActive}
              onClose={() => setEditTaskActive(false)}
              task={selectedTask}
            />
            <AddTaskOnProjectModal
              open={addTaskActive}
              onClose={() => setAddTaskActive(false)}
              projectId={serializedId} // Pass current project ID to the add task modal
            />
            <Dialog
              open={editTitleActive}
              onClose={() => setEditTitleActive(false)}
            >
              <DialogTitle>Edit project name</DialogTitle>
              <DialogContent>
                <TextField
                  inputProps={{ maxLength: 50 }}
                  error={
                    newProjectNameError !== "" ? newProjectNameError : false
                  }
                  helperText={newProjectNameError}
                  variant="standard"
                  onChange={(e) => handleNewProjectInput(e)}
                ></TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditTitleActive(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSaveNewProjectName();
                  }}
                  type="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <div className="projectInfoContainer">
              <h1>{mainProject.name || mainProject?.project_name}</h1>
              <IconButton onClick={() => setEditTitleActive(true)}>
                <EditIcon />
              </IconButton>
            </div>
            <Divider />
            <div className="projectDataContainer">
              <div
                className={`projectDataContainer-button ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={handleButtonClick(1)}
              >
                Tasks
              </div>
              <div
                className={`projectDataContainer-button ${
                  activeButton === 2 ? "active" : ""
                }`}
                onClick={handleButtonClick(2)}
              >
                Employees
              </div>
              <div
                className={`projectDataContainer-button ${
                  activeButton === 3 ? "active" : ""
                }`}
                onClick={handleButtonClick(3)}
              >
                Settings
              </div>
            </div>
            {renderContent()}
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default ProjectPage;
