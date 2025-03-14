const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  rankings: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
      rollNo: { type: String, required: true }, // Store student name for faster queries
      score: { type: Number, required: true }
    }
  ],
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
