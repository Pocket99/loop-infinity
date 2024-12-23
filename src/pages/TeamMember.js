import React from 'react';
import './TeamMember.css';

const TeamMember = (member) => {
  return (
    <div className="team-member">
      <a href={member.profileUrl} target="_blank" rel="noopener noreferrer">
        <img src={member.imageUrl} alt={member.name} className="member-image" />
      </a>
      <div className="member-text">
        <h3>{member.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: member.description }}></div>
      </div>
    </div>
  );
};

export default TeamMember;
