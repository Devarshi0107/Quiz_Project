
// ------------------------- Kabir without integration 
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import StudentNavbar from "./StudentNavbar";
// import StudentSidebar from "./StudentSidebar";
// import { jwtDecode } from "jwt-decode";

// import {
//   Calendar,
//   Clock,
//   Timer,
//   BookOpen,
//   ChevronRight,
//   ArrowRight,
//   Plus,
// } from "lucide-react";

// const StudentDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const navigate = useNavigate();

//   const student = {
//     name: "Devarshi Maurya",
//     id: "STU2024001",
//     branch: "Computer Science",
//     semester: "6th Semester",
//     notifications: [
//       { id: 1, text: "New exam schedule posted", time: "2 hours ago" },
//       { id: 2, text: "Assignment deadline reminder", time: "5 hours ago" },
//     ],
//     examStats: {
//       completed: 12,
//       upcoming: 3,
//       ongoing: 1,
//     },
//     upcomingExams: [
//       {
//         subject: "Database Management",
//         date: "Jan 15, 2025",
//         time: "10:00 AM",
//         duration: "2 hours",
//       },
//       {
//         subject: "Computer Networks",
//         date: "Jan 20, 2025",
//         time: "2:00 PM",
//         duration: "3 hours",
//       },
//     ],
//     OngoingActivity: [
//       {
//         type: "exam",
//         title: "Data Structures",
//         date: "Dec 28, 2024",
//         score: "85/100",
//       },
//       {
//         type: "profile",
//         title: "Updated Profile Picture",
//         date: "Dec 25, 2024",
//       },
//     ],
//   };
 



// const StudentDashboard = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const [student, setStudent] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Sidebar state



//   const handleCompletedClick = () => {
//     navigate("/student/ExamPerformance");
//   };

//   const handleOngoingActivityClick = (activity) => {
//     if (activity.type === "exam") {
//       navigate(`/student/My-exam/`); 
//     } // You can replace this with the appropriate path or function
//   };

//   return (
//     <div className="min-h-screen bg-stone-100">
//       <StudentNavbar
//         toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
//         student={student}
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
//         <div className="max-w-full">
//           {/* Welcome Section */}
//           {/* <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-8"> */}
//             {/* <h1 className="text-3xl font-bold mb-2"> */}
//               {/* Welcome back, {student.rollNo}! 👋 */}
//             {/* </h1> */}
//             {/* <p className="text-orange-100"> */}
//               {/* You have {student.examStats.upcoming} upcoming exams this week. */}
//             {/* </p> */}
//           {/* </div> */}
//             {/* Welcome Section */}
//             <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
//     <h1 className="text-3xl font-bold mb-2">
//       Welcome back, {student && student.rollNo ? student.rollNo : "Loading..."}! 👋
//     </h1>
//     <p className="text-orange-100">
//       You have {student && student.examStats ? student.examStats.upcoming : "Loading..."} upcoming exams this week.
//     </p>
//   </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-stone-500">Upcoming</span>
//                 <span className="p-2 bg-orange-100 rounded-lg">
//                   <Calendar size={20} className="text-orange-600" />
//                 </span>
//               </div>
//               <div className="text-3xl font-bold text-stone-900">
//                 {student.examStats.upcoming}
//               </div>
//               <div className="mt-2 text-sm text-stone-500">Exams scheduled</div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-stone-500">Ongoing</span>
//                 <span className="p-2 bg-emerald-100 rounded-lg">
//                   <Clock size={20} className="text-emerald-600" />
//                 </span>
//               </div>
//               <div className="text-3xl font-bold text-stone-900">
//                 {student.examStats.ongoing}
//               </div>
//               <div className="mt-2 text-sm text-stone-500">Active exams</div>
//             </div>

