import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
        <h1 className="logo">Loop Infinity</h1>
        <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/team">Team</Link>
            <Link to="/store">Store</Link>
            <Link to="/stories">Stories</Link>
        </nav>
        <div className="cart-link">
            <Link to="/cart">Cart</Link>
      </div>
  </header>
  );
};

export default Header;
