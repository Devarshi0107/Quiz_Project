//this will replace unstructure code at server.js : 53

// // Quiz Schema
// const quizSchema = new mongoose.Schema({
//   filename: String,
//   timestamp: Date,
//   exam_name: { type: String, required: true },
//   schedule_date: { type: Date, required: true },
//   schedule_time_range: { type: String, required: true },
//   branch: { type: String, required: true },
//   batch: { type: String, required: true },
//   roll_number_range: { type: String, required: true },
//   questions: Array,
// });

// const Quiz = mongoose.model('mcq_exam_data', quizSchema);


//----------updated one for scheduling time acorrectky workd on 25th dec yet to apply -----------



// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//   filename: String, // Optional: File associated with the exam
//   timestamp: { type: Date, default: Date.now }, // Automatically captures the creation timestamp
//   exam_name: { type: String, required: true }, // Name of the exam
//   schedule_date: { type: Date, required: true }, // Date of the exam
//   schedule_time_range: { 
//     startTime: { type: String, required: true }, // Start time of the exam (HH:mm format)
//     endTime: { type: String, required: true } // End time of the exam (HH:mm format)
//   },
//   branch: { type: String, required: true }, // Branch for which the exam is targeted
//   batch: { type: String, required: true }, // Batch for which the exam is targeted
//   roll_number_range: { 
//     startRoll: { type: String, required: true }, // Starting roll number
//     endRoll: { type: String, required: true } // Ending roll number
//   },
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Array of question references
//   duration: { type: Number, required: true }, // Duration of the exam in minutes
//   isPublished: { type: Boolean, default: false }, // Indicates if the exam is published
//   status: { 
//     type: String, 
//     enum: ['scheduled', 'ongoing', 'completed'], 
//     default: 'scheduled' 
//   }, // Tracks the status of the exam
//   maxMarks: { type: Number, required: true }, // Maximum marks for the exam
// });

// const Quiz = mongoose.model('Quiz', quizSchema);

// module.exports = Quiz;


// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//   filename: String,
//   timestamp: { type: Date, default: Date.now },
//   exam_name: { type: String, required: true },
//   schedule_date: { type: Date, required: true },
//   schedule_time_range: { type: String, required: true },
//   branch: { type: String, required: true },
//   batch: { type: String, required: true },
//   roll_number_range: { type: String, required: true },
//   questions: Array,
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers', required: true }, // Link to teacher
// });

// const Quiz = mongoose.model('Quiz', quizSchema);

// module.exports = Quiz; // ✅ Export the model


const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  exam_name: { type: String, required: true },
  schedule_date: { type: Date, required: true },
  schedule_time_range: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  branch: { type: String, required: true },
  batch: { type: Number, required: true },
  roll_number_range: { type: String, required: true },
  questions: [
    {
      question_text: { type: String, required: true },
      options: [{ type: String, required: true }],
      correct_option: { type: Number, required: true },
      marks: { type: Number, required: true },
      difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
      negative_marking: { type: Number, default: 0 } // Negative marks deducted for wrong answers
    }
  ],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true } // Ensure ObjectId

, // Ensure ObjectId
total_sets: { type: Number, required: true },
sets: [
  {
    set_number: { type: Number, required: true },
    questions: [
      {
        question_text: { type: String, required: true },
        options: [{ type: String, required: true }],
        correct_option: { type: Number, required: true },
        marks: { type: Number, required: true },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
      }
    ]
  }
],
assigned_sets: {
  type: Map,
  of: Number,
  required: true
}
});

module.exports = mongoose.model('Quiz', QuizSchema);
