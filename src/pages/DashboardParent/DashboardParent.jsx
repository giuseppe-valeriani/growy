import React, { useState } from "react";
import "./DashboardParent.scss";

import Header from "../../components/Parent/Header/Header";
import Summary from "../../components/Parent/Summary/Summary";
import Profile from "../../components/Parent/Profile/Profile";
import TasksList from "../../components/Parent/TasksList/TasksList";

const DashboardParent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <span>
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === 0 && <Summary />}
      {currentPage === 1 && <Profile />}
      {currentPage === 2 && <TasksList />}
    </span>
  );
};

export default DashboardParent;
