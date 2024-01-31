import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";

import Home from "./pages/Home/Home";
import DashboardParent from "./pages/DashboardParent/DashboardParent";
import DashboardChild from "./pages/DashboardChild/DashboardChild";
import Child from "./pages/Child/Child";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/family" element={<DashboardParent />} />
        <Route path="/family/:id" element={<DashboardChild />} />
        <Route path="/child/:id" element={<Child />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
