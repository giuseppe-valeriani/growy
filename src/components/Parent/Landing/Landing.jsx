import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Landing.scss";

const URL = import.meta.env.VITE_API_URL;

const Landing = () => {
  const [tasksDone, setTasksDone] = useState(null);

  const getCompleted = async () => {
    const response = await axios.get(`${URL}children/goals`);
    setTasksDone(response.data);
  };

  useEffect(() => {
    getCompleted();
  }, []);

  if (!tasksDone) {
    return <main>Loading...</main>;
  }

  if (tasksDone.length === 0) {
    return (
      <main className="landing">
        <h1 className="landing__title">
          Nothing to report! Work in progress...
        </h1>
      </main>
    );
  }

  if (tasksDone.length === 1) {
    return (
      <main className="landing">
        <h1 className="landing__title">
          Your kids are working hard! You have{" "}
          <span className="landing__number">{tasksDone.length}</span> task to
          verify
        </h1>
      </main>
    );
  }

  return (
    <main className="landing">
      <h1 className="landing__title">
        Your kids are working hard! You have{" "}
        <span className="landing__number">{tasksDone.length} </span>tasks to
        verify
      </h1>
    </main>
  );
};

export default Landing;
