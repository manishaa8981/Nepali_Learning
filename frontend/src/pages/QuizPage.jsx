import { useEffect, useState } from "react";
import Navbar from "../componenets/Navbar";
import tutorImg from "/images/quiz.png";

const QuizIcon = ({ isLoading }) => (
  <svg
    className={`w-16 h-16 transition-all duration-300 ${
      isLoading ? "text-purple-500 animate-spin" : "text-gray-400"
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    <path d="M8.5,8H10.5V10H8.5V8M8.5,6H10.5V7H8.5V6M8.5,11H10.5V12H8.5V11Z" />
  </svg>
);

const wordBank = ["फलफूल", "घर", "विद्यालय", "पानी", "रंग"];

export default function QuizGenerator() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusMessage, setStatusMessage] = useState("क्विज सुरु गर्न तयार...");

  useEffect(() => {
    if (currentIndex >= wordBank.length) {
      setIsComplete(true);
      setStatusMessage("🎉 सबै प्रश्नहरू सम्पन्न भयो!");
    } else {
      fetchQuiz(wordBank[currentIndex]);
    }
  }, [currentIndex]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setIsComplete(false);
    setQuiz(null);
    setShowAnswer(false);
    setStatusMessage("क्विज सुरु गर्न तयार...");
  };

  const fetchQuiz = async (word) => {
    setLoading(true);
    setShowAnswer(false);
    setStatusMessage("🔄 प्रश्न तयार गर्दै...");

    try {
      const res = await fetch(
        "http://localhost:3002/api/get-question-from-word",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word }),
        }
      );
      const data = await res.json();
      setQuiz(data);
      setStatusMessage("✓ प्रश्न तयार भयो!");
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      setStatusMessage("❌ प्रश्न लोड गर्न समस्या भयो");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    if (!showAnswer) {
      setShowAnswer(true);
      if (option === quiz.answer) {
        setStatusMessage("🎉 सही जवाफ!");
      } else {
        setStatusMessage("❌ गलत जवाफ, फेरि प्रयास गर्नुहोस्");
      }
    }
  };

  const nextQuiz = () => {
    setShowAnswer(false);
    setQuiz(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 animate-fadeIn p-6 md:p-10">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full h-full">
          {/* Left: Mascot & Controls */}
          <div className="flex flex-col items-center text-center w-full md:w-1/2 gap-5">
            <div className="font-bold font-poppins text-3xl md:text-4xl text-gray-700 font-semibold tracking-wide">
              Quiz
            </div>
            <img
              src={tutorImg}
              alt="Tutor"
              className="w-36 md:w-48 drop-shadow-lg animate-bounce-slow"
            />

            <p className="text-xl md:text-2xl text-gray-700 font-semibold tracking-wide">
              नेपाली शब्दहरूको बारेमा प्रश्नहरूको जवाफ दिनुहोस्।
            </p>

            <div>
              <QuizIcon isLoading={loading} />
            </div>

            {/* Progress Indicator */}
            <div className="w-full max-w-sm">
              <div className="bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(currentIndex / wordBank.length) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                प्रश्न {currentIndex + 1} को {wordBank.length}
              </p>
            </div>

            {isComplete ? (
              <button
                onClick={resetQuiz}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg transition-all"
              >
                🔄 फेरि सुरु गर्नुहोस्
              </button>
            ) : showAnswer ? (
              <button
                onClick={nextQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg transition-all"
              >
                ➡️ अर्को प्रश्न
              </button>
            ) : null}
          </div>

          {/* Right: Quiz Content */}
          <div className="flex flex-col w-full md:w-1/2 gap-5 text-left">
            {isComplete ? (
              <div className="bg-green-50 p-8 rounded-xl shadow text-center">
                <h2 className="text-4xl font-black text-green-700 mb-4 tracking-wide">
                  🎉 बधाई छ!
                </h2>
                <p className="text-2xl text-gray-700 mb-4 font-semibold">
                  तपाईंले सबै प्रश्नहरू सफलतापूर्वक पूरा गर्नुभयो!
                </p>
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-gray-600 font-medium text-lg">
                  नयाँ शब्दहरू सिक्न फेरि क्विज खेल्नुहोस्।
                </p>
              </div>
            ) : quiz ? (
              <>
                {/* Question Card */}
                <div className="bg-purple-50 p-5 rounded-xl shadow">
                  <h3 className="text-2xl font-bold text-gray-700 mb-2 tracking-wide">
                    प्रश्न:
                  </h3>
                  {quiz?.word && (
                    <img
                      src={`/images/${quiz.word}.png`}
                      alt={quiz.word}
                      className="w-24 h-24 object-contain mx-auto mb-3 rounded-lg"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <p className="text-xl font-bold text-gray-900 tracking-wide">
                    {quiz.question}
                  </p>
                </div>

                {/* Options Card */}
                <div className="bg-gray-50 p-5 rounded-xl shadow">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4 tracking-wide">
                    विकल्पहरू:
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {quiz.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        disabled={showAnswer}
                        className={`py-4 px-5 rounded-xl font-bold border-2 transition-all text-left text-lg tracking-wide ${
                          showAnswer && opt === quiz.answer
                            ? "bg-green-100 border-green-500 text-green-800 transform scale-105"
                            : showAnswer
                            ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                        }`}
                      >
                        <span className="text-base font-black text-gray-500 mr-3">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Answer Reveal Card */}
                {showAnswer && (
                  <>
                    {/* ✅ Message on top */}
                    <div className="bg-blue-100 p-4 rounded-xl shadow animate-fadeIn text-center">
                      <p className="text-xl font-bold text-blue-800">
                        {statusMessage}
                      </p>
                    </div>

                    {/* ✅ Correct Answer Below */}
                    <div className="bg-green-50 p-5 rounded-xl shadow animate-fadeIn mt-4">
                      <h3 className="text-2xl font-bold text-gray-700 mb-2 tracking-wide">
                        सही उत्तर:
                      </h3>
                      <p className="text-3xl font-black text-green-700 tracking-wide">
                        ✅ {quiz.answer}
                      </p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="bg-gray-50 p-8 rounded-xl shadow text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2 tracking-wide">
                  क्विज लोड हुँदैछ...
                </h3>
                <p className="text-gray-600 font-medium text-lg">
                  कृपया प्रतीक्षा गर्नुहोस्, हामी तपाईंको लागि प्रश्न तयार
                  गर्दैछौं।
                </p>
              </div>
            )}
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
