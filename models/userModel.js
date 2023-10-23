const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['recruiter', 'jobseeker'],
    required : true,
  },
  resume: {
    type: String,
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const User = mongoose.model('User', userSchema);


module.exports = User
