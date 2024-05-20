import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { API_PATH_PROJECTS, API_ROUTE_DEV } from "../../constants/constants";
import { performGetRequestToApi } from "../../functions/apiFunctions";
import { useSelector } from "react-redux";

// Function to generate the styled div
const RenderProjectName = ({ projectId }) => {
  const [projectName, setProjectName] = useState();
  const handleProjectName = (value) => setProjectName(value);
  const { projectsList } = useSelector((state) => state.company);
  useEffect(() => {
    async function fetchData() {
      const connectionString =
        API_ROUTE_DEV + API_PATH_PROJECTS + "/" + projectId;

      const result = await performGetRequestToApi(connectionString);
      if (result.data) {
        handleProjectName(result.data.name);
      } else {
        console.log(projectsList);
        const project = projectsList.find(
          (item) => item.serializedId === projectId
        );
        handleProjectName(project?.name ? project.name : "NOT FOUND");
      }
    }
    fetchData();
  }, [projectId, projectsList]);

  return (
    <Box
      margin="0px auto"
      display="flex"
      alignItems="center"
      borderRadius="20px"
      bgcolor="#4285F4"
      p={1}
      px={2}
      sx={{ color: "white", width: "fit-content" }}
    >
      <Typography variant="body1">{projectName}</Typography>
    </Box>
  );
};

export default RenderProjectName;
