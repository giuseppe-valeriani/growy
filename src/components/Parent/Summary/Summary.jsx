import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import axios from "axios";
import "./Summary.scss";

const URL = import.meta.env.VITE_API_URL;

const Summary = () => {
  const { authUser } = useAuth();
  const [tasksDone, setTasksDone] = useState(null);

  const getCompleted = async () => {
    const response = await axios.get(`${URL}children/goals`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
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
      <main className="summary">
        <h1 className="summary__title">
          Nothing to report! Work in progress...
        </h1>
      </main>
    );
  }

  if (tasksDone.length === 1) {
    return (
      <main className="summary">
        <h1 className="summary__title">
          Your kids are working hard! You have{" "}
          <span className="summary__number">{tasksDone.length}</span> task to
          verify
        </h1>
      </main>
    );
  }

  return (
    <main className="summary">
      <h1 className="summary__title">
        Your kids are working hard! You have{" "}
        <span className="summary__number">{tasksDone.length} </span>tasks to
        verify
      </h1>
    </main>
  );
};

export default Summary;
