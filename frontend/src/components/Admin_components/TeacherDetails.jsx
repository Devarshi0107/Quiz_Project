import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import './Admin_home.css'; // Ensure this file is included for existing styles
import './TeacherDetails.css'; // Add a new CSS file for styling

const TeacherDetails = ({ onLogout, isSidebarCollapsed, toggleSidebar   }) => {
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/'); // Redirect to the home page or login page
    } else {
      console.error("onLogout function is not defined");
    }
  };

  // Fetch teacher details when the component mounts
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allteachers'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch teacher details');
        }
        const data = await response.json();
        setTeacherDetails(data); // Assuming data is an array of teacher objects
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, []);

  return (
    <div>
      <AdminNavbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />

      <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <AdminSidebar isSidebarCollapsed={isSidebarCollapsed} handleMenuClick={() => {}} />

        <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          {loading ? (
            <p>Loading teacher details...</p>
          ) : (
            <div className="teacher-details-container">
              <h1>Teacher Details</h1>
              {teacherDetails && teacherDetails.length > 0 ? (
                <div className="teacher-list">
                  {teacherDetails.map((teacher, index) => (
                    <div className="teacher-card" key={index}>
                      <h3>{teacher.teacherName}</h3>
                      <p><strong>Email:</strong> {teacher.email}</p>
                      <p><strong>Branch:</strong> {teacher.branch}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No teacher details available.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDetails;
