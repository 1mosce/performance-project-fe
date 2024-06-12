import { Button, Container, IconButton, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import "../../styles/pages/dashboard/project/index.scss";
import { deleteProject, editProjectInfo } from "../../functions/apiFunctions";
import {
  deleteProjectFromStore,
  editProject,
} from "../../store/features/companyFeatures/companySlice";
import EditTaskOnProjectModal from "../../components/ProjectsPage/EditTaskOnProjectModal";
import AddTaskOnProjectModal from "../../components/ProjectsPage/AddTaskOnProjectModal";
import RenderProjectName from "../../components/ProjectsPage/RenderProjectName";
import RenderAssignedPerson from "../../components/ProjectsPage/RenderAssignedPerson";
import EditProjectNameDialog from "../../components/ProjectsPage/EditProjectNameDialog";
import EditProjectDescriptionDialog from "../../components/ProjectsPage/EditProjectDescriptionDialog";
import EditProjectDatesDialog from "../../components/ProjectsPage/EditProjectDatesDialog";
import { CalendarIcon } from "@mui/x-date-pickers";
import DeleteProjectDialog from "../../components/ProjectsPage/DeleteProjectDialog";
import DeleteTaskDialog from "../../components/ProjectsPage/DeleteTaskDialog";

function ProjectPage() {
  const { serializedId } = useParams();
  const [mainProject, setMainProject] = useState();
  const [projectTasks, setProjectTasks] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [editTitleActive, setEditTitleActive] = useState(false);
  const [editDescriptionActive, setEditDescriptionActive] = useState(false);
  const [editDatesActive, setEditDatesActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTaskActive, setEditTaskActive] = useState(false);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [deleteDialogActive, setDeleteDialogActive] = useState(false);
  const [deleteTaskDialogActive, setDeleteTaskDialogActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleButtonClick = (button) => () => setActiveButton(button);

  const handleRowSelection = (item) => setSelectedTask(item.row);

  const handleSave = async (serializedId, payload) => {
    const result = await editProjectInfo(serializedId, payload);
    if (result === 204) {
      dispatch(editProject({ ...payload, serializedId }));
    }
    return result;
  };

  const handleDeleteProject = async () => {
    const result = await deleteProject(mainProject.serializedId);
    if (result === 204) {
      dispatch(deleteProjectFromStore(mainProject.serializedId));
      navigate("/dashboard"); // Redirect to the projects list page
    }
  };

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
                  <div
                    className="projectRenderDataOption-button delete-button"
                    onClick={() => setDeleteTaskDialogActive(true)}
                  >
                    Delete <DeleteIcon />
                  </div>
                </>
              ) : (
                ""
              )}
              <div
                className="projectRenderDataOption-button"
                onClick={() => setAddTaskActive(true)}
              >
                Create Task
                <AddIcon />
              </div>
            </div>
          </div>
        );
      case 2:
        return <h1>Employees Content</h1>;
      case 3:
        return (
          <div className="settings">
            <div className="settingsContainer">
              <Button onClick={() => setEditTitleActive(true)}>
                Edit project title <EditIcon />
              </Button>
              <Button onClick={() => setEditDescriptionActive(true)}>
                Edit project description <EditIcon />
              </Button>
              <Button onClick={() => setEditDatesActive(true)}>
                Edit project dates <CalendarIcon />{" "}
              </Button>
              <Button
                className="deleteButton"
                onClick={() => setDeleteTaskDialogActive(true)}
              >
                Delete project <DeleteIcon />
              </Button>
            </div>
          </div>
        );
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
              projectEndDate={mainProject.endDate}
              projectStartDate={mainProject.startDate}
            />
            <AddTaskOnProjectModal
              open={addTaskActive}
              onClose={() => setAddTaskActive(false)}
              projectId={serializedId}
              dueDate={mainProject.endDate}
              startDate={mainProject.startDate}
            />
            <EditProjectNameDialog
              open={editTitleActive}
              onClose={() => setEditTitleActive(false)}
              mainProject={mainProject}
              onSave={handleSave}
            />
            <EditProjectDescriptionDialog
              open={editDescriptionActive}
              onClose={() => setEditDescriptionActive(false)}
              mainProject={mainProject}
              onSave={handleSave}
            />
            <EditProjectDatesDialog
              open={editDatesActive}
              onClose={() => setEditDatesActive(false)}
              mainProject={mainProject}
              onSave={handleSave}
            />
            <DeleteProjectDialog
              open={deleteDialogActive}
              onClose={() => setDeleteDialogActive(false)}
              onDelete={handleDeleteProject}
            />
            <DeleteTaskDialog
              open={deleteTaskDialogActive}
              onClose={() => deleteTaskDialogActive(false)}
            />
            <div className="projectInfoContainer">
              <h1>{mainProject.name || mainProject?.project_name}</h1>
              <IconButton onClick={() => setEditTitleActive(true)}>
                <EditIcon />
              </IconButton>
            </div>
            <div className="projectInfoContainer-section">
              <div className="projectInfoContainer-section_button">
                {mainProject.description.length > 50
                  ? "Open description"
                  : mainProject.description}
              </div>
              <div className="projectInfoContainer-section_button">
                <CalendarIcon />
                {mainProject.startDate} -{" "}
                {mainProject.endDate !== "0001-01-01"
                  ? mainProject.endDate
                  : "Indefinite"}
              </div>
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
