import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./DreamsPage.scss";

const URL = import.meta.env.VITE_API_URL;

const DreamsPage = () => {
  const [dreams, setDreams] = useState(null);
  const { id } = useParams();

  const getDreams = async () => {
    const response = await axios.get(`${URL}children/${id}/goals`);
    setDreams(response.data);
  };

  useEffect(() => {
    getDreams();
  }, []);

  if (!dreams) {
    return <article>Loading...</article>;
  }
  return <Link to={`/child/${id}`}>my drams</Link>;
};

export default DreamsPage;
