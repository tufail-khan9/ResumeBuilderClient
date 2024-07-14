import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from './AxiosConfig';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
});

function LoginForm({ toggleForm, toggleForgotPassword, showSignUpLink, onLogin }) {
  const { register, handleSubmit, formState: { errors, isSubmitted }, setError, setValue, trigger } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur', // Validate fields on blur
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data) => {
    try {
      const response = await axios.get(`User/LoginUser`, {
        params: {
          Email: data.email,
          Password: data.password
        }
      });
      console.log('Login response:', response.data);
      onLogin(response.data.username);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  // Use useEffect to trigger validation on initial render and on input changes
  useEffect(() => {
    if (isSubmitted) {
      trigger('email');
      trigger('password');
    }
  }, [isSubmitted, trigger]);

  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register('email')}
          className={errors.email ? 'is-invalid' : ''}
          onBlur={() => trigger('email')} // Trigger validation on blur
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register('password')}
          className={errors.password ? 'is-invalid' : ''}
          onBlur={() => trigger('password')} // Trigger validation on blur
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </Form.Group>&nbsp;

      <Button variant="primary" type="submit" className="mt-3">
        Login
      </Button>

      {showSignUpLink && (
        <Button variant="link" onClick={toggleForm}>
          Sign up
        </Button>
      )}

      <Button variant="link" onClick={toggleForgotPassword}>
        Forgot Password
      </Button>
    </Form>
  );
}

export default LoginForm;
