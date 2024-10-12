import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddUser = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddUser = async () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    try {
      await axios.post('task-leadboard.vercel.app/api/users/add', { name });
      navigate('/'); // Redirect to home page after adding the user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="mb-4">
      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <button className="btn btn-primary mt-2" onClick={handleAddUser}>
        Add User
      </button>
    </div>
  );
};

export default AddUser;
