import React from 'react'
import '../scss/styles.scss'
import '../scss/components/_navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links">
        <li><a href="/" className="navbar__link">Home</a></li>
        <li><a href="/notebook" className="navbar__link">NoteBook</a></li>
        <li><a href="/assignment" className="navbar__link">Assignment</a></li>
        <li><a href="/editor" className="navbar__link">Editor</a></li>
      </ul>
    </nav>
  )
}

export default Navbar