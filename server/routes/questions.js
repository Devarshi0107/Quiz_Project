const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Route to add questions to the database
router.post('/add', async (req, res) => {
  try {
    const questions = req.body.questions;
    const savedQuestions = await Question.insertMany(questions);
    res.json(savedQuestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
