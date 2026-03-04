const Resume = require("../models/Resume");
const Job = require("../models/Job");
const { rankJobs } = require("../services/nlpService");

const analyzeResume = async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    if (!resume.embedding || resume.embedding.length === 0) {
      return res.status(400).json({ error: "Resume has no embedding. Re-upload the resume." });
    }

    // Fetch all jobs that have embeddings
    const jobs = await Job.find({ embedding: { $exists: true, $not: { $size: 0 } } });

    if (jobs.length === 0) {
      return res.status(200).json({ recommendations: [], message: "No jobs in database yet." });
    }

    const ranked = rankJobs(resume.embedding, jobs);

    res.json({
      resumeId,
      skills: resume.parsed.skills,
      recommendations: ranked.slice(0, 10), // Top 10 matches
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeResume };
