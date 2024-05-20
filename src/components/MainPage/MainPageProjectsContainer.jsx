import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import "../../styles/components/MainPageProjectsContainer.scss";

function MainPageProjectsContainer({ project }) {
  return (
    <div className="block">
      <div className="block_info">
        <p className="block_info_title">
          {project.name || project.project_name}
        </p>
        {project.project_status === "active" ? (
          <div className="status_active" />
        ) : (
          <div className="status_inactive" />
        )}
      </div>

      <div className="block_data">
        <CalendarTodayIcon />
        <span>INDEV! DUE_DATE OF PROJECT</span>
      </div>
      <div className="block_data">
        <PersonIcon />
        <span>INDEV! TOTAL EMPLOYEES ON PROJECT</span>
      </div>
      <div className="block_data">
        <RssFeedIcon />
        <span>INDEV! LAST UPDATES</span>
      </div>
    </div>
  );
}

export default MainPageProjectsContainer;
