"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Server, BrainCircuit, Activity } from "lucide-react";

export default function SystemHUD() {
  const [cpuUsage, setCpuUsage] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 20) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
    >
      <div className="glass px-4 py-3 rounded-lg border-l-2 border-l-security flex items-center gap-3 w-48">
        <Server className="w-5 h-5 text-security" />
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">AWS Status</span>
          <span className="text-xs text-security font-bold">ONLINE</span>
        </div>
      </div>

      <div className="glass px-4 py-3 rounded-lg border-l-2 border-l-neural flex items-center gap-3 w-48">
        <Cpu className="w-5 h-5 text-neural" />
        <div className="flex flex-col w-full">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider flex justify-between">
            <span>CPU Load</span>
            <span>{cpuUsage}%</span>
          </span>
          <div className="w-full h-1 bg-gray-800 rounded mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-neural"
              animate={{ width: `${cpuUsage}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="glass px-4 py-3 rounded-lg border-l-2 border-l-admin flex items-center gap-3 w-48">
        <BrainCircuit className="w-5 h-5 text-admin" />
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">AI Models</span>
          <span className="text-xs text-admin font-bold">LOADED</span>
        </div>
      </div>

      <div className="glass px-4 py-3 rounded-lg border-l-2 border-l-critical flex items-center gap-3 w-48">
        <Activity className="w-5 h-5 text-critical" />
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Security</span>
          <span className="text-xs text-critical font-bold">ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
