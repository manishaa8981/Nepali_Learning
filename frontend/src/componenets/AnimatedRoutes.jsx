// components/AnimatedRoutes.js
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import KidLearnApp from "../componenets/Kidzee";
import PageTransition from "../componenets/PageTransition";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/LandingPage";
import PronunciationTutor from "../pages/PronounciationTutor";
import QuizGenerator from "../pages/QuizPage";
import NepaliVocabularyTeacher from "../pages/Vocab";

const AnimatedRoutes = () => {
  const location = useLocation();
  const [triggerDragon, setTriggerDragon] = useState(false);

  useEffect(() => {
    setTriggerDragon(true);
  }, [location.pathname]);

  return (
    <>
      <PageTransition trigger={triggerDragon} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/kidzee" element={<KidLearnApp />} />
        <Route path="/quiz" element={<QuizGenerator />} />
        <Route path="/vocab" element={<NepaliVocabularyTeacher />} />
        <Route path="/pronounciation" element={<PronunciationTutor />} />
        <Route path="/pagetransition" element={<PageTransition />} />
      </Routes>
    </>
  );
};

export default AnimatedRoutes;
