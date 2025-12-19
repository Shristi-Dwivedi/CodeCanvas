const express = require("express");
const Questions = require("../models/Questions");
const router = express.Router();

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find().sort({ createdAt: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching questions" });
  }
});

module.exports = router;
