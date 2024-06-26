import React, { useState, useEffect, useDebugValue } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import "./Home.scss";

const URL = import.meta.env.VITE_API_URL;

const startingForm = {
  user: "",
  password: "",
};

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, authUser, setAuthUser } = useAuth();
  const [form, setForm] = useState(startingForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (authUser.name === "romolo") {
        navigate("/child/1");
      } else if (authUser.name === "remo") {
        navigate("/child/2");
      } else if (authUser.name === "sara") {
        navigate("/child/3");
      } else if (authUser.name === "parent") {
        navigate("/family");
      } else navigate("/");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(`${URL}login`, {
        user: form.user.trim().toLowerCase(),
        password: form.password.toLowerCase(),
      });
      setIsLoggedIn(true);
      setAuthUser({
        name: form.user,
        token: response.data.accessToken,
      });
      setForm(startingForm);
    } catch (error) {
      setError("error");
    }
  };

  return (
    <div className="home">
      <div className="home__text-side">
        <div className="home__title">
          Chores made <span className="home__title--word">fun</span>, kids take
          charge!
        </div>
        <p className="home__paragraph">
          Growy is designed to empower diligent kids by making chores enjoyable
          and rewarding. With easy chore tracking and progress monitoring,
          children take ownership of their responsibilities while learning new
          tasks. Encouraging good behavior and providing satisfaction through
          achievement, we offer little treats along the way, making every task a
          joyful adventure!
        </p>
      </div>
      <div className="home__picture-side">
        <h1 className="home__hero">growy</h1>
        <form className="home__form" onSubmit={handleSubmit}>
          <label htmlFor="user" className="home__label"></label>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="user"
            className={`home__input${error && ` home__error`}`}
            onChange={handleChange}
          />
          <label htmlFor="password" className="home__label"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className={`home__input${error && ` home__error`}`}
            onChange={handleChange}
          />
          <button className="home__button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
