"use client";

import { useState, useEffect } from "react";
import Bootloader from "@/components/Bootloader";
import Cursor from "@/components/Cursor";
import NeuralBackground from "@/components/NeuralBackground";
import SystemHUD from "@/components/SystemHUD";
import Hero from "@/components/Hero";
import AIBot from "@/components/AIBot";
import BentoGrid from "@/components/BentoGrid";
import ProjectVault from "@/components/ProjectVault";
import Certificates from "@/components/Certificates";
import TerminalOverlay from "@/components/TerminalOverlay";
import FlyingRobot from "@/components/FlyingRobot";
import { motion } from "framer-motion";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (!booting) {
      // Lock scrolling when system first loads
      document.body.style.overflow = "hidden";
      
      const timer = setTimeout(() => {
        // Unlock scrolling after 4 seconds
        document.body.style.overflow = "";
        setScanComplete(true);
      }, 4000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [booting]);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-neural/30 overflow-hidden">
      {/* Easter Egg Modal overlay */}
      <TerminalOverlay />

      {/* Custom Cursor */}
      <Cursor />

      {booting ? (
        <Bootloader onComplete={() => setBooting(false)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Background system */}
          <NeuralBackground />

          {/* Floating UI Widget */}
          <SystemHUD />

          {/* Dynamic Scrolling Robot Drone (Handles Audio) */}
          <FlyingRobot />

          <div className="relative z-10 w-full">
            <Hero scanComplete={scanComplete} />
            <BentoGrid />
            <ProjectVault />
            <Certificates />
          </div>

          <footer className="relative z-10 p-8 text-center text-xs font-mono text-gray-600 border-t border-white/5 mt-20">
            [SYS_LOG] :: CONNECTED :: PORT 82 :: AI_AGENT_ACTIVE :: END_OF_FILE
          </footer>
        </motion.div>
      )}
    </main>
  );
}
