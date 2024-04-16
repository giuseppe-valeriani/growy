import React, { useState, useEffect } from "react";
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}login`, {
        user: form.user.trim().toLowerCase(),
        password: form.password.toLowerCase(),
      });
      setIsLoggedIn(true);
      setAuthUser({
        name: e.target.user.value,
        token: response.data.accessToken,
      });
      setForm(startingForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <h1 className="home__hero">growy</h1>
      <form className="home__form" onSubmit={handleSubmit}>
        <label htmlFor="user" className="home__label"></label>
        <input
          type="text"
          id="user"
          name="user"
          placeholder="user"
          className="home__input"
          onChange={handleChange}
        />
        <label htmlFor="password" className="home__label"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="home__input"
          onChange={handleChange}
        />
        <button className="home__button">Log In</button>
      </form>
    </div>
  );
};

export default Home;
