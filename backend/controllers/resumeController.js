const Resume = require("../models/Resume");
const User = require("../models/User");
const { extractTextFromPDF } = require("../services/pdfService");
const { extractEntities, getEmbedding } = require("../services/nlpService");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    // Step 1: Extract raw text from the PDF buffer
    const rawText = await extractTextFromPDF(req.file.buffer);

    // Step 2: Send text to Python NLP service for NER + parsing
    const parsed = await extractEntities(rawText);

    // Step 3: Generate sentence-transformer embedding
    const embedding = await getEmbedding(rawText);

    // Step 4: Save to MongoDB
    const resume = await Resume.create({
      userId: req.userId,
      fileName: req.file.originalname,
      rawText,
      parsed,
      embedding,
      summary: parsed.summary || "",
    });

    // Step 5: Link resume to user
    await User.findByIdAndUpdate(req.userId, {
      $push: { resumes: resume._id },
    });

    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
};

const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).select("-embedding -rawText");
    res.json(resumes);
  } catch (err) {
    next(err);
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).select("-embedding");
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (err) {
    next(err);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { resumes: resume._id },
    });

    res.json({ message: "Resume deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadResume, getResumes, getResumeById, deleteResume };
