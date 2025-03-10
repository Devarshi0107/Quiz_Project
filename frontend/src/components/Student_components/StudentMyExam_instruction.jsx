// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Clock, ChevronRight, Flag, Trash2, CheckCircle } from "lucide-react";
// import StudentSidebar from "./StudentSidebar";
// import StudentNavbar from "./StudentNavbar";


// const InstructionPage = ({ onStartExam }) => (
//   <div className="min-h-screen bg-gray-50">
//     {/* Navbar */}
//     <StudentNavbar
//       toggleSidebar={() => {}}
//       student={{ name: "John Smith" }} // Use actual student data
//       isLoggedIn={true}
//       userType="student"
//     />

//     {/* Sidebar */}
//     <StudentSidebar
//       isSidebarOpen={true}
//       toggleSidebar={() => {}}
//     />

//     {/* Main Content */}
//     <main className="absolute transition-all duration-200 left-60 right-0 top-16 bottom-0 ">
//       <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 relative -z-10">
//         <div className="max-w-7xl mx-10 flex justify-between items-center ">
//           <h1 className="text-xl font-medium">General Knowledge Exam</h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 px-8">
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <h2 className="text-xl font-medium text-gray-800 mb-6">
//             Instructions:
//           </h2>
//           <ul className="list-disc pl-6 text-gray-600 space-y-4">
//             <li>Each question has multiple choice options.</li>
//             <li>Choose the correct answer for each question.</li>
//             <li>You have 60 minutes to complete the exam.</li>
//             <li>Flag questions for review if you are unsure.</li>
//             <li>You cannot change your answers after submitting.</li>
//           </ul>

//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={onStartExam}
//               className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-600 relative z-10"
//             >
//               Start Exam
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   </div>
// );

// const StudentMyExam = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [reviewedQuestions, setReviewedQuestions] = useState(new Set());
//   const [isExamStarted, setIsExamStarted] = useState(false); // To track if the exam has started
//   const [timeLeft, setTimeLeft] = useState(60 * 60); // Time in seconds (60 minutes)
//   const navigate = useNavigate();

//   const totalQuestions = 20;

//   const question = {
//     id: 1,
//     text: "Vijay Diwas is observed on December 16 every year as part of Bangladesh Liberation War in which year?",
//     options: ["1975", "1974", "1973", "1972", "1971"],
//   };

//   useEffect(() => {
//     if (!isExamStarted) return;

//     // Update timer every second
//     const intervalId = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 0) {
//           clearInterval(intervalId); // Stop the timer when time is up
//           return 0;
//         }
//         return prevTime - 1; // Decrement time by 1 second
//       });
//     }, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [isExamStarted]);

//   const handleAnswer = (answer) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: answer,
//     }));
//   };

//   const markForReview = () => {
//     setReviewedQuestions((prev) => new Set(prev).add(currentQuestion));
//   };

//   const clearResponse = () => {
//     setAnswers((prev) => {
//       const newAnswers = { ...prev };
//       delete newAnswers[currentQuestion];
//       return newAnswers;
//     });
//     setReviewedQuestions((prev) => {
//       const newReviewed = new Set(prev);
//       newReviewed.delete(currentQuestion);
//       return newReviewed;
//     });
//   };

//   const getQuestionStatus = (index) => {
//     if (reviewedQuestions.has(index)) return "bg-yellow-100 border-yellow-400 text-yellow-700";
//     if (answers[index] !== undefined) return "bg-emerald-100 border-emerald-400 text-emerald-700";
//     return "bg-white border-gray-200 text-gray-600";
//   };

//   const startExam = () => {
//     setIsExamStarted(true);
//   };

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handleSubmitExam = () => {
//     // Navigate to the leaderboard page
//     navigate('/student_dashboard'); 
//   };

//   if (!isExamStarted) {
//     return <InstructionPage onStartExam={startExam} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <StudentNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         student={{ name: "John Smith" }} // Use actual student data
//         isLoggedIn={true}
//         userType="student"
//       />

//       {/* Sidebar */}
//       <StudentSidebar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//       />

//       {/* Main Content */}
//       <main
//         className={`absolute transition-all duration-200 ${isSidebarOpen ? "pl-3 left-60" : "pl-3 left-16"} right-0 top-16 bottom-0`}
//       >
//         <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 ">
//           <div className="max-w-7xl mx-10 flex justify-between items-center">
//             <h1 className="text-xl font-medium">General Knowledge Exam</h1>
//             <div className="flex items-center gap-8">
//               <div className="flex items-center gap-2 ">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
//               </div>
//               <button
//                 className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium"
//                 onClick={handleSubmitExam}
//               >
//                 Submit Exam
                
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Question and Navigation Area */}
//         <div className="max-w-7xl mx-auto p-6 px-8" style={{ position: 'relative', zIndex: 1 }}>
//           <div className="flex gap-6">
//             {/* Question Area (70%) */}
//             <div className="w-[70%] space-y-6">
//               {/* Progress Bar */}
//               {/* <div className="bg-white rounded-lg p-4 shadow-sm">
//                 <div className="flex justify-between text-sm text-gray-600 mb-2">
//                   <span>Progress</span>
//                   <span>{Object.keys(answers).length} of {totalQuestions} answered</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-indigo-600 h-2 rounded-full"
//                     style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
//                   />
//                 </div>
//               </div> */}

