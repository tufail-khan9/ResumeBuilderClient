import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Profile from './Components/Profile';
import HomePage from './Components/HomePage';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import ResetPasswordForm from './Components/ResetPasswordForm';
import Dashboard from './Components/Dashboard';
import Admin from './Components/Admin';
import MyResume from './Components/MyResume';
import DummyPage from './Components/DummyPage';
import ResumeForm from './ResumeComponents/ResumeForm';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginButton(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleCreateResumeClick = () => {
    setShowLoginButton(true);
    setShowLoginModal(true);
  };

  return (
    <Router>
      <Menu
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLogin={handleLogin}
        showLoginButton={showLoginButton}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<DummyPage onCreateResume={handleCreateResumeClick} />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profile" element={<Profile userId={user?.id} setUser={setUser} />} />
        <Route path="/register" element={<RegistrationForm setUser={setUser} />} />
        <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
        <Route path="/resetPassword" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} />}>
        <Route path="admin" element={<Admin />} />
        <Route path="myresume" element={<MyResume />} />
        <Route path="resumeForm" element={<ResumeForm />} />
        <Route path="profile" element={<Profile userId={user?.id} setUser={setUser} />} />
        </Route>
        <Route path="/dummypage" element={<DummyPage onCreateResume={handleCreateResumeClick} />} />
      </Routes>
    </Router>
  );
};

export default App;
