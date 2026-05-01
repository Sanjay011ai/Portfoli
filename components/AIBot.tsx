"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Volume2, VolumeX } from "lucide-react";

export default function AIBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const hasTriggered = useRef(false);

  const fullText = "Sanjay is an aspiring AI Engineer currently pursuing a B.E. in Computer Science with Artificial Intelligence. He has hands-on experience in developing AI-driven systems including a Teacher AI platform, voice chat agents, and an AI-based Applicant Tracking System. He is skilled in Python, machine learning frameworks, and cloud technologies like AWS, with a focus on building scalable and intelligent applications.";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsVisible(true);
        startSpeaking();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startSpeaking = () => {
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsVisible(false), 8000); // Hide after a while
      }
    }, 40);

    // Text to Speech
    if ('speechSynthesis' in window && !isMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.9;
      utterance.pitch = 0.8; // slightly robotic/lower pitch
      
      // Try to find a good robotic/english voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Microsoft David") || v.name.includes("Zira"));
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
    setIsMuted(!isMuted);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          className="fixed bottom-6 left-6 z-[150] max-w-sm"
        >
          <div className="glass border-neural/50 p-4 rounded-xl flex items-start gap-4 shadow-[0_0_30px_rgba(0,234,255,0.15)]">
            <div className="bg-neural/20 p-2 rounded-lg relative">
              <Bot className="text-neural w-6 h-6 animate-pulse" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-security rounded-full animate-ping" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-neural font-bold font-mono tracking-widest">SYS_AI_AGENT</span>
                <button onClick={toggleMute} className="text-gray-500 hover:text-neural transition-colors">
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
              <p className="text-sm font-mono text-gray-300 leading-relaxed">
                {text}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-block w-2 h-3 bg-neural ml-1 align-middle"
                />
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
