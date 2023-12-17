import React, { useState } from 'react';
import { addTeamMember } from '../utils/api';

const TeamMemberForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You could add some form validation here...
    await addTeamMember(name, role);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Role:
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Team Member</button>
    </form>
  );
};

export default TeamMemberForm;
