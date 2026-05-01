"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FolderGit2, Lock, Unlock } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Teacher AI",
    desc: "AI chatbot for education. Generates PDFs from syllabus, includes a Quiz + MCQ system, and utilizes NLP with backend APIs.",
    tags: ["NLP", "AI", "Backend"],
    color: "border-neural/50"
  },
  {
    id: 2,
    title: "AI ATS System",
    desc: "Resume parser (PDF/DOCX) with a candidate ranking system. Reduced manual screening time by 50%.",
    tags: ["Parsing", "Ranking", "Automation"],
    color: "border-security/50"
  },
  {
    id: 3,
    title: "Voice AI Chat Agent",
    desc: "Real-time voice interaction using Speech-to-Text (STT) and Text-to-Speech (TTS). Features intent detection using NLP.",
    tags: ["STT", "TTS", "NLP"],
    color: "border-admin/50"
  },
  {
    id: 4,
    title: "Syllabus to PDF Generator",
    desc: "Converts topics into explanations with images. Provides structured PDF output via a web-based interface.",
    tags: ["Generative AI", "Web App", "PDF"],
    color: "border-neural/50"
  },
  {
    id: 5,
    title: "Sales Data Analytics System",
    desc: "Dashboard for monitoring trends, managing Data cleaning + ETL pipelines, and data visualization for critical decisions.",
    tags: ["ETL", "Analytics", "Dashboards"],
    color: "border-security/50"
  }
];

function TiltCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleUnlock = () => {
    if (isUnlocked || isDecrypting) return;
    setIsDecrypting(true);
    
    // Simulate decryption time
    setTimeout(() => {
      setIsDecrypting(false);
      setIsUnlocked(true);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleUnlock}
      className={`glass p-6 rounded-xl relative overflow-hidden border transition-colors duration-500 ${
        isUnlocked ? project.color : isDecrypting ? 'border-security shadow-[0_0_15px_#00ff9f]' : 'border-critical shadow-[0_0_10px_rgba(255,0,60,0.3)] hover:border-critical/80'
      } group min-h-[250px] cursor-none flex flex-col justify-center`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 h-full flex flex-col w-full"
      >
        {!isUnlocked ? (
          <AnimatePresence mode="wait">
            {!isDecrypting ? (
              <motion.div 
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4 m-auto"
              >
                <div className="p-3 bg-critical/10 rounded-full">
                  <Lock className="w-10 h-10 text-critical" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono text-critical tracking-widest uppercase">
                    Access Level Required
                  </h3>
                  <p className="text-critical/60 font-mono text-xs mt-2 uppercase tracking-widest animate-pulse">
                    [ Click to Initiate Decryption ]
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="decrypting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4 m-auto"
              >
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="p-3 bg-security/10 rounded-full"
                >
                  <Unlock className="w-10 h-10 text-security" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold font-mono text-security tracking-widest uppercase glitch-green" data-text="DECRYPTING DATA">
                    DECRYPTING DATA
                  </h3>
                  <p className="text-security/80 font-mono text-xs mt-2 uppercase tracking-widest">
                    Bypassing security protocols...
                  </p>
                  <motion.div className="w-32 h-1 bg-security/20 mt-4 mx-auto overflow-hidden rounded">
                    <motion.div 
                      className="h-full bg-security"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="h-full flex flex-col"
          >
            <FolderGit2 className="w-8 h-8 text-gray-400 mb-4" />
            
            <h3 className="text-xl font-bold text-white mb-2 font-mono">
              {isHovered ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neural"
                >
                  {`> ROOT_ACCESS: ${project.title.toUpperCase()}`}
                </motion.span>
              ) : (
                project.title
              )}
            </h3>
            
            <p className="text-gray-400 text-sm mb-6 flex-grow">{project.desc}</p>
            
            <div className="flex gap-2 mt-auto flex-wrap">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Matrix rain effect simplified */}
      {(isHovered || isDecrypting) && !isUnlocked && (
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
           <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIiAvPgo8cGF0aCBkPSJNMCAwdjhINHY4SDhWOGgtdjRINFYwaDR2NGgtdjRIMHY0SDQiIGZpbGw9IiMwMGZmOWYiIGZpbGwtb3BhY2l0eT0iMC4xIiAvPgo8L3N2Zz4=')] animate-[slide_10s_linear_infinite]" />
        </div>
      )}
      
      {/* Overlay info */}
      <AnimatePresence>
        {isHovered && isUnlocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 text-xs font-mono text-neural z-20"
          >
            Connected
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { AnimatePresence } from "framer-motion";

export default function ProjectVault() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-4 uppercase tracking-widest">
          <span className="text-neural">/</span> Project_Vault
        </h2>
        <p className="text-gray-500 font-mono mt-2">Classified operational deployments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        {projects.map((project) => (
          <TiltCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
