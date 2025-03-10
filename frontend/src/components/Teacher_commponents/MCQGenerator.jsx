


// import React, { useState, useEffect } from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import TeacherNavbar from "./TeacherNavbar";
// import TeacherSidebar from "./TeacherSidebar";
// const MCQGenerator = () => {
//   // Keep all existing state variables
//   const [totalMarks, setTotalMarks] = useState('');
//   const [easyQuestions, setEasyQuestions] = useState('');
//   const [mediumQuestions, setMediumQuestions] = useState('');
//   const [hardQuestions, setHardQuestions] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [filenames, setFilenames] = useState([]);
//   const [displayedQuestions, setDisplayedQuestions] = useState([]);
//   const [examName, setExamName] = useState('');
//   const [scheduleDate, setScheduleDate] = useState('');
//   const [scheduleTimeRange, setScheduleTimeRange] = useState('');
//   const [branch, setBranch] = useState('');
//   const [batch, setBatch] = useState('');
//   const [rollNumberRange, setRollNumberRange] = useState('');
//   const [filteredBatches, setFilteredBatches] = useState([]);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [startRollNumber, setStartRollNumber] = useState('');
//   const [endRollNumber, setEndRollNumber] = useState('');
  
//   const branchBatchMapping = {
//     IT: ['2022', '2023', '2024'],
//     CS: ['22CS', '23CS', '24CS'],
//     CE: ['22CE', '23CE', '24CE'],
//   };

  
//   // Keep all existing functions
//   useEffect(() => {
//     if (branch) {
//       setFilteredBatches(branchBatchMapping[branch] || []);
//     } else {
//       setFilteredBatches([]);
//     }
//   }, [branch]);

//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setFilenames(files.map(file => file.name));

//     const allQuestions = [];

//     files.forEach((file) => {
//       const reader = new FileReader();
//       const fileType = file.type;

//       reader.onload = (e) => {
//         try {
//           if (fileType === 'application/json') {
//             const json = JSON.parse(e.target.result);
//             allQuestions.push(...json.questions);
//           } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//             const workbook = XLSX.read(e.target.result, { type: 'binary' });
//             const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
//             allQuestions.push(...json);
//           }
//         } catch (error) {
//           console.error("Error reading file:", error);
//         }
//         setQuestions(prevQuestions => [...prevQuestions, ...allQuestions]);
//       };

//       if (fileType === 'application/json') {
//         reader.readAsText(file);
//       } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//         reader.readAsBinaryString(file);
//       }
//     });
//   };

//   const generateMCQs = () => {
//     const easy = questions.filter(q => q.difficulty === 'easy');
//     const medium = questions.filter(q => q.difficulty === 'medium');
//     const hard = questions.filter(q => q.difficulty === 'hard');

//     const existingQuestions = new Set(selectedQuestions.map(q => q.question.trim()));

//     const requiredEasyQuestions = Math.max(parseInt(easyQuestions) - [...existingQuestions].filter(q => easy.map(eq => eq.question.trim()).includes(q)).length, 0);
//     const requiredMediumQuestions = Math.max(parseInt(mediumQuestions) - [...existingQuestions].filter(q => medium.map(mq => mq.question.trim()).includes(q)).length, 0);
//     const requiredHardQuestions = Math.max(parseInt(hardQuestions) - [...existingQuestions].filter(q => hard.map(hq => hq.question.trim()).includes(q)).length, 0);

//     const getRandomQuestions = (arr, count, existingSet) => {
//       const filteredQuestions = arr.filter(q => !existingSet.has(q.question.trim()));
//       const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
//       return shuffled.slice(0, count);
//     };

//     const newEasyQuestions = getRandomQuestions(easy, requiredEasyQuestions, existingQuestions);
//     const newMediumQuestions = getRandomQuestions(medium, requiredMediumQuestions, existingQuestions);
//     const newHardQuestions = getRandomQuestions(hard, requiredHardQuestions, existingQuestions);

//     const finalQuestions = [
//       ...selectedQuestions,
//       ...newEasyQuestions,
//       ...newMediumQuestions,
//       ...newHardQuestions,
//     ];

//     setSelectedQuestions(finalQuestions);
//     setDisplayedQuestions(finalQuestions);
//   };

