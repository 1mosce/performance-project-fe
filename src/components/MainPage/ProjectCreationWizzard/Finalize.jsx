import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulateDelay } from "../../../functions/functions";
import { useNavigate } from "react-router-dom";
import { setCompanyProjectsList } from "../../../store/features/companyFeatures/companySlice";

function Finalize() {
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preFetchedData = useSelector((state) => state.projectCreationWizzard);

  useEffect(() => {
    setSpinnerLoading(true);
    const payload = {
      id: "1",
      project_name: preFetchedData.project_name,
      project_status: "active",
      project_start_date: preFetchedData.project_start_date,
      project_end_date:
        preFetchedData.project_end_date !== ""
          ? preFetchedData.project_end_date
          : "Indefinite",
      project_assigned_employees: "0",
      project_updates_since_last_visit: "0",
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
