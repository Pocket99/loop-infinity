import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Loop Infinity</p>
      <p><a href="mailto:info@loopinfinity.com">info@loopinfinity.com</a></p>
      {/* Add Social Media Icons/Links here */}
    </footer>
  );
};

export default Footer;
