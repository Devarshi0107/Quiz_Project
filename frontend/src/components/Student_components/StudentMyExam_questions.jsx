// import React, { useState, useEffect } from "react";
// import { useNavigate ,useLocation } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";
// import { Clock, ChevronRight, Flag, Trash2, CheckCircle } from "lucide-react";
// import StudentSidebar from "./StudentSidebar";
// import StudentNavbar from "./StudentNavbar";


// const StudentMyExam_questions = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [reviewedQuestions, setReviewedQuestions] = useState(new Set());
//     const [isExamStarted, setIsExamStarted] = useState(false); // To track if the exam has started
//     const [timeLeft, setTimeLeft] = useState(60 * 60); // Time in seconds (60 minutes)
//     const navigate = useNavigate();
  
//     const totalQuestions = 20;
  
//     const question = {
//       id: 1,
//       text: "Vijay Diwas is observed on December 16 every year as part of Bangladesh Liberation War in which year?",
//       options: ["1975", "1974", "1973", "1972", "1971"],
//     };
  
//     useEffect(() => {
//       if (!isExamStarted) return;
  
//       // Update timer every second
//       const intervalId = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 0) {
//             clearInterval(intervalId); // Stop the timer when time is up
//             return 0;
//           }
//           return prevTime - 1; // Decrement time by 1 second
//         });
//       }, 1000);
  
//       // Clean up interval on component unmount
//       return () => clearInterval(intervalId);
//     }, [isExamStarted]);
  
//     const handleAnswer = (answer) => {
//       setAnswers((prev) => ({
//         ...prev,
//         [currentQuestion]: answer,
//       }));
//     };
  
//     const markForReview = () => {
//       setReviewedQuestions((prev) => new Set(prev).add(currentQuestion));
//     };
  
//     const clearResponse = () => {
//       setAnswers((prev) => {
//         const newAnswers = { ...prev };
//         delete newAnswers[currentQuestion];
//         return newAnswers;
//       });
//       setReviewedQuestions((prev) => {
//         const newReviewed = new Set(prev);
//         newReviewed.delete(currentQuestion);
//         return newReviewed;
//       });
//     };
  
//     const getQuestionStatus = (index) => {
//       if (reviewedQuestions.has(index)) return "bg-yellow-100 border-yellow-400 text-yellow-700";
//       if (answers[index] !== undefined) return "bg-emerald-100 border-emerald-400 text-emerald-700";
//       return "bg-white border-gray-200 text-gray-600";
//     };
  
//     const startExam = () => {
//       setIsExamStarted(true);
//     };
  
//     const formatTime = (timeInSeconds) => {
//       const hours = Math.floor(timeInSeconds / 3600);
//       const minutes = Math.floor((timeInSeconds % 3600) / 60);
//       const seconds = timeInSeconds % 60;
//       return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//     };
  
//     const handleSubmitExam = () => {
//       // Navigate to the leaderboard page
//       navigate('/student_dashboard'); 
//     };
  
//     // if (!isExamStarted) {
//     //   return <InstructionPage onStartExam={startExam} />;
//     // }
  
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Navbar */}
//         <StudentNavbar
//           toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//           student={{ name: "John Smith" }} // Use actual student data
//           isLoggedIn={true}
//           userType="student"
//         />
  
//         {/* Sidebar */}
//         <StudentSidebar
//           isSidebarOpen={isSidebarOpen}
//           toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         />
  
//         {/* Main Content */}
//         <main
//           className={`absolute transition-all duration-200 ${isSidebarOpen ? "pl-3 left-60" : "pl-3 left-16"} right-0 top-16 bottom-0`}
//         >
//           <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 ">
//             <div className="max-w-7xl mx-10 flex justify-between items-center">
//               <h1 className="text-xl font-medium">General Knowledge Exam</h1>
//               <div className="flex items-center gap-8">
//                 <div className="flex items-center gap-2 ">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
//                 </div>
//                 <button
//                   className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium"
//                   onClick={handleSubmitExam}
//                 >
//                   Submit Exam
                  
