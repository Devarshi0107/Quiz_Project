// import React, { useState } from "react";
// import TeacherNavbar from "./TeacherNavbar";
// import TeacherSidebar from "./TeacherSidebar";
// import "./Teacher_home.css";
// import { Download, Trophy, BarChart, Trash2 } from "lucide-react";
// // import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// const TeacherHome = ({ onLogout }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeContent, setActiveContent] = useState("dashboard");
//   const [quizzes, setQuizzes] = useState([
//     {
//       id: 1,
//       name: "Advanced Mathematics",
//       date: "2024-03-01",
//       time: "10:00 AM",
//       totalStudents: 50,
//       averageScore: 75,
//       highestScore: 95,
//       lowestScore: 45,
//       passRate: 85,
//       classSummary: { above90: 5, above80: 15, above70: 20, below70: 10 },
//       topPerformers: [
//         { rank: 1, name: "John Smith", score: 95 },
//         { rank: 2, name: "Sarah Chen", score: 92 },
//         { rank: 3, name: "Michael Rodriguez", score: 88 },
//       ],
//     },
//     {
//       id: 2,
//       name: "Data Science Fundamentals",
//       date: "2024-02-22",
//       time: "2:00 PM",
//       totalStudents: 45,
//       averageScore: 80,
//       highestScore: 98,
//       lowestScore: 55,
//       passRate: 92,
//       classSummary: { above90: 8, above80: 20, above70: 12, below70: 5 },
//       topPerformers: [
//         { rank: 1, name: "Emma Wilson", score: 98 },
//         { rank: 2, name: "David Kim", score: 95 },
//         { rank: 3, name: "Olivia Patel", score: 91 },
//       ],
//     },
//   ]);

//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [modalType, setModalType] = useState(null);

//   const openModal = (quiz, type) => {
//     setSelectedQuiz(quiz);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedQuiz(null);
//     setModalType(null);
//   };

//   const deleteQuiz = (quizId) => {
//     if (window.confirm("Are you sure you want to delete this quiz?")) {
//       setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
//     }
//   };

//   return (
//     <div>
//       {/* Navbar & Sidebar */}
//       <TeacherNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         teacher={{ name: "John Smith" }}
//         isLoggedIn={true}
//         userType="teacher"
//       />
//       <TeacherSidebar
//         isSidebarOpen={isSidebarOpen}
//         activeContent={activeContent}
//         setActiveContent={setActiveContent}
//       />

//       <main
//         className={`absolute transition-all duration-200 ${
//           isSidebarOpen ? "left-60" : "left-16"
//         } right-0 top-20 bottom-0 px-8`}
//       >
//         <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-1">
//             <h1 className="text-3xl font-bold mb-0">
//               Welcome back !👋
//             </h1>
//           </div>
//         {/* Show Quiz Dashboard Only When Dashboard is Active */}
//         {activeContent === "dashboard" && (
//           <div className="min-h-screen bg-gray-50 p-2">
            
