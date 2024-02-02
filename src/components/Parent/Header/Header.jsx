import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = ({ setCurrentPage }) => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink
          to="/family"
          className="nav__logo"
          onClick={() => setCurrentPage(0)}
        >
          growy
        </NavLink>
        <ul className="nav__list">
          <li className="nav__item" onClick={() => setCurrentPage(1)}>
            profile
          </li>
          <li className="nav__item" onClick={() => setCurrentPage(2)}>
            tasks
          </li>
          {/* <li className="nav__item" onClick={() => setCurrentPage(3)}>
            points
          </li>
          <li className="nav__item" onClick={() => setCurrentPage(4)}>
            goals
          </li> */}
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

export default Header;
