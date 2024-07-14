import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import DummyHomePage from './HomePage'; // Import DummyHomePage if needed
import './Menu.css'; // Adjust path based on actual location of Menu.css

const Menu = ({ setView }) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormType('login'); // Reset form type on modal close
  };

  const toggleForm = (type) => {
    setFormType(type);
    handleShow(); // Ensure modal opens when form type changes
  };

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
    setFormType('home'); // Switch to 'home' after successful login
    setShowModal(false); // Close the modal after successful login
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!loggedIn ? (
              <>
                <Nav.Link href="#" onClick={() => toggleForm('login')}>
                  <FontAwesomeIcon icon={faHome} /> Login
                </Nav.Link>
                <Nav.Link href="#" onClick={() => toggleForm('forgotPassword')}>
                  <FontAwesomeIcon icon={faSearch} /> Forgot Password
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="#" onClick={() => setFormType('home')}>
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
            {formType === 'register' && 'Register'}
            {formType === 'forgotPassword' && 'Forgot Password'}
            {formType === 'resetPassword' && 'Reset Password'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === 'login' && (
            <LoginForm 
              toggleForm={() => toggleForm('register')} 
              toggleForgotPassword={() => toggleForm('forgotPassword')} 
              onLogin={handleLogin}
              showSignUpLink
            />
          )}
          {formType === 'register' && (
            <>
              <RegistrationForm toggleForm={toggleForm} />
              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <button className="btn btn-link" onClick={() => toggleForm('login')}>
                  Back to Login
                </button>
              </div>
            </>
          )}
          {formType === 'forgotPassword' && <ForgotPasswordForm toggleForm={() => toggleForm('login')} />}
          {formType === 'resetPassword' && <ResetPasswordForm toggleForm={() => toggleForm('login')} />}
        </Modal.Body>
      </Modal>

      {loggedIn && formType === 'home' && <DummyHomePage username={username} />}
    </>
  );
};

export default Menu;
