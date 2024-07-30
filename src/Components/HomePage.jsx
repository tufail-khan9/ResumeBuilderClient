import React, { useEffect, useState } from 'react';
import axios from './AxiosConfig';
import { Table, Button, Modal, Row, Col, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import './../App.css';

const HomePage = ({ username }) => {
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userType, setUserType] = useState('');

  const [editId, setEditId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  //const [editConfirmPassword, setEditConfirmPassword] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editContactNumber, setEditContactNumber] = useState('');
  const [editUserType, setEditUserType] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = (isCreateMode = false) => {
    setCreateMode(isCreateMode);
    setShow(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('User/GetAllUser');
      setShowData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await axios.delete(`User/DeleteUser?id=${id}`);
        Swal.fire({
          title: 'Success!',
          text: 'User deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        getData();
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  const handleSubmit = async () => {
    // Handle create user logic
  };

  const handleEdit = async (id) => {
    const user = showData.find(user => user.id === id);
    if (user) {
      setEditId(user.id);
      setEditUserName(user.userName);
      setEditEmail(user.email);
      setEditPassword(user.password);
      // setEditConfirmPassword(user.confirmPassword);
      setEditImageUrl(user.imageUrl);
      setEditContactNumber(user.contactNumber);
      setEditUserType(user.userType);
      handleShow(false);
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: editId,
      userName: editUserName,
      email: editEmail,
      password: editPassword,
      // confirmPassword: editConfirmPassword,
      imageUrl: editImageUrl,
      contactNumber: editContactNumber,
      userType: editUserType
    };

    try {
      await axios.put(`User/UpdateUser`, data);
      getData();
      handleClose();
      Swal.fire({
        title: 'Success!',
        text: 'User updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log("Error updating the user:", error);
    }
  };

  const filteredData = showData.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Container fluid>
        <Row className="my-3 align-items-center">
          <Col><h4>All User List</h4></Col>
          <Col className="text-end">
            <Button variant="success" onClick={() => handleShow(true)}>
              <FontAwesomeIcon icon={faPlus} /> Create New User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="mt-1">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '20%' }}
            />
          </Col>
        </Row>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Password</th>
              {/* <th>Confirm Password</th> */}
              <th>User Image</th>
              <th>Contact Number</th>
              <th>User Type</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                {/* <td>{item.confirmPassword}</td> */}
                <td><img src={item.imageUrl} alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                <td>{item.contactNumber}</td>
                <td>{item.userType}</td>
                <td className="actions">
                  <Button variant="warning" onClick={() => handleEdit(item.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>&nbsp;
                  <Button variant="danger" onClick={() => deleteUser(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose} className={`zoom-in ${show ? 'show' : ''}`}>
          <Modal.Header closeButton>
            <Modal.Title>{createMode ? "Create New User" : "Update User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col><Form.Control type="text" placeholder="Enter First Name" value={createMode ? userName : editUserName} onChange={(e) => createMode ? setUserName(e.target.value) : setEditUserName(e.target.value)} /></Col>
              </Row>

              <Row className="mb-3">
                <Col><Form.Control type="email" placeholder="Enter Email" value={createMode ? email : editEmail} onChange={(e) => createMode ? setEmail(e.target.value) : setEditEmail(e.target.value)} /></Col>
              </Row>

              <Row className="mb-3">
                <Col><Form.Control type="password" placeholder="Enter Password" value={createMode ? password : editPassword} onChange={(e) => createMode ? setPassword(e.target.value) : setEditPassword(e.target.value)} /></Col>
              </Row>

              {/* <Row className="mb-3">
                <Col><Form.Control type="password" placeholder="Confirm Password" value={createMode ? confirmPassword : editConfirmPassword} onChange={(e) => createMode ? setConfirmPassword(e.target.value) : setEditConfirmPassword(e.target.value)} /></Col>
              </Row> */}

              <Row className="mb-3">
                <Col><Form.Control type="text" placeholder="Enter Image URL" value={createMode ? imageUrl : editImageUrl} onChange={(e) => createMode ? setImageUrl(e.target.value) : setEditImageUrl(e.target.value)} /></Col>
              </Row>

              <Row className="mb-3">
                <Col><Form.Control type="text" placeholder="Enter Contact Number" value={createMode ? contactNumber : editContactNumber} onChange={(e) => createMode ? setContactNumber(e.target.value) : setEditContactNumber(e.target.value)} /></Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Select value={createMode ? userType : editUserType} onChange={(e) => createMode ? setUserType(e.target.value) : setEditUserType(e.target.value)}>
                    <option value="">Select User Type</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Recruiter">Recruiter</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={createMode ? handleSubmit : handleUpdate}>{createMode ? "Create" : "Update"}</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default HomePage;
