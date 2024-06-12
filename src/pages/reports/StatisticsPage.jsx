import { useEffect, useState } from "react";
import "../../styles/pages/dashboard/statistics/index.scss";

import { Container, Divider, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import RenderAssignedPerson from "../../components/ProjectsPage/RenderAssignedPerson";
import Chart from "react-google-charts";

function Statistics() {
  const [activeButton, setActiveButton] = useState(1);
  const [assignee, setAssignee] = useState("");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [employeeSpeed, setEmployeeSpeed] = useState(0);
  const [employeeScore, setEmployeeScore] = useState(0);
  const [speedTimeframe, setSpeedTimeframe] = useState("Day");

  const { tasksList, employees } = useSelector((state) => state.company);

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleSpeedTimeframeChange = (timeframe) => {
    setSpeedTimeframe(timeframe);
  };

  useEffect(() => {
    setAvailableEmployees(employees);
  }, [employees]);

  useEffect(() => {
    const getDataAboutEmployee = (assigneeId) => {
      if (assigneeId) {
        const tasks = tasksList.filter(
          (task) => task.assigneeId === assigneeId
        );
        setEmployeeTasks(tasks);
      } else {
        setEmployeeTasks([]);
      }
    };
    getDataAboutEmployee(assignee);
  }, [assignee, tasksList]);

  useEffect(() => {
    const generateChartData = () => {
      const currentDate = new Date();

      const taskStatusCounts = employeeTasks.reduce(
        (acc, task) => {
          const dueDate = new Date(task.dueDate);
          if (task.statusId === "completed") {
            acc.completed += 1;
          } else if (task.statusId === "in_progress" && dueDate > currentDate) {
            acc.inProgress += 1;
          } else if (task.statusId === "in_progress" && dueDate < currentDate) {
            acc.overdue += 1;
          }
          return acc;
        },
        { completed: 0, inProgress: 0, overdue: 0 }
      );

      setChartData([
        ["Task Status", "Count"],
        ["Completed", taskStatusCounts.completed],
        ["In Progress", taskStatusCounts.inProgress],
        ["Overdue", taskStatusCounts.overdue],
      ]);

      // Calculate employee speed
      if (employeeTasks.length > 0) {
        const earliestTaskCreationTime = new Date(
          Math.min(
            ...employeeTasks.map((task) => new Date(task.id.creationTime))
          )
        );
        const totalDays =
          (currentDate - earliestTaskCreationTime) / (1000 * 60 * 60 * 24);

        let speed;
        switch (speedTimeframe) {
          case "Week":
            speed = (taskStatusCounts.completed / totalDays) * 7;
            break;
          case "Month":
            speed = (taskStatusCounts.completed / totalDays) * 30;
            break;
          default:
            speed = taskStatusCounts.completed / totalDays;
        }

        setEmployeeSpeed(speed.toFixed(2));
      } else {
        setEmployeeSpeed(0);
      }

      // Calculate median task completion time
      const completionTimes = employeeTasks
        .filter((task) => task.statusId === "completed")
        .map((task) => {
          const creationTime = new Date(task.id.creationTime);
          const completionTime = new Date(task.dueDate);
          return (completionTime - creationTime) / (1000 * 60 * 60 * 24);
        })
        .sort((a, b) => a - b);

      const medianTaskCompletionTime =
        completionTimes.length === 0
          ? 0
          : completionTimes.length % 2 === 0
          ? (completionTimes[completionTimes.length / 2 - 1] +
              completionTimes[completionTimes.length / 2]) /
            2
          : completionTimes[Math.floor(completionTimes.length / 2)];

      // Calculate employee score
      const scalingFactor = 100; // You can adjust this factor based on your requirements
      const score =
        taskStatusCounts.completed -
        taskStatusCounts.overdue -
        medianTaskCompletionTime / scalingFactor;
      setEmployeeScore(score.toFixed(2));
    };

    if (employeeTasks.length > 0) {
      generateChartData();
    } else {
      setChartData([]);
      setEmployeeSpeed(0);
      setEmployeeScore(0);
    }
  }, [employeeTasks, speedTimeframe]);

  const renderContent = () => {
    const currentDate = new Date();
    const tasksInProgress = employeeTasks.filter(
      (task) =>
        task.statusId === "in_progress" && new Date(task.dueDate) > currentDate
    ).length;
    const tasksCompleted = employeeTasks.filter(
      (task) => task.statusId === "completed"
    ).length;
    const overdueTasks = employeeTasks.filter(
      (task) =>
        task.statusId === "in_progress" && new Date(task.dueDate) < currentDate
    ).length;

    const chartOptions = {
      title: "Employee Tasks Distribution",
      pieHole: 0.4,
      slices: [
        { color: "#219653" }, // Completed
        { color: "#f2994a" }, // In Progress
        { color: "#eb5757" }, // Overdue
      ],
    };

    switch (activeButton) {
      case 1:
        return (
          <div className="renderStatistics">
            <div className="renderStatistics-Data">
              <div className="renderStatistics-Data-employeeSelection">
                <span>Select employee:</span>
                <Select
                  className="renderStatistics-Data-employeeSelection-select"
                  value={assignee}
                  onChange={handleAssigneeChange}
                  renderValue={(selected) => (
                    <RenderAssignedPerson personId={selected} />
                  )}
                >
                  {availableEmployees?.map((item, key) => (
                    <MenuItem value={item.serializedId} key={key}>
                      <RenderAssignedPerson personId={item.serializedId} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <Divider />
              <div className="renderStatistics-Data-selectionResult">
                <div className="renderStatistics-Data-selectionResult-currentEmployeeTasks">
                  <h3 className="renderStatistics-Data-selectionResult-currentEmployeeTasks-title">
                    Employee tasks
                    <Divider />
                  </h3>
                  {employeeTasks.length === 0 ? (
                    "No data available"
                  ) : (
                    <div>
                      <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={chartOptions}
                        width="100%"
                        height="300px"
                      />
                      <div className="renderStatistics-Data-selectionResult-currentEmployeeTasks-data">
                        <span>Total tasks: {employeeTasks.length}</span>
                        <span>Total tasks in progress: {tasksInProgress}</span>
                        <span>Total tasks completed: {tasksCompleted}</span>
                        <span>Total tasks overdue: {overdueTasks}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="renderStatistics-Data-selectionResult-currentEmployeeSpeed">
                  <h3 className="renderStatistics-Data-selectionResult-currentEmployeeSpeed-title">
                    Employee speed
                  </h3>
                  <Divider />
                  <div className="employee-speed-container">
                    <span className="employee-speed">{employeeSpeed} </span>
                    <span className="employee-speed-subtitle">Tasks per: </span>
                    <div className="employee-speed-buttons">
                      <div
                        className={`employee-speed-button ${
                          speedTimeframe === "Day" ? "active" : ""
                        }`}
                        onClick={() => handleSpeedTimeframeChange("Day")}
                      >
                        Day
                      </div>
                      <div
                        className={`employee-speed-button ${
                          speedTimeframe === "Week" ? "active" : ""
                        }`}
                        onClick={() => handleSpeedTimeframeChange("Week")}
                      >
                        Week
                      </div>
                      <div
                        className={`employee-speed-button ${
                          speedTimeframe === "Month" ? "active" : ""
                        }`}
                        onClick={() => handleSpeedTimeframeChange("Month")}
                      >
                        Month
                      </div>
                    </div>
                  </div>
                </div>
                <div className="renderStatistics-Data-selectionResult-currentEmployeeScore">
                  <h3 className="renderStatistics-Data-selectionResult-currentEmployeeScore-title">
                    Employee score
                    <Divider />
                  </h3>
                  <div className="employee-score-container">
                    <span className="employee-score">{employeeScore}</span>
                    <p>Metrics for score:</p>
                    <div className="employee-score-metric">
                      <span> Less than 0.00 - Bad</span>
                      <span>0.00 - 0.5 - Average</span>
                      <span>0.5 - 1.5- Good</span>
                      <span>Bigger than 1.5 - Amazing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <h3>In progress</h3>;
    }
  };

  const handleButtonClick = (value) => setActiveButton(value);

  return (
    <Container>
      <div className="statisticsPageHeader">
        <h1>Statistics</h1>
      </div>
      <Divider />
      <div className="statisticsButtonContainer">
        <div
          className={`projectDataContainer-button ${
            activeButton === 1 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Employees
        </div>
        <div
          className={`projectDataContainer-button ${
            activeButton === 2 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Tasks
        </div>
        <div
          className={`projectDataContainer-button ${
            activeButton === 3 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Projects
        </div>
      </div>
      {renderContent()}
    </Container>
  );
}

export default Statistics;
