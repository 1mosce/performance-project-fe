import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  API_PATH_GET_COMPANY_BY_ID,
  API_ROUTE_DEV,
} from "../../constants/constants";
import { performGetRequestToApi } from "../../functions/apiFunctions";

const RenderAssignedPerson = ({ personId }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const connectionString =
          API_ROUTE_DEV +
          API_PATH_GET_COMPANY_BY_ID +
          "65e393721c16253e2068c04e" +
          "/users";

        const result = await performGetRequestToApi(connectionString);
        if (result.data) {
          const foundPerson = result.data.find(
            (item) => item.serializedId === personId
          );
          setPerson(foundPerson);
        }
      } catch (error) {
        console.error("Error fetching person data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [personId]);

  if (loading) {
    return <CircularProgress size={20} />;
  }

  if (!person) {
    return <Typography variant="body2">Unknown Person</Typography>;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="20px"
      bgcolor="#4285F4"
      p={1}
      px={2}
      sx={{ color: "white", width: "fit-content" }}
    >
      <Typography variant="body1">{person.name}</Typography>
      <Box
        ml={2}
        bgcolor="white"
        borderRadius="10px"
        p={0.5}
        px={1.5}
        sx={{ color: "black" }}
      >
        <Typography variant="body2" fontWeight="bold">
          {person.role || "SFTWR"}
        </Typography>
      </Box>
    </Box>
  );
};

export default RenderAssignedPerson;
