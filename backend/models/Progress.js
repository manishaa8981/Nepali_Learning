const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  category: String,
  word: String,
  correct: Boolean,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", progressSchema);
