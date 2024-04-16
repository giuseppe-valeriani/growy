import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Home from "./pages/Home/Home";
import DashboardParent from "./pages/DashboardParent/DashboardParent";
import DashboardChild from "./pages/DashboardChild/DashboardChild";
import Child from "./pages/Child/Child";
import DreamsPage from "./pages/DreamsPage/DreamsPage";
import TasksPage from "./pages/TasksPage/TasksPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/family" element={<DashboardParent />} />
      <Route path="/family/:id" element={<DashboardChild />} />
      <Route path="/child/:id" element={<Child />} />
      <Route path="/child/:id/dreams" element={<DreamsPage />} />
      <Route path="/child/:id/tasks" element={<TasksPage />} />
    </Routes>
  );
};

export default App;
