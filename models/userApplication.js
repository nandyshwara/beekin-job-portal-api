const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['submitted', 'in review', 'rejected', 'hired'],
    default: 'submitted',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  currentSalary: {
    type : Number,
    required : true
  },
  ExpectedSalary: {
    type : Number,
    required : true
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
