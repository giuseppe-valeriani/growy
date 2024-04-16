import React from "react";
import axios from "axios";
import "./TaskToVerify.scss";
import { useAuth } from "../../../contexts/authContext";

const URL = import.meta.env.VITE_API_URL;

const TaskToVerify = ({
  idParams,
  gettingChildren,
  task: { task, frequence, icon, points, is_skill, is_completed, id: taskId },
}) => {
  const { authUser } = useAuth();
  const handleVerify = async () => {
    const payload = { id: taskId };

    await axios.patch(
      `${URL}children/${idParams}`,
      { current_points: points },
      {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      }
    );

    await axios.delete(`${URL}children/${taskId}/tasks`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
      data: payload,
    });
    gettingChildren();
  };
  return (
    <article className="task-to-verify">
      <div className="task-to-verify__divider">
        <div className="task-to-verify__task">{task}</div>
        <img
          className="task-to-verify__icon"
          src={`${URL}${icon}`}
          alt={task}
        />
      </div>
      <div className="task-to-verify__info">
        <div className="task-to-verify__red">
          <div className="task-to-verify__frequence">{frequence}</div>
          <div className="task-to-verify__points">{points} Pts</div>
        </div>
        {is_skill === 1 && (
          <img
            className="task-to-verify__skill"
            alt="a little star"
            src={`${URL}icons/kidschores-53.png`}
          />
        )}
        {is_completed ? (
          <img
            onClick={handleVerify}
            className="task-to-verify__skill task-to-verify__delete"
            alt="done"
            src={`${URL}icons/kidschores-54.png`}
          />
        ) : (
          <img
            className="task-to-verify__skill"
            alt="a cushion"
            src={`${URL}icons/everyday-28.png`}
          />
        )}
      </div>
    </article>
  );
};

export default TaskToVerify;
