const mongoose = require("mongoose");

const TestHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [
    {
      questionId: { type: String },
      title: { type: String },
      score: { type: Number }
    }
  ],
  grade: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("TestHistory", TestHistorySchema);