//   const createTest = async () => {
//     if (selectedQuestions.length === 0) {
//       alert("No questions to save.");
//       return;
//     }
  
//     try {
//       // Format the start and end times in ISO 8601 format
//       const formattedStartTime = new Date(`${scheduleDate}T${startTime}:00.000+05:30`).toISOString();
//       const formattedEndTime = new Date(`${scheduleDate}T${endTime}:00.000+05:30`).toISOString();
  
//       // Combine roll number range
//       const roll_number_range = `${startRollNumber}-${endRollNumber}`;
  
//       // Map selectedQuestions to match the backend's expected structure
//       const formattedQuestions = selectedQuestions.map((q) => ({
//         question_text: q.question,
//         options: q.options,
//         correct_option: q.options.indexOf(q.answer),  // ✅ Assign the correct answer here
//         marks: q.marks,
//         difficulty: q.difficulty,
//     }));
    


    
  
//       // Construct the payload
//       const payload = {
//         filename: filenames[0] || "default_filename", // Use the first filename or a default
//         exam_name: examName,
//         schedule_date: scheduleDate,
//         schedule_time_range: {
//           start: formattedStartTime,
//           end: formattedEndTime,
//         },
//         branch,
//         batch,
//         roll_number_range, // Add the combined roll number range
//         questions: formattedQuestions,
//       };
  
//       console.log("Sending payload to server:", payload);
//       console.log("Selected Questions:", selectedQuestions);
//       console.log("Formatted Questions:", formattedQuestions);
//       console.log("Final Payload:", JSON.stringify(formattedQuestions, null, 2));

//       const response = await fetch('http://localhost:3001/api/quiz/save-quiz', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(payload),
//       });
  
//       console.log("Response status:", response.status);
  
//       if (!response.ok) {
//         const errorResponse = await response.json();
//         console.error("Error response from server:", errorResponse);
//         throw new Error(`Failed to create test: ${errorResponse.message || response.statusText}`);
//       }
  
//       const successResponse = await response.json();
//       console.log("Test created successfully:", successResponse);
//       alert('Test created successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       alert(`Error: ${error.message}`);
//     }
//   };
//   const generatePDF = () => {
//     if (selectedQuestions.length === 0) {
//       alert("No questions to generate PDF.");
//       return;
//     }

//     const doc = new jsPDF();

//     doc.text('Exam Name: ' + examName, 10, 10);
//     doc.text('Schedule Date: ' + scheduleDate, 10, 20);
//     doc.text('Schedule Time: ' + `${startTime} - ${endTime}`, 10, 30);
//     doc.text('Branch: ' + branch, 10, 40);
//     doc.text('Batch: ' + batch, 10, 50);
//     doc.text('Roll Number Range: ' + rollNumberRange, 10, 60);
//     doc.text('Total Marks: ' + totalMarks, 10, 70);

//     const rows = selectedQuestions.map((q, index) => [
//       index + 1,
//       q.question,
//       q.options.join(', '),
//       q.answer,
//       q.difficulty,
//       q.marks,
//     ]);

//     doc.autoTable({
//       head: [['#', 'Question', 'Options', 'Answer', 'Difficulty', 'Marks']],
//       body: rows,
//     });

//     doc.save(`${examName}_MCQs.pdf`);
//   };

//   const selectAllQuestions = () => {
//     setSelectedQuestions(displayedQuestions);
//   };

//   const deselectAllQuestions = () => {
//     setSelectedQuestions([]);
//   };
  
//   const [activeContent, setActiveContent] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state

//   const handleMenuClick = (content) => {
//     setActiveContent(content); // Set the active content
//     };  
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
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
//       <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
//           <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 flex justify-between items-center">
//               <h1 className="text-4xl font-extrabold text-white">MCQ Generator</h1>
//             </div>
        

