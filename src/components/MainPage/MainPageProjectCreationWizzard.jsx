import { Button, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function MainPageProjectCreationWizzard() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default MainPageProjectCreationWizzard;
