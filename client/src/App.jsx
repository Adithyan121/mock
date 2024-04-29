import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import RegisterPage from './components/Signup';
import LoginPage from './components/LoginForm';
import Home from './components/Home';



const App = () => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route
        path="/home"
        element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
      />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
