import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = ({ users, setUsers, onLogout }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ username: '', email: '', password: '', status: 'active' });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [expandedLoginHistory, setExpandedLoginHistory] = useState({});

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    if (!newUserData.username || !newUserData.email || !newUserData.password) return;

    const newUser = {
      id: Date.now(),
      ...newUserData,
      loginHistory: [],
    };

    setUsers([...users, newUser]);
    setNewUserData({ username: '', email: '', password: '', status: 'active' });
    setIsAddingUser(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserData({ username: user.username, email: user.email, password: '' });
  };

  const handleUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? {
        ...user,
        username: newUserData.username,
        email: newUserData.email,
        password: newUserData.password || user.password,
      } : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
    setNewUserData({ username: '', email: '', password: '', status: 'active' });
  };

  const handleRemove = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleBlock = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: 'blocked' } : user
    );
    setUsers(updatedUsers);
  };

  const handleUnblock = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: 'active' } : user
    );
    setUsers(updatedUsers);
  };

  const toggleLoginHistory = (userId) => {
    setExpandedLoginHistory((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <button onClick={onLogout} className="logout-button">Logout</button>
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Login History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <div className="dropdown-container">
                    <button onClick={() => toggleLoginHistory(user.id)} className="dropdown-toggle"style={{backgroundColor:"gray"}}>
                      {expandedLoginHistory[user.id] ? 'Login Activity' : 'Login Activity'}
                    </button>
                    {expandedLoginHistory[user.id] && (
                      <ul className="login-history-dropdown">
                        {user.loginHistory && user.loginHistory.length > 0 ? (
                          user.loginHistory.map((login, index) => (
                            <li key={index}>{login}</li>
                          ))
                        ) : (
                          <li>No logins yet</li>
                        )}
                      </ul>
                    )}
                  </div>
                </td>
                <td>
                  {user.status === 'active' ? (
                    <button onClick={() => handleBlock(user.id)}>Block</button>
                  ) : (
                    <button onClick={() => handleUnblock(user.id)}>Unblock</button>
                  )}
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleRemove(user.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available.</p>
      )}

      <button onClick={() => setIsAddingUser(!isAddingUser)}>
        {isAddingUser ? 'Cancel' : 'Add User'}
      </button>

      {isAddingUser && (
        <div className="add-user-container">
          <h2>Add User</h2>
          <input
            type="text"
            name="username"
            value={newUserData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <button onClick={handleAddUser}>Submit</button>
        </div>
      )}

      {editingUser && (
        <div className="edit-user-container">
          <h2>Edit User</h2>
          <input
            type="text"
            name="username"
            value={newUserData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleInputChange}
            placeholder="Password (leave blank if unchanged)"
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
