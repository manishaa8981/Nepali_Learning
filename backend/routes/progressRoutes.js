const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

router.post("/save", async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json({ message: "Progress saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await Progress.find().sort({ timestamp: -1 }).limit(100);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
