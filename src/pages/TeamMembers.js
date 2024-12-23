// TeamMembers.js
import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import './TeamMembers.css';
import {teamData} from './teamData';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  //const [error, setError] = useState(null);

  //get team data from teamData.js
  useEffect(() => {
    setTeamMembers(teamData);
  }, []);

  return (
    <div className="team-members">
      {teamMembers.map((member) => (
        <TeamMember key={member.id} {...member} />
      ))}
    </div>
  );
};

export default TeamMembers;
