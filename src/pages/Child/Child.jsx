import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Child.scss";
import ProfileKid from "./../../components/Child/ProfileKid/ProfileKid";
import Points from "../../components/Child/Points/Points";
import Dreams from "../../components/Child/Dreams/Dreams";
import Tasks from "../../components/Child/Tasks/Tasks";

const URL = import.meta.env.VITE_API_URL;

const Child = () => {
  const [childState, setChildState] = useState(null);
  const [childProfile, setChildProfile] = useState(null);

  const { id } = useParams();

  const getChildInfo = async () => {
    const response = await axios.get(`${URL}children`);
    const filtered = response.data.filter((child) => child.id == id);
    setChildState(filtered);
  };

  const getPersonalFile = async () => {
    const response = await axios(`${URL}children/${id}`);
    setChildProfile(response.data);
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
      <section className="child__upper">
        <ProfileKid name={childState[0].name} />
        <Points points={childState[0].current_points} />
        <Dreams />
      </section>
      <section className="child__lower">
        <Tasks />
      </section>
    </main>
  );
};

export default Child;
