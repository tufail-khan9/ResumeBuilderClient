// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Menu from './Components/Menu';
// import Profile from './Components/Profile';
// import HomePage from './Components/HomePage';
// import LoginForm from './Components/LoginForm';
// import RegistrationForm from './Components/RegistrationForm';
// import ForgotPasswordForm from './Components/ForgotPasswordForm';
// import ResetPasswordForm from './Components/ResetPasswordForm';
// import DummyPage from './Components/DummyPage';
// import './App.css';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const handleLogin = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} user={user} setUser={setUser} />
//       <Routes>
//         <Route path="/homePage" element={<HomePage />} />
//         <Route path="/profile" element={<Profile userId={user?.id} />} />
//         <Route path="/register" element={<RegistrationForm setUser={setUser} />} />
//         <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
//         <Route path="/resetPassword" element={<ResetPasswordForm />} />
//         <Route path="/dummyPage" element={isLoggedIn ? <DummyPage /> : null} />
//         {/* Default route */}
//         <Route path="/" element={isLoggedIn ? <DummyPage /> : null} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './Components/Menu';
import Profile from './Components/Profile';
import HomePage from './Components/HomePage';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import ResetPasswordForm from './Components/ResetPasswordForm';
import DummyPage from './Components/DummyPage';
import ResumeForm from './ResumeComponents/ResumeForm';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showResumeForm, setShowResumeForm] = useState(false);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowResumeForm(false); // Ensure the resume form is hidden on logout
  };

  const handleCreateResume = () => {
    setShowResumeForm(true);
  };

  return (
    <Router>
      <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} user={user} setUser={setUser} />
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profile" element={<Profile userId={user?.id} />} />
        <Route path="/register" element={<RegistrationForm setUser={setUser} />} />
        <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
        <Route path="/resetPassword" element={<ResetPasswordForm />} />
        <Route path="/dummyPage" element={isLoggedIn && !showResumeForm ? <DummyPage onCreateResume={handleCreateResume} /> : null} />
        <Route path="/resumeForm" element={<ResumeForm />} />
        <Route path="/" element={isLoggedIn ? (showResumeForm ? <ResumeForm /> : <DummyPage onCreateResume={handleCreateResume} />) : null} />
      </Routes>
    </Router>
  );
};

export default App;


