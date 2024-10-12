import React from 'react';
import axios from 'axios';

const ClaimPoints = ({ selectedUserId, fetchUsers }) => {
  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      alert("Please select a user!");
      return;
    }

    try {
      await axios.post('https://leadboard12.netlify.app/api/users/claim-points', { userId: selectedUserId });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };

  return (
    <div className="mb-4">
      <h2>Claim Points</h2>
      <button className="btn btn-primary" onClick={handleClaimPoints}>Claim Points</button>
      
    </div>
  );
};

export default ClaimPoints;
