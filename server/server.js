

//-********in above changepasword pai problemm correcting :

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords
require('dotenv').config(); // Load environment variables
const teacherRoutes = require('./routes/teacher'); // Adjust the path if necessary

const app = express();
const jwt = require('jsonwebtoken'); // Make sure you have this at the top
const SECRET_KEY = "UGSFPROJECTDEVARSHIIT2274"; // Use a secret key for signing the token
const credentialsRoute = require('./routes/teacher_credentials');

const studentRoutes = require('./routes/student.route');
const authRoutes = require('./routes/auth.route'); 
const quizRoutes = require('./routes/teacher'); // Import quiz routes
const student_quiz_route = require('./routes/student_quiz.route');
const leaderboardroute = require('./routes/leaderboard.route');
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB



mongoose.connect('mongodb+srv://22it074:sUbYLPvGYz2iS8hC@mcq-app.b0lia.mongodb.net/?retryWrites=true&w=majority&appName=mcq-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Predefined admin credentials
const adminUsername = process.env.ADMIN_USERNAME || 'admin'; // Get from environment variable or default
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Get from environment variable or default

// Hash and save the predefined admin password
const hashedPassword = bcrypt.hashSync(adminPassword, 10);
Admin.findOne({ username: adminUsername }).then(async (admin) => {
  if (!admin) {
    await new Admin({ username: adminUsername, password: hashedPassword }).save();
    console.log('Predefined admin credentials created.');
  } else {
    console.log('Predefined admin credentials already exist.');
  }
});

// Updated Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && bcrypt.compareSync(password, admin.password)) {
    const token = jwt.sign({ id: admin._id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).send({
      message: 'Login successful',
      token: token ,// Return the JWT token in the response,
      role : 'admin'
      
    });
  } else {
    res.status(401).send({ error: 'Invalid username or password' });
  }
});

// Updated Admin Password Change Endpoint
app.post('/api/admin/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).send({ error: 'Old and new passwords are required' });
  }

  try {
    const admin = await Admin.findOne({ username: adminUsername });

    if (!admin) {
      return res.status(404).send({ error: 'Admin user not found' });
    }

    const isMatch = bcrypt.compareSync(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Old password is incorrect' });
    }

    admin.password = bcrypt.hashSync(newPassword, 10);
    await admin.save();
    res.status(200).send({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Error while changing password:', error);
    res.status(500).send({ error: 'An error occurred while changing the password' });
  }
});



// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});




// const scheduleAutoSubmit = async (student, quiz, endTime) => {
//   const now = new Date();
//   const timeRemaining = new Date(endTime) - now;

//   console.log(`Exam Start Time: ${now}`);
//   console.log(`Student ID: ${student}`);
//   console.log(`Quiz ID: ${quiz}`);
//   console.log(`Scheduled Auto-Submit Time: ${endTime}`);

//   if (timeRemaining > 0) {
//       setTimeout(async () => {
//           console.log(`Auto-submitting exam for Student ${student}...`);

//           // Call the submit API internally after time is up
//           await axios.post("http://localhost:3001/api/student-quiz/submit-exam", { student, quiz });
//       }, timeRemaining);
//   } else {
//       console.log(`The end time has already passed. The auto-submit cannot be scheduled.`);
//   }
// };

// app.post('/api/student-quiz/start-exam', async (req, res) => {
//   try {
//     // Assuming student is authenticated and you have the student ID and quiz ID in the request body
//     const { student, quiz, endTime } = req.body;
  
//     // For debugging purposes
//     console.log(`Starting exam for Student ID: ${student}`);
//     console.log(`Quiz ID: ${quiz}`);
//     console.log(`Starting Time: ${new Date()}`);
//     console.log(`Ending Time: ${endTime}`);

//     // Schedule the auto-submit functionality
//     scheduleAutoSubmit(student, quiz, endTime);
  
//     res.json({ message: 'Exam started. Auto-submit scheduled!' });
//   } catch (error) {
//     console.error('Error starting exam:', error);
//     res.status(500).json({ error: 'Something went wrong. Please try again.' });
//   }
// });

//before oing conosle log on succesful exma submit or not

const axios = require('axios');

