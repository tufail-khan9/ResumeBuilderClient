import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import axios from './AxiosConfig';
import SuccessMessagePopup from "./SuccessMessagePopup";

// Validation schema
const validationSchema = Yup.object().shape({
  UserName: Yup.string().required("UserName is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  userType: Yup.string().required("User Type is required"),
  imageUrl: Yup.mixed()
  
});

function RegistrationForm({ toggleForm, setUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur"
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append non-file fields
    for (const key in data) {
      if (key === "imageUrl") {
        // Handle file input
        if (data[key][0]) {
          formData.append(key, data[key][0]); // Append the file
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    axios.post("User/RegisterUser", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      setSuccessMessage("User registered successfully!");
      setShowPopup(true);
      setUser(response.data); // Ensure response.data contains user details
      setTimeout(() => {
        setShowPopup(false);
        toggleForm("login");
      }, 2000);
    })
    .catch((error) => {
      console.error("There was an error creating the user!", error.response?.data || error.message);
      setErrorMessage("There was an error creating the user!");
    });
  };

  return (
    <div className="container mt-5 mb-4 d-flex justify-content-center align-items-center">
      <SuccessMessagePopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        message={successMessage}
      />
      <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Row className="justify-content-center">
          <Col md={10}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                {...register("UserName")}
                isInvalid={!!errors.UserName}
                onBlur={() => trigger("UserName")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.UserName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
                isInvalid={!!errors.email}
                onBlur={() => trigger("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
                isInvalid={!!errors.password}
                onBlur={() => trigger("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
                onBlur={() => trigger("confirmPassword")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Number"
                {...register("contactNumber")}
                isInvalid={!!errors.contactNumber}
                onBlur={() => trigger("contactNumber")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                {...register("userType")}
                isInvalid={!!errors.userType}
              >
                <option value="">Select User Type</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.userType?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                {...register("imageUrl")}
                isInvalid={!!errors.imageUrl}
                onBlur={() => trigger("imageUrl")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.imageUrl?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>

            <Button variant="link" onClick={() => toggleForm("login")}>
              Back to Login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegistrationForm;
