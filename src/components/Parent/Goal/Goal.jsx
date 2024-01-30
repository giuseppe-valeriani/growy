import { useState } from "react";
import axios from "axios";
import "./Goal.scss";

const URL = import.meta.env.VITE_API_URL;

const Goal = ({ idParams, goal, gettingGoals }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`${URL}children/goals/${idParams}`, {
      points: Number(e.target.points.value),
    });
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
            Assing
          </button>
          <input type="number" className="goal__input" name="points" />
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
