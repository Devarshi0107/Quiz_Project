// utils/emailService.js
const nodemailer = require('nodemailer');

const adminsendEmail = (recipientEmail, teacherName, password) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mauryadevarshi5666@gmail.com', // Your actual Gmail address
      pass: 'xugq fgwo gacs sbrh',  // Your actual Gmail password
    },
  });

  const mailOptions = {
    from: 'mauryadevarshi5666@gmail.com', // Your actual Gmail address
    to: recipientEmail,
    subject: 'Teacher Account Created For Online Quiz Platform',
    text: `Hello ${teacherName},\n\nYour account has been created.\nYour temporary password is: ${password}\nPlease log in and change your password.\n\nRegards,\nAdmin Team`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { adminsendEmail };
