// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaBook, FaUser } from 'react-icons/fa';
// import './StudentSidebar.css';

// const StudentSidebar = ({ isCollapsed, handleMenuClick }) => {
//   return (
//     <aside className={`student-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//       <nav className="student-sidebar-menu">
//         {/* Dashboard */}
//         <Link to="/student/dashboard" onClick={() => handleMenuClick('dashboard')}>
//           <FaTachometerAlt /> {isCollapsed ? '' : 'Dashboard'}
//         </Link>

//         {/* My Exams */}
//         <Link to="/student/exams" onClick={() => handleMenuClick('exams')}>
//           <FaBook /> {isCollapsed ? '' : 'My Exams'}
//         </Link>

//         {/* Profile */}
//         <Link to="/student/profile" onClick={() => handleMenuClick('profile')}>
//           <FaUser /> {isCollapsed ? '' : 'Profile'}
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default StudentSidebar;

// --------------------------------------- 

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaBook, FaUser } from 'react-icons/fa';
// import './StudentSidebar.css';

// const StudentSidebar = ({ isCollapsed, handleMenuClick }) => {
//   return (
//     <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//       <nav className="sidebar-menu">
//         <Link to="/student_dashboard" onClick={() => handleMenuClick('dashboard')}>
//           <FaTachometerAlt /> {isCollapsed ? '' : 'Dashboard'}
//         </Link>
//         <Link to="/student/My-exam" onClick={() => handleMenuClick('myCourses')}>
//           <FaBook /> {isCollapsed ? '' : 'My-exam'}
//         </Link>
//         <Link to="/student/profile" onClick={() => handleMenuClick('profile')}>
//           <FaUser /> {isCollapsed ? '' : 'Profile'}
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default StudentSidebar;

// ---------------- Kabir 
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, User } from "lucide-react";

const StudentSidebar = ({ isSidebarOpen, toggleSidebar, activeMenu, setActiveMenu }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", link: "/student_dashboard" },
    { icon: BookOpen, label: "My Exams", id: "exams", link: "/student/examperformance" },
    { icon: User, label: "Profile", id: "profile", link: "/student/profile" },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className={`transition-all ${isSidebarOpen ? 'p-3' : 'p-3'}`}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center ${
              isSidebarOpen ? 'px-3' : 'justify-center'
            } py-2.5 rounded-xl mb-1 transition-all ${
              activeMenu === item.id || location.pathname === item.link
                ? 'bg-orange-500 text-white'
                : 'hover:bg-stone-100 text-stone-600'
            }`}
          >
            {/* Always show the icon */}
            <item.icon
              className={`text-lg ${isSidebarOpen ? 'mr-3' : ''} transition-transform`}
            />
            {/* Show label only if the sidebar is open */}
            {isSidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

    </aside>
  );
};

export default StudentSidebar;

