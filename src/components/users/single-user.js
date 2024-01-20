// src/User.js
import React, { useState } from 'react';

const User = ({ user, onUpdateUser, onDeleteUser }) => {
  const [name, setName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdateUser({ ...user, name });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteUser(user.id);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{user.name}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default User;