//               {/* Question Card */}
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="p-6 border-b">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-sm font-medium text-indigo-600">Question {currentQuestion + 1}</span>
//                     {/* <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Clock className="w-4 h-4" />
//                       <span>Time spent: 1:30</span>
//                     </div> */}
//                   </div>
//                   <h2 className="text-xl font-medium text-gray-800">{question.text}</h2>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {question.options.map((option, idx) => (
//                     <div
//                       key={idx}
//                       onClick={() => handleAnswer(idx)}
//                       className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
//                         ${answers[currentQuestion] === idx
//                           ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
//                           : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'}`}
//                     >
//                       <div
//                         className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//                           ${answers[currentQuestion] === idx
//                           ? 'border-indigo-600 bg-indigo-600 text-white'
//                           : 'border-gray-300'}`}
//                       >
//                         {answers[currentQuestion] === idx && <CheckCircle className="w-4 h-4" />}
//                       </div>
//                       <span className="flex-grow">{option}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="p-6 border-t bg-gray-50 rounded-b-lg">
//                   <div className="flex justify-between items-center">
//                     <div className="flex gap-3">
//                       <button
//                         onClick={markForReview}
//                         className="flex items-center gap-2 px-4 py-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100"
//                       >
//                         <Flag className="w-4 h-4" />
//                         Flag for Review
//                       </button>
//                       <button
//                         onClick={clearResponse}
//                         className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Clear
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
//                       className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                     >
//                       Save & Next
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Question Navigation (30%) */}
//             <div className="w-[30%]">
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Question Navigator</h3>

//                 <div className="grid grid-cols-4 gap-2 mb-6">
//                   {[...Array(totalQuestions)].map((_, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setCurrentQuestion(idx)}
//                       className={`h-10 border-2 rounded-lg font-medium transition-all
//                         ${getQuestionStatus(idx)}
//                         ${currentQuestion === idx ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
//                     >
//                       {idx + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-4 h-4 border-2 border-emerald-400 bg-emerald-100 rounded"></div>
//                     <span className="text-gray-600">Answered</span>
//                     <span className="ml-auto font-medium">{Object.keys(answers).length}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-4 h-4 border-2 border-yellow-400 bg-yellow-100 rounded"></div>
//                     <span className="text-gray-600">Flagged for Review</span>
//                     <span className="ml-auto font-medium">{reviewedQuestions.size}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-4 h-4 border-2 border-gray-200 bg-white rounded"></div>
//                     <span className="text-gray-600">Not Visited</span>
//                     <span className="ml-auto font-medium">
//                       {totalQuestions - Object.keys(answers).length}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentMyExam;

//above without integration

import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Clock, ChevronRight, Flag, Trash2, CheckCircle } from "lucide-react";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

const StudentMyExam_instruction = ({ onStartExam }) => {
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { examData, token } = location.state || {};

  useEffect(() => {
    let storedToken = token || localStorage.getItem("token");

    if (!storedToken) {
      console.error("No token found");
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);
      if (decoded.rollNo && decoded.id) {
        setStudent({ rollNo: decoded.rollNo, id: decoded.id });
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, [token]);

  const handleStartExam = async () => {
    if (!student || !examData) {
      console.error("Student or exam data is missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/student-quiz/start-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: student.id,
          quiz: examData._id,
          endTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start the exam");
      }

      const data = await response.json();
      console.log("Exam started:", data);

      // Call the passed `onStartExam` function if available
      // if (onStartExam) {
      //   onStartExam();
      // }

      // Navigate to exam page with questions
      navigate(`/student/My-exam/questions`, {
        state: { questions: examData.questions, examData  ,
        assigned_set: examData.assigned_sets[student.rollNo],
        sets: examData.sets }
      });
    } catch (error) {
      console.error("Error starting the exam:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <StudentNavbar
        toggleSidebar={() => {}}
        student={student ? { name: `Roll No: ${student.rollNo}` } : { name: "Guest" }}
        isLoggedIn={!!student}
        userType="student"
      />

      {/* Sidebar */}
      <StudentSidebar isSidebarOpen={true} toggleSidebar={() => {}} />

      {/* Main Content */}
      <main className="absolute transition-all duration-200 left-60 right-0 top-16 bottom-0">
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 relative -z-10">
          <div className="max-w-7xl mx-10 flex justify-between items-center">
            <h1 className="text-xl font-medium">
              Exam Name: {examData?.exam_name || "Loading..."}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Instructions:</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-4">
              <li>You have {examData?.questions?.length || 0} questions in this exam.</li>
              <li>Choose the correct answer for each question.</li>
              <li>You have 60 minutes to complete the exam.</li>
              <li>
                This exam is accessible from {examData?.schedule_time_range?.start || "N/A"} to{" "}
                {examData?.schedule_time_range?.end || "N/A"}.
              </li>
              <li>
                Negative Marking: {examData?.negative_marking !== undefined ? examData.negative_marking : "Not specified"}
              </li>
              <li>You cannot change your answers after submitting.</li>
            </ul>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartExam}
                className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-600 relative z-10"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentMyExam_instruction;

