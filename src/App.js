import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import UserList from './components/UserList/UserList';

const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (user) => {
    const updatedUsers = users.map(u => 
      u.username === user.username ? { ...u, loginHistory: [...u.loginHistory, new Date().toLocaleString()] } : u
    );
    
    setUsers(updatedUsers);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={currentUser ? <Navigate to="/userlist" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={currentUser ? <Navigate to="/userlist" /> : <Register setUsers={setUsers} />} />
        <Route path="/userlist" element={currentUser ? <UserList users={users} setUsers={setUsers} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
