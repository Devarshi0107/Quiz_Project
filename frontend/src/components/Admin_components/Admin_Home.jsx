

// // AdminHome.jsx
// import React, { useState } from "react";
// import AdminNavbar from './AdminNavbar'; // Importing the new navbar component
// import AdminSidebar from './AdminSidebar'; // Importing the new sidebar component
// import "./Admin_home.css";

// const AdminHome = ({ onLogout }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeContent, setActiveContent] = useState('dashboard');

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed); // Toggle sidebar state
//   };

//   const handleMenuClick = (content) => {
//     setActiveContent(content); // Set the active content
//   };

//   return (
//     <div>
//       {/* Admin Navbar */}
//       <AdminNavbar toggleSidebar={toggleSidebar} onLogout={onLogout} />

//       {/* Admin Container */}
//       <div className={`admin-container ${isCollapsed ? 'collapsed' : ''}`}>
//         {/* Sidebar */}
//         <AdminSidebar isCollapsed={isCollapsed} handleMenuClick={handleMenuClick} />

//         {/* Main Content */}
//         <main className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
//           <div className="dashboard-cards">
//             {activeContent === 'manageTeachers' && (
//               <div className="card">
//                 <h3>Manage Teachers</h3>
//                 <p>View, approve, or delete teacher accounts.</p>
//               </div>
//             )}
//             {activeContent === 'manageStudents' && (
//               <div className="card">
//                 <h3>Manage Students</h3>
//                 <p>View, edit, or remove student accounts.</p>
//               </div>
//             )}
//             {activeContent === 'manageExams' && (
//               <div className="card">
//                 <h3>Manage Exams</h3>
//                 <p>Create, view, or delete exams/courses.</p>
//               </div>
//             )}
//             {activeContent === 'dashboard' && (
//               <div className="card">
//                 <h3>Dashboard</h3>
//                 <p>This is your dashboard overview.</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;

import React, { useState } from "react";
import AdminNavbar from './AdminNavbar'; 
import AdminSidebar from './AdminSidebar'; 
import "./Admin_home.css";

const AdminHome = ({ onLogout, isSidebarCollapsed, toggleSidebar }) => {
  const [activeContent, setActiveContent] = useState('dashboard');

  const handleMenuClick = (content) => {
    setActiveContent(content); // Set the active content
  };

  return (
    <div>
      <AdminNavbar toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <AdminSidebar isCollapsed={isSidebarCollapsed} handleMenuClick={handleMenuClick} />
        <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="dashboard-cards">
            {activeContent === 'manageTeachers' && (
              <div className="card">
                <h3>Manage Teachers</h3>
                <p>View, approve, or delete teacher accounts.</p>
              </div>
            )}
            {activeContent === 'manageStudents' && (
              <div className="card">
                <h3>Manage Students</h3>
                <p>View, edit, or remove student accounts.</p>
              </div>
            )}
            {activeContent === 'manageExams' && (
              <div className="card">
                <h3>Manage Exams</h3>
                <p>Create, view, or delete exams/courses.</p>
              </div>
            )}
            {activeContent === 'dashboard' && (
              <div className="card">
                <h3>Dashboard</h3>
                <p>This is your dashboard overview.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
