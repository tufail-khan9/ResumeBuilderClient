import React, { useState } from 'react';
import { Button, Form, Table, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faUser, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from '../Components/AxiosConfig';

const ResumeForm = () => {
  const [userId, setUserId] = useState('1'); 
  const [personalInfo, setPersonalInfo] = useState({
    image: '',
    name: '',
    designation: '',
    aboutMe: '',
  });

  const [contactInfo, setContactInfo] = useState({
    mobile: '',
    email: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  });

  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ company: '', role: '', startDate: '', endDate: '' });

  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startDate: '', endDate: '' });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState('');

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPersonalInfo((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const addItem = (item, setItem, list, setList) => {
    setList([...list, item]);
    setItem('');
  };

  const handleKeyDown = (e, addFn, newItem, setNewItem) => {
    if (e.key === 'Enter' && newItem.trim()) {
      addFn();
      setNewItem('');
      e.preventDefault();
    }
  };

  const handleSave = () => {
    const formatDate = (date) => {
        return new Date(date).toISOString();
    };

    const resumeData = {
        personalInfo: {
            image: personalInfo.image || "",
            name: personalInfo.name,
            designation: personalInfo.designation,
            aboutMe: personalInfo.aboutMe,
            userId: userId,
        },
        contactInfo: {
            mobile: contactInfo.mobile,
            email: contactInfo.email,
            location: contactInfo.location,
            linkedIn: contactInfo.linkedin,
            gitHub: contactInfo.github,
            website: contactInfo.website,
            userId: userId,
        },
        experiences: experiences.map(exp => ({
            company: exp.company,
            role: exp.role,
            startDate: formatDate(exp.startDate),
            endDate: formatDate(exp.endDate),
            userId: userId,
        })),
        educations: educations.map(edu => ({
            institution: edu.institution,
            degree: edu.degree,
            startDate: formatDate(edu.startDate),
            endDate: formatDate(edu.endDate),
            userId: userId,
        })),
        skills: skills.map(skill => ({
            name: skill.skill || "",
            userId: userId,
        })),
        hobbies: hobbies.map(hobby => ({
            name: hobby.hobby || "",
            userId: userId,
        })),
    };

    // Log the data to ensure it's formatted correctly
    console.log("Sending data to API:", resumeData);

    axios.post('PersonalInfo/SavePersonalInfo', resumeData)
        .then(response => {
            setSuccessMessage("Data saved successfully!");
        })
        .catch(error => {
            setErrorMessage("There was an error saving the data!");
            console.error("There was an error saving the data!", error);
        });
};


 

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Personal Information</h2>
      <Form onSubmit={handleSave}>
        <Row className="mb-3">
          <Col md={3} className="d-flex flex-column align-items-center">
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {personalInfo.image && (
                <img
                  src={personalInfo.image}
                  alt="Profile"
                  className="mt-3 rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faUser} /> Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={(e) => handleChange(e, setPersonalInfo)}
                placeholder="Enter your name"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={personalInfo.designation}
                onChange={(e) => handleChange(e, setPersonalInfo)}
                placeholder="Enter your designation"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={9}>
            <Form.Group>
              <Form.Label>About Me</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="aboutMe"
                value={personalInfo.aboutMe}
                onChange={(e) => handleChange(e, setPersonalInfo)}
                placeholder="Tell us about yourself"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <h2 className="text-primary mt-5 mb-4">Contact Information</h2>
      <Form>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faPhone} /> Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={contactInfo.mobile}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter mobile number"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter email address"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={contactInfo.location}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter your location"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</Form.Label>
              <Form.Control
                type="text"
                name="linkedin"
                value={contactInfo.linkedin}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter LinkedIn profile"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label><FontAwesomeIcon icon={faGithub} /> GitHub</Form.Label>
              <Form.Control
                type="text"
                name="github"
                value={contactInfo.github}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter GitHub profile"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={contactInfo.website}
                onChange={(e) => handleChange(e, setContactInfo)}
                placeholder="Enter your website"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <h2 className="text-primary mt-5 mb-4">Work Experience</h2>
      <Form>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newExperience.company}
                onChange={(e) => handleChange(e, setNewExperience)}
                placeholder="Enter company name"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={newExperience.role}
                onChange={(e) => handleChange(e, setNewExperience)}
                placeholder="Enter role"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newExperience.startDate}
                onChange={(e) => handleChange(e, setNewExperience)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newExperience.endDate}
                onChange={(e) => handleChange(e, setNewExperience)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="text-end">
            <Button onClick={() => addItem(newExperience, setNewExperience, experiences, setExperiences)}>
              <FontAwesomeIcon icon={faPlus} /> Add Experience
            </Button>
          </Col>
        </Row>
      </Form>

      <h3 className="mt-5">Experience List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp, index) => (
            <tr key={index}>
              <td>{exp.company}</td>
              <td>{exp.role}</td>
              <td>{exp.startDate}</td>
              <td>{exp.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="text-primary mt-5 mb-4">Education</h2>
      <Form>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                name="institution"
                value={newEducation.institution}
                onChange={(e) => handleChange(e, setNewEducation)}
                placeholder="Enter institution name"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={(e) => handleChange(e, setNewEducation)}
                placeholder="Enter degree"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newEducation.startDate}
                onChange={(e) => handleChange(e, setNewEducation)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newEducation.endDate}
                onChange={(e) => handleChange(e, setNewEducation)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="text-end">
            <Button onClick={() => addItem(newEducation, setNewEducation, educations, setEducations)}>
              <FontAwesomeIcon icon={faPlus} /> Add Education
            </Button>
          </Col>
        </Row>
      </Form>

      <h3 className="mt-5">Education List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Degree</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((edu, index) => (
            <tr key={index}>
              <td>{edu.institution}</td>
              <td>{edu.degree}</td>
              <td>{edu.startDate}</td>
              <td>{edu.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="text-primary mt-5 mb-4">Skills</h2>
      <Form>
        <Row className="align-items-end">
          <Col md={10}>
            <Form.Group>
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => setSkills([...skills, newSkill]), newSkill, setNewSkill)}
                placeholder="Enter a skill and press Enter"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div className="mt-3">
        {skills.map((skill, index) => (
          <Badge key={index} pill className="mr-2 mb-2 bg-primary">
            {skill}
          </Badge>
        ))}
      </div>

      <h2 className="text-primary mt-5 mb-4">Hobbies</h2>
      <Form>
        <Row className="align-items-end">
          <Col md={10}>
            <Form.Group>
              <Form.Label>Hobby</Form.Label>
              <Form.Control
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => setHobbies([...hobbies, newHobby]), newHobby, setNewHobby)}
                placeholder="Enter a hobby and press Enter"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div className="mt-3">
        {hobbies.map((hobby, index) => (
          <Badge key={index} pill className="mr-2 mb-2 bg-primary">
            {hobby}
          </Badge>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-5">
        <Button onClick={handleSave} className="me-2">
          <FontAwesomeIcon icon={faSave} /> Save
        </Button>
        {/* <Button onClick={handleSaveAndCreatePDF}>
          <FontAwesomeIcon icon={faSave} /> Save & Create PDF
        </Button> */}
      </div>
    </div>
  );
};

export default ResumeForm;
