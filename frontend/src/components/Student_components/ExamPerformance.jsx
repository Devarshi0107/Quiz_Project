// import React, { useState } from 'react';
// import { Download, Trophy, X, BarChart } from 'lucide-react';
// import StudentNavbar from './StudentNavbar';
// import StudentSidebar from './StudentSidebar';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// const ExamPerformance = () => {
//   const navigate = useNavigate();
//   const [exams, setExams] = useState([
//     {
//       id: '1',
//       name: 'Advanced Mathematics',
//       date: '2024-03-01',
//       marks: 85,
//       totalMarks: 100,
//       percentile: 78,
//       teacherName: 'Prof. Williams',
//       performance: {
//         difficulty: 'Hard',
//         classAverage: 75,
//         yourRank: 12,
//         totalStudents: 50
//       },
//       leaderboard: [
//         { rank: 1, name: 'John Smith', score: 95 },
//         { rank: 2, name: 'Sarah Chen', score: 92 },
//         { rank: 3, name: 'Michael Rodriguez', score: 88 }
//       ]
//     },
//     {
//       id: '2',
//       name: 'Data Science Fundamentals',
//       date: '2024-02-22',
//       marks: 92,
//       totalMarks: 100,
//       percentile: 88,
//       teacherName: 'Dr. Martinez',
//       performance: {
//         difficulty: 'Medium',
//         classAverage: 80,
//         yourRank: 5,
//         totalStudents: 45
//       },
//       leaderboard: [
//         { rank: 1, name: 'Emma Wilson', score: 98 },
//         { rank: 2, name: 'David Kim', score: 95 },
//         { rank: 3, name: 'Olivia Patel', score: 91 }
//       ]
//     }
//   ]);

//   const [selectedExam, setSelectedExam] = useState(null);
//   const [modalType, setModalType] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState('performance');

//   const openModal = (exam, type) => {
//     setSelectedExam(exam);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedExam(null);
//     setModalType(null);
//   };

//   const renderModalContent = () => {
//     if (!selectedExam) return null;

//     switch(modalType) {
//       // case 'leaderboard':
//       //   return (
//       //     <div className="p-4">
//       //       <h2 className="text-xl font-bold mb-4 flex items-center">
//       //         <Trophy className="mr-2 text-yellow-500" /> {selectedExam.name} Leaderboard
//       //       </h2>
//       //       <table className="w-full">
//       //         <thead>
//       //           <tr className="bg-gray-100">
//       //             <th className="p-2">Rank</th>
//       //             <th className="p-2">Name</th>
//       //             <th className="p-2 text-right">Score</th>
//       //           </tr>
//       //         </thead>
//       //         <tbody>
//       //           {selectedExam.leaderboard.map((entry) => (
//       //             <tr key={entry.rank} className="border-b">
//       //               <td className="p-2 text-center">{entry.rank}</td>
//       //               <td className="p-2">{entry.name}</td>
//       //               <td className="p-2 text-right font-bold">{entry.score}</td>
//       //             </tr>
//       //           ))}
//       //         </tbody>
//       //       </table>
//       //     </div>
//       //   );
      
//       case 'details':
//         return (
//           <div className="p-6 space-y-4">
//             <h2 className="text-xl font-bold">{selectedExam.name} Performance</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="font-medium text-gray-600">Marks</p>
//                 <p className="text-blue-600 font-bold">{selectedExam.marks}/{selectedExam.totalMarks}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-600">Percentile</p>
//                 <p className="text-green-600 font-bold">{selectedExam.percentile}%</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-600">Class Average</p>
//                 <p>{selectedExam.performance.classAverage}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-600">Difficulty</p>
//                 <p>{selectedExam.performance.difficulty}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-600">Your Rank</p>
//                 <p>{selectedExam.performance.yourRank}/{selectedExam.performance.totalStudents}</p>
//               </div>
//             </div>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <StudentNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         student={{ name: 'John Smith' }} // Example student data
//         isLoggedIn={true}
//         userType="student"
//       />
//       <StudentSidebar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         activeMenu={activeMenu}
//         setActiveMenu={setActiveMenu}
//       />

