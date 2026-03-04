const Job = require("../models/Job");
const { getEmbedding } = require("../services/nlpService");

const getJobs = async (req, res, next) => {
  try {
    const { skill, role, limit = 20 } = req.query;
    const filter = {};

    if (skill) filter.skills = { $in: [new RegExp(skill, "i")] };
    if (role) filter.title = { $regex: role, $options: "i" };

    const jobs = await Job.find(filter).select("-embedding").limit(Number(limit));
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).select("-embedding");
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

// Admin use: seed a job and pre-compute its embedding
const createJob = async (req, res, next) => {
  try {
    const { title, company, location, description, skills } = req.body;
    if (!title || !company || !description) {
      return res.status(400).json({ error: "title, company, and description are required" });
    }

    // Pre-compute embedding for the job description
    const embedding = await getEmbedding(description);

    const job = await Job.create({
      title,
      company,
      location,
      description,
      skills: skills || [],
      embedding,
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = { getJobs, getJobById, createJob };
