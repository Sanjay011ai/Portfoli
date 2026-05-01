"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  "Initializing Sanjay_V_Systems...",
  "Loading Core_Modules...",
  "Verifying Security_Protocols: Sathyabama_IST... [AUTHORIZED]",
  "Mounting AWS_Volumes... [OK]",
  "Initializing Neural_Networks: TensorFlow, PyTorch... [OK]",
  "Connecting to Mainframe...",
  "Welcome, Administrator."
];

export default function Bootloader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsGlitching(true), 500);
        setTimeout(() => onComplete(), 1500);
      }
    }, 300);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-[100] bg-background flex flex-col justify-center items-start p-10 font-mono text-sm sm:text-lg text-security ${isGlitching ? 'glitch' : ''}`}
        data-text="SYSTEM FAILURE"
      >
        <div className="max-w-3xl w-full mx-auto">
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              <span className="text-gray-500 mr-2">{'>'}</span>
              <span dangerouslySetInnerHTML={{ __html: line ? line.replace(/\[OK\]|\[AUTHORIZED\]/, (match) => `<span class="text-neural">${match}</span>`) : "" }} />
            </motion.div>
          ))}
          {!isGlitching && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-security inline-block ml-2 mt-1 align-middle"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