//             <div
//               className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 cursor-pointer"
//               onClick={handleCompletedClick}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-stone-500">Completed</span>
//                 <span className="p-2 bg-purple-100 rounded-lg">
//                   <BookOpen size={20} className="text-purple-600" />
//                 </span>
//               </div>
//               <div className="text-3xl font-bold text-stone-900">
//                 {student.examStats.completed}
//               </div>
//               <div className="mt-2 text-sm text-stone-500">Total exams</div>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="grid grid-cols-5 gap-6">
//             {/* Upcoming Exams */}
//             <div className="col-span-3 bg-white rounded-xl shadow-sm border border-stone-200">
//               <div className="p-6 border-b border-stone-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold">Upcoming Exams</h2>
//                   <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600">
//                     <Plus size={18} />
//                     Add New
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {student.upcomingExams.map((exam, index) => (
//                     <div
//                       key={index}
//                       className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="font-medium mb-2">{exam.subject}</h3>
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="flex items-center text-stone-600">
//                               <Calendar size={16} className="mr-2" />
//                               <span className="text-sm">{exam.date}</span>
//                             </div>
//                             <div className="flex items-center text-stone-600">
//                               <Clock size={16} className="mr-2" />
//                               <span className="text-sm">{exam.time}</span>
//                             </div>
//                             <div className="flex items-center text-stone-600 col-span-2">
//                               <Timer size={16} className="mr-2" />
//                               <span className="text-sm">{exam.duration}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <button className="p-2 hover:bg-white rounded-lg text-stone-400 hover:text-stone-600">
//                           <ChevronRight size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Ongoing Activity */}
//             <div className="col-span-2 bg-white rounded-xl shadow-sm border border-stone-200">
//               <div className="p-6 border-b border-stone-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold">Ongoing Activity</h2>
//                   {/* <button
//                     className="text-orange-500 hover:text-orange-600"
//                     onClick={handleCompletedClick}
//                   >
//                     See all
//                   </button> */}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {student.OngoingActivity.map((activity, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-4 p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
//                       onClick={() => handleOngoingActivityClick(activity)}
//                     >
//                       <div
//                         className={`w-2 h-2 rounded-full ${
//                           activity.type === "exam"
//                             ? "bg-emerald-500"
//                             : "bg-orange-500"
//                         }`}
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium">{activity.title}</h3>
//                         <p className="text-sm text-stone-500 mt-1">
//                           {activity.date}
//                         </p>
//                         {activity.score && (
//                           <p className="text-sm text-emerald-600 font-medium mt-1">
//                             Score: {activity.score}
//                           </p>
//                         )}
//                       </div>
//                       <ArrowRight size={18} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="h-4"></div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;


//abvooe without integration 

//complete woriking with integration remain opening ongoig section and removing clcik button
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import { jwtDecode } from "jwt-decode";

import {
  Calendar,
  Clock,
  Timer,
  BookOpen,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import moment from 'moment-timezone'; // For converting UTC to IST



const StudentDashboard = () => {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [student, setStudent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [upcomingCount, setUpcomingCount] = useState(null);
  const [ongoingCount, setOngoingCount] = useState(null);
  const navigate = useNavigate();

  const formatToIST = (time) => {
    return moment(time).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
  };

  const calculateDuration = (start, end) => {
    const startTime = moment(start);
    const endTime = moment(end);
    const duration = moment.duration(endTime.diff(startTime));
    return `${duration.hours()}h ${duration.minutes()}m`;
  };

  const formatExamDate = (date) => {
    const examDate = moment(date).tz('Asia/Kolkata');
    if (examDate.isSame(moment(), 'day')) {
      return 'Today';
    } else if (examDate.isSame(moment().add(1, 'day'), 'day')) {
      return 'Tomorrow';
    } else {
      return examDate.format('DD MMM');
    }
  };

  const formatStartTime = (time) => {
    return moment(time).tz('Asia/Kolkata').format('HH:mm:ss');
  };

  const formatEndTime = (time) => {
    return moment(time).tz('Asia/Kolkata').format('HH:mm:ss');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded.rollNo) {
        setError("Token is missing required data.");
        setLoading(false);
        return;
      }
      setStudent({
        rollNo: decoded.rollNo,
      });
    } catch (err) {
      setError("Invalid token");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/api/students/filtered-quizzes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setUpcomingQuizzes(data.upcomingExams || []);
        setOngoingQuizzes(data.ongoingExams || []);
        setUpcomingCount(data.upcomingExams ? data.upcomingExams.length : 0);
        setOngoingCount(data.ongoingExams ? data.ongoingExams.length : 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCompletedClick = () => {
    navigate("/student/ExamPerformance");
  };

  const handleOngoingActivityClick = (activity) => {
    // if (activity.type === "exam") {
      // navigate(`/student/My-exam/`);
      navigate(`/student/My-exam/${activity.exam_name}`, {
        state: {
          examData: activity,  // Passing exam details
          token: localStorage.getItem("token"), // Passing JWT token
        },
      });
    // }
  };

  if (loading || !student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <StudentNavbar
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        student={student}
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
        className={`absolute transition-all duration-200 ${isSidebarOpen ? "left-60" : "left-16"} right-0 top-20 bottom-0 px-8`}
      >
        <div className="max-w-full">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {student.rollNo || "Loading..."}! 👋
            </h1>
            <p className="text-orange-100">
              You have {upcomingCount !== null ? upcomingCount : "Loading..."} upcoming exams this week.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Upcoming</span>
                <span className="p-2 bg-orange-100 rounded-lg">
                  <Calendar size={20} className="text-orange-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">
                {upcomingCount !== null ? upcomingCount : "Loading..."}
              </div>
              <div className="mt-2 text-sm text-stone-500">Exams scheduled</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Ongoing</span>
                <span className="p-2 bg-emerald-100 rounded-lg">
                  <Clock size={20} className="text-emerald-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">
                {ongoingCount !== null ? ongoingCount : "Loading..."}
              </div>
              <div className="mt-2 text-sm text-stone-500">Active exams</div>
            </div>

            <div
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 cursor-pointer"
              onClick={handleCompletedClick}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Completed</span>
                <span className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen size={20} className="text-purple-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">0</div> {/* Completed count placeholder */}
              <div className="mt-2 text-sm text-stone-500">Total exams</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-5 gap-6">
            {/* Upcoming Exams */}
            <div className="col-span-3 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-6 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Upcoming Exams</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingQuizzes.length === 0 ? (
                    <p>No upcoming quizzes</p>
                  ) : (
                    upcomingQuizzes.map((exam, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium mb-2">{exam.exam_name}</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center text-stone-600">
                                <Calendar size={16} className="mr-2" />
                                <span className="text-sm">
                                  Exam: {formatExamDate(exam.schedule_date)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600">
                                <Calendar size={16} className="mr-2" />
                                <span className="text-sm">Date: {moment(exam.schedule_date).format('YYYY-MM-DD')}</span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Start Time: {formatStartTime(exam.schedule_time_range.start)} | End Time: {formatEndTime(exam.schedule_time_range.end)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Duration: {calculateDuration(exam.schedule_time_range.start, exam.schedule_time_range.end)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Total Marks: 10  || negative marking : -1 
                                </span>
                              </div>
                              
                            </div>
                          </div>
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Ongoing Exams */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-6 border-b border-stone-200">
                <h2 className="text-lg font-semibold">Ongoing Exams</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {ongoingQuizzes.length === 0 ? (
                    <p>No ongoing exams</p>
                  ) : (
                    ongoingQuizzes.map((exam, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                        onClick={() => handleOngoingActivityClick(exam)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium mb-2">{exam.exam_name}</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center text-stone-600">
                                <Calendar size={16} className="mr-2" />
                                <span className="text-sm">
                                  Exam: {formatExamDate(exam.schedule_date)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600">
                                <Calendar size={16} className="mr-2" />
                                <span className="text-sm">Date: {moment(exam.schedule_date).format('YYYY-MM-DD')}</span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Start Time: {formatStartTime(exam.schedule_time_range.start)} | End Time: {formatEndTime(exam.schedule_time_range.end)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Duration: {calculateDuration(exam.schedule_time_range.start, exam.schedule_time_range.end)}
                                </span>
                              </div>
                              <div className="flex items-center text-stone-600 col-span-2">
                                <Timer size={16} className="mr-2" />
                                <span className="text-sm">
                                  Total Marks: 10  || negative marking : -1 
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
