const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth.controller');
const { authMiddleware } = require('../Middlewares/auth.middleware');

// Signup route
// router.post('/signup', authController.signUp);
// Login route
router.post('/login', authController.login);
// Logout route
router.post('/logout', authMiddleware, authController.logout); // Apply authMiddleware
router.post('/send-otp', authController.sendOTP);
// router.post('/verify-otp', authController.verifyOTP);
router.post('/verifyAndSignUp', authController.verifyAndSignUp);


module.exports = router;
