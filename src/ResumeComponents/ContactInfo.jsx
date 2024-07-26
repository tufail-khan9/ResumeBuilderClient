import React, { useState } from 'react';
import axios from '../Components/AxiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default function ContactInfo() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('ContactInfo/PostContactInfos', {
      fullName,
      email,
      phone,
      address
    })
    .then(response => {
      Swal.fire('Success', 'Contact Info saved successfully!', 'success');
    })
    .catch(error => {
      Swal.fire('Error', 'There was an error saving the contact info!', 'error');
    });
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <Container className="mt-5">
      <h2>Contact Info</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formFullName">
          <Form.Label column sm={2}>Full Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formPhone">
          <Form.Label column sm={2}>Phone</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formAddress">
          <Form.Label column sm={2}>Address</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