// Function to schedule auto-submit at the exam end time
const scheduleAutoSubmit = async (student, quiz, endTime) => {
  const now = new Date();
  const timeRemaining = new Date(endTime) - now;

  console.log(`Exam Start Time: ${now}`);
  console.log(`Student ID: ${student}`);
  console.log(`Quiz ID: ${quiz}`);
  console.log(`Scheduled Auto-Submit Time: ${endTime}`);
  console.log(`Time remaining (ms): ${timeRemaining}`);

  if (timeRemaining > 0) {
      setTimeout(async () => {
          console.log(`Auto-submitting exam for Student ${student} on Quiz ${quiz}...`);
          try {
              // Call the submit API internally after time is up
              const response = await axios.post("http://localhost:3001/api/student-quiz/submit-exam", { student, quiz });
              console.log(`Auto-submit completed successfully for Student ${student} on Quiz ${quiz}.`);
          } catch (error) {
              console.error(`Auto-submit failed for Student ${student} on Quiz ${quiz}:`, error);
          }
      }, timeRemaining);
  } else {
      console.log(`The end time has already passed. The auto-submit cannot be scheduled.`);
  }
};

// Route to start the exam and schedule auto-submit
app.post('/api/student-quiz/start-exam', async (req, res) => {
  try {
    // Assuming student is authenticated and you have the student ID, quiz ID, and endTime in the request body
    const { student, quiz, endTime } = req.body;
  
    // Debug logs
    console.log(`Starting exam for Student ID: ${student}`);
    console.log(`Quiz ID: ${quiz}`);
    console.log(`Starting Time: ${new Date()}`);
    console.log(`Ending Time: ${endTime}`);

    // Schedule the auto-submit functionality
    scheduleAutoSubmit(student, quiz, endTime);
  
    res.json({ message: 'Exam started. Auto-submit scheduled!' });
  } catch (error) {
    console.error('Error starting exam:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});


//before adding the live count down 

// const axios = require('axios'); // Import axios at the top of your file

// const scheduleAutoSubmit = async (student, quiz, endTime) => {
//   const endDate = new Date(endTime);

//   // Function to call the submit API after the exam ends
//   const submitExam = async (student, quiz) => {
//     try {
//       // Make the POST request to submit the exam
//       await axios.post("http://localhost:3001/api/student-quiz/submit-exam", { student, quiz });
//       console.log(`Exam submitted for Student ${student}.`);
//     } catch (error) {
//       console.error('Error submitting exam:', error);
//     }
//   };

//   const updateRemainingTime = () => {
//     const now = new Date();
//     const timeRemaining = endDate - now;
//     const minutes = Math.floor(timeRemaining / 1000 / 60);
//     const seconds = Math.floor((timeRemaining / 1000) % 60);
    
//     // Display time remaining every 5 seconds
//     // console.log(`Time Remaining: ${minutes} minutes and ${seconds} seconds`);
    
//     // If time has run out, submit the exam
//     if (timeRemaining <= 0) {
//       console.log(`Auto-submitting exam for Student ${student}...`);
//       clearInterval(timeInterval); // Clear the interval
//       submitExam(student, quiz);
//     }
//   };

//   // Display initial exam info
//   const now = new Date();
//   console.log(`Exam Start Time: ${now}`);
//   console.log(`Student ID: ${student}`);
//   console.log(`Quiz ID: ${quiz}`);
//   console.log(`Scheduled Auto-Submit Time: ${endTime}`);

//   // Set an interval to log the remaining time every 5 seconds
//   const timeInterval = setInterval(updateRemainingTime, 5000);

//   // Initial check for remaining time
//   updateRemainingTime();
// };

// app.post('/api/student-quiz/start-exam', async (req, res) => {
//   try {
//     // Assuming student is authenticated and you have the student ID and quiz ID in the request body
//     const { student, quiz, endTime } = req.body;
  
//     // For debugging purposes
//     console.log(`Starting exam for Student ID: ${student}`);
//     console.log(`Quiz ID: ${quiz}`);
//     console.log(`Starting Time: ${new Date()}`);
//     console.log(`Ending Time: ${endTime}`);
  
//     // Schedule the auto-submit functionality
//     scheduleAutoSubmit(student, quiz, endTime);
  
//     res.json({ message: 'Exam started. Auto-submit scheduled!' });
//   } catch (error) {
//     console.error('Error starting exam:', error);
//     res.status(500).json({ error: 'Something went wrong. Please try again.' });
//   }
// });















app.use('/api/teacher/credentials', credentialsRoute);

app.use('/api/allteachers', teacherRoutes);
//TEACHER LOGIN API
app.use('/api/teacher', teacherRoutes);


// app.use('/api/teacher/change-password', teacherRoutes);


// Routes
app.use('/api/students', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
});

app.use('/api/auth', authRoutes);

app.use('/api/quiz', quizRoutes);

app.use('/api/student-quiz', student_quiz_route);

app.use('/api/leaderboard', leaderboardroute);

