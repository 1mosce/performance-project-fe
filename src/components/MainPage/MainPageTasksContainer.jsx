import PersonIcon from "@mui/icons-material/Person";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LayersIcon from "@mui/icons-material/Layers";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "../../styles/components/MainPageProjectsContainer.scss";
import {
  TaskAssignedPersonRole,
  TaskStatusContainer,
} from "./MainPageTasksAdditionalRender";
import RenderProjectName from "../ProjectsPage/RenderProjectName";

function MainPageTasksContainer({ task }) {
  return (
    <div className="block">
      <div className="block_info">
        <p className="block_info_title">{task.title}</p>
      </div>

      <div className="block_data">
        <AccountTreeIcon />
        <RenderProjectName projectId={task.projectId} />
      </div>
      <div className="block_data">
        <LayersIcon />
        <TaskStatusContainer status={task.task_status} />
      </div>
      <div className="block_data">
        <PersonIcon />
        <span>{task.task_assigned_person}</span>
        <TaskAssignedPersonRole
          assigned_person_role={task.task_assigned_person_role}
        />
      </div>
    </div>
  );
}

export default MainPageTasksContainer;
