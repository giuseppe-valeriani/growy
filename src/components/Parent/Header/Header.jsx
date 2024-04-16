import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import "./Header.scss";

const Header = ({ setCurrentPage }) => {
  const { setAuthUser, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
  };

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
          <li className="nav__item">
            <NavLink onClick={handleLogout} className="nav__link" to="/">
              logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
