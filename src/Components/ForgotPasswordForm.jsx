import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from './AxiosConfig';
import SuccessMessagePopup from './SuccessMessagePopup';

function ForgotPasswordForm({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('User/ForgotPassword', { email }) // Ensure correct payload
      .then(response => {
        setSuccessMessage("OTP sent successfully!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          toggleForm('resetPassword');
        }, 2000);
      })
      .catch(error => {
        setErrorMessage('Failed to send forgot password request. Please try again later.');
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <>
      {showPopup && (
        <SuccessMessagePopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          message="OTP sent successfully"
        />
      )}
      <Form onSubmit={handleSubmit}>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ForgotPasswordForm;
