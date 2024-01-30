import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskIcon.scss";

const URL = import.meta.env.VITE_API_URL;

const TaskIcon = ({ selectedIcon, setSelectedIcon }) => {
  const [listOpened, setListOpened] = useState(false);
  const [iconsList, setIconsList] = useState();

  const handleIconChoice = (icon) => {
    setSelectedIcon(icon);
    setListOpened(false);
  };

  const getIconsList = async () => {
    const response = await axios.get(`${URL}icons`);
    setIconsList(response.data);
  };

  useEffect(() => {
    getIconsList();
  }, []);

  if (listOpened) {
    return (
      <div>
        {iconsList.map((icon) => (
          <span onClick={() => handleIconChoice(icon.icon)} key={icon.id}>
            <img alt="icon" className="task-icon" src={`${URL}${icon.icon}`} />
          </span>
        ))}
      </div>
    );
  }
  return (
    <img
      onClick={() => setListOpened(true)}
      className="task-icon"
      alt=""
      src={`${URL}${selectedIcon}`}
    />
  );
};

export default TaskIcon;
