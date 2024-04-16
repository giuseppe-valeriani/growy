import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddChildTask.scss";
import { useAuth } from "../../../contexts/authContext";

const URL = import.meta.env.VITE_API_URL;

const AddChildTask = ({
  setIsAddTaskOpen,
  selectedTask,
  setSelectedTask,
  addTask,
}) => {
  const { authUser } = useAuth();
  const [tasks, setTasks] = useState(null);

  const handleClick = () => {
    if (!selectedTask) {
      return;
    }
    addTask();
    setIsAddTaskOpen(false);
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get(`${URL}tasks/fast`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      setTasks(response.data);
    };
    getTasks();
  }, []);

  if (!tasks) {
    return <>Loading...</>;
  }

  return (
    <>
      <ul className="add-child-task">
        {tasks.map((task) => (
          <li
            onClick={() => setSelectedTask(task.id)}
            className={`add-child-task__element ${
              selectedTask === task.id && "add-child-task__selected"
            }`}
            key={task.id}
          >
            <div>{task.task}</div>
            <img
              className="add-child-task__icon"
              src={`${URL}${task.icon}`}
              alt="task icon"
            />
          </li>
        ))}
      </ul>
      <div className="add-child-task__buttons">
        <button
          onClick={() => setIsAddTaskOpen(false)}
          className="add-child-task__button"
        >
          cancel
        </button>
        <button onClick={handleClick} className="add-child-task__button">
          add task
        </button>
      </div>
    </>
  );
};

export default AddChildTask;
