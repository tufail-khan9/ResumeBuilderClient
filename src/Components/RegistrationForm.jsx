import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios here
import './RegistrationForm.css';

function RegistrationForm({ toggleForm }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userType, setUserType] = useState('job_seeker');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7146/api/User/RegisterUser', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      contactNumber: contactNumber,
      userType: userType
    })
    .then(response => {
      setSuccessMessage("User registered successfully!");
      setTimeout(() => {
        setSuccessMessage('');
        toggleForm(); // Redirect to login form
      }, 3000); // Display message for 2 seconds before redirecting
    })
    .catch(error => {
      setErrorMessage("There was an error creating the user!");
      console.error("There was an error creating the user!", error);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicContactNumber">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicUserType" className="dropdown-with-icon">
        <Form.Label>User Type</Form.Label>
        <div className="dropdown-container">
          <Form.Control as="select" value={userType} onChange={handleUserTypeChange}>
            <option value="job_seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </Form.Control>
          <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Register
      </Button>

      <Button variant="link" onClick={toggleForm}>
        Back to Login
      </Button>
    </Form>
  );
}

export default RegistrationForm;
