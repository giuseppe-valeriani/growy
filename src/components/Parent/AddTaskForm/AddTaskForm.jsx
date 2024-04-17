import { useState } from "react";
import "./AddTaskForm.scss";
import TaskIcon from "../TaskIcon/TaskIcon";

const taskFields = {
  task: "",
  frequence: "daily",
  icon: "",
  points: 0,
  is_skill: false,
};

const AddTaskForm = ({ setOpenedForm, formSubmission }) => {
  const [newTask, setNewTask] = useState(taskFields);
  const [selectedIcon, setSelectedIcon] = useState("icons/everyday-01.png");
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSwap = () => {
    setNewTask({ ...newTask, is_skill: !newTask.is_skill });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.task || newTask.length < 3 || newTask.length > 30) {
      setError({ ...error, task: "Invalid task provided" });
      return;
    }

    if (!newTask.points || newTask.points < 0 || newTask.points > 10000) {
      setError({ ...error, points: "Assigned points out of range" });
      return;
    }

    const addTask = {
      task: newTask.task.trim(),
      frequence: newTask.frequence,
      icon: selectedIcon,
      points: Number(newTask.points),
      is_skill: newTask.is_skill,
    };
    formSubmission(addTask);
    setError({});
    return setNewTask(taskFields);
  };
  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="add-task-form__task">
        <label htmlFor="task">New Task</label>
        <input
          type="text"
          name="task"
          id="task"
          value={newTask.task}
          className="add-task-form__input"
          onChange={handleChange}
        />
      </div>
      <span className="add-task-form__error">{error.task && error.task}</span>
      <div className="add-task-form__frequence">
        <label htmlFor="daily">Daily</label>
        <input
          type="radio"
          name="frequence"
          value="daily"
          id="daily"
          checked={newTask.frequence === "daily"}
          onChange={handleChange}
        />
        <label htmlFor="weekly">Weekly</label>
        <input
          type="radio"
          name="frequence"
          value="weekly"
          id="weekly"
          checked={newTask.frequence === "weekly"}
          onChange={handleChange}
        />
        <label htmlFor="sometimes">Sometimes</label>
        <input
          type="radio"
          name="frequence"
          value="sometimes"
          id="sometimes"
          checked={newTask.frequence === "sometimes"}
          onChange={handleChange}
        />
      </div>
      <div className="add-task-form__skill">
        <label htmlFor="skill">Is this a New Skill?</label>
        <input
          type="checkbox"
          name="isSkill"
          id="skill"
          checked={newTask.is_skill}
          onChange={handleSwap}
        />
      </div>
      <div className="add-task-form__points">
        <label htmlFor="points">How many points to assign?</label>
        <input
          type="number"
          name="points"
          id="points"
          className="add-task-form__numbers"
          onChange={handleChange}
        />
      </div>
      <span className="add-task-form__error">
        {error.points && error.points}
      </span>
      <div className="add-task-form__icon">
        <label htmlFor="icon">
          <input type="image" alt="" name="icon" id="icon" />
        </label>
        <TaskIcon
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
      <div className="add-task-form__buttons">
        <button
          className="add-task-form__button"
          onClick={() => setOpenedForm(false)}
        >
          Cancel
        </button>
        <button className="add-task-form__button">Add</button>
      </div>
    </form>
  );
};
export default AddTaskForm;
