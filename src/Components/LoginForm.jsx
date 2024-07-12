import React from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm({ toggleForm }) {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>&nbsp;

      <Button variant="primary" type="submit" className="mt-3">
        Login
      </Button>

      <Button variant="link" onClick={toggleForm}>
        Sign up
      </Button>
    </Form>
  );
}

export default LoginForm;
