import { useEffect, useState } from "react";
import Navbar from "../componenets/Navbar";
import tutorImg from "/images/mmamama.png";

const SpeakerIcon = ({ isPlaying }) => (
  <svg
    className={`w-16 h-16 transition-all duration-300 ${
      isPlaying ? "text-rose-500 animate-bounce" : "text-gray-400"
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

export default function PronunciationTutor() {
  const [animatedShapes, setAnimatedShapes] = useState([]);
  const [word, setWord] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "उच्चारण सुन्न शब्द लेख्नुहोस्..."
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (!word.trim()) {
      setStatusMessage("❌ कृपया शब्द लेख्नुहोस्");
      return;
    }

    setIsPlaying(true);
    setStatusMessage("🔊 उच्चारण तयार गर्दै...");

    try {
      const response = await fetch("http://localhost:3002/api/pronounce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: word }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const audioBlob = await response.blob();
      setStatusMessage("🎵 उच्चारण बजाउँदै...");

      const audio = new Audio(URL.createObjectURL(audioBlob));

      audio.onended = () => {
        setIsPlaying(false);
        setStatusMessage("✓ उच्चारण सम्पन्न भयो!");
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setStatusMessage("❌ अडियो बजाउन समस्या भयो");
      };

      await audio.play();
    } catch (err) {
      console.error("Error playing pronunciation:", err);
      setIsPlaying(false);
      setStatusMessage("❌ उच्चारण सुन्न समस्या भयो");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePlay();
    }
  };

  useEffect(() => {
    const shapes = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      color: [
        "bg-yellow-300",
        "bg-pink-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-purple-300",
        "bg-orange-300",
      ][i % 6],
      delay: Math.random() * 4,
    }));
    setAnimatedShapes(shapes);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
      {/* Floating Animation Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {animatedShapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute rounded-full opacity-30 animate-bounce ${shape.color}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              animationDelay: `${shape.delay}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full h-full">
          {/* Left: Mascot & Controls */}
          <div className="flex flex-col items-center text-center w-full md:w-1/2 gap-5">
            <div className="font-bold font-poppins text-3xl md:text-4xl text-gray-700 font-semibold tracking-wide">
              Learn Pronounciation
            </div>
            <img
              src={tutorImg}
              alt="Tutor"
              className="w-36 md:w-48 drop-shadow-lg animate-bounce-slow"
            />

            <p className="text-lg md:text-xl text-gray-700 font-medium">
              नेपाली शब्दको सही उच्चारण सुन्नुहोस्।
            </p>

            <div>
              <SpeakerIcon isPlaying={isPlaying} />
            </div>

            {/* Input Field */}
            <div className="w-full max-w-sm">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="उच्चारण शब्द लेख्नुहोस्..."
                className="w-full px-4 py-3 text-lg text-center border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Button */}
            <button
              onClick={handlePlay}
              disabled={isPlaying || !word.trim()}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              🔊 उच्चारण सुन्नुहोस्
            </button>

            <p className="text-blue-700 font-semibold text-base animate-pulse">
              {statusMessage}
            </p>
          </div>

          {/* Right: Information & Tips */}
          <div className="flex flex-col w-full md:w-1/2 gap-5 text-left">
            <div className="bg-rose-50 p-5 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                लेखिएको शब्द:
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {word || "..."}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                उच्चारण सुझावहरू:
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• ध्यानसँग सुन्नुहोस्</li>
                <li>• बिस्तारै दोहोर्याउनुहोस्</li>
                <li>• अभ्यास गर्नुहोस्</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
