import { useState } from "react";
import axios from "axios";
import "./Goal.scss";
import { useAuth } from "../../../contexts/authContext";

const URL = import.meta.env.VITE_API_URL;

const Goal = ({ goal, gettingGoals }) => {
  const { authUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !e.target.points.value ||
      e.target.points.value < 0 ||
      e.target.points.value > 10000
    ) {
      setError({ ...error, points: "Assigned points out of range" });
      return;
    }
    await axios.patch(
      `${URL}children/goals/${goal.id}`,
      {
        points: Number(e.target.points.value),
      },
      {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      }
    );
    setError({});
    gettingGoals();
    setIsEdit(false);
  };

  return (
    <span className="goal">
      <div>
        <div className="goal__name">{goal.goal}</div>
        <div className="goal__points">{goal.points} Pts</div>
      </div>
      {isEdit ? (
        <form onSubmit={handleSubmit} className="goal__form">
          <button type="submit" className="goal__button">
            Assign
          </button>
          <input type="number" className="goal__input" name="points" />
          <span className="goal__error">{error.points && error.points}</span>
        </form>
      ) : (
        <button onClick={() => setIsEdit(true)} className="goal__button">
          Edit Points
        </button>
      )}
    </span>
  );
};

export default Goal;
