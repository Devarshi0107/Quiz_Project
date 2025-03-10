const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Regular expression for email validation
const emailRegex = /^[0-9]{2}(CS|IT|CE)[0-9]{3}@charusat\.edu\.in$/;

// Define the schema
const studentSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true,
    match: emailRegex // Validating the email format
  },
  password: { 
    type: String, 
    required: true 
  },
  rollNo: { 
    type: String, 
    unique: true, 
    required: true 
  },
  branch: { 
    type: String, 
    enum: ['CS', 'IT', 'CE'], 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'admin'], 
    default: 'student' 
  },
  activeSession: { 
    type: String, 
    default: null // Store the active session token 
  },
  attendedExams: [{
    examId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exam' 
    },
    questions: [{
      questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question' 
      },
      answer: { 
        type: String, 
        required: true // Assuming answers are text (you can change based on MCQ option or other types)
      },
      marks: { 
        type: Number, 
        default: 0 // Marks for each question answered
      }
    }],
    totalMarks: { 
      type: Number, 
      default: 0 // Total marks for this exam
    },
    status: { 
      type: String, 
      enum: ['completed', 'ongoing'], 
      default: 'ongoing' 
    },
    assigned_set: { 
      type: Number, // Set number assigned to the student for this quiz
      default: null 
    }
  }],
  otp: { 
    type: String, 
    default: null // Stores the generated OTP
  },
  otpExpires: { 
    type: Date, 
    default: null // Stores the expiration time of the OTP
  },
}, { timestamps: true });

// Password hashing (before saving to database)
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Password should be alphanumeric and between 4 to 10 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{4,10}$/;
  if (!passwordRegex.test(this.password)) {
    return next(new Error('Password must be alphanumeric and between 4 to 10 characters.'));
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT token generation
studentSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, role: this.role, rollNo: this.rollNo };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4h' });
};

// Helper function to extract rollNo and branch from email
studentSchema.methods.extractDetailsFromEmail = function (email) {
  const emailParts = email.split('@')[0];
  const branch = emailParts.slice(2, 4); // Extract branch (IT, CS, CE)
  const rollNo = emailParts; // Roll number is the full part before '@'
  
  this.branch = branch;
  this.rollNo = rollNo;
};

// Export the model
module.exports = mongoose.model('Student', studentSchema);
