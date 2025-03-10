// routes/admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const router = express.Router();

// Predefined credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Middleware to create admin if it doesn't exist
const createAdminIfNotExists = async (req, res, next) => {
  const adminExists = await Admin.findOne({ username: ADMIN_USERNAME });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await new Admin({ username: ADMIN_USERNAME, password: hashedPassword }).save();
  }
  next();
};

router.use(createAdminIfNotExists);

// Login Route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const admin = await Admin.findOne({ username });
//   if (!admin) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   res.json({ message: 'Login successful' ,token ,role: 'admin'});
// });

// Change Password Route
router.put('/change-password', async (req, res) => {
  const { newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await Admin.updateOne({ username: ADMIN_USERNAME }, { password: hashedPassword });

  res.json({ message: 'Password changed successfully' });
});

module.exports = router;
