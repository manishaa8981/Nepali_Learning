import { useEffect, useRef, useState } from "react";
import Navbar from "../componenets/Navbar";
import tutorImg from "/images/maambig.png"; // <-- Your cartoon image

const MicrophoneIcon = ({ isRecording }) => (
  <svg
    className={`w-16 h-16 transition-all duration-300 ${
      isRecording ? "text-red-500 animate-bounce" : "text-gray-400"
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.2-3c0 3.53-2.93 6.43-6.2 6.43S4.8 14.53 4.8 11H3c0 4.84 3.44 8.87 8 9.8V23h2v-2.17c4.56-.93 8-4.96 8-9.8h-1.8z" />
  </svg>
);

const CommandTool = () => {
  const [statusMessage, setStatusMessage] = useState("बोल्न सुरु गर्न तयार...");
  const [transcribedText, setTranscribedText] = useState("...");
  const [confidenceScore, setConfidenceScore] = useState("--");
  const [alternatives, setAlternatives] = useState("कुनै छैन");
  const [correctedText, setCorrectedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.webm");

        setStatusMessage("अडियो प्रशोधन हुँदैछ...");
        try {
          const response = await fetch("http://localhost:3002/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (response.ok) {
            setTranscribedText(data.transcribedText || "पहिचान हुन सकेन");
            setConfidenceScore(
              data.confidence ? `${(data.confidence * 100).toFixed(2)}%` : "--"
            );
            // setCorrectedText(data.correctedText || "सही वर्तनी उपलब्ध छैन");
            setCorrectedText(data.correctedText || "सही वर्तनी ");
            setAlternatives(
              data.alternatives?.slice(1).map((alt, i) => (
                <span key={i} className="block">
                  {alt.transcript} ({(alt.confidence * 100).toFixed(1)}%)
                </span>
              )) || "कुनै वैकल्पिक पहिचान छैन"
            );
            setStatusMessage("✓ सफलतापूर्वक पहिचान गरियो!");
          } else {
            setStatusMessage("❌ त्रुटि: " + (data.message || "पहिचान असफल"));
          }
        } catch (error) {
          console.error(error);
          setStatusMessage("❌ सर्भर समस्या वा नेटवर्क त्रुटि");
        } finally {
          setIsRecording(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatusMessage("🎙 सुन्दै छ... बोल्नुहोस्...");
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ माईक्रोफोन पहुँच त्रुटि");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setStatusMessage("🔄 रोकिनुभयो, अडियो प्रशोधन हुँदैछ...");
    }
  };
  const [animatedShapes, setAnimatedShapes] = useState([]);

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
        {" "}
        <Navbar />
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full h-full">
          {/* Left: Mascot & Controls */}
          <div className="flex flex-col items-center text-center w-full md:w-1/2 gap-5">
            <img
              src={tutorImg}
              alt="Tutor"
              className="w-36 md:w-48 drop-shadow-lg animate-bounce-slow"
            />

            <p className="text-lg md:text-xl text-gray-700 font-medium">
              बोल्नुहोस् र हामी त्यसलाई नेपालीमा लिखित रूपमा रूपान्तरण गर्छौं।
            </p>

            <div>
              <MicrophoneIcon isRecording={isRecording} />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={startRecording}
                disabled={isRecording}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-xl font-semibold shadow-lg disabled:opacity-50"
              >
                🎤 बोल्नुहोस्
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-xl font-semibold shadow-lg disabled:opacity-50"
              >
                ⛔ रोक्नुहोस्
              </button>
            </div>

            <p className="text-blue-700 font-semibold text-base animate-pulse">
              {statusMessage}
            </p>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col w-full md:w-1/2 gap-5 text-left">
            <div className="bg-green-50 p-5 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                पहिचान गरिएको पाठ:
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {transcribedText}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                आत्मविश्वास स्कोर:
              </h3>
              <p className="text-2xl text-red-600 font-bold">
                {confidenceScore}
              </p>
            </div>

            <div className="bg-yellow-50 p-5 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                सही वर्तनी:
              </h3>
              <p className="text-2xl text-red-600 font-bold">{correctedText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandTool;

// import { useCallback, useEffect, useRef, useState } from "react";

// // --- Helper Hook: useLoadingDots ---
// const useLoadingDots = () => {
//   const [statusMessage, setStatusMessage] = useState("");
//   const intervalRef = useRef(null);

//   const startLoading = useCallback((message) => {
//     let dots = 0;
//     setStatusMessage(message + "...");
//     intervalRef.current = setInterval(() => {
//       dots = (dots % 3) + 1;
//       setStatusMessage(message + ".".repeat(dots));
//     }, 500);
//   }, []);

//   const stopLoading = useCallback(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   }, []);

//   return { statusMessage, startLoading, stopLoading, setStatusMessage };
// };

// // --- Component: MicrophoneIcon ---
// const MicrophoneIcon = ({ isRecording }) => (
//   <svg
//     className={`
//       w-16 h-16 mb-4 transition-colors duration-300 transform
//       ${isRecording ? "text-red-500 animate-bounce" : "text-gray-400"}
//     `}
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.2-3c0 3.53-2.93 6.43-6.2 6.43S4.8 14.53 4.8 11H3c0 4.84 3.44 8.87 8 9.8V23h2v-2.17c4.56-.93 8-4.96 8-9.8h-1.8z" />
//   </svg>
// );

// // --- Component: CommandTool ---
// const CommandTool = () => {
//   const { statusMessage, startLoading, stopLoading, setStatusMessage } =
//     useLoadingDots();
//   const [transcribedText, setTranscribedText] = useState("...");
//   const [confidenceScore, setConfidenceScore] = useState("--");
//   const [alternatives, setAlternatives] = useState("कुनै छैन");
//   const [correctedText, setCorrectedText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const startRecording = async () => {
//     if (isRecording) return;

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       audioChunksRef.current = [];
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/webm",
//         });
//         const formData = new FormData();
//         formData.append("audio", audioBlob, "audio.webm");

//         setTranscribedText("...");
//         setConfidenceScore("--");
//         setAlternatives("प्रशोधन गर्दै...");
//         setCorrectedText("");

//         startLoading("अडियो प्रशोधन गर्दै");

//         try {
//           const response = await fetch("http://localhost:3002/transcribe", {
//             method: "POST",
//             body: formData,
//           });

//           const data = await response.json();
//           stopLoading();

//           if (response.ok) {
//             setTranscribedText(data.transcribedText || "पहिचान हुन सकेन");
//             setConfidenceScore(
//               data.confidence ? `${(data.confidence * 100).toFixed(2)}%` : "--"
//             );

//             if (data.alternatives && data.alternatives.length > 1) {
//               setAlternatives(
//                 data.alternatives.slice(1).map((alt, index) => (
//                   <span key={index} className="block">
//                     {alt.transcript} (
//                     {data.confidence
//                       ? (alt.confidence * 100).toFixed(1)
//                       : "N/A"}
//                     %)
//                   </span>
//                 ))
//               );
//             } else {
//               setAlternatives("कुनै वैकल्पिक पहिचान छैन");
//             }

//             setCorrectedText(data.correctedText || "सही वर्तनी उपलब्ध छैन");
//             setStatusMessage("पहिचान गरियो! (Recognized!)");
//           } else {
//             setStatusMessage(
//               <span className="text-red-600 font-bold">
//                 त्रुटि: {data.message || "पहिचान असफल"}
//               </span>
//             );
//             console.error("Backend Error:", data);
//             setAlternatives("त्रुटि");
//           }
//         } catch (error) {
//           stopLoading();
//           console.error("Error sending audio to backend:", error);
//           setStatusMessage(
//             <span className="text-red-600 font-bold">
//               नेटवर्क त्रुटि वा सर्भर समस्या। (Network or server issue)
//             </span>
//           );
//           setAlternatives("त्रुटि");
//         } finally {
//           setIsRecording(false);
//         }
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       setStatusMessage("सुन्दै छ... बोल्नुहोस्... (Listening... Speak...)");
//     } catch (err) {
//       console.error("Error accessing microphone:", err);
//       setStatusMessage(
//         <span className="text-red-600 font-bold">
//           माईक्रोफोन पहुँच त्रुटि। (Microphone access error.)
//         </span>
//       );
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setStatusMessage(
//         "रोकिनुभयो। अडियो प्रशोधन गर्दै... (Stopped. Processing audio...)"
//       );
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state !== "inactive"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, []);

//   return (
//     <div className="container-card w-full max-w-xl p-8 rounded-lg">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         नेपाली आवाज आदेश (Nepali Voice Command)
//       </h2>

//       <div className="flex justify-center mb-8">
//         <MicrophoneIcon isRecording={isRecording} />
//       </div>

//       <div className="flex justify-center mb-6 space-x-4">
//         <button
//           onClick={startRecording}
//           disabled={isRecording}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           बोल्नुहोस् (Speak)
//         </button>
//         <button
//           onClick={stopRecording}
//           disabled={!isRecording}
//           className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           रोक्नुहोस् (Stop)
//         </button>
//       </div>

//       <p className="text-gray-600 text-lg mb-6 text-center">{statusMessage}</p>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         पहिचान गरिएको पाठ (Recognized Text):
//       </div>
//       <div className="text-display bg-green-100 text-green-700 p-4 rounded-md text-2xl mb-4">
//         {transcribedText}
//       </div>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         आत्मविश्वास स्कोर (Confidence Score):
//       </div>
//       <div className="text-display bg-gray-50 text-gray-700 p-4 rounded-md text-xl mb-4">
//         {confidenceScore}
//       </div>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         वैकल्पिक पहिचान (Alternative Transcriptions):
//       </div>
//       <div className="text-display bg-gray-50 text-gray-600 p-4 rounded-md text-lg mb-8">
//         {alternatives}
//       </div>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         सही वर्तनी (Correct Spelling):
//       </div>
//       <div className="text-display bg-red-100 text-red-700 p-4 rounded-md text-2xl mb-8">
//         {correctedText}
//       </div>
//     </div>
//   );
// };

// // --- Component: VoiceQuiz ---
// const VoiceQuiz = () => {
//   const { statusMessage, startLoading, stopLoading, setStatusMessage } =
//     useLoadingDots();
//   const [transcribedText, setTranscribedText] = useState("...");
//   const [quizQuestion, setQuizQuestion] = useState("");
//   const [quizFeedback, setQuizFeedback] = useState("");
//   const [score, setScore] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);

//   // State to hold fetched quiz questions
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
//   const [questionLoadError, setQuestionLoadError] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Shuffle questions for a random order
//   const shuffleArray = useCallback((array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   }, []);

//   // Function to fetch questions from the backend
//   const fetchQuestions = useCallback(async () => {
//     setIsLoadingQuestions(true);
//     setQuestionLoadError(null);
//     try {
//       const response = await fetch("http://localhost:3001/api/questions"); // Fetch from your backend API
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setQuizQuestions(shuffleArray(data)); // Shuffle and set the fetched questions
//       setIsLoadingQuestions(false);

//       // Load the first question after fetching if questions are available
//       if (data.length > 0) {
//         setQuizQuestion(data[0].question);
//         setStatusMessage("प्रेस गर्नुहोस् 'बोल्नुहोस्' सुरु गर्न...");
//       } else {
//         setQuizQuestion("कुनै प्रश्न उपलब्ध छैनन्। (No questions available.)");
//         setStatusMessage(
//           "Backend मा प्रश्नहरू थप्नुहोस्। (Add questions in backend.)"
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching quiz questions:", error);
//       setQuestionLoadError(
//         "प्रश्नहरू लोड गर्न असफल भयो। (Failed to load questions.)"
//       );
//       setIsLoadingQuestions(false);
//       setQuizQuestion("प्रश्नहरू लोड गर्न असफल भयो।");
//       setStatusMessage("प्रश्नहरू लोड गर्न असफल भयो।");
//     }
//   }, [shuffleArray, setStatusMessage]);

//   // Effect to fetch questions on component mount
//   useEffect(() => {
//     fetchQuestions();
//   }, [fetchQuestions]);

//   // Function to load and display the current question
//   const loadQuestion = useCallback(() => {
//     setQuizFeedback("");
//     setTranscribedText("...");
//     const feedbackDiv = document.getElementById("quizFeedback");
//     if (feedbackDiv) {
//       feedbackDiv.classList.remove("correct", "incorrect");
//     }

//     if (currentQuestionIndex < quizQuestions.length) {
//       setQuizQuestion(quizQuestions[currentQuestionIndex].question);
//       setIsRecording(false);
//       setStatusMessage("प्रेस गर्नुहोस् 'बोल्नुहोस्' सुरु गर्न...");
//     } else {
//       setQuizQuestion("क्विज समाप्त भयो! (Quiz Finished!)");
//       setStatusMessage(
//         `तपाईंको अन्तिम स्कोर: ${score} / ${quizQuestions.length}`
//       );
//       setIsRecording(false);
//     }
//   }, [currentQuestionIndex, quizQuestions, score, setStatusMessage]);

//   // Effect to update question when currentQuestionIndex changes
//   useEffect(() => {
//     if (quizQuestions.length > 0) {
//       loadQuestion();
//     }
//   }, [currentQuestionIndex, quizQuestions, loadQuestion]);

//   // Update score display
//   const updateScoreDisplay = useCallback(() => {
//     document.getElementById(
//       "quizScore"
//     ).textContent = `स्कोर: ${score} / ${quizQuestions.length}`;
//   }, [score, quizQuestions.length]);

//   // Effect to update score display whenever score or questions change
//   useEffect(() => {
//     updateScoreDisplay();
//   }, [score, updateScoreDisplay]);

//   // Handles starting the audio recording for quiz
//   const startRecording = async () => {
//     if (isRecording || currentQuestionIndex >= quizQuestions.length) return;

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       audioChunksRef.current = [];
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/webm",
//         });
//         const formData = new FormData();
//         formData.append("audio", audioBlob, "audio.webm");

//         setTranscribedText("...");
//         setQuizFeedback("");
//         document
//           .getElementById("quizFeedback")
//           .classList.remove("correct", "incorrect");

//         startLoading("अडियो प्रशोधन गर्दै");

//         try {
//           const response = await fetch("http://localhost:3001/transcribe", {
//             method: "POST",
//             body: formData,
//           });

//           const data = await response.json();
//           stopLoading();

//           if (response.ok) {
//             const recognizedText = data.transcribedText || "पहिचान हुन सकेन";
//             const rawCorrectedText =
//               data.correctedText &&
//               data.correctedText.startsWith("सही वर्तनी उपलब्ध छैन: ")
//                 ? recognizedText
//                 : data.correctedText;

//             setTranscribedText(recognizedText);
//             setStatusMessage("पहिचान गरियो! (Recognized!)");

//             // --- Quiz Logic: Check Answer ---
//             const currentQuestionData = quizQuestions[currentQuestionIndex];
//             const currentCorrectAnswers = currentQuestionData.correctAnswers;
//             let isCorrect = false;

//             const recognizedLower = recognizedText.toLowerCase().trim();
//             const correctedLower = rawCorrectedText.toLowerCase().trim();

//             if (
//               currentCorrectAnswers.some(
//                 (ans) => ans.toLowerCase().trim() === recognizedLower
//               ) ||
//               currentCorrectAnswers.some(
//                 (ans) => ans.toLowerCase().trim() === correctedLower
//               )
//             ) {
//               isCorrect = true;
//             }

//             if (isCorrect) {
//               setQuizFeedback("सही! (Correct!)");
//               document.getElementById("quizFeedback").classList.add("correct");
//               setScore((prevScore) => prevScore + 1);
//             } else {
//               setQuizFeedback(
//                 `गलत। सही उत्तर: ${currentCorrectAnswers[0]} (Incorrect. Correct: ${currentCorrectAnswers[0]})`
//               );
//               document
//                 .getElementById("quizFeedback")
//                 .classList.add("incorrect");
//             }
//           } else {
//             setStatusMessage(
//               <span className="text-red-600 font-bold">
//                 त्रुटि: {data.message || "पहिचान असफल"}
//               </span>
//             );
//             console.error("Backend Error:", data);
//           }
//         } catch (error) {
//           stopLoading();
//           console.error("Error sending audio to backend:", error);
//           setStatusMessage(
//             <span className="text-red-600 font-bold">
//               नेटवर्क त्रुटि वा सर्भर समस्या। (Network or server issue)
//             </span>
//           );
//         } finally {
//           setIsRecording(false);
//         }
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       setStatusMessage("सुन्दै छ... बोल्नुहोस्... (Listening... Speak...)");
//     } catch (err) {
//       console.error("Error accessing microphone:", err);
//       setStatusMessage(
//         <span className="text-red-600 font-bold">
//           माईक्रोफोन पहुँच त्रुटि। (Microphone access error.)
//         </span>
//       );
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setStatusMessage(
//         "रोकिनुभयो। अडियो प्रशोधन गर्दै... (Stopped. Processing audio...)"
//       );
//     }
//   };

//   const handleNextQuestion = useCallback(() => {
//     if (currentQuestionIndex < quizQuestions.length) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   }, [currentQuestionIndex, quizQuestions.length]);

//   useEffect(() => {
//     return () => {
//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state !== "inactive"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, []);

//   if (isLoadingQuestions) {
//     return (
//       <div className="container-card w-full max-w-xl p-8 rounded-lg text-center text-xl font-semibold text-gray-700">
//         प्रश्नहरू लोड हुँदैछन्... (Loading questions...)
//         <div className="animate-pulse mt-4 text-blue-600">...</div>
//       </div>
//     );
//   }

//   if (questionLoadError) {
//     return (
//       <div className="container-card w-full max-w-xl p-8 rounded-lg text-center text-xl font-bold text-red-600">
//         {questionLoadError}
//         <button
//           onClick={fetchQuestions}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           पुनः प्रयास गर्नुहोस् (Try Again)
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container-card w-full max-w-xl p-8 rounded-lg">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         नेपाली आवाज क्विज (Nepali Voice Quiz)
//       </h2>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         प्रश्न (Question):
//       </div>
//       <div
//         id="quizQuestion"
//         className="text-display bg-blue-100 text-blue-800 p-4 rounded-md"
//       >
//         {quizQuestion}
//       </div>

//       <div className="flex justify-center mb-6 space-x-4">
//         <button
//           onClick={startRecording}
//           disabled={isRecording || currentQuestionIndex >= quizQuestions.length}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           बोल्नुहोस् (Speak)
//         </button>
//         <button
//           onClick={stopRecording}
//           disabled={
//             !isRecording || currentQuestionIndex >= quizQuestions.length
//           }
//           className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           रोक्नुहोस् (Stop)
//         </button>
//       </div>

//       <p className="text-gray-600 text-lg mb-6 text-center">{statusMessage}</p>

//       <div className="text-label text-gray-700 text-xl font-semibold mb-3">
//         पहिचान गरिएको पाठ (Recognized Text):
//       </div>
//       <div className="text-display bg-green-100 text-green-700 p-4 rounded-md text-2xl mb-4">
//         {transcribedText}
//       </div>

//       <div
//         id="quizFeedback"
//         className={`feedback ${
//           quizFeedback.includes("सही")
//             ? "correct"
//             : quizFeedback.includes("गलत")
//             ? "incorrect"
//             : ""
//         }`}
//       >
//         {quizFeedback}
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={handleNextQuestion}
//           disabled={
//             isRecording || currentQuestionIndex >= quizQuestions.length - 1
//           }
//           className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {currentQuestionIndex < quizQuestions.length - 1
//             ? "अर्को प्रश्न (Next Question)"
//             : "क्विज समाप्त गर्नुहोस् (Finish Quiz)"}
//         </button>
//         <div id="quizScore" className="text-lg">
//           स्कोर: {score} / {quizQuestions.length}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main App Component ---
// export default function Homepage() {
//   const [currentPage, setCurrentPage] = useState("command"); // Default page is 'command'

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       {/* Navigation Bar */}
//       <nav className="w-full max-w-xl bg-white p-4 rounded-lg shadow-md mb-6 flex justify-around">
//         <button
//           onClick={() => setCurrentPage("command")}
//           className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${
//             currentPage === "command"
//               ? "bg-blue-100 text-blue-800"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//         >
//           आदेश उपकरण (Command Tool)
//         </button>
//         <button
//           onClick={() => setCurrentPage("quiz")}
//           className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${
//             currentPage === "quiz"
//               ? "bg-blue-100 text-blue-800"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//         >
//           आवाज क्विज (Voice Quiz)
//         </button>
//       </nav>

//       {/* Information about API usage (common for both pages) */}
//       <p className="info text-sm text-gray-500 text-center mb-4">
//         यो अनुप्रयोगले गुगल क्लाउड स्पीच-टु-टेक्स्ट एपीआई प्रयोग गर्दछ। (This
//         app uses Google Cloud Speech-to-Text API)
//       </p>

//       {/* Conditional Rendering: Render the selected component based on 'currentPage' state */}
//       {currentPage === "command" ? <CommandTool /> : <VoiceQuiz />}
//     </div>
//   );
// }
