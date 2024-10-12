import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelection from './Components/UserSelection';
import ClaimPoints from './Components/ClaimPoints';
import Leaderboard from './Components/Leaderboard';
import PointHistory from './Components/pointHistory'; // Ensure the case matches
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Optional: for custom styles

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(''); // Initial state can remain as an empty string

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/users'); // Ensure correct endpoint
      setUsers(response.data);

      // Set default user "Rinkal" as selected user
      const defaultUser = response.data.find(user => user.name === 'Rinkal');
      if (defaultUser) {
        setSelectedUserId(defaultUser._id); // Set default user ID if found
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Leaderboard</h1>
      <UserSelection users={users} setSelectedUserId={setSelectedUserId} />
      <ClaimPoints selectedUserId={selectedUserId} fetchUsers={fetchUsers} />
      <Leaderboard users={users} />
      <PointHistory userId={selectedUserId} />
      <Link className='btn btn-primary text-white' to="/add">ADD USER</Link>
    </div>
  );
};

export default App;
