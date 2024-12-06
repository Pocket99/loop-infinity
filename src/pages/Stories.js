import React from 'react';
import teamInfo from './teamInfo.json';
import './Stories.css'; 


const Stories = () => {
  return (
    <div className="container">
      <img src="/images/640.jpg" alt="YCH-YOYO Logo" style={{ width: "300px", display: "block", margin: "0 auto 20px" }} />

      <h1>{teamInfo.title}</h1>
      {teamInfo.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default Stories; 