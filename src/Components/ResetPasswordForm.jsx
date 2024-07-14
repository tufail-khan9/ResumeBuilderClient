import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from './AxiosConfig';

function ResetPasswordForm({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('User/ResetPassword', { email, otp, newPassword, confirmPassword })
      .then(response => {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          toggleForm('login'); // Redirect to login form
        }, 3000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
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

      <Form.Group controlId="formBasicOTP">
        <Form.Label>OTP</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicNewPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Reset Password
      </Button>
    </Form>
  );
}

export default ResetPasswordForm;
