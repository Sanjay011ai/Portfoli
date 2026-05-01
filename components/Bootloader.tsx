"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLog = [
  "Initializing Sanjay_V_Systems...",
  "Verifying Security_Protocols: Sathyabama_IST... [AUTHORIZED]",
  "Mounting AWS_Volumes... [OK]",
  "Initializing Neural_Networks: TensorFlow, PyTorch... [OK]",
  "Authenticating Administrator...",
  "Bypassing encryption...",
  "Welcome, <span class=\"animate-pulse font-bold\" style=\"text-shadow: 0 0 15px #00ff9f;\">Sanjay</span>."
];

const javaExploit = `public class Exploit {
  public static void main(String[] args) {
    String payload = "0xdeadbeef";
    for (int i = 0; i < 10; i++) {
      System.out.println("Injecting: " + payload);
    }
    System.out.println("Exploit executed.");
  }
}`;

const playBeep = (audioCtx: AudioContext) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'square';
  // Randomize pitch for a "data processing" sound
  osc.frequency.setValueAtTime(200 + Math.random() * 800, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
};

export default function Bootloader({ onComplete }: { onComplete: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [wave, setWave] = useState<number[]>([]);
  const [bgText, setBgText] = useState("");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const startBootSequence = () => {
    // Initialize audio context on user interaction
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted) return;

    // Generate faint background text
    setBgText(
      Array.from({ length: 3000 })
        .map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94)))
        .join("")
    );

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLog.length) {
        setLogs((prev) => [...prev, terminalLog[currentLine]]);
        if (audioCtxRef.current) playBeep(audioCtxRef.current);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete(), 2500);
      }
    }, 400);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const waveInterval = setInterval(() => {
      setWave(Array.from({ length: 35 }, () => Math.random() * 100));
      // Add occasional tiny rapid beeps to simulate processing
      if (Math.random() > 0.7 && audioCtxRef.current) {
        playBeep(audioCtxRef.current);
      }
    }, 100);
    return () => clearInterval(waveInterval);
  }, [hasStarted]);

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex justify-center items-center font-mono">
        <button 
          onClick={startBootSequence}
          className="px-8 py-3 border-2 border-security text-security hover:bg-security hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,159,0.5)] animate-pulse"
        >
          [ INITIALIZE SYSTEM ]
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-[#050505] flex justify-center items-center overflow-hidden font-mono"
      >
        {/* Faint background matrix code text */}
        <div className="absolute inset-0 opacity-[0.15] text-security text-xs sm:text-sm break-all overflow-hidden leading-tight select-none">
          {bgText}
        </div>

        {/* Box 1: Waveform (Top Left) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[15%] left-[5%] md:left-[20%] w-64 h-32 border-2 border-security bg-black/80 shadow-[0_0_25px_rgba(0,255,159,0.6)] p-3 flex items-end justify-between gap-[2px] z-10"
        >
          {wave.map((h, i) => (
            <motion.div
              key={i}
              className="w-full bg-security"
              style={{ height: `${h}%` }}
              layout
            />
          ))}
        </motion.div>

        {/* Box 2: Java Exploit (Middle overlaying slightly) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[35%] left-[10%] md:left-[25%] w-72 md:w-96 border-2 border-security bg-black/90 shadow-[0_0_25px_rgba(0,255,159,0.6)] p-4 text-security text-[10px] md:text-xs whitespace-pre z-20"
        >
          {javaExploit}
        </motion.div>

        {/* Box 3: Terminal Logs (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-[25%] right-[5%] md:right-[20%] w-60 md:w-72 h-48 border-2 border-security bg-black/90 shadow-[0_0_25px_rgba(0,255,159,0.6)] p-4 text-security text-xs z-30 flex flex-col justify-end"
        >
          {logs.map((log, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1">
              <span className="text-gray-500 mr-2">{'>'}</span>
              <span dangerouslySetInnerHTML={{ __html: (log || "").replace(/\[OK\]|\[AUTHORIZED\]/, (match) => `<span class="text-white font-bold">${match}</span>`) }} />
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-security mt-1"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
