const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
    uploadResume,
    getResumes,
    getResumeById,
    deleteResume,
} = require("../controllers/resumeController");

router.use(auth);

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);

module.exports = router;