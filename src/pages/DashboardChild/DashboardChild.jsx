import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import "./DashboardChild.scss";
import SingleChildTasks from "../../components/Parent/SingleChildTasks/SingleChildTasks";
import SingleChildGoals from "../../components/Parent/SingleChildGoals/SingleChildGoals";
import HeaderChild from "../../components/Parent/HeaderChild/HeaderChild";

const URL = import.meta.env.VITE_API_URL;

const DashboardChild = () => {
  const { authUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [child, setChild] = useState(null);
  const [goals, setGoals] = useState(null);
  const [name, setName] = useState(null);
  const { id } = useParams();

  let currentField = "";
  let currentHeader = "";
  if (name) {
    currentField = name.filter((child) => child.id == id);
    currentHeader = currentField[0].name;
  }

  const gettingName = async () => {
    const response = await axios.get(`${URL}children`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    setName(response.data);
  };

  const gettingChildren = async () => {
    const response = await axios.get(`${URL}children/${id}`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    setChild(response.data);
  };

  const gettingGoals = async () => {
    const response = await axios.get(`${URL}children/${id}/goals`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    setGoals(response.data);
  };
  useEffect(() => {
    gettingName();
    gettingChildren();
    gettingGoals();
  }, []);

  if (!child || !goals) {
    return <main>Loading...</main>;
  }

  return (
    <>
      <HeaderChild name={currentHeader} setCurrentPage={setCurrentPage} />
      {currentPage === 0 && (
        <SingleChildTasks
          gettingChildren={gettingChildren}
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
