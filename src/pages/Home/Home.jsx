import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.user.value) {
      navigate("/family");
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
    </div>
  );
};

export default Home;
