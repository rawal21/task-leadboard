import React from 'react';

const UserSelection = ({ users, setSelectedUserId }) => {
  return (
    <div className="mb-4">
      <h2>Select a User</h2>
      <select className="form-select" onChange={(e) => setSelectedUserId(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
