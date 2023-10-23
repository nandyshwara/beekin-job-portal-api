const Job = require('../models/jobSchema');
const Application = require('../models/userApplication');
const User = require('../models/userModel');

const applyForJob = async (req, res) => {
  const jobId = req.params.jobId;
  const { _id } = req.user;

  try {
    const job = await Job.findById(jobId);
    const user = await User.findById(_id);

    if (!job || !user) {
      console.log("Job or user not found");
      return res.status(404).json({ error: "Job or user not found" });
    }

    if (job.applicants.includes(_id) || user.appliedJobs.includes(jobId)) {
      console.log("User has already applied for this job");
      return res.status(400).json({ error: "User has already applied for this job" });
    }

    job.applicants.push(_id);
    user.appliedJobs.push(jobId);

    await job.save();
    await user.save();

    console.log("Applied for the job successfully");
    res.status(200).json({ message: "Applied for the job successfully" });
  } catch (error) {
    console.error("Error applying for the job:", error);
    res.status(500).json({ error: "Failed to apply for the job" });
  }
};


const getJobsApplied = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const appliedJobs = user.appliedJobs;

    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};


const checkTheStatusOfTheJob = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    const application = await Application.findById(applicationId);

    if (!application) {
      res.status(404).json({ error: 'Application not found' });
    } else {
      res.status(200).json(application.status);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve application status' });
  }
};

module.exports = {
  applyForJob,
  getJobsApplied,
  checkTheStatusOfTheJob,
};
