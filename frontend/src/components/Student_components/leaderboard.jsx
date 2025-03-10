// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
// import StudentNavbar from './StudentNavbar';
// import StudentSidebar from './StudentSidebar';

// // Mock Data (Replace this with API fetch later if needed)
// const examData = [
//   {
//     id: '1',
//     name: 'Advanced Mathematics',
//     date: 'February 20, 2024',
//     totalMarks: 100,
//     leaderboard: [
//       { rank: 1, name: 'Alice Johnson', marks: 95 },
//       { rank: 2, name: 'Bob Williams', marks: 90 },
//       { rank: 3, name: 'Charlie Brown', marks: 85 },
//       { rank: 4, name: 'David Smith', marks: 80 },
//       { rank: 5, name: 'Emma Davis', marks: 78 },
//       { rank: 6, name: 'Frank Thomas', marks: 75 },
//       { rank: 7, name: 'Grace Lee', marks: 72 },
//       { rank: 8, name: 'Henry Clark', marks: 70 },
//       { rank: 9, name: 'Isla Moore', marks: 68 },
//       { rank: 10, name: 'Jack Taylor', marks: 65 }
//     ]
//   },
//   {
//     id: '2',
//     name: 'Data Science Fundamentals',
//     date: 'March 15, 2024',
//     totalMarks: 100,
//     leaderboard: [
//       { rank: 1, name: 'Sophia Johnson', marks: 98 },
//       { rank: 2, name: 'Liam Martin', marks: 94 },
//       { rank: 3, name: 'Olivia White', marks: 91 },
//       { rank: 4, name: 'Mason Harris', marks: 89 },
//       { rank: 5, name: 'Ava Lewis', marks: 87 },
//       { rank: 6, name: 'Ethan Hall', marks: 85 },
//       { rank: 7, name: 'Charlotte Allen', marks: 82 },
//       { rank: 8, name: 'James Scott', marks: 80 },
//       { rank: 9, name: 'Amelia Young', marks: 78 },
//       { rank: 10, name: 'Benjamin King', marks: 76 }
//     ]
//   }
// ];

// const ExamLeaderboard = () => {
//   const { examId } = useParams(); // Get exam ID from URL
//   const [exam, setExam] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 10;
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state

//   useEffect(() => {
//     // Find the exam data based on the examId from the URL
//     const selectedExam = examData.find((e) => e.id === examId);
//     setExam(selectedExam);
//   }, [examId]);

//   if (!exam) {
//     return <div className="text-center text-red-500 text-xl mt-10">Exam not found!</div>;
//   }

//   const totalPages = Math.ceil(exam.leaderboard.length / studentsPerPage);
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = exam.leaderboard.slice(indexOfFirstStudent, indexOfLastStudent);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <StudentNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         student={{ name: 'John Smith' }} // Example student data
//         isLoggedIn={true}
//         userType="student"
//       />
//       <StudentSidebar
//   isSidebarOpen={isSidebarOpen}
//   toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//   activeMenu="leaderboard"
  
// />

// <main
//         className={`absolute transition-all duration-200 ${
//           isSidebarOpen ? "left-60" : "left-16"
//         } right-0 top-20 bottom-0 px-8`}
//       >
//         <div className="w-full max-w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-6 flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-extrabold">{exam.name}</h1>
//               <p className="text-sm opacity-80 mt-1">{exam.date}</p>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Award size={40} className="text-yellow-300" />
//               <div className="text-right">
//                 <p className="font-semibold text-lg">Total Marks</p>
//                 <p className="text-2xl font-bold">{exam.totalMarks}</p>
//               </div>
//             </div>
//           </div>

//           {/* Leaderboard */}
//           <div className="p-6">
//             <div className="grid grid-cols-12 bg-gray-100 rounded-lg p-3 font-semibold text-gray-600 mb-2">
//               <div className="col-span-2 ">Rank</div>
//               <div className="col-span-6">Student Name</div>
//               <div className="col-span-4 text-right">Marks</div>
//             </div>

