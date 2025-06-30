import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';  // API function to call backend login

const Login= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook to navigate to other pages after login

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on each submission

    try {
      const userData = { username, password };
      const response = await loginUser(userData);  // API call to login
      if (response.token) {
        localStorage.setItem('token', response.token); // Store token in localStorage
        localStorage.setItem('base_id', response.user.base_id);
        navigate('/dashboard');  // Redirect to the dashboard after successful login
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');  // Display error message on failure
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
