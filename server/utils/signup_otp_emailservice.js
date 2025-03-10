const nodemailer = require('nodemailer');

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Replace with your email service
//   auth: {
//     // user: process.env.EMAIL, // Your email
    // user: 'mauryadevarshi5666@gmail.com',
    // pass: 'xugq fgwo gacs sbrh',
//     // pass: process.env.EMAIL_PASSWORD // Your email password
//   }
// });

// // Send OTP Email Function
// const sendOtpEmail = async (email, otp) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject: 'Your OTP for Signup Verification for the Quiz App',
//       text: `Your OTP is: ${otp}. It will expire in 15 minutes.`,
//     });
//     console.log(`OTP sent to ${email}`);
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//     throw new Error('Failed to send OTP email');
//   }
// };


// Create a transporter object using the default SMTP transport (you can use Gmail for testing)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Example using Gmail
    auth: {
        user: 'mauryadevarshi5666@gmail.com',
        pass: 'xugq fgwo gacs sbrh',
    }
  });
  // Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,  // Sender email address
    to: email,               // Receiver email address
    subject: 'Verify Your Email - Quizify',
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto;">
        <tr>
            <td style="text-align: center; padding: 40px 20px;">
                <div style="background-color: #5B51D8; display: inline-block; width: 50px; height: 50px; border-radius: 12px; margin-bottom: 20px;">
                    <span style="color: #ffffff; font-size: 24px; line-height: 50px;">Qf</span>
                </div>
                <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 600;">Verify Your Email</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 20px;">
                <div style="border: 1px solid #e6e6e6; border-radius: 16px; padding: 32px;">
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                        Welcome to Quizify! Use the verification code below to complete your registration.
                    </p>
                    <div style="margin: 32px 0;">
                        <div style="background: linear-gradient(135deg, #5B51D8, #8F45C7); padding: 3px; border-radius: 12px;">
                            <div style="background-color: #ffffff; padding: 24px; border-radius: 10px; text-align: center;">
                                <span style="font-size: 36px; font-weight: bold; color: #5B51D8; letter-spacing: 8px;">${otp}</span>
                            </div>
                        </div>
                    </div>
                    <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 0;">
                        This code will expire in <span style="font-weight: 600; color: #1a1a1a;">10 minutes</span>. If you didn't request this code, you can safely ignore this email.
                    </p>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 24px 20px; text-align: center;">
                <p style="color: #8c8c8c; font-size: 12px; line-height: 1.5; margin: 0;">
                    Quizify · Secure Authentication · © 2025
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};
module.exports = { sendOTPEmail  };
