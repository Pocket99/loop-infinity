// TeamMember.js
import React from 'react';
import './TeamMember.css';

const TeamMember = (member) => {
  return (
    <div className="team-member">
      <a href={member.profileUrl} target="_blank" rel="noopener noreferrer">
        <img src={member.imageUrl} alt={member.name} className="member-image"/>
      </a>
      <h3>{member.name}</h3>
    </div>
  );
};

export default TeamMember;
