import { useAuth } from "../../../contexts/authContext";
import "./AddProfile.scss";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const AddProfile = ({ setIsAddProfileOpen, getChildren }) => {
  const { authUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.name.value || e.target.name.value.length > 20) {
      return;
    }
    const newProfile = { name: e.target.name.value };
    await axios.post(`${URL}children/add`, newProfile, {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    getChildren();
    setIsAddProfileOpen(false);
  };

  return (
    <form className="add-profile" onSubmit={handleSubmit}>
      <input className="add-profile__input" name="name"></input>
      <button className="add-profile__button" type="submit">
        add
      </button>
    </form>
  );
};

export default AddProfile;
