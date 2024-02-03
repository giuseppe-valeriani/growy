import React, { useState } from "react";
import axios from "axios";
import "./SingleChildTasks.scss";
import TaskToVerify from "../../Parent/TaskToVerify/TaskToVerify";
import AddChildTask from "../AddChildTask/AddChildTask";

const URL = import.meta.env.VITE_API_URL;

const SingleChildTasks = ({ idParams, child, gettingChildren }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = async () => {
    const payload = { id: selectedTask };
    await axios.post(`${URL}children/${idParams}/add`, payload);
    gettingChildren();
  };

  return (
    <main className="single-child-tasks">
      <section className="single-child-tasks__tasks">
        {child.map((task) => (
          <TaskToVerify
            gettingChildren={gettingChildren}
            idParams={idParams}
            key={task.id}
            task={task}
          />
        ))}
      </section>
      <section className="single-child-tasks__tasks">
        {isAddTaskOpen ? (
          <AddChildTask
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            setIsAddTaskOpen={setIsAddTaskOpen}
            addTask={addTask}
          />
        ) : (
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="single-child-tasks__button"
          >
            add task
          </button>
        )}
      </section>
    </main>
  );
};

export default SingleChildTasks;
