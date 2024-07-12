import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import './Menu.css'; // Adjust path based on actual location of Menu.css

const Menu = ({ setView }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#" onClick={handleShow}>
              <FontAwesomeIcon icon={faHome} /> Login
            </Nav.Link>
            <Nav.Link href="#">
              <FontAwesomeIcon icon={faSearch} /> Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegistrationForm toggleForm={toggleForm} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Menu;
