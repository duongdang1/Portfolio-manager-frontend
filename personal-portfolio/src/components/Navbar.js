// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">Stock Page</Link>
        <Link to="/portfolio" className="nav-link">Portfolio</Link>
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        <Link to="/news" className="nav-link">News</Link>
      </div>
      <button className="sign-button">Sign In / Sign Out</button>
    </nav>
  );
};

export default Navbar;
