import axios from "axios";
import { useState } from "react";

export default function PronunciationTutor() {
  const [word, setWord] = useState("");

  const handlePlay = async () => {
    if (!word.trim()) {
      alert("कृपया शब्द लेख्नुहोस्");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/api/pronounce",
        { text: word }, // ✅ FIXED
        { responseType: "blob" }
      );

      const audio = new Audio(URL.createObjectURL(res.data));
      audio.play();
    } catch (err) {
      console.error("Error playing pronunciation:", err);
      alert("उच्चारण सुन्न समस्या भयो");
    }
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-amber-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-rose-600 mb-6">
          उच्चारण शिक्षक (Pronunciation Tutor)
        </h2>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="उच्चारण शब्द लेख्नुहोस्"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-center"
        />
        <button
          onClick={handlePlay}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-full"
        >
          उच्चारण सुन्नुहोस् 🔊
        </button>
      </div>
    </div>
    </div>
  );
}
