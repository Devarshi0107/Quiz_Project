// //comment oute d

// app.post('/api/admin/login', async (req, res) => {
//   const { username, password } = req.body;

//   const admin = await Admin.findOne({ username });

//   if (admin && bcrypt.compareSync(password, admin.password)) {
//     const token = jwt.sign({ id: admin._id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });

//     res.status(200).send({
//       message: 'Login successful',
//       token: token ,// Return the JWT token in the response,
//       role : 'admin'
      
//     });
//   } else {
//     res.status(401).send({ error: 'Invalid username or password' });
//   }
// });

// // Updated Admin Password Change Endpoint
// app.post('/api/admin/change-password', async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   if (!oldPassword || !newPassword) {
//     return res.status(400).send({ error: 'Old and new passwords are required' });
//   }

//   try {
//     const admin = await Admin.findOne({ username: adminUsername });

//     if (!admin) {
//       return res.status(404).send({ error: 'Admin user not found' });
//     }

//     const isMatch = bcrypt.compareSync(oldPassword, admin.password);
//     if (!isMatch) {
//       return res.status(401).send({ error: 'Old password is incorrect' });
//     }

//     admin.password = bcrypt.hashSync(newPassword, 10);
//     await admin.save();
//     res.status(200).send({ message: 'Password changed successfully' });

//   } catch (error) {
//     console.error('Error while changing password:', error);
//     res.status(500).send({ error: 'An error occurred while changing the password' });
//   }
// });


// module.exports = { signup, login, logout };