

//above correct work ntil dulicate emai and phoen
//bficng above 

const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const router = express.Router();
const { adminsendEmail } = require('../utils/admin_emailService'); // Import the email sending function
const Teacher = require('../models/Teacher'); // Import your Teacher model


async function generateUniqueTeacherId() {
  let isUnique = false;
  let teacherId;

  while (!isUnique) {
    // Generate a random 6-digit number
    teacherId = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if the ID already exists in the database
    const existingTeacher = await Teacher.findOne({ teacherId });
    if (!existingTeacher) {
      isUnique = true; // ID is unique
    }
  }

  return teacherId;
}
// POST route to handle teacher credential creation and send email
router.post('/create', async (req, res) => {
  const { teacherName, email, phoneNumber, branch } = req.body;
  const randomPassword = generateRandomPassword(); // Ensure this function is defined to generate a random password

  try {
    // Check for existing email
    const existingEmail = await Teacher.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Check for existing phone number
    const existingPhone = await Teacher.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone number already registered.' });
    }

    const teacherId = await generateUniqueTeacherId();

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(randomPassword, 10);

    // Save the teacher in the database
    const newTeacher = new Teacher({
      teacherId, // Add the unique teacher ID
      teacherName,
      email,
      phoneNumber,
      branch,
      password: hashedPassword, // Store the hashed password
    });

    try {
      await newTeacher.save();
      console.log('Teacher saved successfully!');
    } catch (dbSaveError) {
      console.error('Error saving teacher to the database:', dbSaveError);
      return res.status(500).json({ message: 'Error saving teacher to the database.' });
    }

    // Send email to the teacher
    try {
      await adminsendEmail(email, teacherName, randomPassword); // Send plain-text password for initial login
      console.log('Email sent successfully!');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ message: 'Error sending email.' });
    }

    res.status(200).json({ message: 'Teacher created and email sent successfully!' });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Unexpected server error.' });
  }
});

// Function to generate a random password (modify as per your requirements)
function generateRandomPassword(length = 10) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

module.exports = router;