//             {currentStudents.map((student, index) => (
//               <div
//                 key={student.rank}
//                 className={`grid grid-cols-12 items-center p-3 ${
//                   index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                 } hover:bg-indigo-50 transition-colors rounded-lg mb-2`}
//               >
//                 <div className="col-span-2 font-bold text-gray-700">{student.rank}</div>
//                 <div className="col-span-6 font-medium">{student.name}</div>
//                 <div className="col-span-4 text-right font-semibold text-indigo-600">{student.marks}</div>
//               </div>
//             ))}

//             {/* Pagination */}
//             <div className="flex justify-between items-center mt-6">
//               <div className="text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 bg-indigo-100 text-indigo-600 rounded-full disabled:opacity-50"
//                 >
//                   <ChevronLeft />
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="p-2 bg-indigo-100 text-indigo-600 rounded-full disabled:opacity-50"
//                 >
//                   <ChevronRight />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ExamLeaderboard;


//above without integration
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import axios from "axios";

// Mock exam details for header info (you can update these as needed)
const examData = [
  {
    id: '67aec3957bc7c0ee0f7a79ba', // Make sure this matches the quizId from your API
    name: 'Advanced Mathematics',
    date: 'February 20, 2024',
    totalMarks: 100,
    leaderboard: [] // Will be replaced with API data
  },
  {
    id: '2',
    name: 'Data Science Fundamentals',
    date: 'March 15, 2024',
    totalMarks: 100,
    leaderboard: []
  }
];

const ExamLeaderboard = () => {
  const { quizId } = useParams();  // Get quizId from the URL
  const [exam, setExam] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quizId) {
      setError("Quiz ID is missing");
      setLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/leaderboard/getleaderboard/${quizId}`);
        // API returns: { leaderboard: { ... , rankings: [ {...}, {...} ] } }
        // Map the rankings array to the format: { rank, name, marks }
        const apiRankings = response.data.leaderboard.rankings.map((item, index) => ({
          rank: index + 1,
          name: item.rollNo,   // Using rollNo as the student name (adjust if needed)
          marks: item.score
        }));

        // Find matching exam details from our mock examData using quizId
        const examDetails = examData.find((e) => e.id === quizId);
        if (examDetails) {
          setExam({ ...examDetails, leaderboard: apiRankings });
        } else {
          // Fallback exam details if none found in examData
          setExam({ name: 'Exam Name', date: 'Exam Date', totalMarks: 100, leaderboard: apiRankings });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!exam) {
    return <div className="text-center text-red-500 text-xl mt-10">Exam not found!</div>;
  }

  const totalPages = Math.ceil(exam.leaderboard.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = exam.leaderboard.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        student={{ name: 'John Smith' }} // Example student data
        isLoggedIn={true}
        userType="student"
      />
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        activeMenu="leaderboard"
      />

      <main
        className={`absolute transition-all duration-200 ${
          isSidebarOpen ? "left-60" : "left-16"
        } right-0 top-20 bottom-0 px-8`}
      >
        <div className="w-full max-w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">{exam.name}</h1>
              <p className="text-sm opacity-80 mt-1">{exam.date}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Award size={40} className="text-yellow-300" />
              <div className="text-right">
                <p className="font-semibold text-lg">Total Marks</p>
                <p className="text-2xl font-bold">{exam.totalMarks}</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="p-6">
            <div className="grid grid-cols-12 bg-gray-100 rounded-lg p-3 font-semibold text-gray-600 mb-2">
              <div className="col-span-2">Rank</div>
              <div className="col-span-6">Student Name</div>
              <div className="col-span-4 text-right">Marks</div>
            </div>

            {currentStudents.map((student, index) => (
              <div
                key={student.rank}
                className={`grid grid-cols-12 items-center p-3 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-indigo-50 transition-colors rounded-lg mb-2`}
              >
                <div className="col-span-2 font-bold text-gray-700">{student.rank}</div>
                <div className="col-span-6 font-medium">{student.name}</div>
                <div className="col-span-4 text-right font-semibold text-indigo-600">{student.marks}</div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-full disabled:opacity-50"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-full disabled:opacity-50"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamLeaderboard;
