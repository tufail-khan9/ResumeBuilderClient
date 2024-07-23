import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from './AxiosConfig';
import SuccessMessagePopup from './SuccessMessagePopup';

function ForgotPasswordForm({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('User/ForgotPassword', { email })
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
    
      
        <Col  lg={9} className="mx-auto">
          {showPopup && (
            <SuccessMessagePopup
              show={showPopup}
              onClose={() => setShowPopup(false)}
              message="OTP sent successfully"
            />
          )}
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      
    
  );
}

export default ForgotPasswordForm;
