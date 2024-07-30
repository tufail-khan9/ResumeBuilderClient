// src/components/Dashboard.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <Container fluid className="dashboard">
      <Row className="my-5">
        <Col md={4} className="left-section">
          <div className="button-container">
            <Button as={Link} to="myresume" variant="primary" className="dashboard-button">My Resume</Button>
            <Button as={Link} to="admin" variant="secondary" className="dashboard-button">Admin</Button>
            <Button as={Link} to="profile" variant="secondary" className="dashboard-button">Profile</Button>
          </div>
        </Col>
        <Col md={8} className="right-section">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