//         {/* Exam Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6">
//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">Exam Name</label>
//             <input
//               type="text"
//               value={examName}
//               onChange={(e) => setExamName(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">Schedule Date</label>
//             <input
//               type="date"
//               value={scheduleDate}
//               onChange={(e) => setScheduleDate(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">Start Time</label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">End Time</label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">Branch</label>
//             <select
//               value={branch}
//               onChange={(e) => setBranch(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Branch</option>
//               <option value="IT">IT</option>
//               <option value="CS">CS</option>
//               <option value="CE">CE</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="block font-medium text-gray-700">Batch</label>
//             <select
//               value={batch}
//               onChange={(e) => setBatch(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Batch</option>
//               {filteredBatches.map((batchOption) => (
//                 <option key={batchOption} value={batchOption}>
//                   {batchOption}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="space-y-2">
//   <label className="block font-medium text-gray-700">ID Range</label>
//   <div className="flex space-x-2">
//     <input
//       type="text"
//       value={startRollNumber}
//       onChange={(e) => setStartRollNumber(e.target.value)}
//       placeholder="Start"
//       className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//     <span className="self-center">-</span>
//     <input
//       type="text"
//       value={endRollNumber}
//       onChange={(e) => setEndRollNumber(e.target.value)}
//       placeholder="End"
//       className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
//   <p className="text-sm text-gray-500 pl-2">(Ex : 22IT001 - 050)</p>
// </div>

//         </div>


//         {/* Question Configuration */}
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Configuration</h3>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//             <div className="space-y-2">
//               <label className="block font-medium text-gray-700">Total Marks</label>
//               <input
//                 type="number"
//                 value={totalMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block font-medium text-gray-700">Easy Questions</label>
//               <input
//                 type="number"
//                 value={easyQuestions}
//                 onChange={(e) => setEasyQuestions(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block font-medium text-gray-700">Medium Questions</label>
//               <input
//                 type="number"
//                 value={mediumQuestions}
//                 onChange={(e) => setMediumQuestions(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block font-medium text-gray-700">Hard Questions</label>
//               <input
//                 type="number"
//                 value={hardQuestions}
//                 onChange={(e) => setHardQuestions(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block font-medium text-gray-700">Negative Marks</label>
//               <input
//                 type="number"
//                 // value={negativeMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>
// {/* File Upload Section */}
//         <div className="mb-8 p-6 bg-gray-50 rounded-lg">
//           <div className="flex items-center gap-4">
//             <label className="block font-medium text-gray-700">Upload JSON/Excel Files:</label>
//             <input
//               type="file"
//               accept=".json, .xlsx"
//               onChange={handleFileUpload}
//               multiple
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>
//         </div>
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-4 mb-8 p-6">
//           <button
//             onClick={generateMCQs}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Generate MCQs
//           </button>
//           <button
//             onClick={createTest}
//             className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             Save Quiz
//           </button>
//           <button
//             onClick={generatePDF}
//             className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             Download PDF
//           </button>
//           <button
//             onClick={selectAllQuestions}
//             className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Select All
//           </button>
//           <button
//             onClick={deselectAllQuestions}
//             className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Deselect All
//           </button>
//         </div>

//         {/* Selected Questions List */}
//         <div className="bg-white rounded-lg shadow">
//           <h3 className="text-xl font-semibold text-gray-800 p-4 border-b">Selected MCQs</h3>
//           <div className="max-h-96 overflow-y-auto">
//             {displayedQuestions.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 No questions selected. Generate or select questions to see them here.
//               </div>
//             ) : (
//               <ul className="divide-y divide-gray-200">
//                 {displayedQuestions.map((question, index) => (
//                   <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
//                     <label className="flex items-start gap-4 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedQuestions.includes(question)}
//                         onChange={() => {
//                           const isSelected = selectedQuestions.includes(question);
//                           setSelectedQuestions(isSelected
//                             ? selectedQuestions.filter(q => q !== question)
//                             : [...selectedQuestions, question]);
//                         }}
//                         className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">{question.question}</p>
//                         <div className="mt-1 flex items-center gap-2">
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                             ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
//                               question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
//                               'bg-red-100 text-red-800'}`}>
//                             {question.difficulty}
//                           </span>
//                           {question.marks && (
//                             <span className="text-xs text-gray-500">
//                               {question.marks} marks
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//       </main>
//     </div>
//   );
// };

// export default MCQGenerator;

import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import moment from 'moment-timezone';

