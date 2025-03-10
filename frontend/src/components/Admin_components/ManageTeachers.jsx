

//above working correct util the make credential logout fucnitonality not work correct thats why updating this 
//ficning avove
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import './Admin_home.css';
import './ManageTeachers.css';

const ManageTeachers = ({ onLogout, isSidebarCollapsed, toggleSidebar   }) => {
  const [activeContent, setActiveContent] = useState('manageTeachers');
  const navigate = useNavigate();


  const handleMenuClick = (content) => {
    setActiveContent(content);
  };

  // Logout function
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Handle navigation to different pages when cards are clicked
  const handleMakeCredentialClick = () => {
    navigate('/admin/manage-teachers/make-credential'); // Redirect to /make-credential page
  };

  const handleTeacherDetailsClick = () => {
    navigate('/admin/manage-teachers/teacher-details'); // Redirect to /teacher-details page
  };

  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />

      {/* Admin Container */}
      <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Admin Sidebar */}
        <AdminSidebar isSidebarCollapsed={isSidebarCollapsed} handleMenuClick={handleMenuClick} />

        {/* Main Content */}
        <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="card-container">
            {/* Make Credential Card */}
            <div className="card" onClick={handleMakeCredentialClick}>
              <div className="card-bg"></div>
              <div className="card-title">Create Credential For Teacher</div>
              <div className="card-date-box"></div>
            </div>

            {/* Teacher Details Card */}
            <div className="card" onClick={handleTeacherDetailsClick}>
              <div className="card-bg"></div>
              <div className="card-title">All Teacher Details</div>
              <div className="card-date-box"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageTeachers;
