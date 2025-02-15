import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCredentials.css';

const UpdateCredentials = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterNewPassword, setReEnterNewPassword] = useState('');
  const [warnings, setWarnings] = useState({ oldPassword: '', newPassword: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://qcs86.com/myapp/getcompleteuser', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err.message);
        alert('Failed to load user data. Please try again.');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (editMode) {
      if (oldPassword && user && oldPassword !== user.password) {
        setWarnings((prev) => ({ ...prev, oldPassword: 'Old password is incorrect.' }));
      } else {
        setWarnings((prev) => ({ ...prev, oldPassword: '' }));
      }

      if (newPassword && reEnterNewPassword && newPassword !== reEnterNewPassword) {
        setWarnings((prev) => ({ ...prev, newPassword: 'New passwords do not match.' }));
      } else {
        setWarnings((prev) => ({ ...prev, newPassword: '' }));
      }
    }
  }, [oldPassword, newPassword, reEnterNewPassword, user, editMode]);

  const updateCredentials = async () => {
    if (warnings.oldPassword || warnings.newPassword) {
      alert('Please resolve the warnings before saving changes.');
      return;
    }
    console.log("new password:", newPassword);
    try {
      const response = await axios.put(
        'https://qcs86.com/myapp/updateuserpass',
        {
          id: user.id,

          password: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      alert('Credentials updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setReEnterNewPassword('');
      setEditMode(false);
    } catch (err) {
      console.error('Error updating credentials:', err.message);
      alert('Failed to update credentials. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'reEnterNewPassword') setReEnterNewPassword(value);
  };

  if (!user) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="update-credentials-container">
      <h2>Update Credentials</h2>
      <div className="credentials-form">
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="input-field readonly"
        />
        {editMode && (
          <>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
              className={`input-field editable ${warnings.oldPassword ? 'warning' : ''}`}
              placeholder="Enter your old password"
            />
            {warnings.oldPassword && <span className="warning-message">{warnings.oldPassword}</span>}

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              className={`input-field editable ${warnings.newPassword ? 'warning' : ''}`}
              placeholder="Enter your new password"
            />

            <label>Re-enter New Password</label>
            <input
              type="password"
              name="reEnterNewPassword"
              value={reEnterNewPassword}
              onChange={handleInputChange}
              className={`input-field editable ${warnings.newPassword ? 'warning' : ''}`}
              placeholder="Re-enter your new password"
            />
            {warnings.newPassword && <span className="warning-message">{warnings.newPassword}</span>}
          </>
        )}
        <div className="button-group">
          {editMode ? (
            <>

              <button className="save-button1" onClick={updateCredentials}>
                Save Changes
              </button>
              <button
                className="cancel-button1"
                onClick={() => {
                  setEditMode(false);
                  setOldPassword('');
                  setNewPassword('');
                  setReEnterNewPassword('');
                  setWarnings({ oldPassword: '', newPassword: '' });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Credentials
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCredentials;
