import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Child.scss";

const URL = import.meta.env.VITE_API_URL;

const Child = () => {
  const [childProfile, setChildProfile] = useState(null);
  const { id } = useParams();

  const getPersonalFile = async () => {
    const response = await axios(`${URL}children/${id}`);
    setChildProfile(response.data);
  };

  useEffect(() => {
    getPersonalFile();
  }, []);

  console.log(childProfile);
  if (!childProfile) {
    return <main>Loading...</main>;
  }

  return <>childo</>;
};

export default Child;