//               <div className="p-6 overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//                     <tr>
//                       <th className="p-3 text-left">Quiz Details</th>
//                       <th className="p-3 text-center">Date & Time</th>
//                       <th className="p-3 text-center">Students</th>
//                       <th className="p-3 text-center">Performance</th>
//                       <th className="p-3 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {quizzes.map((quiz) => (
//                       <tr key={quiz.id} className="border-b hover:bg-gray-50">
//                         <td className="p-3 font-semibold">{quiz.name}</td>
//                         <td className="p-3 text-center">{quiz.date} <br /><span className="text-sm text-gray-500">{quiz.time}</span></td>
//                         <td className="p-3 text-center">{quiz.totalStudents} students</td>
//                         <td className="p-3 text-center font-bold text-blue-600">{quiz.averageScore}%</td>
//                         <td className="p-3 text-center flex justify-center space-x-2">
//                           <button onClick={() => openModal(quiz, "performance")} className="text-blue-500 hover:text-blue-700" title="View Performance">
//                             <BarChart size={20} />
//                           </button>
//                           <button className="text-green-500 hover:text-green-700" title="Download Report">
//                             <Download size={20} />
//                           </button>
//                           <button onClick={() => openModal(quiz, "topPerformers")} className="text-yellow-500 hover:text-yellow-700" title="Top Performers">
//                             <Trophy size={20} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//             {/* Modal */}
//             {selectedQuiz && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
//                   <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">×</button>
//                   {modalType === "performance" ? (
//                     <div className="p-6">
//                       <h2 className="text-xl font-bold mb-4">Class Performance Analysis</h2>
//                       <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="bg-blue-50 p-4 rounded-lg">
//                             <p className="text-sm text-gray-600">Average Score</p>
//                             <p className="text-2xl font-bold text-blue-600">{selectedQuiz.averageScore}%</p>
//                           </div>
//                           <div className="bg-green-50 p-4 rounded-lg">
//                             <p className="text-sm text-gray-600">Pass Rate</p>
//                             <p className="text-2xl font-bold text-green-600">{selectedQuiz.passRate}%</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="p-4">
//                       <h2 className="text-xl font-bold mb-4">Top Performers</h2>
//                       <table className="w-full">
//                         <thead className="bg-gray-50">
//                           <tr><th className="p-2">Rank</th><th className="p-2">Student Name</th><th className="p-2 text-right">Score</th></tr>
//                         </thead>
//                         <tbody>
//                           {selectedQuiz.topPerformers.map((student) => (
//                             <tr key={student.rank} className="border-b">
//                               <td className="p-2 text-center">{student.rank}</td>
//                               <td className="p-2">{student.name}</td>
//                               <td className="p-2 text-right font-bold">{student.score}%</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TeacherHome;


// // above without integration
// import React, { useState, useEffect } from "react";
// import TeacherNavbar from "./TeacherNavbar";
// import TeacherSidebar from "./TeacherSidebar";
// import "./Teacher_home.css";
// import { Download, Trophy, BarChart, Trash2 } from "lucide-react";
// import axios from "axios";

// const TeacherHome = ({ onLogout }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeContent, setActiveContent] = useState("dashboard");
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [modalType, setModalType] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         // Retrieve the token (ensure you have a valid token stored)
//         const token = localStorage.getItem("token");
//         // Pass the token in the Authorization header
//         const response = await axios.get("http://localhost:3001/api/quiz/my-quizzes", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         // API response is an array of quiz objects.
//         // Map each quiz to the structure expected by the UI.
//         const mappedQuizzes = response.data.map((q) => {
//           // Calculate total students from the roll_number_range (e.g., "1-150")
//           let totalStudents = 0;
//           if (q.roll_number_range) {
//             const parts = q.roll_number_range.split("-");
//             if (parts.length === 2) {
//               const start = parseInt(parts[0].trim(), 10);
//               const end = parseInt(parts[1].trim(), 10);
//               totalStudents = end - start + 1;
//             }
//           }
//           // Extract date (YYYY-MM-DD)
//           const date = q.schedule_date ? q.schedule_date.split("T")[0] : "";
//           // Format the start and end time from schedule_time_range
//           const startTime = q.schedule_time_range && q.schedule_time_range.start 
//               ? new Date(q.schedule_time_range.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//               : "";
//           const endTime = q.schedule_time_range && q.schedule_time_range.end 
//               ? new Date(q.schedule_time_range.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//               : "";
          
//           return {
//             id: q._id,
//             name: q.exam_name ? q.exam_name.trim() : "Untitled Exam",
//             date: date,
//             time: startTime,
//             endTime: endTime,
//             totalStudents: totalStudents,
//             averageScore: 0,      // Default value; update as needed
//             highestScore: 0,      // Default value; update as needed
//             lowestScore: 0,       // Default value; update as needed
//             passRate: 0,          // Default value; update as needed
//             classSummary: { above90: 0, above80: 0, above70: 0, below70: 0 },
//             topPerformers: []     // Default empty array; update as needed
//           };
//         });
//         setQuizzes(mappedQuizzes);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const openModal = (quiz, type) => {
//     setSelectedQuiz(quiz);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedQuiz(null);
//     setModalType(null);
//   };



//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       {/* Navbar & Sidebar */}
//       <TeacherNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         teacher={{ name: "John Smith" }}
//         isLoggedIn={true}
//         userType="teacher"
//       />
//       <TeacherSidebar
//         isSidebarOpen={isSidebarOpen}
//         activeContent={activeContent}
//         setActiveContent={setActiveContent}
//       />

