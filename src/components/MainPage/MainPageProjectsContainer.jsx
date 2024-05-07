import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import "../../styles/components/MainPageProjectsContainer.scss";

function MainPageProjectsContainer({ project }) {
  return (
    <div className="block">
      <div className="block_info">
        <p className="block_info_title">{project.project_name}</p>
        {project.project_status === "active" ? (
          <div className="status_active" />
        ) : (
          <div className="status_inactive" />
        )}
      </div>

      <div className="block_data">
        <CalendarTodayIcon />
        <span>
          {project.project_start_date} - {project.project_end_date}
        </span>
      </div>
      <div className="block_data">
        <PersonIcon />
        <span>{project.project_assigned_employees} Employees</span>
      </div>
      <div className="block_data">
        <RssFeedIcon />
        <span>{project.project_updates_since_last_visit} Updates</span>
      </div>
    </div>
  );
}

export default MainPageProjectsContainer;
