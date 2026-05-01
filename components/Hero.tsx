"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textScramble } from "@/lib/animations";

export default function Hero({ scanComplete = false }: { scanComplete?: boolean }) {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const subtitles = ["[AI Agent Creator]", "[Ethical Hacker]", "[System Administrator]"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center w-full"
      >
        <motion.h1 
          className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 glitch-green drop-shadow-[0_0_30px_rgba(0,255,159,0.5)]"
          data-text="SANJAY V"
          variants={textScramble}
          initial="hidden"
          animate="visible"
        >
          SANJAY V
        </motion.h1>

        <div className="h-14 overflow-hidden relative mt-2">
          <motion.div
            key={subtitleIdx}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-xl md:text-3xl font-mono text-gray-300 tracking-[0.2em] uppercase font-light"
          >
            <span className="text-neural opacity-50 mr-2">/</span>
            {subtitles[subtitleIdx]}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className={`text-xs uppercase tracking-[0.4em] font-mono transition-colors duration-500 ${scanComplete ? 'text-security' : 'text-neural/60 animate-pulse'}`}>
            {scanComplete ? 'System Scan Complete [Unlocked]' : 'System Scan in Progress'}
          </div>
          <motion.div 
            animate={{ y: scanComplete ? 0 : [0, 15, 0], opacity: scanComplete ? 0.8 : [0.3, 1, 0.3] }} 
            transition={{ repeat: scanComplete ? 0 : Infinity, duration: 2.5, ease: "easeInOut" }}
            className={`w-[1px] h-20 bg-gradient-to-b ${scanComplete ? 'from-security to-transparent' : 'from-neural to-transparent'}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
