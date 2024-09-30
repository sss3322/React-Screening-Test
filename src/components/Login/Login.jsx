import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    
    if (user) {
      if (user.status === 'blocked') {
        alert('Your account is blocked.');
        return;
      }

     
      if (!user.loginHistory) {
        user.loginHistory = [];
      }
      user.loginHistory.push(new Date().toLocaleString());
      
     
      const updatedUsers = users.map(u => (u.id === user.id ? user : u));
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      alert('Login successful!');
      onLogin(user);
      navigate('/userlist');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      
      <p className="register-text">
        Not registered yet? <span onClick={() => navigate('/register')} className="register-link">Register here</span>
      </p>
    </div>
  );
};

export default Login;
