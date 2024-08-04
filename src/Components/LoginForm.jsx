// src/Components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from './AxiosConfig';
import { useNavigate } from 'react-router-dom';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
});

function LoginForm({ toggleForgotPassword, showSignUpLink, onLogin, toggleForm, handleClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitted }, reset, trigger } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    debugger;
    try {
      const response = await axios.get('User/LoginUser', {
        params: {
          Email: data.email,
          Password: data.password
        }
      });

      localStorage.setItem("userId", JSON.stringify(response.data.id)); // Corrected storage key
      onLogin(response.data); // Pass user data to onLogin
      handleClose();
      navigate('/dashboard/resumeForm'); // Correct path for navigation
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      trigger('email');
      trigger('password');
    }
  }, [isSubmitted, trigger]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="p-4 border rounded" style={{ maxWidth: '400px', width: '100%', maxHeight: '500px', height: '400px' }}>
        <Form onSubmit={handleSubmit(handleLogin)}>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email')}
              className={errors.email ? 'is-invalid' : ''}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password')}
              className={errors.password ? 'is-invalid' : ''}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Login
          </Button>

          {showSignUpLink && (
            <Button variant="link" onClick={() => toggleForm('register')} className="mt-2 w-100">
              Sign up
            </Button>
          )}

          <Button variant="link" onClick={() => toggleForgotPassword()} className="mt-2 w-100">
            Forgot Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
