"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function Hero({ scanComplete = false }: { scanComplete?: boolean }) {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const subtitles = ["[AI Agent Creator]", "[Ethical Hacker]", "[System Administrator]"];
  
  const [phase, setPhase] = useState(0);
  const [lockedCount, setLockedCount] = useState(0);
  const name = "SANJAY V";
  const [glitchText, setGlitchText] = useState("S@N#A! V");

  useEffect(() => {
    // Phase 0: Broken Signal (0-2s)
    const t1 = setTimeout(() => setPhase(1), 2000);
    // Phase 1: AI Processing Overlay (2-4s)
    const t2 = setTimeout(() => setPhase(2), 4000);
    // Phase 2: Letter Lock-In (4-6s)
    const t3 = setTimeout(() => setPhase(3), 6000);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    // Random chaotic text for phase 0 and 1
    if (phase < 2) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
      const interval = setInterval(() => {
        setGlitchText(name.split('').map(c => c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 2) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setLockedCount(count);
        if (count >= name.length) clearInterval(interval);
      }, 250); // 8 chars * 250 = 2 seconds
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 3) {
      const interval = setInterval(() => {
        setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [phase, subtitles.length]);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center w-full"
      >
        <div className="relative">
          {/* Phase 0 & 1: AI Reconstruction HUD */}
          <AnimatePresence>
            {phase < 3 && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
              >
                {/* Scanning line */}
                {phase === 1 && (
                  <motion.div 
                    animate={{ top: ["-20%", "120%", "-20%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute w-[120%] h-[2px] bg-security/80 shadow-[0_0_15px_#00ff9f] left-[-10%] z-30"
                  />
                )}
                
                {/* Left label */}
                <div className="absolute left-[-20px] md:left-[-140px] top-[10%] text-left text-[10px] md:text-xs font-mono text-security/70 whitespace-nowrap">
                  {phase === 0 && <span className="text-critical animate-pulse font-bold">[ERROR] Signal unstable...</span>}
                  {phase > 0 && <span>{'>'} Parsing identity string...</span>}
                </div>
                
                {/* Right label */}
                <div className="absolute right-[-20px] md:right-[-140px] bottom-[10%] text-right text-[10px] md:text-xs font-mono text-security/70 whitespace-nowrap">
                  {phase === 0 && <span className="text-critical animate-pulse font-bold">[AI] Attempting reconstruction...</span>}
                  {phase > 0 && <span>{'>'} Resolving character fragments...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Title */}
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter relative z-10 flex space-x-1 md:space-x-2">
            {phase < 2 ? (
              <span className={`text-white/60 ${phase === 0 ? 'glitch drop-shadow-[0_0_20px_rgba(255,0,60,0.6)] text-critical/80' : 'glitch-green drop-shadow-[0_0_20px_rgba(0,255,159,0.4)] text-security/80'}`} data-text={glitchText}>
                {glitchText}
              </span>
            ) : (
              name.split('').map((char, i) => {
                const isLocked = phase === 3 || i < lockedCount;
                if (char === ' ') return <span key={i} className="w-4 md:w-8"></span>;
                
                return (
                  <span 
                    key={i} 
                    className={
                      isLocked 
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)] animate-[pulse_3s_ease-in-out_infinite]"
                        : "text-security/40 glitch-green"
                    }
                    data-text={isLocked ? char : "X@#$%"[Math.floor(Math.random() * 5)]}
                  >
                    {isLocked ? char : "X@#$%"[Math.floor(Math.random() * 5)]}
                  </span>
                );
              })
            )}
          </h1>
        </div>

        {/* Phase 3: Final Subtitle & Confirmation */}
        <div className="h-24 md:h-32 overflow-hidden relative mt-2 flex flex-col items-center justify-center">
          <AnimatePresence>
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="h-10 md:h-14 overflow-hidden">
                  <motion.div
                    key={subtitleIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="text-lg md:text-3xl font-mono text-gray-300 tracking-[0.2em] uppercase font-light"
                  >
                    <span className="text-security opacity-50 mr-2">/</span>
                    {subtitles[subtitleIdx]}
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-[10px] md:text-xs font-mono text-security bg-security/10 border border-security/30 px-3 py-1 rounded tracking-widest shadow-[0_0_10px_rgba(0,255,159,0.2)]"
                >
                  [ PROFILE VERIFIED ]
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="mt-8 md:mt-16 flex flex-col items-center gap-4"
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
