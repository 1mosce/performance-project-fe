import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulateDelay } from "../../../functions/functions";
import { useNavigate } from "react-router-dom";
import { setCompanyProjectsList } from "../../../store/features/companyFeatures/companySlice";
import { v4 as uuid } from "uuid";
import { addNewCompanyProject } from "../../../functions/apiFunctions";

function Finalize() {
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preFetchedData = useSelector((state) => state.projectCreationWizzard);

  function convertDateToYMD(dateString) {
    if (!dateString) return "0000-00-00"; // Return default if dateString is empty or null
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    async function processData() {
      setSpinnerLoading(true);

      const payload = {
        id: {},
        name: preFetchedData.project_name,
        description: preFetchedData.project_description,
        startDate: convertDateToYMD(preFetchedData.project_start_date),
        endDate: convertDateToYMD(preFetchedData.project_end_date),
        mainMethodology: preFetchedData.project_mainMethodology,
        companyId: "65e393721c16253e2068c04e",
        statusId: null,
        teamId: "661d4d85be4848c99799fc62",
        // project_assigned_employees: "0",
        // project_updates_since_last_visit: "0",
      };
      const result = await addNewCompanyProject(payload);
      dispatch(setCompanyProjectsList(result));
      simulateDelay(5000).then(() => {
        setSpinnerLoading(false);
        navigate("/dashboard");
      });
    }
    processData();
  }, []); // Removed the dependency array

  useEffect(() => {
    if (preFetchedData) {
      if (
        preFetchedData.project_name === "" ||
        preFetchedData.project_description === "" ||
        preFetchedData.project_employeeCount === "" ||
        preFetchedData.project_mainMethodology === ""
      ) {
        navigate("/dashboard/project-creation-wizzard");
      }
    }
  }, [preFetchedData]);

  return (
    <>
      {spinnerLoading ? (
        <Backdrop open={spinnerLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        "spinner is not loading"
      )}
    </>
  );
}

export default Finalize;
