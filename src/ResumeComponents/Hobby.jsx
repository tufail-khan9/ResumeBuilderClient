import React, { useState } from 'react';
import axios from '../Components/AxiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default function Hobby() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('Hobby/PostHobby', {
      name
    })
    .then(response => {
      Swal.fire('Success', 'Hobby saved successfully!', 'success');
    })
    .catch(error => {
      Swal.fire('Error', 'There was an error saving the hobby!', 'error');
    });
  };

  const handleCancel = () => {
    setName('');
  };

  return (
    <Container className="mt-5">
      <h2>Hobby</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter hobby name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
