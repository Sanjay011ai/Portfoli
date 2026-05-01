"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [inputBuffer, setInputBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Accumulate keystrokes
      if (e.key.length === 1) {
        setInputBuffer((prev) => (prev + e.key).slice(-15));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (inputBuffer.includes("sudo access") && !isOpen) {
      setIsOpen(true);
      setInputBuffer("");
      runSudoSequence();
    }
  }, [inputBuffer, isOpen]);

  const runSudoSequence = () => {
    const sequence = [
      "ROOT ACCESS GRANTED.",
      "OVERRIDING SECURITY PROTOCOLS...",
      "ACCESSING MAINFRAME_DATA/SANJAY_V...",
      "DOWNLOADING CLASSIFIED FILE [RESUME.PDF]...",
      "OPERATION COMPLETE."
    ];

    setLogs([]);
    
    // Switch to critical red theme by applying a class to body
    document.body.classList.add("sudo-mode");

    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, text]);
        
        if (i === sequence.length - 1) {
          // Simulate download
          setTimeout(() => {
            const a = document.createElement("a");
            a.href = "#"; // Replace with actual resume link
            a.download = "Sanjay_V_Resume.pdf";
            a.click();
          }, 1000);
        }
      }, i * 800);
    });
  };

  const closeTerminal = () => {
    setIsOpen(false);
    document.body.classList.remove("sudo-mode");
    setLogs([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl glass border-critical rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.2)]">
            <div className="bg-critical/20 px-4 py-2 border-b border-critical flex justify-between items-center">
              <span className="text-critical font-mono text-sm font-bold">root@sanjay-os:~#</span>
              <button onClick={closeTerminal} className="text-critical hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 font-mono text-critical h-64 overflow-y-auto flex flex-col gap-2">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="mr-2 opacity-50">{'>'}</span>
                  {log}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2.5 h-4 bg-critical mt-2"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
