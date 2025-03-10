const Leaderboard = require('../models/LeaderboardSchema.model');
const StudentQuizAttempt = require('../models/StudentQuizAttemptSchema.model');
const Student = require('../models/student.model');
const mongoose = require("mongoose");
// Function to update leaderboard when an exam is submitted


exports.getLeaderboard = async (req, res) => {
    let { quizId } = req.params;
    
    console.log("from the backend quizId is : ",quizId)
    try {
      // Find the leaderboard for the quiz
    //   quizId = new mongoose.Types.ObjectId(quizId);

      const leaderboard = await Leaderboard.findOne({ quiz: quizId })
        .populate('rankings.student', 'name') // Populate student details if needed
        .exec();
    console.log("in backend leaderboard data is: ",leaderboard)
      if (!leaderboard) {
        return res.status(404).json({ message: 'Leaderboard not found for this quiz' });
      }
  
      res.status(200).json({ leaderboard });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message });
    }
  };
  