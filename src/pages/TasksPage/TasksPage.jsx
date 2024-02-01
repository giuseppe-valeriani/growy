import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TasksPage.scss";
import SingleTaskKid from "../../components/Child/SIngleTaskKid/SingleTaskKid";

const URL = import.meta.env.VITE_API_URL;

const TasksPage = () => {
  const [tasks, setTasks] = useState();
  const { id } = useParams();

  const getTasks = async () => {
    const response = await axios.get(`${URL}children/${id}`);
    setTasks(response.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (!tasks) {
    return <main>Loading...</main>;
  }

  if (tasks.length === 0) {
    return <main>You have no tasks left! Way to go!</main>;
  }
  return (
    <main className="tasks-page">
      <section className="tasks-page__tasks">
        {tasks.map((task) => (
          <SingleTaskKid task={task} key={task.id} />
        ))}
      </section>
    </main>
  );
};

export default TasksPage;
