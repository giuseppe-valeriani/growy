import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./DreamsPage.scss";
import leftIcon from "../../assets/icons/left-arrow.svg";
import Dream from "../../components/Child/Dream/Dream";
import AddDream from "../../components/Child/AddDream/AddDream";
const URL = import.meta.env.VITE_API_URL;

const DreamsPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [dreams, setDreams] = useState(null);
  const [childPoints, setChildPoints] = useState(null);
  const { id } = useParams();

  const getDreams = async () => {
    const response = await axios.get(`${URL}children/${id}/goals`);
    setDreams(response.data);
  };

  const getPoints = async () => {
    const response = await axios.get(`${URL}children/${id}`);
    setChildPoints(response.data[0].current_points);
  };

  const addNewDream = async (dream) => {
    await axios.post(`${URL}children/${id}/goals/add`, {
      goal: dream,
    });
    setIsOpened(false);
    getDreams();
  };

  const redeemPoints = async (points, goalId) => {
    await axios.patch(`${URL}children/${id}`, { current_points: -points });
    await axios.delete(`${URL}children/goals/${goalId}`);
    getDreams();
    getPoints();
  };

  useEffect(() => {
    getDreams();
    getPoints();
  }, []);

  if (!dreams) {
    return <main>Loading...</main>;
  }

  if (dreams.length === 0) {
    return (
      <main className="dreams-page__none">
        <section className="dreams-page__divider">
          <Link to={`/child/${id}`}>
            <img className="dreams-page__icon" alt="back" src={leftIcon} />
          </Link>
          <span>What do you wish for?</span>
        </section>
        <section>
          {isOpened ? (
            <AddDream cancel={setIsOpened} addNewDream={addNewDream} />
          ) : (
            <button
              onClick={() => setIsOpened(true)}
              className="dreams-page__button"
            >
              Wish more
            </button>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="dreams-page__none">
      <section className="dreams-page__divider">
        <Link to={`/child/${id}`}>
          <img className="dreams-page__icon" alt="back" src={leftIcon} />
        </Link>
        <span>What do you wish for?</span>
      </section>
      <section className="dreams-page__card-container">
        {dreams.map((dream) => (
          <article key={dream.id} className="dreams-page__card">
            <Dream
              childPoints={childPoints}
              redeemPoints={redeemPoints}
              dream={dream}
            />
          </article>
        ))}
      </section>
      <section>
        {isOpened ? (
          <AddDream cancel={setIsOpened} addNewDream={addNewDream} />
        ) : (
          <button
            onClick={() => setIsOpened(true)}
            className="dreams-page__button"
          >
            Wish more
          </button>
        )}
      </section>
    </main>
  );
};

export default DreamsPage;
