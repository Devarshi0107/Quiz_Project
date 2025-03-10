

// src/components/ManageStudents.jsx
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar
import AdminSidebar from './AdminSidebar'; // Import the AdminSidebar
import "./Admin_home.css"; // Ensure you have necessary CSS styles

const ManageStudents = ({ onLogout, isSidebarCollapsed, toggleSidebar }) => {
  const [activeContent, setActiveContent] = useState('manageStudents');


  const handleMenuClick = (content) => {
    setActiveContent(content); // Set the active content
  };

  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} onLogout={onLogout} />

      {/* Admin Container */}
      <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Admin Sidebar */}
        <AdminSidebar isCollapsed={isSidebarCollapsed} handleMenuClick={handleMenuClick} />

        {/* Main Content */}
        <main className={`main-content ${isSidebarCollapsed  ? 'collapsed' : ''}`}>
          <h2>Manage Students</h2>
          <p>This is the Manage Students section.</p>
          {/* Add your student management logic here */}
        </main>
      </div>
    </div>
  );
};

export default ManageStudents;

