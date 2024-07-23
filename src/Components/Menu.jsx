import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import './Menu.css';

const Menu = ({ isLoggedIn, onLogout, onLogin }) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormType('login'); 
  };
  

  const toggleForm = (type) => {
    setFormType(type);
    handleShow();
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="/" className="navbar-brand">Resume Builder App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isLoggedIn && (
              <Nav.Link href="#" onClick={() => toggleForm('login')}>
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/contactInfo">
              <FontAwesomeIcon icon={faAddressBook} /> Contact Info
            </Nav.Link>
            <Nav.Link as={Link} to="/educationInfo">
              <FontAwesomeIcon icon={faAddressBook} /> Education Info
            </Nav.Link>
            <Nav.Link as={Link} to="/homePage">
              <FontAwesomeIcon icon={faAddressBook} /> HomePage
            </Nav.Link>
            <Nav.Link as={Link} to="/skill">
              <FontAwesomeIcon icon={faAddressBook} /> Skill
            </Nav.Link>
            <Nav.Link as={Link} to="/hobby">
              <FontAwesomeIcon icon={faAddressBook} /> Hobby
            </Nav.Link>
            <Nav.Link as={Link} to="/workExperience">
              <FontAwesomeIcon icon={faAddressBook} /> Work Experience
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link href="#" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignInAlt} /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
  {formType === 'login' && (
    <LoginForm
      handleClose={handleClose}
      toggleForm={toggleForm}
      toggleForgotPassword={() => toggleForm('forgotPassword')}
      showSignUpLink={true}
      onLogin={onLogin}
    />
  )}
  {formType === 'register' && <RegistrationForm toggleForm={toggleForm} />}
  {formType === 'forgotPassword' && <ForgotPasswordForm toggleForm={toggleForm} />}
  {formType === 'resetPassword' && <ResetPasswordForm toggleForm={toggleForm} />}
</Modal>

    </>
  );
};

export default Menu;