//                 </button>
//               </div>
//             </div>
//           </div>
  
//           {/* Question and Navigation Area */}
//           <div className="max-w-7xl mx-auto p-6 px-8" style={{ position: 'relative', zIndex: 1 }}>
//             <div className="flex gap-6">
//               {/* Question Area (70%) */}
//               <div className="w-[70%] space-y-6">
              
  
//                 {/* Question Card */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   <div className="p-6 border-b">
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-sm font-medium text-indigo-600">Question {currentQuestion + 1}</span>
                    
//                     </div>
//                     <h2 className="text-xl font-medium text-gray-800">{question.text}</h2>
//                   </div>
  
//                   <div className="p-6 space-y-4">
//                     {question.options.map((option, idx) => (
//                       <div
//                         key={idx}
//                         onClick={() => handleAnswer(idx)}
//                         className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
//                           ${answers[currentQuestion] === idx
//                             ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
//                             : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'}`}
//                       >
//                         <div
//                           className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//                             ${answers[currentQuestion] === idx
//                             ? 'border-indigo-600 bg-indigo-600 text-white'
//                             : 'border-gray-300'}`}
//                         >
//                           {answers[currentQuestion] === idx && <CheckCircle className="w-4 h-4" />}
//                         </div>
//                         <span className="flex-grow">{option}</span>
//                       </div>
//                     ))}
//                   </div>
  
//                   <div className="p-6 border-t bg-gray-50 rounded-b-lg">
//                     <div className="flex justify-between items-center">
//                       <div className="flex gap-3">
//                         <button
//                           onClick={markForReview}
//                           className="flex items-center gap-2 px-4 py-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100"
//                         >
//                           <Flag className="w-4 h-4" />
//                           Flag for Review
//                         </button>
//                         <button
//                           onClick={clearResponse}
//                           className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                           Clear
//                         </button>
//                       </div>
  
//                       <button
//                         onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
//                         className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                       >
//                         Save & Next
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
  
//               {/* Question Navigation (30%) */}
//               <div className="w-[30%]">
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   <h3 className="text-lg font-medium text-gray-800 mb-4">Question Navigator</h3>
  
//                   <div className="grid grid-cols-4 gap-2 mb-6">
//                     {[...Array(totalQuestions)].map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentQuestion(idx)}
//                         className={`h-10 border-2 rounded-lg font-medium transition-all
//                           ${getQuestionStatus(idx)}
//                           ${currentQuestion === idx ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
//                       >
//                         {idx + 1}
//                       </button>
//                     ))}
//                   </div>
  
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="w-4 h-4 border-2 border-emerald-400 bg-emerald-100 rounded"></div>
//                       <span className="text-gray-600">Answered</span>
//                       <span className="ml-auto font-medium">{Object.keys(answers).length}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="w-4 h-4 border-2 border-yellow-400 bg-yellow-100 rounded"></div>
//                       <span className="text-gray-600">Flagged for Review</span>
//                       <span className="ml-auto font-medium">{reviewedQuestions.size}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="w-4 h-4 border-2 border-gray-200 bg-white rounded"></div>
//                       <span className="text-gray-600">Not Visited</span>
//                       <span className="ml-auto font-medium">
//                         {totalQuestions - Object.keys(answers).length}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   };
  
//   export default StudentMyExam_questions;
  

//above without integration

import React, { useState, useEffect ,useRef } from "react";
import { useNavigate ,useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Clock, ChevronRight, Flag, Trash2, CheckCircle } from "lucide-react";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";


