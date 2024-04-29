import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('');
  };

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

    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      // You can handle successful registration here, such as redirecting the user to a new page
    } catch (error) {
      console.error('Registration failed:', error);
      // You can handle registration failure here, such as displaying an error message to the user
    }
  };

  return (
    <div style={{ alignItems: 'center', marginLeft: '500px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '300px',
              marginRight: '10px',
            }}
          />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
        </div>
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
            Register
          </button>
        </div>
      </form>
      <div style={{ marginTop: '20px' }}>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
