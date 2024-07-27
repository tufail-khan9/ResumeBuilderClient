// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css'; // Optional: for custom styles

const Profile = ({ userId, setUser }) => {
  const [user, setUserState] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ContactNumber: '',
    UserType: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5054/api/User/GetSingleUser?id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        setUserState(userData);
        setFormData({
          UserName: userData.userName,
          Email: userData.email,
          ContactNumber: userData.contactNumber,
          UserType: userData.userType,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5054/api/User/UpdateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedUser = await response.json();
      setUserState(updatedUser);
      if (setUser) setUser(updatedUser); // Update the user in App.js if setUser is provided
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-info">
        {user.imageUrl ? (
          <img src={`http://localhost:5054/images/${user.imageUrl}`} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">No Image</div>
        )}
        <div className="profile-details">
          <div className="form-group">
            <label htmlFor="UserName">Name:</label>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ContactNumber">Contact Number:</label>
            <input
              type="text"
              id="ContactNumber"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label htmlFor="UserType">User Type:</label>
            <input
              type="text"
              id="UserType"
              name="UserType"
              value={formData.UserType}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="profile-button">
            {editMode ? (
              <button onClick={handleSave}>Save Changes</button>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
