
const Quiz = require('../models/Quiz.models');
const StudentQuizAttempt = require('../models/StudentQuizAttemptSchema.model');
const Leaderboard = require('../models/LeaderboardSchema.model');
const Student = require('../models/student.model');
const mongoose = require("mongoose");

// Periodic Auto-Save Exam Progress

// Auto-save exam responses, including "flagged" status


exports.autosaveExam = async (req, res) => {
    try {
      const { student, quiz, responses } = req.body;
  
      // Validate input: student, quiz, and responses array must be provided.
      if (!student || !quiz || !responses || !Array.isArray(responses)) {
        return res.status(400).json({ message: "Student ID, Quiz ID, and valid responses array are required" });
      }
  
      // Validate that student and quiz IDs are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(student)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }
      if (!mongoose.Types.ObjectId.isValid(quiz)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }
  
      // Retrieve student details (select rollNo)
      const studentData = await Student.findById(student).select('rollNo');
      if (!studentData) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Retrieve quiz details with sets and assigned_sets (using lean() so that assigned_sets is a plain object)
      const quizData = await Quiz.findById(quiz)
        .select('sets assigned_sets')
        .lean();
      if (!quizData) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      // Use the student's rollNo as stored (e.g., "22IT074")
      const formattedRoll = studentData.rollNo;
      
      // Retrieve assigned set using bracket notation (because assigned_sets is now a plain object)
      const assignedSet = quizData.assigned_sets[formattedRoll];
      if (!assignedSet) {
        return res.status(403).json({ message: "No set assigned for this student" });
      }
  
      // Retrieve the questions for the assigned set from quizData.sets
      const assignedSetObj = quizData.sets.find(s => s.set_number === assignedSet);
      if (!assignedSetObj) {
        return res.status(404).json({ message: `Set number ${assignedSet} not found in quiz` });
      }
      const assignedSetQuestions = assignedSetObj.questions || [];
      const validQuestionIds = new Set(assignedSetQuestions.map(q => q._id.toString()));
  
      // Check if exam was already submitted
      const existingSubmittedAttempt = await StudentQuizAttempt.findOne({ student, quiz, submitted: true });
      if (existingSubmittedAttempt) {
        return res.status(400).json({ message: 'Exam already submitted!' });
      }
  
      // Find or create the student's quiz attempt
      let attempt = await StudentQuizAttempt.findOne({ student, quiz });
      if (!attempt) {
        attempt = new StudentQuizAttempt({ 
          student, 
          quiz, 
          assigned_set: assignedSet,
          responses: [] 
        });
      } else {
        // Optionally, remove any responses missing question_id
        if (attempt.responses && attempt.responses.length) {
          attempt.responses = attempt.responses.filter(r => r.question_id);
        }
      }
  
      // Process each new response
      for (const newResponse of responses) {
        // Defensive check: Ensure newResponse has a valid question_id
        if (!newResponse.question_id) {
          console.error("Missing question_id in newResponse:", newResponse);
          return res.status(400).json({ message: "Each response must include a valid question_id" });
        }
        
        let questionId;
        try {
          questionId = new mongoose.Types.ObjectId(newResponse.question_id);
        } catch (err) {
          console.error("Invalid question_id format:", newResponse.question_id);
          return res.status(400).json({ message: "Invalid question_id format" });
        }
  
        // Validate that this questionId is within the assigned set's questions
        if (!validQuestionIds.has(questionId.toString())) {
          return res.status(403).json({ 
            message: `Question ${questionId.toString()} is not in the assigned set ${assignedSet}`
          });
        }
  
        // Find existing response using ObjectId comparison
        const existingIndex = attempt.responses.findIndex(r => {
          if (!r.question_id) {
            console.error("Existing response missing question_id:", r);
            return false;
          }
          return r.question_id.toString() === questionId.toString();
        });
  
        if (existingIndex > -1) {
          // Update existing response, ensuring we explicitly set question_id
          attempt.responses[existingIndex] = {
            question_id: questionId,
            selected_option: newResponse.selected_option,
            status: newResponse.status || (newResponse.selected_option !== null ? 'answered' : 'not-visited'),
            is_correct: newResponse.is_correct || false,
            set_number: assignedSet
          };
        } else {
          // Add new response with the assigned set number
          attempt.responses.push({
            question_id: questionId, // Store as ObjectId
            selected_option: newResponse.selected_option,
            status: newResponse.status || (newResponse.selected_option !== null ? 'answered' : 'not-visited'),
            is_correct: newResponse.is_correct || false,
            set_number: assignedSet
          });
        }
      }
  
      await attempt.save();
      return res.status(200).json({ 
        message: "Responses auto-saved successfully", 
        attempt: {
          _id: attempt._id,
          assigned_set: attempt.assigned_set,
          response_count: attempt.responses.length
        }
      });
    } catch (error) {
      console.error("Auto-save error:", error);
      return res.status(500).json({ 
        message: error.message.startsWith('Question') ? error.message : "Internal server error during auto-save" 
      });
    }
  };
