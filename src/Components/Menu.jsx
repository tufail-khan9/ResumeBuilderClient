// src/Components/Menu.js
import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Modal, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faAddressBook, faUser, faTachometerAlt, faFileAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import './Menu.css';

const Menu = ({ isLoggedIn, onLogout, onLogin, user, setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const toggleForm = (type) => {
    setFormType(type);
    handleShow();
  };

  const handleSuccessfulLogin = (userData) => {
    onLogin(userData);
    handleClose();
    navigate('/dummypage'); // Navigate to DummyPage
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redirect to homepage or any public page
  };

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdownMenu = dropdownRef.current.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        const menuWidth = dropdownMenu.offsetWidth;
        dropdownMenu.style.left = `-${menuWidth / 2}px`;
      }
    }
  }, [isLoggedIn, user]);

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="/" className="navbar-brand">Resume Builder App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {/* <Nav.Link as={Link} to="/homePage">
              <FontAwesomeIcon icon={faAddressBook} /> HomePage
            </Nav.Link> */}
            {isLoggedIn && (
              <>
                {/* <Nav.Link as={Link} to="/dashboard">
                  <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/myresume">
                  <FontAwesomeIcon icon={faFileAlt} /> My Resume
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  <FontAwesomeIcon icon={faUserShield} /> Admin
                </Nav.Link> */}
              </>
            )}
            {!isLoggedIn ? (
              <Nav.Link href="#" onClick={() => toggleForm('login')}>
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    {user?.imageUrl ? (
                      <img src={`http://localhost:5054/images/${user.imageUrl}`} alt="Profile" className="profile-image" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    )}
                    <span className="ml-2">{user.UserName}</span>
                  </span>
                }
                id="user-dropdown"
                ref={dropdownRef}
              >
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
              </NavDropdown>
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
            onLogin={handleSuccessfulLogin}
          />
        )}
        {formType === 'register' && <RegistrationForm toggleForm={toggleForm} setUser={setUser} />}
        {formType === 'forgotPassword' && <ForgotPasswordForm toggleForm={toggleForm} />}
        {formType === 'resetPassword' && <ResetPasswordForm toggleForm={toggleForm} />}
      </Modal>
    </>
  );
};

export default Menu;
