

// //abv- utnil adding logout same as admin logou
// //fixing

// // TeacherNavbar.jsx
// import React from 'react';
// import { FaBars } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import "./Teacher_home.css"; // Import the teacher-specific CSS

// const TeacherNavbar = ({ toggleSidebar, onLogout, isLoggedIn, userType}) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     onLogout(); // Call the logout function passed as a prop
//     navigate('/'); // Navigate to the home page after logout
//   };

//   if (!isLoggedIn || userType !== "teacher") {
//     return null;
//   }
//   return (
//     <div className="teacher-navbar">
//       <div className="teacher-app-name">
//         <span className="teacher-menu-button" onClick={toggleSidebar}>
//           <FaBars />
//         </span>
//         TEACHER DASHBOARD
//       </div>
//       <button className="teacher-logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default TeacherNavbar;


// ------------------------- kabir
import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherNavbar = ({ toggleSidebar, onLogout, isLoggedIn, userType, student }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the logout handler
    }
    navigate('/'); // Navigate to the home page
  };

  if (!isLoggedIn || userType !== "teacher") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4">
      <div className="h-full flex items-center justify-between max-w-full mx-auto">
        {/* Left Section - Hamburger & Student Hub */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar} // Trigger the sidebar collapse
            className="p-2 hover:bg-stone-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-semibold">Teacher Hub</div>
        </div>

        {/* Right Section - Student Info and Logout */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right">
              <div className="text-sm font-medium">{student?.name || "Teacher"}</div>
              <div className="text-xs text-stone-500">{student?.branch || "Branch Info"}</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white flex items-center justify-center font-medium">
              {student?.name?.[0] || "T"}
            </div>
          </div>

          <button
            className="p-2 hover:bg-stone-100 rounded-lg flex items-center"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="ml-2 text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;
