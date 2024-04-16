import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Child.scss";
import logout from "../../assets/icons/logout.png";
import ProfileKid from "./../../components/Child/ProfileKid/ProfileKid";
import Points from "../../components/Child/Points/Points";
import Dreams from "../../components/Child/Dreams/Dreams";
import Tasks from "../../components/Child/Tasks/Tasks";
import { useAuth } from "../../contexts/authContext";

const URL = import.meta.env.VITE_API_URL;

const Child = () => {
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const [childState, setChildState] = useState(null);
  const [childProfile, setChildProfile] = useState(null);

  const { id } = useParams();

  const getChildInfo = async () => {
    const response = await axios.get(`${URL}children`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    const filtered = response.data.filter((child) => child.id == id);
    setChildState(filtered);
  };

  const getPersonalFile = async () => {
    const response = await axios(`${URL}children/${id}`, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    setChildProfile(response.data);
  };

  const handleLogout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    getChildInfo();
    getPersonalFile();
  }, []);

  if (!childState || !childProfile) {
    return <main>Loading...</main>;
  }

  return (
    <main className="child">
      <section className="child__nav">
        <ProfileKid name={childState[0].name} />
        <Link onClick={handleLogout} to="/" className="child__logout">
          <img className="child__logout-icon" src={logout} alt="logout" />
        </Link>
      </section>
      <section className="child__section">
        <h1>This is your Taskboard</h1>
        <div className="child__board">
          <Tasks />
          <Points points={childState[0].current_points} />
        </div>
      </section>
      <section className="child__section">
        <Dreams />
      </section>
    </main>
  );
};

export default Child;
