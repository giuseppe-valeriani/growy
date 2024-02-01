import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TasksPage.scss";
import leftIcon from "../../assets/icons/left-arrow.svg";
import SingleTaskKid from "../../components/Child/SIngleTaskKid/SingleTaskKid";

const URL = import.meta.env.VITE_API_URL;

const TasksPage = () => {
  const [tasks, setTasks] = useState();
  const { id } = useParams();

  const getTasks = async () => {
    const response = await axios.get(`${URL}children/${id}`);
    const filtered = response.data.filter((task) => task.is_completed === 0);
    setTasks(filtered);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleComplete = async (id) => {
    await axios.patch(`${URL}children/${id}/tasks`, { id: id });
    getTasks();
  };

  if (!tasks) {
    return <main>Loading...</main>;
  }

  if (tasks.length === 0) {
    return (
      <main className="tasks-page__none">
        <div className="tasks-page__divider">
          <Link to={`/child/${id}`}>
            <img className="tasks-page__icon" alt="back" src={leftIcon} />
          </Link>
          <span>You have no tasks left! Way to go!</span>
        </div>
        <img
          className="tasks-page__congrats"
          src={`${URL}icons/kidschores-52.png`}
        />
      </main>
    );
  }

  return (
    <main className="tasks-page">
      <div className="tasks-page__divider">
        <Link to={`/child/${id}`}>
          <img className="tasks-page__icon" alt="back" src={leftIcon} />
        </Link>
        <span className="tasks-page__text">Back to your Board</span>
      </div>
      <section className="tasks-page__tasks">
        {tasks.map((task) => (
          <SingleTaskKid
            task={task}
            key={task.id}
            handleComplete={handleComplete}
          />
        ))}
      </section>
    </main>
  );
};

export default TasksPage;
