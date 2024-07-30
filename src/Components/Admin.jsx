import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  return (
    <Container fluid className="admin">
      <Row className="my-5">
        <Col className="text-center">
          <h2>Admin Panel</h2>
          {/* Add the admin functionalities or components here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
