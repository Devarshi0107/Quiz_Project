

// // src/components/TeacherSidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaLock, FaPen } from 'react-icons/fa'; // Updated icons
// import './Teacher_home.css'; // Teacher-specific CSS

// const TeacherSidebar = ({ isCollapsed, handleMenuClick }) => {
//   return (
//     <aside className={`teacher-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//       <nav className="teacher-sidebar-menu">
//         {/* Dashboard */}
//         <Link to="/teacher-home" onClick={() => handleMenuClick('dashboard')}>
//           <FaTachometerAlt /> {isCollapsed ? '' : 'Dashboard'}
//         </Link>

//         {/* Create Exam */}
//         <Link to="/teacher/create-exam" onClick={() => handleMenuClick('createExam')}>
//           <FaPen /> {isCollapsed ? '' : 'Create Exam'}
//         </Link>

//         {/* Change Password */}
//         <Link to="/teacher/change-password" onClick={() => handleMenuClick('changePassword')}>
//           <FaLock /> {isCollapsed ? '' : 'Change Password'}
//         </Link>
//         <Link to="/teacher/profile" onClick={() => handleMenuClick('manage-profile')}>
//           <FaLock /> {isCollapsed ? '' : 'Profile'}
//         </Link>
//         <Link to="/mcqqgenerator" onClick={() => handleMenuClick('manage-profile')}>
//           MCQ Generator
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default TeacherSidebar;


// //above work correct until the change pawd apply for profile tag
// //fixing

// KABIR
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Pencil, Lock, User, FileText } from "lucide-react"; // Lucide Icons

const TeacherSidebar = ({ isSidebarOpen, toggleSidebar, activeMenu, setActiveMenu }) => {
  const location = useLocation();

  // Teacher Sidebar Menu Items
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", link: "/teacher_home" },
    { icon: Pencil, label: "Create Exam", id: "createExam", link: "/teacher/create-exam" },
    { icon: User, label: "Profile", id: "profile", link: "/teacher/profile" },  
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className={`transition-all ${isSidebarOpen ? "p-3" : "p-3"}`}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center ${
              isSidebarOpen ? "px-3" : "justify-center"
            } py-2.5 rounded-xl mb-1 transition-all ${
              activeMenu === item.id || location.pathname === item.link
                ? "bg-orange-500 text-white"
                : "hover:bg-stone-100 text-stone-600"
            }`}
          >
            {/* Render Icon */}
            <item.icon
              className={`text-lg ${isSidebarOpen ? "mr-3" : ""} transition-transform`}
            />
            {/* Show Label Only if Sidebar is Open */}
            {isSidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default TeacherSidebar;
