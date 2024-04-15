import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import "./Home.scss";

const URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/family");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${URL}login`, {
      user: e.target.user.value,
      password: e.target.password.value,
    });
    setIsLoggedIn(true);
    setAuthUser({
      name: e.target.user.value,
      token: response.data.accessToken,
    });

    // if (e.target.user.value === "romolo") {
    //   navigate("/child/1");
    // } else if (e.target.user.value === "remo") {
    //   navigate("/child/2");
    // } else if (e.target.user.value === "sara") {
    //   navigate("/child/3");
    // } else {
    //   navigate("/family");
    // }
  };

  return (
    <div className="home">
      <h1 className="home__hero">growy</h1>
      {!isLoggedIn && (
        <form className="home__form" onSubmit={handleSubmit}>
          <label htmlFor="user" className="home__label"></label>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="user"
            className="home__input"
          />
          <label htmlFor="password" className="home__label"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="home__input"
          />
          <button className="home__button">Log In</button>
        </form>
      )}
    </div>
  );
};

export default Home;
