import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Components/Menu';
import HomePage from './Components/HomePage';
import DummyPage from './Components/DummyPage';
import CombinedForm from './ResumeComponents/ResumeForm';
import './App.css';

function App() {
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
      <div className="App">
        <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/homePage" : "/"} />} />
          <Route path="/homePage" element={isLoggedIn ? <DummyPage /> : <Navigate to="/" />} />
          <Route path="/dummypage" element={isLoggedIn ? <DummyPage /> : <Navigate to="/" />} />
        </Routes>
        <CombinedForm />
      </div>
    </Router>
  );
}

export default App;
