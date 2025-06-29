require("dotenv").config();

// Core Dependencies
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const { SpeechClient } = require("@google-cloud/speech");
const OpenAI = require("openai");
const ttsRoutes = require("./routes/ttsRoutes");
const progressRoutes = require("./routes/progressRoutes");
const quizRoutes = require("./routes/quizRoutes");
const Question = require("./models/Question");

// App and Config
const app = express();
const port = 3002;
const MONGODB_URI = "mongodb://localhost:27017/nepali_learning";

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() });

// Database
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Google Cloud Setup
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./google-credentials.json";
const speechClient = new SpeechClient();

// OpenAI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("🔐 OpenAI Key Present:", !!process.env.OPENAI_API_KEY);

//Routes
app.use("/api", ttsRoutes);
app.use("/api", quizRoutes);
app.use("/api/progress", progressRoutes);

// Transcribe Route
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No audio file uploaded." });

  const audioBytes = req.file.buffer.toString("base64");
  const audio = { content: audioBytes };
  const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "ne-NP",
    enableAutomaticPunctuation: true,
  };

  try {
    const [response] = await speechClient.recognize({ audio, config });

    let transcription = "पहिचान हुन सकेन";
    let confidence = 0;
    let alternatives = [];

    if (response.results.length > 0) {
      const primary = response.results[0];
      transcription = primary.alternatives[0].transcript;
      confidence = primary.alternatives[0].confidence;
      alternatives = primary.alternatives.map((alt) => ({
        transcript: alt.transcript,
        confidence: alt.confidence,
      }));
    }

    const correctedText = await getCorrectSpelling(transcription);
    res.json({
      transcribedText: transcription,
      confidence,
      alternatives,
      correctedText,
    });
  } catch (error) {
    console.error("Speech-to-Text Error:", error);
    res.status(500).json({ message: "Error processing transcription." });
  }
});

// Fuzzy Match Logic
async function getCorrectSpelling(inputText) {
  const lowerInput = inputText.toLowerCase().trim();
  let levenshteinFn;
  try {
    const module = await import("levenshtein-edit-distance");
    levenshteinFn = module.default || module;
  } catch (e) {
    levenshteinFn = (a, b) => a.length + b.length;
  }
  const spellingMap = require("./utils/spellingMap");

  if (spellingMap[lowerInput]) return spellingMap[lowerInput];

  let closestMatch = null;
  let minDistance = Infinity;
  const correctWords = Object.values(spellingMap);

  for (const word of correctWords) {
    const dist = levenshteinFn(lowerInput, word.toLowerCase());
    if (dist < 2 && dist < minDistance) {
      minDistance = dist;
      closestMatch = word;
    }
  }

  return (
    closestMatch ||
    `\u0938\u0939\u0940 \u0935\u0930\u094d\u0924\u0928\u0940 \u0909\u092a\u0932\u092c\u094d\u0927 \u091b\u0948\u0928: \"${inputText}\"`
  );
}

// Start Server
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
  console.log("CORS Allowed: http://localhost:3001");
  console.log("Make sure google-credentials.json exists in project root\n");
});
