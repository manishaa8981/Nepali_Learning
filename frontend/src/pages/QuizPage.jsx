import { useEffect, useState } from "react";
import teacherImage from "../assets/teacher.jpg"; // Use your own image path or URL

const wordBank = ["फलफूल", "घर", "विद्यालय", "पानी", "रंग"];

export default function QuizGenerator() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= wordBank.length) {
      setIsComplete(true);
    } else {
      fetchQuiz(wordBank[currentIndex]);
    }
  }, [currentIndex]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setIsComplete(false);
    setQuiz(null);
    setShowAnswer(false);
  };

  const fetchQuiz = async (word) => {
    setLoading(true);
    setShowAnswer(false);
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
    } catch (err) {
      console.error("Failed to generate quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    if (!showAnswer) setShowAnswer(true);
  };

  const nextQuiz = () => {
    setShowAnswer(false);
    setQuiz(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={teacherImage}
            alt="AI Tutor"
            className="w-16 h-16 rounded-full border-2 border-purple-500"
          />
          <h1 className="text-2xl font-bold text-purple-700">AI TUTOR क्विज</h1>
        </div>

        {isComplete ? (
          <div className="text-center animate-bounce text-green-700 mt-10">
            <h2 className="text-3xl font-extrabold mb-2">🎉 बधाई छ!</h2>
            <p className="text-lg mb-4">तपाईंले सबै प्रश्नहरू पूरा गर्नुभयो।</p>
            <button
              onClick={resetQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition transform hover:scale-105"
            >
              फेरि सुरु गर्नुहोस्
            </button>
          </div>
        ) : quiz ? (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-md">
            {quiz?.word && (
              <img
                src={`/images/${quiz.word}.png`}
                alt={quiz.word}
                className="w-32 h-32 object-contain mx-auto mb-4"
                onError={(e) => (e.target.style.display = "none")} // optional: hide if not found
              />
            )}
            <p className="text-lg font-semibold mb-4 text-gray-800">
              {quiz.question}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className={`py-3 rounded-xl font-semibold border transition text-center text-lg ${
                    showAnswer && opt === quiz.answer
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-white border-gray-300 hover:bg-blue-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showAnswer && (
              <div className="mt-4 text-green-700 font-bold">
                ✅ सही उत्तर: {quiz.answer}
              </div>
            )}

            {showAnswer && (
              <button
                onClick={nextQuiz}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                अर्को प्रश्न
              </button>
            )}
          </div>
        ) : (
          <div className="text-center text-purple-600 text-lg font-medium">
            {loading
              ? "प्रश्न लोड हुँदैछ..."
              : "शुरु गर्न कृपया प्रतीक्षा गर्नुहोस्..."}
          </div>
        )}
      </div>
    </div>
  );
}
