import React, { useState, useEffect, useRef } from "react";
import "../scss/styles.scss";
import "../scss/components/_navbar.scss";
import { Link } from "react-router-dom";

const authUrl = import.meta.env.VITE_AUTH_URL;

// Using URL reference for ByteCamp logo
const bytecampLogo = "/images/bytecamp.png";

const Navbar = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  async function handleLogout() {
    window.open(`${authUrl}/auth/logout`, "_self");
  }

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 3000);

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    async function fetchUser() {
      const res = await fetch(`${authUrl}/auth/current_user`, {
        credentials: "include", // very important
      });
      if (res.ok) {
        console.log("User response:", res);
        const user = await res.json();
        //checking user response
        // console.log("User:", user);
        // console.log("User display name:", user.displayName);

        setUser(user);
      } else {
        setUser(null);
      }
    }
    fetchUser();

    return () => {
      clearInterval(glitchInterval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`navbar ${glitchEffect ? "navbar--glitch" : ""} ${
        menuOpen ? "navbar--menu-open" : ""
      }`}
    >
      <div className="navbar__logo">
        <div className="navbar__logo-scanner"></div>
        <img
          src={bytecampLogo}
          alt="ByteCamp Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span className="navbar__logo-text">
          BYTE<span className="navbar__logo-text">CAMP</span>
        </span>
      </div>

      <div className="navbar__hamburger" onClick={toggleMenu}>
        <div
          className={`navbar__hamburger-line ${menuOpen ? "active" : ""}`}
        ></div>
        <div
          className={`navbar__hamburger-line ${menuOpen ? "active" : ""}`}
        ></div>
        <div
          className={`navbar__hamburger-line ${menuOpen ? "active" : ""}`}
        ></div>
      </div>

      {user && (
        <div className="navbar__greeting">
          <span className="navbar__greeting-text">WELCOME</span>
          <span className="navbar__greeting-name">{user.displayName}</span>
        </div>
      )}

      <ul
        className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        ref={menuRef}
      >
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
        {user && user.role === "instructor" && (
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
        )}
        {user && user.role === "student" && (        
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
        )}
        <li>
          {user ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className={`navbar__link`}
            >
              <span className="navbar__link-icon">🔓</span>
              <span className="navbar__link-text">LOGOUT</span>
              <span className="navbar__link-hover"></span>
            </a>
          ) : (
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
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;