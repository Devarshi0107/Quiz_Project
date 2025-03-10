const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    // console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
//   console.log("secret key fron the process env is : " , process.env.SECRET_KEY)
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);
    // Check if the role is teacher
    if (decoded.role !== "teacher") {
      return res.status(403).json({ error: 'Access denied. Not authorized as teacher.' });
    }
   // Attach the teacher's ObjectId from the token to req.teacherId
    req.teacherId = decoded.id;
    next(); // Call next() to move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' }); // Handle invalid token
  }
};

