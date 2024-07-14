import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import DummyHomePage from './DummyHomePage'; // Import DummyHomePage
import './Menu.css'; // Adjust path based on actual location of Menu.css

const Menu = ({ setView }) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [username, setUsername] = useState(''); // Track logged-in username

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const toggleForm = (type) => {
    setFormType(type);
    handleShow(); // Ensure modal opens when form type changes
  };

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
    handleClose(); // Close the modal after successful login
    setFormType('login'); // Reset form type
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!loggedIn && (
              <>
                <Nav.Link href="#" onClick={() => toggleForm('login')}>
                  <FontAwesomeIcon icon={faHome} /> Login
                </Nav.Link>
                <Nav.Link href="#" onClick={() => toggleForm('forgotPassword')}>
                  <FontAwesomeIcon icon={faSearch} /> Forgot Password
                </Nav.Link>
              </>
            )}
            {loggedIn && (
              <Nav.Link>
                <FontAwesomeIcon icon={faHome} /> Home
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formType === 'login' && 'Login'}
            {formType === 'forgotPassword' && 'Forgot Password'}
            {formType === 'resetPassword' && 'Reset Password'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === 'login' && (
            <LoginForm
              toggleForm={() => toggleForm('register')}
              toggleForgotPassword={() => toggleForm('forgotPassword')}
              onLogin={handleLogin} // Pass onLogin callback
              showSignUpLink
            />
          )}
          {formType === 'forgotPassword' && <ForgotPasswordForm toggleForm={toggleForm} />}
          {formType === 'resetPassword' && <ResetPasswordForm toggleForm={toggleForm} />}
        </Modal.Body>
      </Modal>

      {loggedIn && <DummyHomePage username={username} />} {/* Render DummyHomePage if logged in */}
    </>
  );
};

export default Menu;
