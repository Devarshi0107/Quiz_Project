const Quiz = require('../models/Quiz.models');
const Teacher = require('../models/Teacher');


// exports.saveQuiz = async (req, res) => {
//   try {
//     const { filename, exam_name, schedule_date, schedule_time_range, branch, batch, roll_number_range, questions } = req.body;

//     // 🔹 Find the teacher's ObjectId using the six-digit teacher_id from JWT
//    //fixed teacger null due to _id instead another
//     const teacher = await Teacher.findOne({ _id: req.teacherId });
//     // console.log("teacher is ",teacher)
//     // const teacher = await Teacher.findOne({ teacher_id: req.teacherId });
// //      console.log("teacher id is : ",req.teacherId)
// // console.log("Database Query Result: ", teacher);
// // console.log("Request Teacher ID: ", req.teacherId);
// // console.log("All Teachers: ", await Teacher.find()); // Check if the teacher exists
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     const newQuiz = new Quiz({
//       filename,
//       exam_name,
//       schedule_date,
//       schedule_time_range,
//       branch,
//       batch,
//       roll_number_range,
//       questions,
//       created_by: teacher._id // 🔹 Save MongoDB ObjectId
//     });

//     await newQuiz.save();
//     res.status(201).json({ message: 'Quiz saved successfully' });

//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save quiz', details: error.message });
//   }
// };

//above before the saving wiht the set

const mongoose = require("mongoose");


// exports.saveQuiz = async (req, res) => {
//   try {
//     const { 
//       filename, 
//       exam_name, 
//       schedule_date, 
//       schedule_time_range, 
//       branch, 
//       batch, 
//       roll_number_range, 
//       questions 
//     } = req.body;

//     // Retrieve the teacher from the database using req.teacherId (set by your auth middleware)
//     const teacher = await Teacher.findOne({ _id: req.teacherId });
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     const newQuiz = new Quiz({
//       filename,
//       exam_name,
//       schedule_date,
//       schedule_time_range,
//       branch,
//       batch,
//       roll_number_range,
//       questions,
//       created_by: teacher._id // Save the teacher's ObjectId as created_by
//     });

//     await newQuiz.save();
//     res.status(201).json({ message: 'Quiz saved successfully', quiz: newQuiz });
//   } catch (error) {
//     console.error("Error saving quiz:", error);
//     res.status(500).json({ error: 'Failed to save quiz', details: error.message });
//   }
// };

exports.saveQuiz = async (req, res) => {
  try {
    const { 
      filename, 
      exam_name, 
      schedule_date, 
      schedule_time_range, 
      branch, 
      batch, 
      roll_number_range, 
      total_sets, 
      sets 
    } = req.body;

    // Validate required fields
    if (!filename || !exam_name || !schedule_date || !schedule_time_range || 
        !branch || !batch || !roll_number_range || !total_sets || !sets) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Generate assigned_sets map from the roll number range and total_sets
    const [startRoll, endRoll] = roll_number_range.split('-');
    const rollPrefix = startRoll.slice(0, 4);
    const startNum = parseInt(startRoll.slice(4));
    const endNum = parseInt(endRoll.slice(4));
    const totalStudents = endNum - startNum + 1;
    console.log(roll_number_range);
    console.log(rollPrefix);
    console.log(startNum);
    console.log(endNum);
    const assigned_sets = new Map();
    for (let i = 0; i < totalStudents; i++) {
      const rollNo = `${rollPrefix}${String(startNum + i).padStart(3, '0')}`;
      const setNumber = (i % total_sets) + 1;
      assigned_sets.set(rollNo, setNumber);
    }

    // Retrieve the teacher from the database using req.teacherId (set by your auth middleware)
    const teacher = await Teacher.findOne({ _id: req.teacherId });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Create the new Quiz document
    const newQuiz = new Quiz({
      filename,
      exam_name,
      schedule_date,
      schedule_time_range,
      branch,
      batch,
      roll_number_range,
      total_sets,
      sets,
      assigned_sets: Object.fromEntries(assigned_sets),
      created_by: teacher._id  // Use the teacher's ObjectId
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).json({ error: "Failed to save quiz", details: error.message });
  }
};
exports.getMyQuizzes = async (req, res) => {
  try {
    // Log the teacher id attached by the middleware
    console.log("Teacher id is:", req.teacherId);
    // Query quizzes where created_by matches the teacher id from the token
    const quizzes = await Quiz.find({ created_by: req.teacherId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes', details: error.message });
  }
};


exports.getAllQuizzes = async (req, res) => {
  try {
    // Retrieve all quizzes from the database
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: 'Failed to fetch quizzes', details: error.message });
  }
};