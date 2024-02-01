import { useState } from "react";
import "./SingleTaskKid.scss";
const URL = import.meta.env.VITE_API_URL;

const SingleTaskKid = ({
  task: { task, id, icon, frequence, points, is_skill, is_completed },
  handleComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <article onClick={() => setIsOpen(true)} className="single-task-kid">
      <div className="single-task-kid__divider">
        <div className="single-task-kid__task">{task}</div>
        <img
          className="single-task-kid__icon"
          src={`${URL}${icon}`}
          alt={task}
        />
      </div>
      <div className="single-task-kid__info">
        <div className="single-task-kid__red">
          <div className="single-task-kid__frequence">{frequence}</div>
          <div className="single-task-kid__points">{points} Pts</div>
        </div>
        {is_skill === 1 && (
          <img
            className="single-task-kid__skill"
            alt="a little star"
            src={`${URL}icons/kidschores-53.png`}
          />
        )}
        {isOpen && (
          <img
            onClick={() => handleComplete(id)}
            className="single-task-kid__done"
            alt="ticked"
            src={`${URL}icons/kidschores-55.png`}
          />
        )}
      </div>
    </article>
  );
};

export default SingleTaskKid;
