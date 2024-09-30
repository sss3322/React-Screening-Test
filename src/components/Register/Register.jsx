import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setUsers }) => {
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userWithId = { 
      ...newUser, 
      id: users.length + 1, 
      status: 'active', 
      loginHistory: [] 
    };
    users.push(userWithId);
    localStorage.setItem('users', JSON.stringify(users));
    setUsers(users);
    alert('User registered successfully!');
    setNewUser({ username: '', email: '', password: '' });

    navigate('/'); 
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        value={newUser.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="input-field"
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleRegister} className="register-button">Register</button>
      
      <p className="login-text">
        Already registered? <span onClick={() => navigate('/')} className="login-link">Login here</span>
      </p>
    </div>
  );
};

export default Register;
