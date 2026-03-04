const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getJobs, getJobById, createJob } = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", auth, createJob); // auth-protected seed endpoint

module.exports = router;