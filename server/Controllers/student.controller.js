const Student = require('../models/student.model');

// Student signup
const signup = async (req, res) => {
  const { email, password, rollNo, branch } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists!' });
    }

    const newStudent = new Student({ email, password, rollNo, branch });
    await newStudent.save();
    
    const token = newStudent.generateAuthToken();
    newStudent.activeSession = token; // Save the generated token as active session
    await newStudent.save();

    res.status(201).json({ token, student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
};

// Student login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Invalidate previous session if it exists (single device login at a time)
    if (student.activeSession) {
      // Optional: You can revoke the old token manually here (e.g., store the token in a blacklist)
    }

    const token = student.generateAuthToken();
    student.activeSession = token; // Update the active session with new token
    await student.save();

    res.status(200).json({ token, student });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Student logout (invalidate token on client side)
const logout = async (req, res) => {
  const student = await Student.findById(req.user.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  student.activeSession = null; // Remove the active session
  await student.save();

  res.status(200).json({ message: 'Logged out successfully' });
};

const Quiz = require('../models/Quiz.models'); // Adjust path as needed
const moment = require('moment-timezone');


// const getStudentQuizzes = async (req, res) => {
//   try {
//     const { rollNo } = req.user;
//     if (!rollNo) {
//       return res.status(400).json({ error: "Student roll number not provided in token." });
//     }

//     // Get current time in IST
//     const nowIST = moment().tz("Asia/Kolkata");

//     // Fetch all quizzes for student's branch
//     const studentBranch = rollNo.substring(2, 4);
//     const quizzes = await Quiz.find({ branch: studentBranch })
//       .populate('created_by', 'name')
//       .lean();

//     // Format roll number helper
//     const formatRollNo = (roll) => {
//       const prefix = roll.slice(0, 4); // "22IT"
//       const num = parseInt(roll.slice(4)).toString().padStart(3, '0');
//       return `${prefix}${num}`; // "22IT001"
//     };

//     const eligibleQuizzes = quizzes.filter(quiz => {
//       // Batch check
//       const quizBatch = String(quiz.batch);
//       const studentBatch = rollNo.substring(0, 2);
//       if (!quizBatch.endsWith(studentBatch)) return false;

//       // Roll number range check
//       const [start, end] = quiz.roll_number_range.split('-');
//       const formattedStart = formatRollNo(start);
//       const formattedEnd = formatRollNo(end);
//       const studentNum = parseInt(formatRollNo(rollNo).slice(4));

//       return studentNum >= parseInt(formattedStart.slice(4)) && 
//              studentNum <= parseInt(formattedEnd.slice(4));
//     });

//     // Categorize quizzes with correct set assignment
//     const processQuiz = (quiz) => {
//       const formattedRoll = formatRollNo(rollNo);
//       const assignedSet = quiz.assigned_sets[formattedRoll] ?? 1; // Use formatted roll
//       const set = quiz.sets?.find(s => s.set_number === assignedSet);
      
//       return {
//         ...quiz,
//         questions: set?.questions || [],
//         assigned_set: assignedSet
//       };
//     };

//     const upcomingExams = [];
//     const ongoingExams = [];

//     eligibleQuizzes.forEach(quiz => {
//       const examStart = moment(quiz.schedule_time_range.start);
//       const examEnd = moment(quiz.schedule_time_range.end);
//       const processed = processQuiz(quiz);

//       if (nowIST.isBefore(examStart)) {
//         upcomingExams.push(processed);
//       } else if (nowIST.isBetween(examStart, examEnd)) {
//         ongoingExams.push(processed);
//       }
//     });

//     res.status(200).json({ upcomingExams, ongoingExams });
//   } catch (error) {
//     console.error("Error fetching student quizzes:", error);
//     res.status(500).json({ error: "Failed to fetch quizzes", details: error.message });
//   }
// };

//before hidng question and answer
const getStudentQuizzes = async (req, res) => {
  try {
    const { rollNo } = req.user;
    if (!rollNo) {
      return res.status(400).json({ error: "Student roll number not provided in token." });
    }

    const nowIST = moment().tz("Asia/Kolkata");

    // Fetch quizzes for student's branch
    const studentBranch = rollNo.substring(2, 4);
    const quizzes = await Quiz.find({ branch: studentBranch })
      .populate('created_by', 'name')
      .lean();

    const formatRollNo = (roll) => {
      const prefix = roll.slice(0, 4); 
      const num = parseInt(roll.slice(4)).toString().padStart(3, '0');
      return `${prefix}${num}`;
    };

    const eligibleQuizzes = quizzes.filter(quiz => {
      const quizBatch = String(quiz.batch);
      const studentBatch = rollNo.substring(0, 2);
      if (!quizBatch.endsWith(studentBatch)) return false;
      const [start, end] = quiz.roll_number_range.split('-');
      const formattedStart = formatRollNo(start);
      const formattedEnd = formatRollNo(end);
      const studentNum = parseInt(formatRollNo(rollNo).slice(4));
      return studentNum >= parseInt(formattedStart.slice(4)) && 
             studentNum <= parseInt(formattedEnd.slice(4));
    });

    const processQuiz = (quiz) => {
      const formattedRoll = formatRollNo(rollNo);
      const assignedSet = quiz.assigned_sets[formattedRoll] ?? 1;
      const setObj = quiz.sets?.find(s => s.set_number === assignedSet);
      let filteredQuestions = [];
      if (setObj && Array.isArray(setObj.questions)) {
        // Remove sensitive fields
        filteredQuestions = setObj.questions.map(q => {
          const { correct_option, ...questionWithoutAnswer } = q;
          return questionWithoutAnswer;
        });
      }
      return {
        ...quiz,
        questions: filteredQuestions,
        assigned_set: assignedSet
      };
    };

    const upcomingExams = [];
    const ongoingExams = [];

    eligibleQuizzes.forEach(quiz => {
      const examStart = moment(quiz.schedule_time_range.start);
      const examEnd = moment(quiz.schedule_time_range.end);
      const processed = processQuiz(quiz);

      if (nowIST.isBefore(examStart)) {
        // For upcoming exams, do not send questions
        upcomingExams.push({
          ...processed,
          questions: []  // Remove questions
        });
      } else if (nowIST.isBetween(examStart, examEnd)) {
        ongoingExams.push(processed);
      }
    });

    res.status(200).json({ upcomingExams, ongoingExams });
  } catch (error) {
    console.error("Error fetching student quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes", details: error.message });
  }
};


module.exports = { getStudentQuizzes };

  const getExamById = async (req, res) => {
  try {
    const quizId = req.params.quizId; // The quiz id from the URL
    const exam = await Quiz.findById(quizId);
    
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    
    // Optionally, you might want to ensure that the exam is either ongoing
    // or scheduled to start soon (depending on your business logic).
    const { rollNo } = req.user; // e.g., "22IT074"
    const studentBatchPrefix = rollNo.substring(0, 2); // "22"
    const studentBranch = rollNo.substring(2, 4);        // "IT"
    
    // Check that the exam's branch and batch match the student's details.
    // For instance, if exam.batch is 2022, then String(exam.batch).slice(-2) should equal "22".
    if (String(exam.batch).slice(-2) !== studentBatchPrefix || exam.branch !== studentBranch) {
      return res.status(403).json({ error: "You are not authorized to access this exam." });
    }
    
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam details", details: error.message });
  }
};

module.exports = { signup, login, logout, getStudentQuizzes ,getExamById };

// npm install moment-timezone
