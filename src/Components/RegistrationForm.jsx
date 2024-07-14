import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from './AxiosConfig';
import SuccessMessagePopup from './SuccessMessagePopup';
import './RegistrationForm.css';

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  userType: Yup.string().required('User Type is required'),
});

function RegistrationForm({ toggleForm }) {
  const { register, handleSubmit, formState: { errors, isSubmitted }, trigger } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur', // Validate fields on blur
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data) => {
    axios.post('User/RegisterUser', data)
      .then(response => {
        setSuccessMessage("User registered successfully!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          toggleForm('login');
        }, 2000);
      })
      .catch(error => {
        setErrorMessage("There was an error creating the user!");
        console.error("There was an error creating the user!", error);
      });
  };

  // Use useEffect to trigger validation on initial render and on input changes
  useEffect(() => {
    if (isSubmitted) {
      trigger('firstName');
      trigger('lastName');
      trigger('email');
      trigger('password');
      trigger('confirmPassword');
      trigger('contactNumber');
      trigger('userType');
    }
  }, [isSubmitted, trigger]);

  return (
    <>
      <SuccessMessagePopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        message={successMessage}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            {...register('firstName')}
            className={errors.firstName ? 'is-invalid' : ''}
            onBlur={() => trigger('firstName')} // Trigger validation on blur
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            {...register('lastName')}
            className={errors.lastName ? 'is-invalid' : ''}
            onBlur={() => trigger('lastName')} // Trigger validation on blur
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email')}
            className={errors.email ? 'is-invalid' : ''}
            onBlur={() => trigger('email')} // Trigger validation on blur
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
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
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'is-invalid' : ''}
            onBlur={() => trigger('confirmPassword')} // Trigger validation on blur
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicContactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact Number"
            {...register('contactNumber')}
            className={errors.contactNumber ? 'is-invalid' : ''}
            onBlur={() => trigger('contactNumber')} // Trigger validation on blur
          />
          <div className="invalid-feedback">{errors.contactNumber?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicUserType" className="dropdown-with-icon">
          <Form.Label>User Type</Form.Label>
          <div className="dropdown-container">
            <Form.Control as="select" {...register('userType')} className={errors.userType ? 'is-invalid' : ''}>
              <option value="job_seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </Form.Control>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>
          <div className="invalid-feedback">{errors.userType?.message}</div>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </>
  );
}

export default RegistrationForm;
