// TeamMember.js
import React from 'react';
import './TeamMember.css';

const TeamMember = ({ name, imageUrl, profileUrl }) => {
  return (
    <div className="team-member">
      <a href={profileUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={name} className="member-image"/>
      </a>
      <h3>{name}</h3>
    </div>
  );
};

export default TeamMember;
