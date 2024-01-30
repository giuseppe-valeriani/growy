import React, { useState } from "react";
import "./DashboardParent.scss";

import Header from "../../components/Parent/Header/Header";
import Landing from "../../components/Parent/Landing/Landing";
import Profile from "../../components/Parent/Profile/Profile";
import TasksList from "../../components/Parent/TasksList/TasksList";

const DashboardParent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === 0 && <Landing />}
      {currentPage === 1 && <Profile />}
      {currentPage === 2 && <TasksList />}
    </>
  );
};

export default DashboardParent;
