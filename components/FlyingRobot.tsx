import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Bot, Feather } from "lucide-react";

export default function FlyingRobot() {
  const { scrollY, scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const hasSpoken1 = useRef(false);
  const hasSpoken2 = useRef(false);
  
  const [activeBot, setActiveBot] = useState<1 | 2 | null>(null);
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  
  const text1 = "Sanjay is an aspiring AI Engineer currently pursuing a B.E. in Computer Science with Artificial Intelligence.";
  const text2 = "He has hands-on experience in developing AI-driven systems including a Teacher AI platform, voice chat agents, and an AI-based Applicant Tracking System. He is skilled in Python, machine learning frameworks, and cloud technologies like AWS.";

  const typeText = (text: string, setter: (val: string) => void) => {
    let i = 0;
    setter("");
    const interval = setInterval(() => {
      setter(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return interval;
  };

  useEffect(() => {
    setMounted(true);
    
    // Make sure voices are loaded
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    const handleScroll = () => {
      if (window.scrollY > 200 && !hasSpoken1.current) {
        hasSpoken1.current = true;
        speakBot1();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speakBot1 = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setActiveBot(1);
      typeText(text1, setTypedText1);
      
      const utterance1 = new SpeechSynthesisUtterance(text1);
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => v.name.includes("Male") || v.name.includes("David") || v.name.includes("Google UK English Male"));
      if (maleVoice) utterance1.voice = maleVoice;
      utterance1.rate = 0.9;
      
      utterance1.onend = () => {
        setActiveBot(null);
        if (!hasSpoken2.current) {
          hasSpoken2.current = true;
          setTimeout(() => speakBot2(), 500); // small pause before switching
        }
      };

      window.speechSynthesis.speak(utterance1);
    }
  };

  const speakBot2 = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setActiveBot(2);
      typeText(text2, setTypedText2);
      
      const utterance2 = new SpeechSynthesisUtterance(text2);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Zira") || v.name.includes("Google UK English Female"));
      if (femaleVoice) utterance2.voice = femaleVoice;
      utterance2.rate = 0.95;
      utterance2.pitch = 1.1;
      
      utterance2.onend = () => {
        setTimeout(() => setActiveBot(null), 4000); // Leave bubble open for 4 seconds then hide
      };
      
      window.speechSynthesis.speak(utterance2);
    }
  };

  // Smooth out the scroll value for rotation/swerving
  const smoothY = useSpring(scrollY, { stiffness: 50, damping: 20, mass: 1 });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 1 });

  const yPos1 = useTransform(smoothProgress, [0, 1], [100, typeof window !== "undefined" ? window.innerHeight - 200 : 800]);
  const yPos2 = useTransform(smoothProgress, [0, 1], [300, typeof window !== "undefined" ? window.innerHeight - 100 : 900]);

  const xPos1 = useTransform(smoothY, (value) => Math.sin(value / 150) * 30);
  const xPos2 = useTransform(smoothY, (value) => Math.cos(value / 150) * 30);

  const rotate1 = useTransform(smoothY, (value) => Math.cos(value / 150) * 15);
  const rotate2 = useTransform(smoothY, (value) => Math.sin(value / 150) * 15);

  if (!mounted) return null;

  const renderRobot = (x: any, y: any, rotate: any, positionClass: string, isRight: boolean, isActive: boolean, typedText: string) => (
    <motion.div
      style={{ y, x }}
      className={`fixed ${positionClass} top-0 z-[110] pointer-events-none flex flex-col items-center justify-center`}
    >
      <div className="relative">
        {/* Speech Bubble Overlay (Stable, No Rotation) */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute top-1/2 -translate-y-1/2 ${isRight ? 'right-16' : 'left-16'} w-[250px] md:w-[300px] glass p-4 rounded-xl border border-neural/50 shadow-[0_0_20px_rgba(0,234,255,0.2)]`}
            >
              <p className="text-xs font-mono text-gray-300 leading-relaxed">
                {typedText}
                <span className="inline-block w-1.5 h-3 bg-neural ml-1 animate-pulse align-middle" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Robot and Feathers (Rotates with scroll) */}
        <motion.div style={{ rotate }} className="relative">
          {/* The Robot */}
          <div className={`bg-background border ${isActive ? 'border-security' : 'border-neural'} p-3 rounded-full shadow-[0_0_20px_rgba(0,234,255,0.4)] relative z-10 transition-colors duration-300`}>
            <Bot size={32} className={`${isActive ? 'text-security' : 'text-neural'} animate-pulse transition-colors duration-300`} />
          </div>

          {/* Feathers trailing */}
          <motion.div 
            animate={{ rotate: [-10, 10, -10], y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
            className={`absolute -top-4 ${isRight ? 'left-6' : '-left-6'} opacity-60`}
          >
            <Feather size={20} className="text-white" />
          </motion.div>

          <motion.div 
            animate={{ rotate: [15, -15, 15], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.2 }}
            className={`absolute -top-6 ${isRight ? '-left-2' : 'right-0'} opacity-80`}
          >
            <Feather size={24} className="text-security" />
          </motion.div>

          <motion.div 
            animate={{ rotate: [-20, 20, -20], x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
            className={`absolute top-4 ${isRight ? 'left-8' : '-right-8'} opacity-50`}
          >
            <Feather size={18} className="text-admin" />
          </motion.div>

          {/* Thruster flame effect */}
          <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-10 bg-gradient-to-b ${isActive ? 'from-security' : 'from-neural'} to-transparent blur-md rounded-full opacity-60 transition-colors duration-300`} />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      {renderRobot(xPos1, yPos1, rotate1, "left-4 md:left-12", false, activeBot === 1, typedText1)}
      {renderRobot(xPos2, yPos2, rotate2, "right-4 md:right-12", true, activeBot === 2, typedText2)}
    </>
  );
}
