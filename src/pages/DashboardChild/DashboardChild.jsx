import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DashboardChild.scss";

import HeaderChild from "../../components/Parent/HeaderChild/HeaderChild";
import SingleChildTasks from "../../components/Parent/SingleChildTasks/SingleChildTasks";
import SingleChildGoals from "../../components/Parent/SingleChildGoals/SingleChildGoals";

const URL = import.meta.env.VITE_API_URL;

const DashboardChild = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [child, setChild] = useState(null);
  const [goals, setGoals] = useState(null);
  const { id } = useParams();

  const gettingNames = async () => {
    const response = await axios.get(`${URL}children/${id}`);
    setChild(response.data);
  };

  const gettingGoals = async () => {
    const response = await axios.get(`${URL}children/${id}/goals`);
    setGoals(response.data);
  };

  useEffect(() => {
    gettingNames();
    gettingGoals();
  }, []);

  if (!child || !goals) {
    return <main>Loading...</main>;
  }

  return (
    <>
      <HeaderChild name={child[0].name} setCurrentPage={setCurrentPage} />
      {currentPage === 0 && (
        <SingleChildTasks
          gettingNames={gettingNames}
          idParams={id}
          child={child}
        />
      )}
      {currentPage === 1 && (
        <SingleChildGoals id={id} goals={goals} gettingGoals={gettingGoals} />
      )}
    </>
  );
};

export default DashboardChild;
