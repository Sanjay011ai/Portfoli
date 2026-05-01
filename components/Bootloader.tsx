"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";

const terminalLog = [
  "Initializing Sanjay_V_Systems...",
  "Loading Core_Modules...",
  "Verifying Security_Protocols: Sathyabama_IST... [AUTHORIZED]",
  "Mounting AWS_Volumes... [OK]",
  "Initializing Neural_Networks: TensorFlow, PyTorch... [OK]",
  "Establishing Secure Connection...",
  "Authenticating Administrator...",
  "Bypassing encryption...",
  "Welcome, <span class=\"animate-pulse font-bold\" style=\"text-shadow: 0 0 15px #00ff9f;\">Sanjay</span>."
];

const threatAlerts = [
  "WARNING: UNAUTHORIZED PING SWEEP DETECTED",
  "ALERT: FIREWALL BREACH ATTEMPT AT PORT 22",
  "CRITICAL: PROXY ROUTING FAILED",
  "INTRUSION DETECTED: NEURAL NET DECOY DEPLOYED",
];

const playBeep = (audioCtx: AudioContext, type: "normal" | "alert" = "normal") => {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Explicitly start at current time
    osc.start(audioCtx.currentTime);
    
    if (type === "normal") {
      osc.type = 'square';
      osc.frequency.setValueAtTime(200 + Math.random() * 800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.stop(audioCtx.currentTime + 0.3);
    }
  } catch (error) {
    console.warn("Audio scheduling error:", error);
  }
};

const NeuralLinesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const nodes = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 159, 0.6)";
      ctx.strokeStyle = "rgba(0, 255, 159, 0.15)";
      ctx.lineWidth = 1;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

export default function Bootloader({ onComplete }: { onComplete: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const startBootSequence = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted) return;

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLog.length) {
        setLogs((prev) => [...prev, terminalLog[currentLine]]);
        if (audioCtxRef.current) playBeep(audioCtxRef.current, "normal");
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete(), 3000);
      }
    }, 500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setActiveAlert(threatAlerts[Math.floor(Math.random() * threatAlerts.length)]);
        if (audioCtxRef.current) playBeep(audioCtxRef.current, "alert");
        
        setTimeout(() => setActiveAlert(null), 1500);
      }
    }, 2500);

    return () => clearInterval(alertInterval);
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
        className="fixed inset-0 z-[100] bg-[#050505] flex flex-col md:flex-row overflow-hidden font-mono"
      >
        <NeuralLinesBackground />
        
        {/* LEFT: Cyber Logs & Threat Alerts */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-12 flex flex-col justify-end relative z-10 border-b md:border-b-0 md:border-r border-security/20">
          <div className="flex-1 flex flex-col justify-end gap-2 overflow-hidden">
            {logs.map((log, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-1 text-security text-xs md:text-sm">
                <span className="text-gray-500 mr-2">{'>'}</span>
                <span dangerouslySetInnerHTML={{ __html: (log || "").replace(/\[OK\]|\[AUTHORIZED\]/, (match) => `<span class="text-white font-bold">${match}</span>`) }} />
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-security mt-1"
            />
          </div>
          
          <div className="h-16 mt-4">
            <AnimatePresence>
              {activeAlert && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-2 md:p-3 text-xs md:text-sm animate-pulse flex items-center shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                >
                  <span className="font-bold mr-2">[!]</span>
                  {activeAlert}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: AI Brain Visual */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center relative z-10 bg-security/5">
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            {/* Concentric rings */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-48 h-48 md:w-80 md:h-80 border-2 border-security rounded-full shadow-[0_0_30px_rgba(0,255,159,0.3)]"
            />
            <motion.div
              animate={{ scale: [1.1, 1.5, 1.1], opacity: [0.1, 0.4, 0.1], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute w-56 h-56 md:w-96 md:h-96 border border-dashed border-security rounded-full"
            />
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute w-32 h-32 md:w-64 md:h-64 border border-security/50 rounded-full"
            />
            
            {/* Brain Icon */}
            <motion.div
              animate={{ filter: ["drop-shadow(0 0 10px #00ff9f)", "drop-shadow(0 0 35px #00ff9f)", "drop-shadow(0 0 10px #00ff9f)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10"
            >
              <BrainCircuit className="w-24 h-24 md:w-40 md:h-40 text-security" strokeWidth={1.2} />
            </motion.div>
            
            {/* Scanning line effect over the brain area */}
            <motion.div 
              animate={{ top: ["-20%", "120%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-security/60 shadow-[0_0_15px_#00ff9f] z-20 mx-auto w-1/2 md:w-1/3"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
