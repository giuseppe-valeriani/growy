import { useState } from "react";
import axios from "axios";
import "./AddTask.scss";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

const URL = import.meta.env.VITE_API_URL;

const AddTask = ({ retrieveTasks }) => {
  const [openedForm, setOpenedForm] = useState(false);

  const formSubmission = async (payload) => {
    await axios.post(`${URL}tasks/add`, payload);
    setOpenedForm(false);
    retrieveTasks();
  };

  if (!openedForm) {
    return (
      <section className="add-task">
        <button className=" add-task__button" onClick={setOpenedForm}>
          Add Task
        </button>
      </section>
    );
  }

  return (
    <section className="add-task">
      <AddTaskForm
        setOpenedForm={setOpenedForm}
        formSubmission={formSubmission}
      />
    </section>
  );
};
export default AddTask;
