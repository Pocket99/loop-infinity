import axios from 'axios';

export const addTeamMember = async (name, role) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/addTeamMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, role })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); // Handle response...
  
    } catch (error) {
      //console.error('Error:', error);
    }
  };

export const getTeamMember = async (name, role) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/addTeamMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, role })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); // Handle response...
  
    } catch (error) {
      //console.error('Error:', error);
    }
  };
  


// Usage example:
// addTeamMember({name: "John", role: "Developer"});
