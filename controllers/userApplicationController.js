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
      return res.status(200).json({ message: "notfound" });
    }

    if (job.applicants.includes(_id) || user.appliedJobs.includes(jobId)) {
      return res.status(200).json({ message: "exists" });
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

    const jobs = await Job.find({ _id: { $in: appliedJobs } });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

module.exports = {
  applyForJob,
  getJobsApplied,
};