//       <main
//         className={`absolute transition-all duration-200 ${
//           isSidebarOpen ? "left-60" : "left-16"
//         } right-0 top-20 bottom-0 px-8`}
//       >
//         <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-1">
//           <h1 className="text-3xl font-bold mb-0">Welcome back !👋</h1>
//         </div>
//         {/* Show Quiz Dashboard Only When Dashboard is Active */}
//         {activeContent === "dashboard" && (
//           <div className="min-h-screen bg-gray-50 p-2">
//             <div className="p-6 overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//                   <tr>
//                     <th className="p-3 text-left">Quiz Details</th>
//                     <th className="p-3 text-center">Date & Time</th>
//                     <th className="p-3 text-center">Students</th>
//                     <th className="p-3 text-center">Performance</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {quizzes.map((quiz) => (
//                     <tr key={quiz.id} className="border-b hover:bg-gray-50">
//                       <td className="p-3 font-semibold">{quiz.name}</td>
//                       <td className="p-3 text-center">
//                         {quiz.date} <br />
//                         <span className="text-sm text-gray-500">
//                           {quiz.time} - {quiz.endTime}
//                         </span>
//                       </td>
//                       <td className="p-3 text-center">{quiz.totalStudents} students</td>
//                       <td className="p-3 text-center font-bold text-blue-600">
//                         {quiz.averageScore}%
//                       </td>
//                       <td className="p-3 text-center flex justify-center space-x-2">
//                         <button
//                           onClick={() => openModal(quiz, "performance")}
//                           className="text-blue-500 hover:text-blue-700"
//                           title="View Performance"
//                         >
//                           <BarChart size={20} />
//                         </button>
//                         <button className="text-green-500 hover:text-green-700" title="Download Report">
//                           <Download size={20} />
//                         </button>
//                         <button
//                           onClick={() => openModal(quiz, "topPerformers")}
//                           className="text-yellow-500 hover:text-yellow-700"
//                           title="Top Performers"
//                         >
//                           <Trophy size={20} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Modal */}
//             {selectedQuiz && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
//                   <button
//                     onClick={closeModal}
//                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                   >
//                     ×
//                   </button>
//                   {modalType === "performance" ? (
//                     <div className="p-6">
//                       <h2 className="text-xl font-bold mb-4">Class Performance Analysis</h2>
//                       <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="bg-blue-50 p-4 rounded-lg">
//                             <p className="text-sm text-gray-600">Average Score</p>
//                             <p className="text-2xl font-bold text-blue-600">{selectedQuiz.averageScore}%</p>
//                           </div>
//                           <div className="bg-green-50 p-4 rounded-lg">
//                             <p className="text-sm text-gray-600">Pass Rate</p>
//                             <p className="text-2xl font-bold text-green-600">{selectedQuiz.passRate}%</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="p-4">
//                       <h2 className="text-xl font-bold mb-4">Top Performers</h2>
//                       <table className="w-full">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="p-2">Rank</th>
//                             <th className="p-2">Student Name</th>
//                             <th className="p-2 text-right">Score</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedQuiz.topPerformers.map((student, index) => (
//                             <tr key={index} className="border-b">
//                               <td className="p-2 text-center">{student.rank}</td>
//                               <td className="p-2">{student.name}</td>
//                               <td className="p-2 text-right font-bold">{student.score}%</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TeacherHome;


//above without integrating leaderbaord onclikc but that naviation work 



