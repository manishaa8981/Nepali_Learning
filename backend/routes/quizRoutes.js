// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const quizBank = require("../data/quizData");

router.post("/get-question-from-word", (req, res) => {
  const { word } = req.body;
  const result = quizBank[word?.trim()];
  if (result) {
    res.json(result, word);
  } else {
    res.status(404).json({ message: "Quiz for the given word not found." });
  }
});

module.exports = router;
