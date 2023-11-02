// src/components/UserProfile.js

import React, { useState } from 'react';

function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement user profile update logic here (e.g., make an API call to update user details)
    // You may want to show a confirmation message upon successful update.
    setIsEditing(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editedUser.name}
            onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editedUser.email}
            onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
      
    </div>
  );
}

export default UserProfile;
