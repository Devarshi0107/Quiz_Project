

// //above croreect wroking until adding hte logout fxn same as managesteachers for the make credenttials
// //ficng above

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Home_landing/Navbar';
// import Home from './components/Home_landing/Home';
// import TeacherLogin from './components/Home_landing/TeacherLogin';
// import StudentLogin from './components/Home_landing/StudentLogin';
// import AdminLogin from './components/Home_landing/AdminLogin';
// import About from './components/Home_landing/About';
// import Contact from './components/Home_landing/Contact';
// import MCQGenerator from './components/MCQGenerator';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminHome from './components/Admin_components/Admin_Home';
// import ManageExams from './components/Admin_components/ManageExams';
// import ManageTeachers from './components/Admin_components/ManageTeachers';
// import ManageStudents from './components/Admin_components/ManageStudents';
// import MakeCredential from './components/Admin_components/MakeCredential';
// import TeacherDetails from './components/Admin_components/TeacherDetails';
// import TeacherHome from './components/Teacher_commponents/Teacher_home';
// import TeacherNavbar from './components/Teacher_commponents/TeacherNavbar';
// import TeacherSidebar from './components/Teacher_commponents/TeacherSidebar';
// import TeacherProfile from './components/Teacher_commponents/Teacher_profile';
// import AuthPage from './components/Home_landing/AuthPage';

// function App() {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Check if the token exists
//     setIsAdminLoggedIn(!!token); // Set the admin login state based on the token
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear the token from local storage
//     setIsAdminLoggedIn(false); // Update the admin login state
//   };

//   return (
//     <Router>
//       <div className="App">
//         {!isAdminLoggedIn && <Navbar />} {/* Only show Navbar if admin is not logged in */}
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/teacher" element={<TeacherLogin />} />
//             <Route path="/student" element={<StudentLogin />} />
//             <Route path="/teacher_home" element={<TeacherHome />} />
//             <Route path="/auth_page" element={<AuthPage />} />
//             <Route 
//               path="/admin" 
//               element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} 
//             />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/mcqqgenerator" element={<MCQGenerator />} />
//             <Route 
//               path="/admin/manage-exams" 
//               element={
//                 <ProtectedRoute>
//                   <ManageExams onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers" 
//               element={
//                 <ProtectedRoute>
//                   <ManageTeachers onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-students" 
//               element={
//                 <ProtectedRoute>
//                   <ManageStudents onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin-home" 
//               element={
//                 <ProtectedRoute>
//                   <AdminHome onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers/make-credential" 
//               element={
//                 <ProtectedRoute>
//                   <MakeCredential onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers/teacher-details" 
//               element={
//                 <ProtectedRoute>
//                   <TeacherDetails onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//               <Route 
//               path="/admin/manage-teachers/teacher-details" 
//               element={
//                 <ProtectedRoute>
//                   <TeacherDetails onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//               <Route path="/teacher/profile" element={<TeacherProfile />} />
//             {/* Catch-all route for any undefined routes */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



//before correctly applyin pprotec ted route and all stuff



//above croreect wroking until adding hte logout fxn same as managesteachers for the make credenttials
//ficng above

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Home_landing/Navbar';
// import Home from './components/Home_landing/Home';
// import TeacherLogin from './components/Home_landing/TeacherLogin';
// import StudentLogin from './components/Home_landing/StudentLogin';
// import AdminLogin from './components/Home_landing/AdminLogin';
// import About from './components/Home_landing/About';
// import Contact from './components/Home_landing/Contact';
// import MCQGenerator from './components/MCQGenerator';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminHome from './components/Admin_components/Admin_Home';
// import ManageExams from './components/Admin_components/ManageExams';
// import ManageTeachers from './components/Admin_components/ManageTeachers';
// import ManageStudents from './components/Admin_components/ManageStudents';
// import MakeCredential from './components/Admin_components/MakeCredential';
// import TeacherDetails from './components/Admin_components/TeacherDetails';
// import TeacherHome from './components/Teacher_commponents/Teacher_home';
// import TeacherNavbar from './components/Teacher_commponents/TeacherNavbar';
// import TeacherSidebar from './components/Teacher_commponents/TeacherSidebar';
// import TeacherProfile from './components/Teacher_commponents/Teacher_profile';
// import AuthPage from './components/Home_landing/AuthPage';

// function App() {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);


//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Check if the token exists
//     setIsAdminLoggedIn(!!token); // Set the admin login state based on the token
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear the token from local storage
//     setIsAdminLoggedIn(false); // Update the admin login state
//   };

//   return (
//     <Router>
//       <div className="App">
//         {!isAdminLoggedIn && <Navbar />} {/* Only show Navbar if admin is not logged in */}
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/teacher" element={<TeacherLogin />} />
//             <Route path="/student" element={<StudentLogin />} />
//             <Route path="/teacher_home" element={<TeacherHome />} />
//             <Route path="/auth_page" element={<AuthPage />} />
//             <Route 
//               path="/admin" 
//               element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} 
//             />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/mcqqgenerator" element={<MCQGenerator />} />
//             <Route 
//               path="/admin/manage-exams" 
//               element={
//                 <ProtectedRoute>
//                   <ManageExams onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers" 
//               element={
//                 <ProtectedRoute>
//                   <ManageTeachers onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-students" 
//               element={
//                 <ProtectedRoute>
//                   <ManageStudents onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin-home" 
//               element={
//                 <ProtectedRoute>
//                   <AdminHome onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers/make-credential" 
//               element={
//                 <ProtectedRoute>
//                   <MakeCredential onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/manage-teachers/teacher-details" 
//               element={
//                 <ProtectedRoute>
//                   <TeacherDetails onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//               <Route 
//               path="/admin/manage-teachers/teacher-details" 
//               element={
//                 <ProtectedRoute>
//                   <TeacherDetails onLogout={handleLogout} />
//                 </ProtectedRoute>
//               } 
//             />
//               <Route path="/teacher/profile" element={<TeacherProfile />} />
//             {/* Catch-all route for any undefined routes */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




