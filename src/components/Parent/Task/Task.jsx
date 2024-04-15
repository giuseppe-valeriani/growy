import React, { useState } from "react";
import axios from "axios";
import "./Task.scss";
import deleteIcon from "../../../assets/icons/delete.png";
import { useAuth } from "../../../contexts/authContext";

const URL = import.meta.env.VITE_API_URL;

const Task = ({
  task: { task, frequence, icon, points, is_skill, id },
  retrieveTasks,
}) => {
  const { authUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    setIsDeleting((prev) => !prev);
  };

  const handleDelete = async () => {
    await axios.delete(`${URL}tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    retrieveTasks();
  };

  return (
    <article onClick={handleClick} className="task">
      <div className="task__divider">
        <div className="task__task">{task}</div>
        <img className="task__icon" src={`${URL}${icon}`} alt={task} />
      </div>
      <div className="task__info">
        <div className="task__red">
          <div className="task__frequence">{frequence}</div>
          <div className="task__points">{points} Pts</div>
        </div>
        {isDeleting && (
          <img
            onClick={handleDelete}
            className="task__delete"
            src={deleteIcon}
            alt="deleting icon"
          />
        )}
        {is_skill === 1 && (
          <img
            className="task__skill"
            alt="a little star"
            src={`${URL}icons/kidschores-53.png`}
          />
        )}
      </div>
    </article>
  );
};

export default Task;
