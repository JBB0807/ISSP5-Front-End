import React from "react";
import "../scss/styles.scss";
import "../scss/components/_navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links">
        <li>
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/notebook" className="navbar__link">
            NoteBook
          </Link>
        </li>
        <li>
          <Link to="/assignment" className="navbar__link">
            Assignment
          </Link>
        </li>
        <li>
          <Link to="/editor" className="navbar__link">
            Editor
          </Link>
        </li>
        <li>
          <Link to="/login" className="navbar__link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