//correcting the portiected route fucntiolity                <Route path="/admin-home" element={<AdminHome isSidebarCollapsed={isSidebarCollapsed}  toggleSidebar={toggleSidebar}  />}  />



// // /setisloggedin/ appalying belowz


//toggling work but after click on menu
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Home_landing/Navbar';
import AdminNavbar from './components/Admin_components/AdminNavbar';
import TeacherNavbar from './components/Teacher_commponents/TeacherNavbar';
import StudentNavbar from './components/Student_components/StudentNavbar';
import AdminHome from './components/Admin_components/Admin_Home';
import ManageExams from './components/Admin_components/ManageExams';
import ManageTeachers from './components/Admin_components/ManageTeachers';
import ManageStudents from './components/Admin_components/ManageStudents';
import MakeCredential from './components/Admin_components/MakeCredential';
import TeacherDetails from './components/Admin_components/TeacherDetails';
import TeacherHome from './components/Teacher_commponents/Teacher_home';
import TeacherProfile from './components/Teacher_commponents/Teacher_profile';
import StudentDashboard from './components/Student_components/Student_home';
import StudentLogin from './components/Home_landing/StudentLogin';
import TeacherLogin from './components/Home_landing/TeacherLogin';
import AdminLogin from './components/Home_landing/AdminLogin';
import About from './components/Home_landing/About';
import Contact from './components/Home_landing/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home_landing/Home';
import StudentMyExam from './components/Student_components/StudentMyExam_instruction';
import StudentProfile from './components/Student_components/StudentProfile';
import MCQGenerator from './components/Teacher_commponents/MCQGenerator'
import ExamPerformance from './components/Student_components/ExamPerformance'
import ExamLeaderboard from './components/Student_components/leaderboard';
import StudentMyExam_questions from './components/Student_components/StudentMyExam_questions';
import StudentMyExam_instruction from './components/Student_components/StudentMyExam_instruction'
import TeacherExamLeaderboard from './components/Teacher_commponents/leaderboard';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle the state
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const role = localStorage.getItem('userType');
    if (loggedIn && role) {
      setIsLoggedIn(true);
      setUserType(role);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
    setLoading(false); 
  }, []);  

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserType(null);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />
        <AdminNavbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} toggleSidebar={toggleSidebar} />
        <TeacherNavbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} toggleSidebar={() => {}}/>
        <StudentNavbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} toggleSidebar={toggleSidebar}/>
        
        <Routes>
          {/* Public Routes */}
          {!isLoggedIn && (
            <>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<StudentLogin setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/teacher" element={<TeacherLogin setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
              <Route path="/admin" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Admin Routes */}
            {userType === "admin" && (
              <>
                <Route path="/" element={<Navigate to="/admin-home" />} />
                <Route path="/admin-home" element={<AdminHome onLogout={handleLogout} isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />} />
                <Route path="/admin/manage-exams" element={<ManageExams isSidebarCollapsed={isSidebarCollapsed}  toggleSidebar={toggleSidebar}/>} />
                <Route path="/admin/manage-teachers" element={<ManageTeachers isSidebarCollapsed={isSidebarCollapsed}  toggleSidebar={toggleSidebar}/>} />
                <Route path="/admin/manage-students" element={<ManageStudents isSidebarCollapsed={isSidebarCollapsed}  toggleSidebar={toggleSidebar}/>} />
                <Route path="/admin/manage-teachers/make-credential" element={<MakeCredential isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />} />
                <Route path="/admin/manage-teachers/teacher-details" element={<TeacherDetails isSidebarCollapsed={isSidebarCollapsed}  toggleSidebar={toggleSidebar}/>} />
                
              </>
            )}

            {/* Teacher Routes */}
            {userType === "teacher" && (
              <>
                <Route path="/teacher_home" element={<TeacherHome isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />} />
                <Route path="/teacher/profile" element={<TeacherProfile />} />
                <Route path="/teacher/create-exam" element={<MCQGenerator />} />
                <Route path="/teacher/leaderboard/:quizId" element={<TeacherExamLeaderboard />} />

              </>
            )}

            {/* Student Routes */}
            {userType === "student" && (
              <>
              <Route path="/student_dashboard" element={<StudentDashboard isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />} />
              <Route path="/student/My-exam/:id" element={<StudentMyExam_instruction />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/examperformance" element={<ExamPerformance />} />
              {/* <Route path="/student/leaderboard" element={<ExamLeaderboard />} /> */}
              <Route path="/student/leaderboard/:quizId" element={<ExamLeaderboard />} />
              <Route path="/student/My-exam/questions" element={<StudentMyExam_questions />} />
              </>
              
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
