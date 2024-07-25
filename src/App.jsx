import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Components/Menu';
import HomePage from './Components/HomePage';
import DummyPage from './Components/DummyPage';
import CombinedForm from './ResumeComponents/ResumeForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Update state to logged in
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state to logged out
  };

  return (
    <Router>
      <div className="App">
      
        <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} />
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dummypage" : "/"} />} />
          <Route path="/homePage" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />

          <Route path="/dummypage" element={isLoggedIn ? <DummyPage /> : <Navigate to="/" />} />
        </Routes>
        <CombinedForm />
      </div>
    </Router>
  );
}

export default App;
