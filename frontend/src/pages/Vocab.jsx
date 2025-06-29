import { useEffect, useState } from "react";
import Navbar from "../componenets/Navbar";

const NepaliVocabularyTeacher = () => {
  const [currentCategory, setCurrentCategory] = useState("basics");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const vocabularyCategories = {
    basics: {
      title: "Basic Words",
      icon: "📚",
      words: [
        {
          nepali: "नमस्ते",
          english: "Hello",
          pronunciation: "Namaste",
          icon: "🙋",
        },
        {
          nepali: "धन्यवाद",
          english: "Thank you",
          pronunciation: "Dhanyabad",
          icon: "🙏",
        },
        {
          nepali: "माफ गरनुहोस्",
          english: "Sorry",
          pronunciation: "Maaf garnuhos",
          icon: "😔",
        },
        {
          nepali: "पानी",
          english: "Water",
          pronunciation: "Paani",
          icon: "💧",
        },
        {
          nepali: "खाना",
          english: "Food",
          pronunciation: "Khaana",
          icon: "🍛",
        },
        { nepali: "घर", english: "House", pronunciation: "Ghar", icon: "🏠" },
        {
          nepali: "स्कुल",
          english: "School",
          pronunciation: "School",
          icon: "🏫",
        },
        {
          nepali: "किताब",
          english: "Book",
          pronunciation: "Kitaab",
          icon: "📖",
        },
        {
          nepali: "कपडा",
          english: "Clothes",
          pronunciation: "Kapadaa",
          icon: "👕",
        },
        {
          nepali: "मित्र",
          english: "Friend",
          pronunciation: "Mitra",
          icon: "👫",
        },
        {
          nepali: "शुभप्रभात",
          english: "Good Morning",
          pronunciation: "Shubhprabhaat",
          icon: "🌅",
        },
        {
          nepali: "शुभरात्रि",
          english: "Good Night",
          pronunciation: "Shubha raatri",
          icon: "🌙",
        },
        { nepali: "आमा", english: "Mother", pronunciation: "Aama", icon: "👩" },
        {
          nepali: "बुबा",
          english: "Father",
          pronunciation: "Bubaa",
          icon: "👨",
        },
        {
          nepali: "दाजु",
          english: "Older Brother",
          pronunciation: "Daaju",
          icon: "👦",
        },
        {
          nepali: "दिदी",
          english: "Older Sister",
          pronunciation: "Didi",
          icon: "👧",
        },
        { nepali: "खेल", english: "Game", pronunciation: "Khel", icon: "🎮" },
        {
          nepali: "पढ्नु",
          english: "Study",
          pronunciation: "Padhnu",
          icon: "📚",
        },
        {
          nepali: "गाउनु",
          english: "Sing",
          pronunciation: "Gaunu",
          icon: "🎤",
        },
        {
          nepali: "नाच्नु",
          english: "Dance",
          pronunciation: "Naachnu",
          icon: "💃",
        },
      ],
    },
    colors: {
      title: "Colors",
      icon: "🌈",
      words: [
        { nepali: "रातो", english: "Red", pronunciation: "Raato" },
        { nepali: "निलो", english: "Blue", pronunciation: "Neelo" },
        { nepali: "हरियो", english: "Green", pronunciation: "Hariyo" },
        { nepali: "पहेंलो", english: "Yellow", pronunciation: "Pahelo" },
        { nepali: "कालो", english: "Black", pronunciation: "Kaalo" },
        { nepali: "सेतो", english: "White", pronunciation: "Seto" },
        { nepali: "गुलाफी", english: "Pink", pronunciation: "Gulaafi" },
        { nepali: "बैजनी", english: "Purple", pronunciation: "Baijani" },
      ],
    },
    numbers: {
      title: "Numbers 1-10",
      icon: "🔢",
      words: [
        { nepali: "एक", english: "One", pronunciation: "Ek" },
        { nepali: "दुई", english: "Two", pronunciation: "Dui" },
        { nepali: "तीन", english: "Three", pronunciation: "Teen" },
        { nepali: "चार", english: "Four", pronunciation: "Chaar" },
        { nepali: "पाँच", english: "Five", pronunciation: "Paanch" },
        { nepali: "छ", english: "Six", pronunciation: "Chha" },
        { nepali: "सात", english: "Seven", pronunciation: "Saat" },
        { nepali: "आठ", english: "Eight", pronunciation: "Aath" },
      ],
    },
    family: {
      title: "Family Members",
      icon: "👨‍👩‍👧‍👦",
      words: [
        { nepali: "आमा", english: "Mother", pronunciation: "Aama" },
        { nepali: "बुवा", english: "Father", pronunciation: "Buwa" },
        { nepali: "दाजु", english: "Elder Brother", pronunciation: "Daaju" },
        { nepali: "दिदी", english: "Elder Sister", pronunciation: "Didi" },
        { nepali: "भाइ", english: "Younger Brother", pronunciation: "Bhai" },
        { nepali: "बहिनी", english: "Younger Sister", pronunciation: "Bahini" },
        {
          nepali: "हजुरआमा",
          english: "Grandmother",
          pronunciation: "Hajuraama",
        },
        {
          nepali: "हजुरबुवा",
          english: "Grandfather",
          pronunciation: "Hajurbuwa",
        },
      ],
    },
  };

  const teacherMessages = [
    "स्वागत छ! Welcome to Nepali class! 🙏",
    "राम्रो! That's excellent! 👏",
    "Keep practicing! तपाईं गर्न सक्नुहुन्छ! 💪",
    "Perfect pronunciation! एकदम राम्रो! ✨",
    "Don't worry, learning takes time! 😊",
  ];

  const getCurrentWord = () => {
    return vocabularyCategories[currentCategory].words[currentWordIndex];
  };

  const nextWord = () => {
    const maxIndex = vocabularyCategories[currentCategory].words.length - 1;
    if (currentWordIndex < maxIndex) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setShowAnswer(false);
    setUserAnswer("");
  };

  const prevWord = () => {
    const maxIndex = vocabularyCategories[currentCategory].words.length - 1;
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      setCurrentWordIndex(maxIndex);
    }
    setShowAnswer(false);
    setUserAnswer("");
  };

  const checkAnswer = () => {
    const currentWord = getCurrentWord();
    if (userAnswer.toLowerCase().trim() === currentWord.english.toLowerCase()) {
      setScore(score + 1);
      alert("🎉 Correct! एकदम राम्रो!");
      if ((score + 1) % 5 === 0) {
        alert("🌟 Wow! You've earned a star for 5 correct answers!");
      }

      // Save to localStorage
      const history = JSON.parse(localStorage.getItem("learnedWords") || "[]");
      history.push(currentWord);
      localStorage.setItem("learnedWords", JSON.stringify(history));
    } else {
      alert(`Not quite! The answer is: ${currentWord.english}`);
    }
    setShowAnswer(true);
  };

  const speakWord = (text) => {
    if (!isMuted && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentWordIndex(0);
    setShowAnswer(false);
    setUserAnswer("");
  };

  const progressPercent =
    ((currentWordIndex + 1) /
      vocabularyCategories[currentCategory].words.length) *
    100;
  const currentWord = getCurrentWord(); // ✅ define early
  useEffect(() => {
    if (currentWord?.english) {
      fetch("http://localhost:3005/api/progress/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: currentCategory,
          word: currentWord.english,
          correct: true,
        }),
      }).catch((err) => console.error("Failed to save progress:", err));
    }
  }, [currentCategory, currentWordIndex]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-pink-300 p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Nepali Vocabulary Class
          </h1>
          <p className="text-lg text-gray-800">Score: {score} 🌟</p>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="mt-2 bg-white px-4 py-2 rounded-full shadow text-sm font-semibold"
          >
            {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
          </button>
        </header>

        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden mb-4 max-w-xl mx-auto">
          <div
            className="bg-green-500 h-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(vocabularyCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => changeCategory(key)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                currentCategory === key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105"
                  : "bg-white text-gray-800 hover:scale-105"
              } shadow-lg`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-semibold text-sm">{category.title}</div>
            </button>
          ))}
        </div>

        {/* Main Learning Area */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {vocabularyCategories[currentCategory].title}
            </h2>
            <p className="text-gray-600">
              Word {currentWordIndex + 1} of{" "}
              {vocabularyCategories[currentCategory].words.length}
            </p>
          </div>

          {/* Word Display */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6">
            <div className="text-center">
              <div
                className="text-6xl font-bold text-blue-800 mb-4 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => speakWord(currentWord.pronunciation)}
              >
                {currentWord.nepali}
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => speakWord(currentWord.pronunciation)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  🔊 Pronunciation
                </button>
                <div className="bg-white px-4 py-2 rounded-full shadow-md">
                  <span className="text-gray-700 font-medium">
                    {currentWord.pronunciation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Quiz Section */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-center mb-4">
              🤔 What does this mean in English?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="px-4 py-2 border-2 border-blue-300 rounded-lg text-center text-lg focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
              />
              <button
                onClick={checkAnswer}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Check Answer ✓
              </button>
            </div>

            {showAnswer && (
              <div className="mt-4 text-center">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 inline-block">
                  <p className="text-lg font-semibold text-green-800">
                    Answer: {currentWord.english}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevWord}
              className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform font-semibold"
            >
              ← Previous
            </button>

            <div className="text-center">
              <div
                className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-2xl animate-pulse cursor-pointer"
                onClick={() =>
                  alert(
                    teacherMessages[
                      Math.floor(Math.random() * teacherMessages.length)
                    ]
                  )
                }
              >
                🌟
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Click for encouragement!
              </p>
            </div>

            <button
              onClick={nextWord}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform font-semibold"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Teacher Tips */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">💡</div>
            <h3 className="text-xl font-bold text-gray-800">
              Teacher Maya's Tips
            </h3>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>• Click on the Nepali word to hear pronunciation!</li>
            <li>• Practice writing the words in your notebook</li>
            <li>• Try to use these words in daily conversation</li>
            <li>• Don't worry about mistakes - they help you learn!</li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => alert("Going back to Kids Learning World! 🏠")}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform font-bold text-lg shadow-lg"
          >
            🏠 Back to Learning World
          </button>
        </div>
      </div>
    </div>
  );
};

export default NepaliVocabularyTeacher;
