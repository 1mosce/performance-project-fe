import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulateDelay } from "../../../functions/functions";
import { useNavigate } from "react-router-dom";
import { setCompanyProjectsList } from "../../../store/features/companyFeatures/companySlice";
import { v4 as uuid } from "uuid";

function Finalize() {
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preFetchedData = useSelector((state) => state.projectCreationWizzard);

  useEffect(() => {
    setSpinnerLoading(true);

    const payload = {
      id: {
        timestamp: new Date().getTime(),
        machine: Math.floor(Math.random() * 16777216),
        pid: Math.floor(Math.random() * 32767),
        increment: Math.floor(Math.random() * 16777216),
        creationTime: new Date().toISOString(),
      },
      serializedId: uuid(),
      name: preFetchedData.project_name,
      description: preFetchedData.project_description,
      statusId: "active",
      companyId: "65e393721c16253e2068c04e",
      teamId: "661d4d85be4848c99799fc62",
      // project_start_date: preFetchedData.project_start_date,
      // project_end_date:
      //   preFetchedData.project_end_date !== ""
      //     ? preFetchedData.project_end_date
      //     : "Indefinite",
      // project_assigned_employees: "0",
      // project_updates_since_last_visit: "0",
    };
    dispatch(setCompanyProjectsList(payload));
    simulateDelay(5000).then(() => {
      setSpinnerLoading(false);
      navigate("/dashboard");
    });
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