const updateLeaderboard = async (quizId, studentId, score) => {
    try {
      // Find the student's rollNo
      const student = await Student.findById(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
  
      // Find or create the leaderboard for the quiz
      let leaderboard = await Leaderboard.findOne({ quiz: quizId });
  
      if (!leaderboard) {
        // Create a new leaderboard if it doesn't exist
        leaderboard = new Leaderboard({
          quiz: quizId,
          rankings: [],
        });
      }
  
      // Check if the student already exists in the rankings
      const existingRankingIndex = leaderboard.rankings.findIndex(
        (ranking) => ranking.student.toString() === studentId.toString()
      );
  
      if (existingRankingIndex !== -1) {
        // Update the student's score if they already exist in the rankings
        leaderboard.rankings[existingRankingIndex].score = score;
      } else {
        // Add the student to the rankings if they don't exist
        leaderboard.rankings.push({
          student: studentId,
          rollNo: student.rollNo, // Use rollNo as the name
          score: score,
        });
      }
  
      // Sort rankings by score in descending order
      leaderboard.rankings.sort((a, b) => b.score - a.score);
  
      // Update the timestamp
      leaderboard.updated_at = Date.now();
  
      // Save the leaderboard
      await leaderboard.save();
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      throw error;
    }
  };
exports.checkSubmission = async (req, res) => {
    try {
      const { student, quiz } = req.query;
  
      // Check if the exam has been submitted
      const attempt = await StudentQuizAttempt.findOne({ student, quiz, submitted: true });
      if (attempt) {
        return res.status(200).json({ submitted: true, message: 'This exam is already submitted.' });
      }
  
      return res.status(200).json({ submitted: false, message: 'This exam is not yet submitted.' });
    } catch (error) {
      console.error('Check Submission Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



exports.submitExam = async (req, res) => {
  try {
    // Extract student, quiz, and responses from the request body
    const { student, quiz, responses } = req.body;

    // Validate required fields
    if (!student || !quiz || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: 'Student ID, Quiz ID, and valid responses array are required!' });
    }

    // Check if the exam has already been submitted
    const existingAttempt = await StudentQuizAttempt.findOne({ student, quiz, submitted: true });
    if (existingAttempt) {
      return res.status(400).json({ message: 'Exam already submitted!' });
    }

    // Retrieve the student's saved attempt (should exist due to autosave)
    let attempt = await StudentQuizAttempt.findOne({ student, quiz });
    if (!attempt) {
      return res.status(400).json({ message: 'No saved attempt found!' });
    }

    // Retrieve student details to get roll number
    const studentData = await Student.findById(student).select('rollNo');
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Retrieve quiz details with sets and assigned_sets using lean() 
    // (assigned_sets becomes a plain object when using lean())
    const quizData = await Quiz.findById(quiz)
      .select('sets assigned_sets')
      .lean();
    if (!quizData) {
      return res.status(404).json({ message: 'Quiz not found!' });
    }

    // Use the student's rollNo (e.g., "22IT074")
    const formattedRoll = studentData.rollNo;
    
    // Get the assigned set for this student from the plain object (bracket notation)
    const assignedSet = quizData.assigned_sets[formattedRoll];
    if (!assignedSet) {
      return res.status(403).json({ message: "No set assigned for this student" });
    }

    // Find the set object for the assigned set number
    const assignedSetObj = quizData.sets.find(s => s.set_number === assignedSet);
    if (!assignedSetObj) {
      return res.status(404).json({ message: `Assigned set ${assignedSet} not found in quiz` });
    }
    const assignedSetQuestions = assignedSetObj.questions || [];
    // Build a set of valid question IDs (as strings)
    const validQuestionIds = new Set(assignedSetQuestions.map(q => q._id.toString()));

    let score = 0;
    let totalMarks = 0;

    // Process each response from the client
    attempt.responses = responses.map(response => {
      // Ensure each response includes a question_id
      if (!response.question_id) {
        console.error("Missing question_id in response:", response);
        return response;
      }
      // Find the corresponding question in the assigned set's questions
      const question = assignedSetQuestions.find(q => 
        q._id.toString() === response.question_id.toString()
      );
      if (!question) {
        console.error(`Question ${response.question_id} not found in assigned set ${assignedSet}`);
        return response;
      }

      totalMarks += question.marks; // Sum the marks

      if (response.selected_option === question.correct_option) {
        score += question.marks;
        response.is_correct = true;
      } else {
        // Deduct negative marking if defined; default to 0 if not
        score -= question.negative_marking || 0;
        response.is_correct = false;
      }

      // Add the assigned set number to the response for record
      response.set_number = assignedSet;
      return response;
    });

    attempt.score = score;
    attempt.total_marks = totalMarks;
    attempt.submitted = true;
    attempt.submitted_at = new Date();

    await attempt.save();
    // Update leaderboard if applicable
    await updateLeaderboard(quiz, student, score);

    res.status(200).json({
      message: 'Exam submitted successfully!',
      score,
      totalMarks
    });
  } catch (error) {
    console.error('Submit Exam Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Retrieve quiz attempts for a student
exports.getLastAttempt = async (req, res) => {
    try {
        const { student, quiz } = req.query;

        if (!student || !quiz) {
            return res.status(400).json({ message: "Student ID and Quiz ID are required" });
        }

        const attempt = await StudentQuizAttempt.findOne({ student, quiz });

        if (!attempt) {
            return res.status(404).json({ message: "No saved attempt found" });
        }

        return res.status(200).json({ message: "Attempt found", attempt });
    } catch (error) {
        console.error("Error fetching attempt:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAttendedExam = async (req, res) => {
    try {
        const { student } = req.query;

        if (!student) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const attempts = await StudentQuizAttempt.find({ student });

        if (!attempts.length) {
            return res.status(404).json({ message: "No exam attempts found for this student." });
        }

        return res.status(200).json({ message: "Attempts found", results: attempts });
    } catch (error) {
        console.error("Error fetching student marks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
