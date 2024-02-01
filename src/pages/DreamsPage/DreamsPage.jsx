import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./DreamsPage.scss";
import leftIcon from "../../assets/icons/left-arrow.svg";
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

  if (dreams.length === 0) {
    return <main>Time to Dream...</main>;
  }

  return (
    <main className="dreams__none">
      <div className="dreams__divider">
        <Link to={`/child/${id}`}>
          <img className="dreams__icon" alt="back" src={leftIcon} />
        </Link>
        <span>What do you wish for?</span>
      </div>
    </main>
  );
};

export default DreamsPage;
