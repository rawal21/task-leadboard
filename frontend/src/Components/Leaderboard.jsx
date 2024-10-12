import React from 'react';


const Leaderboard = ({ users }) => {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {users.map((user, index) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            {index + 1}. {user.name}
            <span className="badge bg-primary rounded-pill"> :{user.points }  points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
