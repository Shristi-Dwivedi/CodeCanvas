const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
  input: String,
  expectedOutput: String
}, { timestamps: true });

module.exports = mongoose.model("Questions", QuestionSchema);