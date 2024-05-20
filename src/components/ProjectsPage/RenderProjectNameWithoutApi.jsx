import React from "react";
import { Box, Typography } from "@mui/material";

const RenderProjectNameWithoutApi = ({ projectName }) => {
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

export default RenderProjectNameWithoutApi;
