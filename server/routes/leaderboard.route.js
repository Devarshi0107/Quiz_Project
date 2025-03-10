const express = require('express');

const router = express.Router();
const {getLeaderboard} = require('../Controllers/leaderboard.controller');

router.get('/getleaderboard/:quizId', getLeaderboard);

module.exports = router;