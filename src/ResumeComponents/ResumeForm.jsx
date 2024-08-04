import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faPlus, faSave, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from '../Components/AxiosConfig';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './ResumeForm.css';

const ResumeForm = () => {
  debugger;
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id || null;
  const [userId, setUserId] = useState(currentUserId);

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
  const [newExperience, setNewExperience] = useState({ company: '', role: '', startDate: '', endDate: '', responsibilities: '' });

  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startDate: '', endDate: '' });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ id: '', name: '' });

  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState({ id: '', name: '' });

  useEffect(() => {
    debugger;
    const userId = localStorage.getItem('userId');
    const profileImageUrl = localStorage.getItem('profileImageUrl');
    
    if (userId && profileImageUrl) {
      setUserId(userId);
      setPersonalInfo(prev => ({ ...prev, image: profileImageUrl })); // Set profile image URL in personalInfo state
    }
  }, []);

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPersonalInfo((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const addItem = (item, setItem, list, setList) => {
    if (!item.name.trim()) return;
    setList([...list, { ...item, id: Date.now().toString() }]);
    setItem({ id: '', name: '' });
  };

  const handleKeyDown = (e, addFn, newItem, setNewItem) => {
    if (e.key === 'Enter' && newItem.name.trim()) {
      addFn();
      setNewItem({ id: '', name: '' });
      e.preventDefault();
    }
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.role && newExperience.startDate && newExperience.endDate && newExperience.responsibilities) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() }]);
      setNewExperience({ company: '', role: '', startDate: '', endDate: '', responsibilities: '' });
    }
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.startDate && newEducation.endDate) {
      setEducations([...educations, { ...newEducation, id: Date.now().toString() }]);
      setNewEducation({ institution: '', degree: '', startDate: '', endDate: '' });
    }
  };

  const handleSave = () => {
    const formatDate = (date) => new Date(date).toISOString();

    const resumeData = {
      personalInfo: {
        image: personalInfo.image,
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
        responsibilities: exp.responsibilities,
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
        name: skill.name,
        userId: userId,
      })),
      hobbies: hobbies.map(hobby => ({
        name: hobby.name,
        userId: userId,
      })),
    };

    axios.post('PersonalInfo/SavePersonalInfo', resumeData)
      .then(response => {
        console.log("Data saved successfully!");
      })
      .catch(error => {
        console.error("There was an error saving the data!", error);
      });
  };

  const handleCreatePDF = () => {
    const input = document.getElementById('resume-content');
    if (!input) {
      console.error("No element found with ID 'resume-content'");
      return;
    }

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="container mt-5 resume-form" id="resume-content">
      <h2 className="text-primary mb-4 text-start">Personal Information</h2>
      <Form>
        <Row className="mb-3">
          <Col md={3} className="d-flex flex-column align-items-center">
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {personalInfo.image && <img src={personalInfo.image} alt="Profile" />}
            </Form.Group>
          </Col>
          
          <Col md={9}>
            <Form.Group controlId="formName">
              <Form.Label><FontAwesomeIcon icon={faUser} /> Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={personalInfo.name}
                onChange={(e) => handleChange(e, setPersonalInfo)}
              />
            </Form.Group>

            <Form.Group controlId="formDesignation">
              <Form.Label><FontAwesomeIcon icon={faUser} /> Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your designation"
                name="designation"
                value={personalInfo.designation}
                onChange={(e) => handleChange(e, setPersonalInfo)}
              />
            </Form.Group>

            <Form.Group controlId="formAboutMe">
              <Form.Label>About Me</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tell something about yourself"
                name="aboutMe"
                value={personalInfo.aboutMe}
                onChange={(e) => handleChange(e, setPersonalInfo)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="text-primary mb-4">Contact Information</h2>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formMobile">
              <Form.Label><FontAwesomeIcon icon={faPhone} /> Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your mobile number"
                name="mobile"
                value={contactInfo.mobile}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={contactInfo.email}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formLocation">
              <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your location"
                name="location"
                value={contactInfo.location}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLinkedIn">
              <Form.Label><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your LinkedIn profile"
                name="linkedin"
                value={contactInfo.linkedin}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formGitHub">
              <Form.Label><FontAwesomeIcon icon={faGithub} /> GitHub</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your GitHub profile"
                name="github"
                value={contactInfo.github}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formWebsite">
              <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your website URL"
                name="website"
                value={contactInfo.website}
                onChange={(e) => handleChange(e, setContactInfo)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="text-primary mb-4">Work Experience</h2>
       
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company"
                name="company"
                value={newExperience.company}
                onChange={(e) => handleChange(e, setNewExperience)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                name="role"
                value={newExperience.role}
                onChange={(e) => handleChange(e, setNewExperience)}
              />
            </Form.Group>
          </Col>
          <Col>
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
          <Col>
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
        </Row>
        <Form.Group controlId="formResponsibilities">
          <Form.Label>Responsibilities</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter responsibilities"
            name="responsibilities"
            value={newExperience.responsibilities}
            onChange={(e) => handleChange(e, setNewExperience)}
          />
        </Form.Group>
        <Button className="mt-2" variant="secondary" onClick={addExperience}>
          <FontAwesomeIcon icon={faPlus} /> Add Experience
        </Button>
        <div className="table-container mt-3">
          <Table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.company}</td>
                  <td>{exp.role}</td>
                  <td>{exp.startDate}</td>
                  <td>{exp.endDate}</td>
                  <td>{exp.responsibilities}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <h2 className="text-primary mb-4">Education</h2>
       
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter institution"
                name="institution"
                value={newEducation.institution}
                onChange={(e) => handleChange(e, setNewEducation)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter degree"
                name="degree"
                value={newEducation.degree}
                onChange={(e) => handleChange(e, setNewEducation)}
              />
            </Form.Group>
          </Col>
          <Col>
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
          <Col>
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
        </Row>
        <Button className="mt-2" variant="secondary" onClick={addEducation}>
          <FontAwesomeIcon icon={faPlus} /> Add Education
        </Button>
        <div className="table-container mt-4">
          <Table className="table">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Degree</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr key={edu.id}>
                  <td>{edu.institution}</td>
                  <td>{edu.degree}</td>
                  <td>{edu.startDate}</td>
                  <td>{edu.endDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <h2 className="text-primary mb-4">Skills</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
        <Row>
          <Col md={10}>
            <Form.Group>
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text" 
                name="name"
                placeholder="Enter skill"
                onChange={(e) => handleChange(e, setNewSkill)}
                value={newSkill.name}
                              
                onKeyDown={(e) => handleKeyDown(e, () => addItem(newSkill, setNewSkill, skills, setSkills), newSkill, setNewSkill)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="secondary" onClick={() => addItem(newSkill, setNewSkill, skills, setSkills)}>
              <FontAwesomeIcon icon={faPlus} /> Add
            </Button>
          </Col>
        </Row>

        <h2 className="text-primary mb-4">Hobbies</h2>
        <ul>
          {hobbies.map((hobby) => (
            <li key={hobby.id}>{hobby.name}</li>
          ))}
        </ul>
        <Row>
          <Col md={10}>
            <Form.Group>
              <Form.Label>Hobby</Form.Label>
              <Form.Control
                type="text"
                 name="name"
                placeholder="Enter hobby"
                value={newHobby.name}
                onChange={(e) => handleChange(e, setNewHobby)}
                onKeyDown={(e) => handleKeyDown(e, () => addItem(newHobby, setNewHobby, hobbies, setHobbies), newHobby, setNewHobby)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="secondary" onClick={() => addItem(newHobby, setNewHobby, hobbies, setHobbies)}>
              <FontAwesomeIcon icon={faPlus} /> Add
            </Button>
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
          <Button variant="danger" onClick={handleCreatePDF} className="ms-2">
            <FontAwesomeIcon icon={faFilePdf} /> Download as PDF
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResumeForm;

