import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import axios from "axios";
import "./TasksList.scss";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";

const URL = import.meta.env.VITE_API_URL;

const TasksList = () => {
  const { authUser } = useAuth();
  const [tasks, setTasks] = useState(null);

  const retrieveTasks = async () => {
    const response = await axios.get(`${URL}tasks/list`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    setTasks(response.data);
  };

  useEffect(() => {
    retrieveTasks(setTasks);
  }, []);

  if (!tasks) {
    return <div className="tasks-list__loading">Loading...</div>;
  }

  return (
    <main>
      <section className="tasks-list">
        <ul className="tasks-list__list">
          {tasks.map((task) => (
            <li key={task.id}>
              <Task retrieveTasks={retrieveTasks} task={task} />
            </li>
          ))}
        </ul>
      </section>
      <AddTask retrieveTasks={retrieveTasks} />
    </main>
  );
};

export default TasksList;
