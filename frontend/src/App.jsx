import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelection from './Components/UserSelection';
import ClaimPoints from './Components/ClaimPoints';
import Leaderboard from './Components/Leaderboard';
import PointHistory from './Components/pointHistory'; 
import {  Link } from 'react-router-dom';
import './App.css'; 

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(''); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://leadboard12.netlify.app/api/users/users'); 
      setUsers(response.data);
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
