const express = require("express");
const router = express.Router();
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "./google-credentials.json",
});
// const textToSpeech = require('@google-cloud/text-to-speech');
// const client = new textToSpeech.TextToSpeechClient({
//   keyFilename: "./google-credentials.json",
// });

// async function listVoices() {
//   const [result] = await client.listVoices({});
//   result.voices.forEach((v) => {
//     console.log(`${v.name} - ${v.languageCodes.join(", ")} - ${v.ssmlGender}`);
//   });
// }
// listVoices();
router.post("/pronounce", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required." });
  }

  const request = {
    input: { text }, // ✅ FIXED
    voice: {
      languageCode: "hi-IN", // ✅ Use Hindi
      name: "hi-IN-Wavenet-A",
      // languageCode: "ne-IN", // ✅ Google supports this for Nepali
      // ssmlGender: "FEMALE", // ✅ Confirm this exists
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error("Text-to-Speech Error:", error);
    res.status(500).json({ message: "Failed to synthesize speech." });
  }
});
module.exports = router;
