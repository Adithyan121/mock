import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false); // Track login status

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (password.length < 5) { // Changed to 8 characters as per your comment
      setPasswordError('Password must be at least 5 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true); // Set login status to true after successful login
    } catch (error) {
      console.error('Login error:', error);
      // You might want to set an error state here to display an error message to the user
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />; // Redirect to "/home" if logged in
  }

  return (
    <div style={{ alignItems: 'center', marginLeft: '500px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '300px',
              marginRight: '10px',
            }}
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '300px',
              marginRight: '10px',
            }}
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
