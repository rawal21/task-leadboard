import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PointsHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch points history when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        console.error('User ID is not valid');
        setLoading(false);
        return;
      }

      try {
        // Ensure to use the correct port (5000 for your backend)
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/points-history`);
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching points history:', err);
        setError('Failed to load points history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div>Loading points history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Points History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Points</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.points}</td>
              <td>{new Date(entry.claimedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsHistory;
