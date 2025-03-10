
// //aboove working ccorrect befor touching this mcq genrator for studnet
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import TeacherNavbar from './TeacherNavbar'; // Importing the teacher-specific navbar component
import TeacherSidebar from './TeacherSidebar'; // Importing the teacher-specific sidebar component
const MCQGenerator = () => {
  const [formState, setFormState] = useState({
    examDetails: {
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      branch: '',
      batch: ''
    },
    questionConfig: {
      totalMarks: '',
      easyQuestions: '',
      mediumQuestions: '',
      hardQuestions: ''
    },
    uploadedFiles: [],
    questions: [],
    selectedQuestions: []
  });

  const branches = ['IT', 'CS', 'CE'];
  const batchMapping = {
    IT: ['22IT', '23IT', '24IT'],
    CS: ['22CS', '23CS', '24CS'],
    CE: ['22CE', '23CE', '24CE']
  };

  const updateFormState = (section, field, value) => {
    setFormState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      let questions = [];

      if (file.name.endsWith('.json')) {
        // Parse JSON file
        questions = JSON.parse(data);
      } else if (file.name.endsWith('.xlsx')) {
        // Parse Excel file
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        questions = XLSX.utils.sheet_to_json(sheet);
      }

      setFormState(prev => ({
        ...prev,
        uploadedFiles: [file.name],
        questions: questions
      }));
    };

    if (file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx')) {
      reader.readAsBinaryString(file);
    }
  };

  const generateMCQs = () => {
    const { easyQuestions, mediumQuestions, hardQuestions } = formState.questionConfig;
    let { questions } = formState;

    if (!questions.length) {
      alert("Please upload a valid question file first.");
      return;
    }

    // Filter questions based on difficulty
    const easy = questions.filter(q => q.difficulty?.toLowerCase() === 'easy');
    const medium = questions.filter(q => q.difficulty?.toLowerCase() === 'medium');
    const hard = questions.filter(q => q.difficulty?.toLowerCase() === 'hard');

    // Select required number of questions
    const getRandomSubset = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);

    const selectedQuestions = [
      ...getRandomSubset(easy, parseInt(easyQuestions) || 0),
      ...getRandomSubset(medium, parseInt(mediumQuestions) || 0),
      ...getRandomSubset(hard, parseInt(hardQuestions) || 0)
    ];

    setFormState(prev => ({
      ...prev,
      selectedQuestions: selectedQuestions
    }));
  };

  // Toggle question selection
  const toggleQuestionSelection = (index) => {
    setFormState(prev => {
      const selectedQuestions = [...prev.selectedQuestions];
      selectedQuestions.splice(index, 1); // Remove question
      return { ...prev, selectedQuestions };
    });
  };

  // Save Quiz (Just logs for now)
  const saveQuiz = () => {
    console.log("Saving Quiz:", formState.selectedQuestions);
    alert("Quiz saved successfully!");
  };

  // Download Quiz as PDF
  const downloadPDF = () => {
    alert("PDF download feature to be implemented.");
  };

  
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state

  const handleMenuClick = (content) => {
    setActiveContent(content); // Set the active content
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TeacherNavbar
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        student={{ name: "John Smith" }} // Pass the student data here
        isLoggedIn={true}
        userType="teacher"
      />
      <TeacherSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />
      <main
        className={`absolute transition-all duration-200 ${
          isSidebarOpen ? "left-60" : "left-16"
        } right-0 top-20 bottom-0 px-8`}
      >
      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white">MCQ Generator</h1>
          <div className="flex space-x-2">
            {formState.uploadedFiles.length > 0 && (
              <div className="bg-white/20 text-white px-4 py-2 rounded-full">
                {formState.uploadedFiles.length} File(s) Uploaded
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column - Exam Details */}
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Exam Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Exam Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.name}
                  onChange={(e) => updateFormState('examDetails', 'name', e.target.value)}
                />
                <input 
                  type="date" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.date}
                  onChange={(e) => updateFormState('examDetails', 'date', e.target.value)}
                />
                <input 
                  type="time" 
                  placeholder="Start Time"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.startTime}
                  onChange={(e) => updateFormState('examDetails', 'startTime', e.target.value)}
                />
                <input 
                  type="time" 
                  placeholder="End Time"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.endTime}
                  onChange={(e) => updateFormState('examDetails', 'endTime', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Branch & Batch</h2>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.branch}
                  onChange={(e) => updateFormState('examDetails', 'branch', e.target.value)}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>

                <select 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.examDetails.batch}
                  onChange={(e) => updateFormState('examDetails', 'batch', e.target.value)}
                  disabled={!formState.examDetails.branch}
                >
                  <option value="">Select Batch</option>
                  {formState.examDetails.branch && 
                    batchMapping[formState.examDetails.branch].map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Question Configuration */}
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Question Configuration</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="Total Marks"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.questionConfig.totalMarks}
                  onChange={(e) => updateFormState('questionConfig', 'totalMarks', e.target.value)}
                />
                <div></div>
                <input 
                  type="number" 
                  placeholder="Easy Questions"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.questionConfig.easyQuestions}
                  onChange={(e) => updateFormState('questionConfig', 'easyQuestions', e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Medium Questions"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.questionConfig.mediumQuestions}
                  onChange={(e) => updateFormState('questionConfig', 'mediumQuestions', e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Hard Questions"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formState.questionConfig.hardQuestions}
                  onChange={(e) => updateFormState('questionConfig', 'hardQuestions', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">File Upload</h2>
              <div className="flex items-center space-x-4">
                <input 
                  type="file" 
                  multiple 
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                  onChange={handleFileUpload}
                  accept=".json, .xlsx"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={generateMCQs}
                className="flex-1 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Generate MCQs
              </button>
              <button 
                className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Save Quiz
              </button>
              <button 
                className="flex-1 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Question List */}
        <div className="bg-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Selected Questions</h2>
          <div className="space-y-3">
            {formState.selectedQuestions.map((question, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    checked 
                    className="h-5 w-5 text-indigo-600"
                  />
                  <span className="text-gray-800">{question.question}</span>
                </div>
                <span className="text-sm text-gray-500 capitalize">
                  {question.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default MCQGenerator;  

