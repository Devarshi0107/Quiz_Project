const express = require('express');
const { signup, login, logout } = require('../Controllers/student.controller');
const { authMiddleware } = require('../Middlewares/auth.middleware');
const router = express.Router();
const studentQuizController = require('../Controllers/student.controller');

// Student signup route
router.post('/signup', signup);

// Student login route
router.post('/login', login);

// Student logout route (use authMiddleware to protect logout)
router.post('/logout', authMiddleware, logout);

router.get('/filtered-quizzes', authMiddleware, studentQuizController.getStudentQuizzes);

router.get('/exam/:quizId', authMiddleware, studentQuizController.getExamById);

module.exports = router;
