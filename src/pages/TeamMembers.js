// TeamMembers.js
import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';
import './TeamMembers.css';
// import TeamMemberForm from '../components/TeamMemberForm';
import axios from 'axios';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/getTeamMembers')
      .then((response) => {
        const formattedData = response.data.map(item => ({
          id: item[0],
          name: item[1],
          imageUrl: item[2],
          profileUrl: item[3],
        }));
        setTeamMembers(formattedData);
      })
      .catch((error) => {
        console.error('There has been a problem with your axios operation:', error);
        setError(error);
      });
  }, []);

  console.log(teamMembers)

  return (
    <div className="team-members">
      {teamMembers.map((member) => (
        <TeamMember key={member.id} {...member} />
      ))}
      {/* <TeamMemberForm /> */}
      
      {error && <p>Error fetching data: {error.message}</p>}
      
      {/* <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>{member.name} - {member.imageUrl}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default TeamMembers;
