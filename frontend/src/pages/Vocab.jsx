import { useState } from "react";
import Navbar from "../componenets/Navbar";
import tutorImg from "/images/mmamama.png";
const VocabularyIcon = ({ isPlaying }) => (
  <svg
    className={`w-16 h-16 transition-all duration-300 ${
      isPlaying ? "text-green-500 animate-bounce" : "text-gray-400"
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9M19 9H14V4H5V19H19V9Z" />
  </svg>
);

// Mock vocabulary data
const vocabularyCategories = {
  fruits: {
    title: "फलफूलहरू",
    icon: "🍎",
    words: [
      { nepali: "स्याउ", english: "Apple", pronunciation: "syau" },
      { nepali: "केरा", english: "Banana", pronunciation: "kera" },
      { nepali: "सुन्तला", english: "Orange", pronunciation: "suntala" },
    ],
  },
  animals: {
    title: "जनावरहरू",
    icon: "🐘",
    words: [
      { nepali: "हात्ती", english: "Elephant", pronunciation: "hatti" },
      { nepali: "बाघ", english: "Tiger", pronunciation: "bagh" },
      { nepali: "बाँदर", english: "Monkey", pronunciation: "bandar" },
    ],
  },
  colors: {
    title: "रंगहरू",
    icon: "🌈",
    words: [
      { nepali: "रातो", english: "Red", pronunciation: "rato" },
      { nepali: "निलो", english: "Blue", pronunciation: "nilo" },
      { nepali: "हरियो", english: "Green", pronunciation: "hariyo" },
    ],
  },
};

const teacherMessages = [
  "बहुत राम्रो! Keep learning! 🌟",
  "तपाईं धेरै चाँडो सिक्दै हुनुहुन्छ! 📚",
  "Amazing progress! जारी राख्नुहोस्! 🎉",
  "You're doing great! 💪",
];

export default function VocabularyClass() {
  const [currentCategory, setCurrentCategory] = useState("fruits");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "शब्द सिक्न सुरु गर्नुहोस्..."
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const currentWord =
    vocabularyCategories[currentCategory].words[currentWordIndex];
  const totalWords = vocabularyCategories[currentCategory].words.length;
  const progressPercent = ((currentWordIndex + 1) / totalWords) * 100;
  const speakWord = (text) => {
    if (!isMuted && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;

      setIsPlaying(true);
      setStatusMessage("🔊 उच्चारण बजाउँदै...");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;

      // Get all available voices
      const voices = synth.getVoices();

      // Prefer female Hindi or fallback to a female English voice
      const femaleNepaliLikeVoice =
        voices.find(
          (v) =>
            v.lang === "hi-IN" &&
            (v.name.toLowerCase().includes("female") ||
              v.name.toLowerCase().includes("heera") ||
              v.name.toLowerCase().includes("google"))
        ) ||
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("zira") ||
              v.name.toLowerCase().includes("kendra") ||
              v.name.toLowerCase().includes("female"))
        );

      if (femaleNepaliLikeVoice) {
        utterance.voice = femaleNepaliLikeVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setStatusMessage("✓ उच्चारण सम्पन्न भयो!");
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setStatusMessage("⚠️ उच्चारणमा समस्या आयो");
      };

      synth.speak(utterance);
    }
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setStatusMessage("❌ कृपया उत्तर लेख्नुहोस्");
      return;
    }

    const isCorrect =
      userAnswer.toLowerCase().trim() === currentWord.english.toLowerCase();

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setStatusMessage("🎉 सही उत्तर! बधाई छ!");
    } else {
      setStatusMessage("❌ गलत उत्तर, फेरि प्रयास गर्नुहोस्");
    }

    setShowAnswer(true);
  };

  const nextWord = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setCurrentWordIndex(0);
    }
    resetQuizState();
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1);
    } else {
      setCurrentWordIndex(totalWords - 1);
    }
    resetQuizState();
  };

  const changeCategory = (categoryKey) => {
    setCurrentCategory(categoryKey);
    setCurrentWordIndex(0);
    resetQuizState();
  };

  const resetQuizState = () => {
    setUserAnswer("");
    setShowAnswer(false);
    setStatusMessage("नयाँ शब्द सिक्नुहोस्...");
  };

  const getEncouragement = () => {
    const message =
      teacherMessages[Math.floor(Math.random() * teacherMessages.length)];
    setStatusMessage(message);
    setTimeout(() => setStatusMessage("शब्द सिक्न जारी राख्नुहोस्..."), 3000);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 animate-fadeIn p-6 md:p-10">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-8 w-full h-full">
          {/* Left: Mascot & Controls */}

          <div className="flex flex-col items-center text-center w-full md:w-1/3 gap-5">
            <div className="font-bold font-poppins text-3xl md:text-4xl text-gray-700 font-semibold tracking-wide">
              Lets Learn
            </div>
            <img
              src={tutorImg}
              alt="Tutor"
              className="w-36 md:w-48 drop-shadow-lg animate-bounce-slow"
            />

            <p className="text-xl md:text-2xl text-gray-700 font-semibold tracking-wide">
              नेपाली शब्दहरू सिक्नुहोस् र अभ्यास गर्नुहोस्।
            </p>

            <div>
              <VocabularyIcon isPlaying={isPlaying} />
            </div>

            {/* Score & Sound Toggle */}
            <div className="flex flex-col gap-3 items-center">
              <div className="bg-yellow-100 px-6 py-3 rounded-xl shadow-md">
                <p className="text-lg font-bold text-gray-800">
                  स्कोर: {score} 🌟
                </p>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 text-lg rounded-xl font-semibold shadow-lg transition-all"
              >
                {isMuted ? "🔇 आवाज बन्द" : "🔊 आवाज खुला"}
              </button>

              <button
                onClick={getEncouragement}
                className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-6 py-3 text-lg rounded-xl font-semibold shadow-lg hover:scale-105 transition-all"
              >
                🌟 प्रेरणा पाउनुहोस्
              </button>
            </div>

            <p className="text-blue-700 font-bold text-lg animate-pulse tracking-wide">
              {statusMessage}
            </p>
          </div>

          {/* Right: Learning Content */}
          <div className="flex flex-col w-full md:w-2/3 gap-5">
            {/* Categories */}
            <div className="bg-purple-50 p-5 rounded-xl shadow">
              <h3 className="text-2xl font-bold text-gray-700 mb-4 tracking-wide">
                📂 श्रेणीहरू:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(vocabularyCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => changeCategory(key)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 font-bold tracking-wide ${
                      currentCategory === key
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105 shadow-lg"
                        : "bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-200"
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm">{category.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-50 p-5 rounded-xl shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-700 tracking-wide">
                  प्रगति:
                </h3>
                <span className="text-sm font-bold text-gray-600">
                  शब्द {currentWordIndex + 1} को {totalWords}
                </span>
              </div>
              <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Current Word Display */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl shadow">
              <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center tracking-wide">
                {vocabularyCategories[currentCategory].title}
              </h3>

              <div className="text-center mb-4">
                <div
                  className="text-6xl font-black text-blue-800 mb-4 cursor-pointer hover:scale-110 transition-transform tracking-wide"
                  onClick={() => speakWord(currentWord.pronunciation)}
                >
                  {currentWord.nepali}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                  <button
                    onClick={() => speakWord(currentWord.pronunciation)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
                  >
                    🔊 उच्चारण सुन्नुहोस्
                  </button>
                  <div className="bg-white px-6 py-3 rounded-xl shadow-md border-2 border-gray-200">
                    <span className="text-gray-700 font-bold text-lg tracking-wide">
                      {currentWord.pronunciation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center tracking-wide">
                🤔 यसको अर्थ अंग्रेजीमा के हो?
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="तपाईंको उत्तर लेख्नुहोस्..."
                  className="px-6 py-3 border-2 border-blue-300 rounded-xl text-lg text-center focus:outline-none focus:border-blue-500 font-medium tracking-wide"
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                />
                <button
                  onClick={checkAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
                >
                  जवाफ जाँच गर्नुहोस् ✓
                </button>
              </div>

              {showAnswer && (
                <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center animate-fadeIn">
                  <p className="text-xl font-bold text-green-800 tracking-wide">
                    सही उत्तर: {currentWord.english}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevWord}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
              >
                ← अघिल्लो
              </button>

              <button
                onClick={nextWord}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105"
              >
                अर्को →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
