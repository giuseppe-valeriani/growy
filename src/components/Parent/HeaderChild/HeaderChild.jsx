import React from "react";
import { NavLink } from "react-router-dom";
import "../Header/Header.scss";

const HeaderChild = ({ setCurrentPage, name }) => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/family" className="nav__logo">
          growy
        </NavLink>
        <ul className="nav__list">
          <li className="nav__item" onClick={() => setCurrentPage(0)}>
            {name}
          </li>
          <li className="nav__item" onClick={() => setCurrentPage(1)}>
            goals
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="/">
              logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderChild;
