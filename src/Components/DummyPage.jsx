// src/Components/DummyPage.js
import React from 'react';
import './DummyPage.css';
import { useNavigate } from 'react-router-dom';

export default function DummyPage({ onCreateResume }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to /resumeform"); // Ensure this path matches the route exactly
    navigate("/resumeform");
  };

  return (
    <div className="dummy-page-container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Create Your Own Resume Free</h2>
          <p className="card-text">Build a professional resume in minutes.</p>
          <button className="btn btn-primary" onClick={handleClick}>
            Create Your Own Resume
          </button>
        </div>
      </div>
    </div>
  );
}
