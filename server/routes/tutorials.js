const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const Tutorials = require("../models/Tutorials");

router.get("/", async (req, res) => {
  try {
    const tutorials = await Tutorials.find();
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/watch", async (req, res) => {
  const tutorialId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  let progress = await Progress.findOne({ userId, tutorialId });

  if (!progress) {
    progress = new Progress({
      userId,
      tutorialId,
      watched: true,
      watchedAt: new Date(),
    });
  } else {
    progress.watched = true;
    progress.watchedAt = new Date();
  }

  await progress.save();
  res.json(progress);
});

router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId, watched: true });
    res.json({ watchedCount: progress.length });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/watched/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const watched = await Progress.find({ userId, watched: true }).populate("tutorialId"); 
    res.json(watched);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
