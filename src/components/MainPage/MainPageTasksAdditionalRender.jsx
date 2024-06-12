import {
  definePersonRoleContainerColor,
  defineStatusContainerColor,
} from "../../functions/functions";
import "../../styles/components/MainPageAdditionalRender.scss";

function TaskStatusContainer({ statusId }) {
  return (
    <div className={"taskStatus" + " " + defineStatusContainerColor(statusId)}>
      <p>{statusId}</p>
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