import React, { useState, useEffect } from "react";
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import "./Teacher_home.css";
import { Download, Trophy, BarChart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TeacherHome = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Retrieve the token (ensure you have a valid token stored)
        const token = localStorage.getItem("token");
        // Pass the token in the Authorization header
        const response = await axios.get("http://localhost:3001/api/quiz/my-quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // API response is an array of quiz objects.
        // Map each quiz to the structure expected by the UI.
        const mappedQuizzes = response.data.map((q) => {
          // Calculate total students from the roll_number_range (e.g., "1-150")
          let totalStudents = 0;
          if (q.roll_number_range) {
            const parts = q.roll_number_range.split("-");
            if (parts.length === 2) {
              const start = parseInt(parts[0].trim(), 10);
              const end = parseInt(parts[1].trim(), 10);
              totalStudents = end - start + 1;
            }
          }
          // Extract date (YYYY-MM-DD)
          const date = q.schedule_date ? q.schedule_date.split("T")[0] : "";
          // Format the start and end time from schedule_time_range
          const startTime = q.schedule_time_range && q.schedule_time_range.start
            ? new Date(q.schedule_time_range.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";
          const endTime = q.schedule_time_range && q.schedule_time_range.end
            ? new Date(q.schedule_time_range.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";

          return {
            id: q._id,
            name: q.exam_name ? q.exam_name.trim() : "Untitled Exam",
            date: date,
            time: startTime,
            endTime: endTime,
            totalStudents: totalStudents,
            averageScore: 0,      // Default value; update as needed
            highestScore: 0,      // Default value; update as needed
            lowestScore: 0,       // Default value; update as needed
            passRate: 0,          // Default value; update as needed
            classSummary: { above90: 0, above80: 0, above70: 0, below70: 0 },
            topPerformers: []     // Default empty array; update as needed
          };
        });
        setQuizzes(mappedQuizzes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const openModal = (quiz, type) => {
    if (type === "topPerformers") {
      // Redirect to the leaderboard page
      navigate(`/teacher/leaderboard/${quiz.id}`);
    } else {
      setSelectedQuiz(quiz);
      setModalType(type);
    }
  };

  const closeModal = () => {
    setSelectedQuiz(null);
    setModalType(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Navbar & Sidebar */}
      <TeacherNavbar
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        teacher={{ name: "John Smith" }}
        isLoggedIn={true}
        userType="teacher"
      />
      <TeacherSidebar
        isSidebarOpen={isSidebarOpen}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />

      <main
        className={`absolute transition-all duration-200 ${
          isSidebarOpen ? "left-60" : "left-16"
        } right-0 top-20 bottom-0 px-8`}
      >
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-1">
          <h1 className="text-3xl font-bold mb-0">Welcome back !👋</h1>
        </div>
        {/* Show Quiz Dashboard Only When Dashboard is Active */}
        {activeContent === "dashboard" && (
          <div className="min-h-screen bg-gray-50 p-2">
            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <tr>
                    <th className="p-3 text-left">Quiz Details</th>
                    <th className="p-3 text-center">Date & Time</th>
                    <th className="p-3 text-center">Students</th>
                    <th className="p-3 text-center">Performance</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{quiz.name}</td>
                      <td className="p-3 text-center">
                        {quiz.date} <br />
                        <span className="text-sm text-gray-500">
                          {quiz.time} - {quiz.endTime}
                        </span>
                      </td>
                      <td className="p-3 text-center">{quiz.totalStudents} students</td>
                      <td className="p-3 text-center font-bold text-blue-600">
                        {quiz.averageScore}%
                      </td>
                      <td className="p-3 text-center flex justify-center space-x-2">
                        <button
                          onClick={() => openModal(quiz, "performance")}
                          className="text-blue-500 hover:text-blue-700"
                          title="View Performance"
                        >
                          <BarChart size={20} />
                        </button>
                        <button className="text-green-500 hover:text-green-700" title="Download Report">
                          <Download size={20} />
                        </button>
                        <button
                          onClick={() => openModal(quiz, "topPerformers")}
                          className="text-yellow-500 hover:text-yellow-700"
                          title="Top Performers"
                        >
                          <Trophy size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {selectedQuiz && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                  {modalType === "performance" ? (
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Class Performance Analysis</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Average Score</p>
                            <p className="text-2xl font-bold text-blue-600">{selectedQuiz.averageScore}%</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Pass Rate</p>
                            <p className="text-2xl font-bold text-green-600">{selectedQuiz.passRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-4">Top Performers</h2>
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2">Rank</th>
                            <th className="p-2">Student Name</th>
                            <th className="p-2 text-right">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedQuiz.topPerformers.map((student, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 text-center">{student.rank}</td>
                              <td className="p-2">{student.name}</td>
                              <td className="p-2 text-right font-bold">{student.score}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherHome;