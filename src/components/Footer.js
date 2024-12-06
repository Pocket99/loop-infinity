import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} YCH-YOYO</p>
      <Link to="/Contact">Contact Us</Link>
      
      {/* <p><a href="mailto:ychenghao783@gmail.com">info@loopinfinity.com</a></p> */}
      {/* Add Social Media Icons/Links here */}
    </footer>
  );
};

export default Footer;