const MCQGenerator = () => {
  // State variables
  const [totalMarks, setTotalMarks] = useState('');
  const [easyQuestions, setEasyQuestions] = useState('');
  const [mediumQuestions, setMediumQuestions] = useState('');
  const [hardQuestions, setHardQuestions] = useState('');
  const [negativeMarks, setNegativeMarks] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]); // Stores generated sets
  const [filenames, setFilenames] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [examName, setExamName] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [branch, setBranch] = useState('');
  const [batch, setBatch] = useState('');
  const [startRollNumber, setStartRollNumber] = useState('');
  const [endRollNumber, setEndRollNumber] = useState('');
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numSets, setNumSets] = useState(1); // Number of sets to generate
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSet, setCurrentSet] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  // Branch-batch mapping
  const branchBatchMapping = {
    IT: ['2022', '2023', '2024'],
    CS: ['22CS', '23CS', '24CS'],
    CE: ['22CE', '23CE', '24CE'],
  };

  // Update filtered batches when branch changes
  useEffect(() => {
    if (branch) {
      setFilteredBatches(branchBatchMapping[branch] || []);
    } else {
      setFilteredBatches([]);
    }
  }, [branch]);

  useEffect(() => {
    // Marks per question type
    const marksPerEasyQuestion = 1; // Adjust as needed
    const marksPerMediumQuestion = 2; // Adjust as needed
    const marksPerHardQuestion = 3; // Adjust as needed
  
    // Calculate total marks
    const total =
      parseInt(easyQuestions || 0) * marksPerEasyQuestion +
      parseInt(mediumQuestions || 0) * marksPerMediumQuestion +
      parseInt(hardQuestions || 0) * marksPerHardQuestion;
  
    // Update total marks state
    setTotalMarks(total);
  }, [easyQuestions, mediumQuestions, hardQuestions]);
 
  const generateExcel = () => {
    if (selectedSets.length === 0) {
      alert("No sets to generate Excel file.");
      return;
    }
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Process each set
    selectedSets.forEach((set) => {
      const rows = set.questions.map((q, index) => [
        index + 1, // Question number
        q.question, // Question text
        q.options.join(", "), // Options as comma-separated string
        q.correct_answer, // Correct answer
        q.difficulty, // Difficulty level
        q.marks, // Marks
      ]);
  
      // Add headers
      const header = ["#", "Question", "Options", "Answer", "Difficulty", "Marks"];
      rows.unshift(header);
  
      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, `Set ${set.id}`);
    });
  
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${examName}_MCQs.xlsx`);
  };


  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFilenames(files.map(file => file.name));
  
    // Reset the questions state for new file upload
    setQuestions([]);
  
    const allQuestions = [];
  
    files.forEach((file) => {
      const reader = new FileReader();
      const fileType = file.type;
  
      reader.onload = (e) => {
        try {
          if (fileType === 'application/json') {
            const json = JSON.parse(e.target.result);
            console.log("Parsed JSON:", json); // Debugging
            if (json.questions && Array.isArray(json.questions)) {
              allQuestions.push(...json.questions);
            } else {
              console.error("Invalid JSON format: 'questions' array not found.");
            }
          } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            console.log("Workbook Sheets:", workbook.SheetNames); // Debugging
  
            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
  
            console.log("Parsed Excel Data:", json); // Debugging
  
            // Map Excel data to the expected format
            const formattedQuestions = json.map((row) => ({
              question: row.question,
              options: row.options.split(", "), // Split the options string into an array
              correct_answer: row.answer,
              difficulty: row.difficulty,
              marks: row.marks,
            }));
  
            console.log("Formatted Questions:", formattedQuestions); // Debugging
  
            allQuestions.push(...formattedQuestions);
          }
        } catch (error) {
          console.error("Error reading file:", error);
        }
  
        console.log("All Questions:", allQuestions); // Debugging
        setQuestions(prevQuestions => [...prevQuestions, ...allQuestions]);
      };
  
      if (fileType === 'application/json') {
        reader.readAsText(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        reader.readAsBinaryString(file);
      }
    });
  };

  const generateMCQs = () => {
    const easy = questions.filter(q => q.difficulty === 'easy');
    const medium = questions.filter(q => q.difficulty === 'medium');
    const hard = questions.filter(q => q.difficulty === 'hard');
  
    console.log("Easy Questions:", easy.length);
    console.log("Medium Questions:", medium.length);
    console.log("Hard Questions:", hard.length);
  
    const perSet = {
      easy: parseInt(easyQuestions),
      medium: parseInt(mediumQuestions),
      hard: parseInt(hardQuestions),
    };
  
    console.log("Questions per Set:", perSet);
    console.log("Number of Sets:", numSets);
  
    // Validate if enough questions are available
    if (
      easy.length < perSet.easy * numSets ||
      medium.length < perSet.medium * numSets ||
      hard.length < perSet.hard * numSets
    ) {
      alert(`Not enough questions to generate ${numSets} sets.`);
      return;
    }
  
    // Track used questions to avoid duplication across sets
    const usedQuestions = new Set();
  
    // Generate sets
    const sets = [];
    for (let i = 0; i < numSets; i++) {
      const set = {
        id: i + 1,
        questions: [
          ...getRandomQuestions(easy, perSet.easy, usedQuestions),
          ...getRandomQuestions(medium, perSet.medium, usedQuestions),
          ...getRandomQuestions(hard, perSet.hard, usedQuestions),
        ],
      };
      sets.push(set);
    }
  
    setSelectedSets(sets);
    setDisplayedQuestions(sets.flatMap(set => set.questions));
  };

  
    const getRandomQuestions = (arr, count, usedQuestions) => {
    const availableQuestions = arr.filter(q => !usedQuestions.has(q.question.trim()));
    const shuffled = shuffle([...availableQuestions]);
    const selected = shuffled.slice(0, count);
  
    // Mark selected questions as used
    selected.forEach(q => usedQuestions.add(q.question.trim()));
  
    return selected;
  };
  
  // Shuffle array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createTest = async () => {
    if (selectedSets.length === 0) {
      alert("No sets to save.");
      return;
    }
  
    // Combine startRollNumber and endRollNumber to create rollNumberRange
    const rollNumberRange = `${startRollNumber}-${endRollNumber}`;
  
    // Parse roll number range (e.g., "22IT001-22IT050")
    const [startRoll, endRoll] = rollNumberRange.split('-');
    const rollPrefix = startRoll.slice(0, 5); // Extract prefix (e.g., "22IT")
    const startNum = parseInt(startRoll.slice(5)); // Extract starting number (e.g., 1)
    const endNum = parseInt(endRoll.slice(5)); // Extract ending number (e.g., 50)
  
    // Calculate total number of students
    const totalStudents = endNum - startNum + 1;
  
    // Assign sets to students in round-robin fashion
    const assignedSets = new Map();
    for (let i = 0; i < totalStudents; i++) {
      const rollNo = `${rollPrefix}${String(startNum + i).padStart(3, '0')}`;
      const setNumber = (i % numSets) + 1; // Round-robin assignment
      assignedSets.set(rollNo, setNumber);
    }
  
    // Prepare sets array for the payload
    const sets = selectedSets.map(set => ({
      set_number: set.id,
      questions: set.questions.map(q => ({
        question_text: q.question,
        options: q.options,
        correct_option: q.options.indexOf(q.correct_answer),
        marks: q.marks,
        difficulty: q.difficulty,
        negative_marking: negativeMarks || 0
      }))
    }));

    // Use moment.tz to format start and end times in the desired format
  const startTimeStr = moment.tz(`${scheduleDate}T${startTime}:00`, "Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const endTimeStr = moment.tz(`${scheduleDate}T${endTime}:00`, "Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  
    // Prepare payload
    const payload = {
      filename: filenames[0] || "default_filename",
      exam_name: examName,
      schedule_date: scheduleDate,
      schedule_time_range: {
        start: startTimeStr,
        end: endTimeStr,
        
      },
      branch,
      batch: parseInt(batch),
      roll_number_range: rollNumberRange,
      total_sets: numSets,  // Add total_sets field
      sets: sets,           // Use sets array instead of questions
      assigned_sets: Object.fromEntries(assignedSets),
      created_by: localStorage.getItem("teacherId"),
    };
  
    console.log("Payload:", payload);
  
    try {
      const response = await fetch('http://localhost:3001/api/quiz/save-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Backend Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Failed to save quiz.");
      }
  
      alert("Quiz saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error saving quiz: ${error.message}`);
    }
  };

  const generatePDF = () => {
    if (!currentSet) {
      alert("No set selected to generate PDF.");
      return;
    }
  
    const doc = new jsPDF();
  
    // Add exam details
    doc.text(`Exam Name: ${examName}`, 10, 10);
    doc.text(`Schedule Date: ${scheduleDate}`, 10, 20);
    doc.text(`Branch: ${branch}`, 10, 30);
    doc.text(`Batch: ${batch}`, 10, 40);
    doc.text(`Roll Number Range: ${startRollNumber}-${endRollNumber}`, 10, 50);
  
    // Add set details
    doc.text(`Set ${currentSet.id}`, 10, 60);
  
    // Prepare rows for the table
    const rows = currentSet.questions.map((q, index) => [
      index + 1, // Question number
      q.question, // Question text
      q.options.join(", "), // Options as comma-separated string
      q.correct_answer, // Correct answer
      q.difficulty, // Difficulty level
      q.marks, // Marks
    ]);
  
    // Add table to PDF
    doc.autoTable({
      head: [["#", "Question", "Options", "Answer", "Difficulty", "Marks"]],
      body: rows,
      startY: 70,
    });
  
    // Save PDF
    doc.save(`${examName}_Set_${currentSet.id}_MCQs.pdf`);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
        <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-white">MCQ Generator</h1>
          </div>

          {/* Exam Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Exam Name</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Schedule Date</label>
              <input
                type="date"
                min={today}
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Branch</option>
                <option value="IT">IT</option>
                <option value="CS">CS</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Batch</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Batch</option>
                {filteredBatches.map((batchOption) => (
                  <option key={batchOption} value={batchOption}>
                    {batchOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">ID Range</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={startRollNumber}
                  onChange={(e) => setStartRollNumber(e.target.value)}
                  placeholder="Start"
                  className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="self-center">-</span>
                <input
                  type="text"
                  value={endRollNumber}
                  onChange={(e) => setEndRollNumber(e.target.value)}
                  placeholder="End"
                  className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 pl-2">(Ex : 22IT001 - 050)</p>
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Number of Sets</label>
              <input
                type="number"
                value={numSets}
                min="1"
                onChange={(e) => setNumSets(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Question Configuration */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Easy Questions</label>
                <input
                  type="number"
                  value={easyQuestions}
                  onChange={(e) => setEasyQuestions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Medium Questions</label>
                <input
                  type="number"
                  value={mediumQuestions}
                  onChange={(e) => setMediumQuestions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Hard Questions</label>
                <input
                  type="number"
                  value={hardQuestions}
                  onChange={(e) => setHardQuestions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Negative Marks</label>
                <input
                  type="number"
                  value={negativeMarks}
                  onChange={(e) => setNegativeMarks(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Total Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <label className="block font-medium text-gray-700">Upload JSON/Excel Files:</label>
              <input
                type="file"
                accept=".json, .xlsx"
                onChange={handleFileUpload}
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 p-6">
            <button
              onClick={generateMCQs}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate MCQs
            </button>
            <button
              onClick={createTest}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Quiz
            </button>
            <button
              onClick={generatePDF}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Download PDF
            </button>
            <button
  onClick={generateExcel}
  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  Download Excel
</button>
<div className="space-y-2">
  <label className="block font-medium text-gray-700">Select Set</label>
  <select
    value={currentSet ? currentSet.id : ""}
    onChange={(e) => {
      const selectedSet = selectedSets.find(set => set.id === parseInt(e.target.value));
      setCurrentSet(selectedSet);
    }}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select a set</option>
    {selectedSets.map((set) => (
      <option key={set.id} value={set.id}>
        Set {set.id}
      </option>
    ))}
  </select>
</div>
          </div>

          {/* Display Generated Sets */}
          <div className="bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 p-4 border-b">Generated Sets</h3>
            {selectedSets.map((set) => (
              <div key={set.id} className="p-4 border-b">
                <h4 className="text-lg font-semibold mb-2">Set {set.id}</h4>
                <ul className="divide-y divide-gray-200">
                  {set.questions.map((q, index) => (
                    <li key={index} className="py-2">
                      <p className="font-medium">{q.question}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-sm text-gray-600">{q.options.join(', ')}</span>
                        <span className={`badge ${q.difficulty}`}>{q.difficulty}</span>
                        <span className="text-sm text-gray-500">{q.marks} marks</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MCQGenerator;

// // above wroking correct beffore adding set fucntonality


