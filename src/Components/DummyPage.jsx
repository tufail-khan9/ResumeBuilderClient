import React from 'react';
import './DummyPage.css';

export default function DummyPage({ onCreateResume }) {
  return (
    <div className="dummy-page-container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Create Your Own Resume Free</h2>
          <p className="card-text">Build a professional resume in minutes.</p>
          <button className="btn btn-primary" onClick={onCreateResume}>
            Create Your Own Resume
          </button>
        </div>
      </div>
    </div>
  );
}
