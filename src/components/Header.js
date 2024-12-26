import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useCart } from '../pages/CartContext'; // Assuming you have a cart context
import { FaShoppingCart } from 'react-icons/fa'; // Using FontAwesome cart icon

const Header = () => {
  const { cart } = useCart(); // Get the cart state
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items

  return (
    <header className="header">
      <div className="header-top">
        {/* Logo */}
        <img
          className="ych-yoyo-logo"
          src="/images/ych_yoyo_logo.jpg"
          alt="YCH-YOYO Logo"
        />

        {/* 购物车 */}
        <div className="cart-icon">
          <Link to="/cart">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>

      {/* 标题 */}
      <h1 className="logo">YCH-YOYO</h1>

      {/* 导航栏 */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/customizer">Customizer</Link>
        <Link to="/team">Team</Link>
        <Link to="/stories">Stories</Link>
        <Link to="/Contact">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Header;
