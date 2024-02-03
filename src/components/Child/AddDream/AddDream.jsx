import { useState } from "react";
import "./AddDream.scss";

const AddDream = ({ addNewDream, cancel }) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewDream(goal);
  };

  const handleChange = (e) => {
    setGoal(e.target.value);
  };
  return (
    <>
      <form className="add-dream" onSubmit={handleSubmit}>
        <label>
          <input
            className="add-dream__input"
            onChange={handleChange}
            name="goal"
          />
        </label>
        <button className="add-dream__button">Add</button>
        <button className="add-dream__button" onClick={() => cancel(false)}>
          cancel
        </button>
      </form>
    </>
  );
};

export default AddDream;
