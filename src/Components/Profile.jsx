// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css'; // Optional: for custom styles
import axios from './AxiosConfig';


const Profile = ({ userId, setUser }) => {
  const [user, setUserState] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    ContactNumber: '',
    UserType: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`User/GetSingleUser?id=${userId}`);
        setUserState(data);
        setFormData({
          UserName: data.userName,
          Email: data.email,
          ContactNumber: data.contactNumber,
          UserType: data.userType,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (userId) fetchUserData();
  }, [userId]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    debugger;
    try {
      const { data } = await axios.put('User/UpdateUser', formData);
      setUserState(data);
      if (setUser) setUser(data); // Update the user in App.js if setUser is provided
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