import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./Admin_home.css";

const AdminNavbar = ({ toggleSidebar, onLogout, isLoggedIn, userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout handler to clear localStorage and state
    navigate('/'); // Navigate to the home page
  };

  // Render the navbar only if the user is logged in and is an admin
  if (!isLoggedIn || userType !== "admin") {
    return null;
  }

  return (
    <div className="admin-navbar">
      <div className="app-name">
        <span className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </span>
        ONLINE QUIZ
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
