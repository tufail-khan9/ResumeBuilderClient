import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Components/Menu';
import ContactInfo from './ResumeComponents/ContactInfo';
import EducationInfo from './ResumeComponents/EducationInfo';
import HomePage from './Components/HomePage';
import Skill from './ResumeComponents/Skill';
import Hobby from './ResumeComponents/Hobby';
import WorkExperience from './ResumeComponents/WorkExperience';
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
          <Route path="/contactInfo" element={isLoggedIn ? <ContactInfo /> : <Navigate to="/" />} />
          <Route path="/educationInfo" element={isLoggedIn ? <EducationInfo /> : <Navigate to="/" />} />
          <Route path="/homePage" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/skill" element={isLoggedIn ? <Skill /> : <Navigate to="/" />} />
          <Route path="/hobby" element={isLoggedIn ? <Hobby /> : <Navigate to="/" />} />
          <Route path="/workExperience" element={isLoggedIn ? <WorkExperience /> : <Navigate to="/" />} />
          <Route path="/dummypage" element={isLoggedIn ? <DummyPage /> : <Navigate to="/" />} />
        </Routes>
        <CombinedForm />
      </div>
    </Router>
  );
}

export default App;
