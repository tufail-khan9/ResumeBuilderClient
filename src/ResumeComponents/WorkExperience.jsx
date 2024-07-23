import React, { useState } from 'react';
import axios from '../Components/AxiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default function WorkExperience() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('WorkExperience/PostWorkExperience', {
      company,
      position,
      startDate,
      endDate
    })
    .then(response => {
      Swal.fire('Success', 'Work Experience saved successfully!', 'success');
    })
    .catch(error => {
      Swal.fire('Error', 'There was an error saving the work experience!', 'error');
    });
  };

  const handleCancel = () => {
    setCompany('');
    setPosition('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Container className="mt-5">
      <h2>Work Experience</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formCompany">
          <Form.Label column sm={2}>Company</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formPosition">
          <Form.Label column sm={2}>Position</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formStartDate">
          <Form.Label column sm={2}>Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formEndDate">
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}&nbsp;
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
