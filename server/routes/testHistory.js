const express = require("express");
const TestHistory = require("../models/TestHistory");
const router = express.Router();

// Save test history
router.post("/", async (req, res) => {
  const { userId, questions, grade } = req.body;

  if (!userId || !questions || !grade) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const history = new TestHistory({ userId, questions, grade });
    await history.save();
    res.status(201).json({ msg: "History saved", history });
  } catch (err) {
    console.error("Error saving history:", err);
    res.status(500).json({ msg: "Error saving history" });
  }
});

// Get history of a user
router.get("/my-history/:userId", async (req, res) => {
  try {
    const history = await TestHistory.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching history" });
  }
});

module.exports = router;
