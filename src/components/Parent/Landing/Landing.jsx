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

  return (
    <main className="landing">
      <h1 className="landing__title">
        Your kids are working hard! You have {tasksDone.is_completed} task/s to
        verify
      </h1>
    </main>
  );
};

export default Landing;