//       <main
//         className={`absolute transition-all duration-200 ${
//           isSidebarOpen ? "left-60" : "left-16"
//         } right-0 top-20 bottom-0 px-8`}
//       >
//         <div className="mx-auto">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Exam Performance Analytics</h1>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <table className="w-full">
            
//               <thead className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
//                 <tr>
//                   <th className="p-3 text-left">Exam</th>
//                   <th className="p-3 text-center">Date</th>
//                   <th className="p-3 text-center">Performance</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {exams.map((exam) => (
//                   <tr key={exam.id} className="border-b hover:bg-indigo-50">
//                     <td className="p-3">
//                       <div className="font-semibold">{exam.name}</div>
//                       <div className="text-sm text-gray-500">{exam.teacherName}</div>
//                     </td>
//                     <td className="p-3 text-center">{exam.date}</td>
//                     <td className="p-3 text-center">
//                       <div className="font-bold text-blue-600">{exam.marks}/{exam.totalMarks}</div>
//                       <div className="text-sm text-green-600">{exam.percentile}%</div>
//                     </td>
//                     <td className="p-3 text-center flex justify-center space-x-2">
//                       <button 
//                         onClick={() => openModal(exam, 'details')}
//                         className="text-green-500 hover:text-green-700"
//                         title="Exam Details"
//                       >
//                         <BarChart size={20} />
//                       </button>
//                       <button 
//                         onClick={() => {/* PDF download logic */}}
//                         className="text-blue-500 hover:text-blue-700"
//                         title="Download PDF"
//                       >
//                         <Download size={20} />
//                       </button>
                      
//                       <button 
//                         onClick={() => navigate(`/student/leaderboard/${exam.id}`)}
//                         className="text-yellow-500 hover:text-yellow-700"
//                         title="Leaderboard"
//                       >
//                         <Trophy size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal Overlay */}
//         {selectedExam && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
//               <button 
//                 onClick={closeModal} 
//                 className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//               >
//                 <X size={24} />
//               </button>
//               {renderModalContent()}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ExamPerformance;

//above without iintegration

