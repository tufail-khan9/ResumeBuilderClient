import React, { useState } from 'react';
import { Button, Form, Table, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faUser, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from '../Components/AxiosConfig';

const ResumeForm = () => {
  debugger;
  const currentUserId = localStorage.getItem("userId");
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
  const [newExperience, setNewExperience] = useState({ company: '', role: '', startDate: '', endDate: '' });

  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startDate: '', endDate: '' });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ id: '', name: '' });

  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState({ id: '', name: '' });

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
    if (newExperience.company && newExperience.role && newExperience.startDate && newExperience.endDate) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() }]);
      setNewExperience({ company: '', role: '', startDate: '', endDate: '' });
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

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4 text-start">Personal Information</h2>
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
          <Col md={4}>
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
          <Col md={4}>
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

      <h2 className="text-primary mt-5 mb-4 text-start">Contact Information</h2>
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
          <Col md={3} className='mt-3'>
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
          <Col md={3} className='mt-3'>
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

      <h2 className="text-primary mt-5 mb-4 text-start">Work Experience</h2>
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
                placeholder="Enter company"
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
        <Button className="mt-2" onClick={addExperience}>
          <FontAwesomeIcon icon={faPlus} />Add Experience
        </Button>
        </Col>
        </Row>
       
      </Form>&nbsp;
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
          {experiences.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.company}</td>
              <td>{exp.role}</td>
              <td>{exp.startDate}</td>
              <td>{exp.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="text-primary mt-5 mb-4 text-start">Education</h2>
     
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
                placeholder="Enter institution"
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
        <Button className="mt-2" onClick={addEducation}>
          <FontAwesomeIcon icon={faPlus} /> Add Education
        </Button></Col>
        </Row>
       
      </Form>&nbsp;
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
      <h2 className="text-primary mt-5 mb-4 text-start">Skills</h2>
      <Row>
          <Col md={4} className="d-flex align-items-center">
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          value={newSkill.name}
          onChange={(e) => handleChange(e, setNewSkill)}
          placeholder="Enter skill"
          onKeyDown={(e) => handleKeyDown(e, () => addItem(newSkill, setNewSkill, skills, setSkills), newSkill, setNewSkill)}
        />
      </Form.Group>
      </Col>
      <Col className="d-flex align-items-center">
        <Button className="mt-2" onClick={() => addItem(newSkill, setNewSkill, skills, setSkills)}>
          <FontAwesomeIcon icon={faPlus} /> Add Skill
        </Button></Col>
      </Row>&nbsp;
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>

      <h2 className="text-primary mt-3 mb-4 text-start">Hobbies</h2>
      <Row >
          <Col md={4} className="d-flex align-items-center">
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          value={newHobby.name}
          onChange={(e) => handleChange(e, setNewHobby)}
          placeholder="Enter hobby"
          onKeyDown={(e) => handleKeyDown(e, () => addItem(newHobby, setNewHobby, hobbies, setHobbies), newHobby, setNewHobby)}
        />
        
      </Form.Group>
      </Col>
      <Col className="d-flex align-items-center">
      <Button className="mt-2" onClick={() => addItem(newHobby, setNewHobby, hobbies, setHobbies)}>
          <FontAwesomeIcon icon={faPlus} /> Add Hobby
        </Button>
        </Col>
        </Row>&nbsp;
      <ul>
        {hobbies.map(hobby => (
          <li key={hobby.id}>{hobby.name}</li>
        ))}
      </ul>

      <Button className="d-flex justify-content-end" onClick={handleSave}>
        <FontAwesomeIcon icon={faSave} /> Save Resume
      </Button>
    </div>
  );
};

export default ResumeForm;
