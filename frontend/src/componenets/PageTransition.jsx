// components/PageTransition.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PageTransition = ({ trigger }) => {
  const [showDragon, setShowDragon] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowDragon(true);
    }
  }, [trigger]);

  return (
    <>
      {showDragon && (
        <motion.img
          src="/images/dragon.jpeg"
          alt="Flying Dragon"
          className="fixed top-1/3 left-0 z-50 pointer-events-none w-[200px]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onAnimationComplete={() => setShowDragon(false)}
        />
      )}
    </>
  );
};

export default PageTransition;