const StudentMyExam_questions = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [reviewedQuestions, setReviewedQuestions] = useState(new Set());
    const [isExamStarted, setIsExamStarted] = useState(false); // To track if the exam has started
    const [timeLeft, setTimeLeft] = useState(0); // Time in seconds (60 minutes)
    const navigate = useNavigate();
    const location = useLocation();
    const examData = location.state?.examData || { questions: [] };
    const [student, setStudent] = useState(null);
    // const totalQuestions = currentSet.questions.length;
    const [token, setToken] = useState("");
    const intervalRef = useRef(null); // ✅ Store the interval reference
    const [isExamSubmitted, setIsExamSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const assignedSet = location.state?.examData?.assigned_set || 1;
    const currentSet = location.state?.examData?.sets?.find(set => set.set_number === assignedSet) 
    const totalQuestions = currentSet?.questions?.length || 0;
    
    useEffect(() => {
      const autoSave = async () => {
        if (!student || !examData?._id) return;
    
        const responses = currentSet.questions.map((question, index) => ({
          question_id: question._id, // Assuming each question has an _id field
          selected_option: answers[index] !== undefined ? answers[index] : null,
          status: reviewedQuestions.has(index) ? "flagged" : (answers[index] !== undefined ? "answered" : "not-visited"),
        }));
    
        try {
          const response = await fetch("http://localhost:3001/api/student-quiz/autosave-exam", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
            },
            body: JSON.stringify({
              student: student.id, // Assuming student.id is the student's ID
              quiz: examData._id, // Assuming examData._id is the quiz ID
              responses,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Auto-save failed");
          }
    
          const data = await response.json();
          console.log("Auto-save successful:", data);
        } catch (error) {
          console.error("Auto-save error:", error);
          // Retry logic can be added here
        }
      };
    
      // Auto-save every 30 seconds
      const autoSaveInterval = setInterval(autoSave, 10000);
    
      // Cleanup interval on component unmount
      return () => clearInterval(autoSaveInterval);
    }, [student, examData, answers, reviewedQuestions]);

    const handleSubmitExam = async () => {
      if (!student || !examData?._id) return;
    
      // Prepare responses array
      const responses = currentSet.questions.map((question, index) => ({
        question_id: question._id, // Assuming each question has an _id field
        selected_option: answers[index] !== undefined ? answers[index] : null,
        status: reviewedQuestions.has(index)
          ? "flagged"
          : (answers[index] !== undefined ? "answered" : "not-visited"),
      }));
    
      try {
        // Send exam data to the backend
        const response = await fetch("http://localhost:3001/api/student-quiz/submit-exam", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
          },
          body: JSON.stringify({
            student: student.id, // Assuming student.id is the student's ID
            quiz: examData._id,  // Assuming examData._id is the quiz ID
            responses,
          }),
        });
    
        // Handle response
        if (!response.ok) {
          throw new Error("Exam submission failed");
        }
    
        const data = await response.json();
        console.log("Exam submitted successfully:", data);
    
        // Update state and local storage
        setIsExamSubmitted(true);
        setSubmissionMessage("This exam is already submitted.");
        localStorage.removeItem("examResponses");
        localStorage.removeItem("reviewedQuestions");
    
        // Navigate to the dashboard or leaderboard
        navigate('/student_dashboard');
      } catch (error) {
        console.error("Exam submission error:", error);
        alert("Failed to submit exam. Please try again.");
      }
    };
    // Auto-submit effect: When timeLeft reaches 0, call handleSubmitExam automatically.
    useEffect(() => {
      if (timeLeft === 0) {
        console.log("Time's up! Auto-submitting exam...");
        handleSubmitExam();
      }
    }, [timeLeft]);
    useEffect(() => {
      localStorage.setItem("examResponses", JSON.stringify(answers));
      localStorage.setItem("reviewedQuestions", JSON.stringify([...reviewedQuestions]));
    }, [answers, reviewedQuestions]);

    useEffect(() => {
      const savedAnswers = JSON.parse(localStorage.getItem("examResponses")) || {};
      const savedReviewedQuestions = new Set(JSON.parse(localStorage.getItem("reviewedQuestions")) || new Set());
    
      setAnswers(savedAnswers);
      setReviewedQuestions(savedReviewedQuestions);
    }, []);
    useEffect(() => {
        console.log("Questions Array (on mount):", currentSet.questions);
        console.log("Total Questions (on mount):", totalQuestions);
      }, []); 
    useEffect(() => {
        if (!examData?.schedule_time_range?.end) return;
      
        const endTime = new Date(examData.schedule_time_range.end).getTime();
      
        const updateCountdown = () => {
          const now = new Date().getTime();
          const timeRemaining = endTime - now;
      
          if (timeRemaining <= 0) {
            setTimeLeft(0);
            clearInterval(intervalRef.current);
          } else {
            setTimeLeft(timeRemaining);
          }
        };
      
        updateCountdown(); // Initial call
      
        if (intervalRef.current) clearInterval(intervalRef.current); // ✅ Clear previous interval
        intervalRef.current = setInterval(updateCountdown, 1000);
      
        return () => clearInterval(intervalRef.current);
      }, [examData?.schedule_time_range?.end]); // ✅ Only depend on the end time

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
  
    useEffect(() => {
      if (!isExamStarted) return;
  
      // Update timer every second
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId); // Stop the timer when time is up
            return 0;
          }
          return prevTime - 1; // Decrement time by 1 second
        });
      }, 1000);
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, [isExamStarted]);
  
    const handleAnswer = (answer) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: answer,
      }));
    };
  
    const markForReview = () => {
      setReviewedQuestions((prev) => new Set(prev).add(currentQuestion));
    };
  
    const clearResponse = () => {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestion];
        return newAnswers;
      });
      setReviewedQuestions((prev) => {
        const newReviewed = new Set(prev);
        newReviewed.delete(currentQuestion);
        return newReviewed;
      });
    };
  
    const getQuestionStatus = (index) => {
      if (reviewedQuestions.has(index)) return "bg-yellow-100 border-yellow-400 text-yellow-700";
      if (answers[index] !== undefined) return "bg-emerald-100 border-emerald-400 text-emerald-700";
      return "bg-white border-gray-200 text-gray-600";
    };
  
    const startExam = () => {
      setIsExamStarted(true);
    };
  
   
    
    const formatTime = (milliseconds) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      };
  
  

      useEffect(() => {
        const checkExamSubmission = async () => {
            const token = localStorage.getItem("token");
            if (!token || !examData?._id) return;
    
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
                const studentId = decodedToken.id;
                
                const response = await fetch(
                    `http://localhost:3001/api/student-quiz/check-submission?student=${studentId}&quiz=${examData._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                if (!response.ok) {
                    throw new Error("Failed to check submission status");
                }
    
                const data = await response.json();
                if (data.submitted) {
                    setIsExamSubmitted(true); // Mark the exam as submitted
                    setSubmissionMessage(data.message); // Store backend message
                }
            } catch (error) {
                console.error("Error checking submission status:", error);
                setSubmissionMessage("Error checking submission status. Please try again.");
            }
        };
    
        checkExamSubmission();
    }, [examData]);

  const fetchLastAttempt = async () => {
    const token = localStorage.getItem("token");
    if (!token || !examData?._id) return;

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        const studentId = decodedToken.id;

        const response = await fetch(`http://localhost:3001/api/student-quiz/getlast-attempts?student=${studentId}&quiz=${examData._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch last attempt");
        }

        const data = await response.json();
        if (data.message === "Attempt found") {
            const attemptData = data.attempt.responses;

            // Map responses to restore answers and reviewed questions
            const restoredAnswers = {};
            const restoredReviewedQuestions = new Set();

            // attemptData.forEach((item, index) => {
            //     if (item.selected_option !== null) {
            //         restoredAnswers[index] = item.selected_option;
            //     }
            //     if (item.status === "flagged") {
            //         restoredReviewedQuestions.add(index);
            //     }
            // });
            currentSet?.questions?.forEach((question, index) => {
              const response = attemptData.find(r => r.question_id === question._id);
              if (response) {
                if (response.selected_option !== null) {
                  restoredAnswers[index] = response.selected_option;
                }
                if (response.status === "flagged") {
                  restoredReviewedQuestions.add(index);
                }
              }
            });
            setAnswers(restoredAnswers);
            setReviewedQuestions(restoredReviewedQuestions);
        }
    } catch (error) {
        console.error("Error fetching last attempt:", error);
    }
};

// Call this function when the exam page loads
useEffect(() => {
    fetchLastAttempt();
}, [examData]); 
  
    if (isExamSubmitted) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Exam Already Submitted</h1>
            <p className="text-gray-600 mt-2">{submissionMessage}</p>
            <button
              onClick={() => navigate('/student_dashboard')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <StudentNavbar
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          student={student ? { name: ` ${student.rollNo}` } : { name: "Guest" }} // Use actual student data
          isLoggedIn={true}
          userType="student"
        />
  
        {/* Sidebar */}
        <StudentSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
  
        {/* Main Content */}
        <main
          className={`absolute transition-all duration-200 ${isSidebarOpen ? "pl-3 left-60" : "pl-3 left-16"} right-0 top-16 bottom-0`}
        >
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 ">
            <div className="max-w-7xl mx-10 flex justify-between items-center">
              <h1 className="text-xl font-medium">Exam : {examData?.exam_name|| "Loading..."}</h1>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 ">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <button
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium"
                  onClick={handleSubmitExam}
                >
                  Submit Exam
                  
                </button>
              </div>
            </div>
          </div>
  
          {/* Question and Navigation Area */}
          <div className="max-w-7xl mx-auto p-6 px-8" style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex gap-6">
              {/* Question Area (70%) */}
              <div className="w-[70%] space-y-6">
              
  
                {/* Question Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-indigo-600">Question {currentQuestion + 1}</span>
                    
                    </div>
                    <h2 className="text-xl font-medium text-gray-800">{currentSet?.questions[currentQuestion]?.question_text}</h2>
                  </div>
  
                  <div className="p-6 space-y-4">
                  {currentSet?.questions[currentQuestion]?.options?.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${answers[currentQuestion] === idx
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                            ${answers[currentQuestion] === idx
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-gray-300'}`}
                        >
                          {answers[currentQuestion] === idx && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <span className="flex-grow">{option}</span>
                      </div>
                    ))}
                  </div>
  
                  <div className="p-6 border-t bg-gray-50 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <button
                          onClick={markForReview}
                          className="flex items-center gap-2 px-4 py-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100"
                        >
                          <Flag className="w-4 h-4" />
                          Flag for Review
                        </button>
                        <button
                          onClick={clearResponse}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                          Clear
                        </button>
                      </div>
  
                      <button
                        onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Save & Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Question Navigation (30%) */}
              <div className="w-[30%]">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Question Navigator</h3>
  
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {[...Array(totalQuestions)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`h-10 border-2 rounded-lg font-medium transition-all
                          ${getQuestionStatus(idx)}
                          ${currentQuestion === idx ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 border-2 border-emerald-400 bg-emerald-100 rounded"></div>
                      <span className="text-gray-600">Answered</span>
                      <span className="ml-auto font-medium">{Object.keys(answers).length}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 border-2 border-yellow-400 bg-yellow-100 rounded"></div>
                      <span className="text-gray-600">Flagged for Review</span>
                      <span className="ml-auto font-medium">{reviewedQuestions.size}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 border-2 border-gray-200 bg-white rounded"></div>
                      <span className="text-gray-600">Not Visited</span>
                      <span className="ml-auto font-medium">
                        {totalQuestions - Object.keys(answers).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default StudentMyExam_questions;
  