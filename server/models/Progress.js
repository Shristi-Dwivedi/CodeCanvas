const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorials", required: true },
  watched: { type: Boolean, default: false },
  watchedAt: { type: Date }
});

module.exports = mongoose.model("Progress", progressSchema);