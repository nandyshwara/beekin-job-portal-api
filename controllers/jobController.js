const Job = require("../models/jobSchema");

const getAllJobs = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const jobs = await Job.find({ category });
      res.status(200).json({
        length: jobs.length,
        [category]: jobs,
      });
    } else {
      const jobs = await Job.find();
      res.status(200).json({
        length: jobs.length,
        data: jobs,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve jobs" });
  }
};

const getAllJobCategories = async (req, res) => {
  try {
    const categories = [
      "Development",
      "Design",
      "Marketing",
      "Customer Support",
      "Product Management",
      "Human Resources",
    ];
    
    res.status(200).json({
      length : categories.length,
      data : categories
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve jobs" });
  }
};

const createJob = async (req, res) => {

  try {
    const { title, company, location, description1, description2, degree, jobType , summary , keyResponsibilities1 , keyResponsibilities2 , keyResponsibilities3 , keyResponsibilities4 , keyResponsibilities5 , qualifications1 , qualifications2 , qualifications3 , qualifications4 , category} =
      req.body;
      const description = [description1, description2]
      const qualifications = [qualifications1, qualifications2 , qualifications3 , qualifications4]
      const KeyResponsibilities = [keyResponsibilities1 , keyResponsibilities2 , keyResponsibilities3 , keyResponsibilities4 , keyResponsibilities5]
    const newJob = new Job({
      title,
      company,
      location,
      description,
      degree,
      jobType,
      summary,
      KeyResponsibilities,
      qualifications,
      category,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to get categories" });
  }
};

const getJobByID = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const deletedJob = await Job.findByIdAndRemove(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(deletedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the job" });
  }
};

module.exports = {
  getAllJobs,
  getJobByID,
  updateJob,
  createJob,
  deleteJob,
  getAllJobCategories,
};
