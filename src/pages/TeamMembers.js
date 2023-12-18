// TeamMembers.js
import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import './TeamMembers.css';
// import TeamMemberForm from '../components/TeamMemberForm';
// import axios from 'axios';
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
      {/* <TeamMemberForm /> */}
      
      {/* {error && <p>Error fetching data: {error.message}</p>} */}
      
      {/* <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>{member.name} - {member.imageUrl}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default TeamMembers;
