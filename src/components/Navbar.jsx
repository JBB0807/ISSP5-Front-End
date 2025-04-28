import React, { useState, useEffect } from "react";
import "../scss/styles.scss";
import "../scss/components/_navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <nav className={`navbar ${glitchEffect ? "navbar--glitch" : ""}`}>
      <div className="navbar__logo">
        <div className="navbar__logo-scanner"></div>
        <span className="navbar__logo-text">
          BATTLE<span className="navbar__logo-text">SNAKE</span>
        </span>
      </div>

      <ul className="navbar__links">
        <li>
          <Link
            to="/"
            className={`navbar__link ${
              activeLink === "/" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">⚡</span>
            <span className="navbar__link-text">HOME</span>
            <span className="navbar__link-hover"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/notebook"
            className={`navbar__link ${
              activeLink === "/notebook" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">📓</span>
            <span className="navbar__link-text">NOTEBOOK</span>
            <span className="navbar__link-hover"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/assignment"
            className={`navbar__link ${
              activeLink === "/assignment" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">🎯</span>
            <span className="navbar__link-text">ASSIGNMENT</span>
            <span className="navbar__link-hover"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/editor"
            className={`navbar__link ${
              activeLink === "/editor" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">💻</span>
            <span className="navbar__link-text">EDITOR</span>
            <span className="navbar__link-hover"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={`navbar__link ${
              activeLink === "/login" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">🔒</span>
            <span className="navbar__link-text">LOGIN</span>
            <span className="navbar__link-hover"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
