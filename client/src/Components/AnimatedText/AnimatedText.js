import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedText.css"

const AnimatedText = ({ sentences, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
    }, interval);

    return () => clearInterval(timer);
  }, [sentences, interval]);

  return (
    <div className="animated_text_cnt">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {sentences[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText;
