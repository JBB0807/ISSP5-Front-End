import React, { useState, useEffect, useRef } from "react";
import "../scss/styles.scss";
import "../scss/components/_navbar.scss";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement client-side logout without calling the backend
    // This clears the user state in the frontend
    setUser(null);

    // Clear any authentication cookies if they exist
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Redirect to home page
    navigate("/");

    console.log("Logged out successfully");
  };

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
      const res = await fetch("http://localhost:8080/auth/current_user", {
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
        <span className="navbar__logo-text">
          Byte<span className="navbar__logo-text">Camp</span>
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
        {/* will be decided later of we shall keep NOTEBOOK or not */}
        {/* <li>
          <Link
            to="/notebook"
            className={`navbar__link ${
              activeLink === "/notebook" ? "navbar__link--active" : ""
            }`}
          >
            <span className="navbar__link-icon">📓</span>
            <span className="navbar__link-text"></span>
            NOTEBOOK
            <span className="navbar__link-hover"></span>
          </Link>
        </li> */}
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
//{user ? user.displayName : "NOTEBOOK"}

//server side logout (was not working properly, so implemented client side logout)
// const handleLogout = async () => {
//   try {
//     const res = await fetch("http://localhost:8080/auth/logout", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.ok) {
//       setUser(null);
// } else {
//   console.error("Logout failed");
// }
// } catch (error) {
// console.error("Error during logout:", error);
// }
