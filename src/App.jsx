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

  const handleLogin = (userData) => { // Modify this function
    setIsLoggedIn(true);
    setUser(userData); // Add this line to set user data
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Add this line to clear user data
  };

  return (
    <Router>
      <div className="App">
      
        <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} user={user}  />
       
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
