import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Other content for Admin Home */}
    </div>
  );
};

export default AdminHome;
