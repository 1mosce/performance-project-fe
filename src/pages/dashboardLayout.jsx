import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/pages/dashboard/index.scss";
import {
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LayersIcon from "@mui/icons-material/Layers";
import { useEffect, useState } from "react";
import { API_PATH_GET_PROJECTS_LIST } from "../constants/constants.js";
import { setCompanyProjectsList } from "../store/features/companyFeatures/companySlice.js";
import { useSelector, useDispatch, Provider } from "react-redux";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [drawerState, setDrawerState] = useState(false);
  const [companyProjectsList, setCompanyProjectsList] = useState([]);

  const dispatch = useDispatch();

  const companyProjectsList_toSet = useSelector(
    (state) => state.company.projectsList
  );

  useEffect(() => {
    setCompanyProjectsList(companyProjectsList_toSet);
  }, [companyProjectsList_toSet]);

  const DrawerMainList = (
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const DrawerContent = (
    <Box
      sx={{ width: 287 }}
      role="presentation"
      onClick={() => setDrawerState(false)}
    >
      <div className="dashboardLayout-header">
        <div className="dashboardLayout-header_titleContainer">
          <span>StaffFlow</span>
        </div>
        <div className="dashboardLayout-header_closeButtonContainer">
          <IconButton onClick={() => setDrawerState(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Divider />
      {DrawerMainList}
      <Divider />
      {companyProjectsList?.length === 0 ? (
        <span>No projects available...</span>
      ) : (
        <List>
          {companyProjectsList?.map((content) => (
            <ListItem key={content.id}>
              <ListItemButton>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={content.project_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <div className="dashboardLayout">
        <Drawer open={drawerState}>{DrawerContent}</Drawer>
        <div className="dashboardLayout-menu">
          <IconButton onClick={() => setDrawerState(true)}>
            <MenuIcon />
          </IconButton>
          <span>StaffFlow</span>
        </div>
        <div className="dashboardLayout-infoSection">
          <span>Company Name</span>
          <div className="dashboardLayout-infoSection_cmpLogo" />
          <PersonIcon />
          <LogoutIcon />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
