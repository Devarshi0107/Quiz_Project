const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, unique: true, required: true }, // Unique teacher ID
  teacherName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique if needed
  phoneNumber: { type: String, required: true },
  branch: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, default: "teacher" }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
