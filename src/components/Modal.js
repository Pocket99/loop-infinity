// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
