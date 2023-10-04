// TeamMembers.js
import React from 'react';
import TeamMember from './TeamMember';
import teamData from './teamData';
import './TeamMembers.css';

const TeamMembers = () => {
  return (
    <div className="team-members">
      {teamData.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  );
};

export default TeamMembers;
