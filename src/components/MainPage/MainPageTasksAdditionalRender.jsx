import {
  definePersonRoleContainerColor,
  defineStatusContainerColor,
} from "../../functions/functions";
import "../../styles/components/MainPageAdditionalRender.scss";

function TaskStatusContainer({ status }) {
  return (
    <div className={"taskStatus" + " " + defineStatusContainerColor(status)}>
      <p>{status}</p>
    </div>
  );
}

function TaskAssignedPersonRole({ assigned_person_role }) {
  return (
    <div
      className={
        "personRole" +
        " " +
        definePersonRoleContainerColor(assigned_person_role)
      }
    >
      <p>{assigned_person_role}</p>
    </div>
  );
}

export { TaskAssignedPersonRole, TaskStatusContainer };
