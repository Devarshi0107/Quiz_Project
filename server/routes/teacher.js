  const express = require('express');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const Teacher = require('../models/Teacher');
  const router = express.Router();
  // const { saveQuiz } = require('../Controllers/teacher.controller'); // Import controller
  const quizController = require('../Controllers/teacher.controller');
  const authenticateTeacher = require('../Middlewares/teacher_auth');
  // JWT Secret key
  const JWT_SECRET = 'UGSFPROJECTDEVARSHIIT2274'; // Use a strong secret and store it securely

  // Teacher login route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the teacher by email
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ id: teacher._id,teacherID :teacher.teacherId, email: teacher.email ,role: teacher.role }, JWT_SECRET, {
        expiresIn: '1h', // Token valid for 1 hour
      });

      // Send token to the client
      res.json({ message: 'Login  successful', token ,role: 'teacher'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/', async (req, res) => {
      try {
        // Use .select to limit the fields returned by the query
        const teachers = await Teacher.find().select('teacherName email branch'); // Only get teacherName, email, and branch
        res.json(teachers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // POST route for changing password
    // POST route for changing password
router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from header

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    const teacher = await Teacher.findById(decoded.id); // Find teacher by ID

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password and update it
    teacher.password = await bcrypt.hash(newPassword, 10);
    await teacher.save(); // Save changes to the database

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  // router.post('/save-quiz', saveQuiz);
  // Route to save a quiz
  router.post('/save-quiz', authenticateTeacher, quizController.saveQuiz);

  // Route to get quizzes created by the logged-in teacher
  router.get('/my-quizzes', authenticateTeacher, quizController.getMyQuizzes);
  //route to get all the quizzes only for the teacher token now
  router.get('/quizzes', authenticateTeacher, quizController.getAllQuizzes);

    module.exports = router;
    