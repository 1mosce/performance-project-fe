import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LayersIcon from "@mui/icons-material/Layers";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  setSpinnerLoadingFalse,
  setSpinnerLoadingTrue,
  unsetUserData,
} from "../store/features/globalFeatures/globalSlice.js";
import { simulateDelay } from "../functions/functions.js";

function DashboardLayout() {
  const [drawerState, setDrawerState] = useState(false);
  const [companyProjectsList, setCompanyProjectsList] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [dialogState, setDialogState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companyState = useSelector((state) => state.company);
  const isSpinnerLoading = useSelector(
    (state) => state.global.isSpinnerLoading
  );

  useEffect(() => {
    if (!companyState) {
    }
    setCompanyProjectsList(companyState.projectsList);
    setCompanyInfo(companyState.companyData);
  }, [companyState]);

  async function handleLogout() {
    dispatch(setSpinnerLoadingTrue());

    dispatch(unsetUserData());

    localStorage.removeItem("token");

    dispatch(setSpinnerLoadingFalse());

    navigate("/");
  }

  const DrawerMainList = (
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <Link style={{ textDecoration: "none" }} to="/dashboard/projects">
            <ListItemText primary="Projects" />
          </Link>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <Link style={{ textDecoration: "none" }} to="/dashboard/statistics">
            <ListItemText primary="Statistics" />
          </Link>
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
          <Link style={{ textDecoration: "none" }} to="/dashboard">
            <span>StaffFlow</span>
          </Link>
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
            <ListItem key={content?.serializedId}>
              <ListItemButton>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/dashboard/project/${content?.serializedId}`}
                >
                  <ListItemText
                    primary={content.name || content.project_name}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <Dialog
        open={dialogState}
        onClose={() => setDialogState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wanna logout? You will need to re-enter your
            credentials in order to access your profile again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogState(false);
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleLogout();
              setDialogState(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className="dashboardLayout">
        <Drawer open={drawerState}>{DrawerContent}</Drawer>
        <div className="dashboardLayout-menu">
          <IconButton onClick={() => setDrawerState(true)}>
            <MenuIcon />
          </IconButton>
          <span>StaffFlow</span>
        </div>
        <div className="dashboardLayout-infoSection">
          <span>{companyInfo?.name}</span>
          <div className="dashboardLayout-infoSection_cmpLogo" />
          <PersonIcon />
          <IconButton onClick={() => setDialogState(true)}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
