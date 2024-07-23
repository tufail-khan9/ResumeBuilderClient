import React, { useState } from 'react';
import axios from '../Components/AxiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default function EducationInfo() {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    axios.post('Education/PostEducation', { 
      degree,
      institution,
      startDate,
      endDate
    })
    .then(response => {
      Swal.fire('Success', 'Education Info saved successfully!', 'success');
    })
    .catch(error => {
      Swal.fire('Error', 'There was an error saving the education info!', 'error');
    });
  };

  const handleCancel = () => {
    setDegree('');
    setInstitution('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Container className="mt-5">
      <h2>Education Info</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formDegree">
          <Form.Label column sm={2}>Degree Title</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Degree Title"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formInstitution">
          <Form.Label column sm={2}>Institution</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formStartDate">
          <Form.Label column sm={2}>Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>&nbsp;
        </Form.Group>
        <Form.Group as={Row} controlId="formEndDate">
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
