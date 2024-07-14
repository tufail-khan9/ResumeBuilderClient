import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './SuccessMessagePopup.css'; // Import the CSS file

const SuccessMessagePopup = ({ show, onClose, message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="modal-body33">
        <p className="success-message">{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessMessagePopup;
