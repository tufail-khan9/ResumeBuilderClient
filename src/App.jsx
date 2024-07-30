// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Profile from './Components/Profile';
import HomePage from './Components/HomePage';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import ResetPasswordForm from './Components/ResetPasswordForm';
import Dashboard from './Components/Dashboard '; // Import Dashboard component
import Admin from './Components/Admin'; // Import Admin component
import MyResume from './Components/MyResume'; // Import MyResume component
import DummyPage from './Components/DummyPage'; // Import DummyPage component
import ResumeForm from './ResumeComponents/ResumeForm'; // Import ResumeForm component
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={null} /> {/* This will render nothing */}
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profile" element={<Profile userId={user?.id} setUser={setUser} />} />
        <Route path="/register" element={<RegistrationForm setUser={setUser} />} />
        <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
        <Route path="/resetPassword" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/dummypage" element={<DummyPage />} /> {/* Add DummyPage route */}
        <Route path="/resumeform" element={<ResumeForm />} />   
      </Routes>
    </Router>
  );
};

export default App;