import React, { useState,useEffect  } from 'react';
import { Download, Trophy, X, BarChart } from 'lucide-react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';
import { jwtDecode } from "jwt-decode";
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const ExamPerformance = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendedExams, setAttendedExams] = useState([]);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [quizDetails, setQuizDetails] = useState(null);

  const [selectedExam, setSelectedExam] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('performance');
  


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const decoded = jwtDecode(token);
  
      if (!decoded.rollNo) {
        setError("Token is missing required data.");
        setLoading(false);
        return;
      }
  
      setStudent({ rollNo: decoded.rollNo });
  
      try {
        // Fetch attended exams
        const attendedExamsResponse = await fetch(
          `http://localhost:3001/api/student-quiz/getattended-exam?student=${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!attendedExamsResponse.ok) {
          throw new Error(`API Error: ${attendedExamsResponse.status} ${attendedExamsResponse.statusText}`);
        }
  
        const attendedExamsData = await attendedExamsResponse.json();
  
        if (!attendedExamsData || !attendedExamsData.results) {
          console.error("Unexpected API response format:", attendedExamsData);
          return;
        }
  
        // Fetch quiz details for each attended exam
        const combinedData = await Promise.all(
          attendedExamsData.results.map(async (exam) => {
            const quizDetailsResponse = await fetch(
              `http://localhost:3001/api/students/exam/${exam.quiz}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            if (!quizDetailsResponse.ok) {
              throw new Error(`Quiz API Error: ${quizDetailsResponse.status} ${quizDetailsResponse.statusText}`);
            }
  
            const quizDetails = await quizDetailsResponse.json();
            return {
              attended_exam: exam,
              quiz_details: quizDetails,
            };
          })
        );
  
        setAttendedExams(combinedData);
        console.log("Combined data is:", combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);
  const generateExamPDF = (exam) => {
    const { quiz_details, attended_exam } = exam;
  
    // Create a new PDF instance
    const doc = new jsPDF();
  
    // Add exam details
    doc.setFontSize(18);
    doc.text(`Exam: ${quiz_details.exam_name}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(quiz_details.schedule_date).toLocaleDateString()}`, 10, 30);
    doc.text(`Score: ${attended_exam.score} / ${attended_exam.total_marks}`, 10, 40);
  
    // Add questions and responses
    let yPos = 50; // Starting Y position for questions
    quiz_details.questions.forEach((question, index) => {
      const response = attended_exam.responses.find(
        (res) => res.question_id === question._id
      );
  
      // Question text
      doc.setFontSize(14);
      doc.text(`Question ${index + 1}: ${question.question_text}`, 10, yPos);
      yPos += 10;
  
      // Options
      doc.setFontSize(12);
      question.options.forEach((option, optIndex) => {
        doc.text(`${optIndex + 1}. ${option}`, 15, yPos);
        yPos += 10;
      });
  
      // Student's response
      if (response) {
        const selectedOption = question.options[response.selected_option] || "Not answered";
        const isCorrect = response.is_correct ? "Correct" : "Incorrect";
        doc.text(`Your Answer: ${selectedOption} (${isCorrect})`, 15, yPos);
      } else {
        doc.text("Your Answer: Not answered", 15, yPos);
      }
      yPos += 15; // Add space between questions
    });
  
    // Save the PDF
    doc.save(`${quiz_details.exam_name}_report.pdf`);
  };

  const openModal = (exam, type) => {
    setSelectedExam(exam);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedExam(null);
    setModalType(null);
  };

  const renderModalContent = () => {
    if (!selectedExam) return null;

    switch(modalType) {
   
      case 'details':
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">{selectedExam.name} Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-600">Marks</p>
                <p className="text-blue-600 font-bold">{selectedExam.marks}/{selectedExam.totalMarks}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Percentile</p>
                <p className="text-green-600 font-bold">{selectedExam.percentile}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Class Average</p>
                <p>{selectedExam.performance.classAverage}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Difficulty</p>
                <p>{selectedExam.performance.difficulty}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Your Rank</p>
                <p>{selectedExam.performance.yourRank}/{selectedExam.performance.totalStudents}</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

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
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <main
        className={`absolute transition-all duration-200 ${
          isSidebarOpen ? "left-60" : "left-16"
        } right-0 top-20 bottom-0 px-8`}
      >
        <div className="mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Exam Performance Analytics</h1>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full">
            
              <thead className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                <tr>
                  <th className="p-3 text-left">Exam</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Performance</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendedExams.map((exam) => (
                  <tr key={exam.attended_exam._id} className="border-b hover:bg-indigo-50">
                    <td className="p-3">
                      <div className="font-semibold">{exam.quiz_details.exam_name}</div>
                      {/* <div className="text-sm text-gray-500">{exam.teacherName || "N/A"}</div> */}
                    </td>
                    <td className="p-3 text-center">{new Date(exam.quiz_details.schedule_date).toLocaleDateString()}</td>
                    <td className="p-3 text-center">
                      <div className="font-bold text-blue-600">{exam.attended_exam.score} / {exam.attended_exam.total_marks} </div>
                      {/* <div className="text-sm text-green-600">{exam.percentile}%</div> */}
                    </td>
                    <td className="p-3 text-center flex justify-center space-x-2">
                      <button 
                        onClick={() => openModal(exam, 'details')}
                        className="text-green-500 hover:text-green-700"
                        title="Exam Details"
                      >
                        <BarChart size={20} />
                      </button>
                      <button 
                        onClick={() => generateExamPDF(exam)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Download PDF"
                      >
                        <Download size={20} />
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/student/leaderboard/${exam.attended_exam.quiz}`)}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Leaderboard"
                      >
                        <Trophy size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Overlay */}
        {selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
              <button 
                onClick={closeModal} 
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              {renderModalContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamPerformance;