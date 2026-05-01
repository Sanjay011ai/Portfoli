"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, glitchVariant } from "@/lib/animations";
import { Terminal, Code2, Database, ShieldAlert, ChevronDown } from "lucide-react";

export default function BentoGrid() {
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const experiences = [
    { 
      id: 1,
      company: "Nexudo", 
      role: "Associative SaaS",
      status: "ACTIVE",
      points: [
        "Architected scalable sales analytics systems.",
        "Engineered comprehensive dashboards for deep data insights.",
      ]
    },
    { 
      id: 2,
      company: "Rudhra Info Solutions", 
      role: "AI Developer Intern",
      status: "COMPLETED",
      points: [
        "Developed advanced AI models for internal tools.",
        "Optimized data processing, improving overall performance by 33%.",
        "Built and deployed intelligent system pipelines."
      ]
    }
  ];

  const skills = [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 85 },
    { name: "TensorFlow", level: 90 },
    { name: "AWS", level: 80 },
  ];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
      >
        {/* About Module */}
        <motion.div variants={glitchVariant} className="glass p-8 rounded-2xl md:col-span-2 relative group overflow-hidden border border-neural/20 hover:border-neural/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldAlert size={100} />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-neural uppercase tracking-wider flex items-center gap-3">
            <Terminal size={24} /> Identity Module
          </h2>
          <div className="space-y-4 relative z-10">
            <div>
              <p className="text-xs text-gray-500 uppercase">Designation</p>
              <p className="text-lg font-mono">B.E. Computer Science (AI)</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Institution</p>
              <p className="text-lg font-mono">Sathyabama Institute of Science and Technology</p>
            </div>
            <div className="pt-4 border-t border-white/10 flex gap-4">
              <span className="px-3 py-1 bg-admin/20 text-admin rounded text-xs border border-admin/30">AWS Architect</span>
              <span className="px-3 py-1 bg-security/20 text-security rounded text-xs border border-security/30">AI Specialist</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Module */}
        <motion.div variants={glitchVariant} className="glass p-8 rounded-2xl flex flex-col justify-between border border-neural/20 hover:border-neural/50 transition-colors">
          <h2 className="text-xl font-bold text-neural uppercase tracking-wider mb-4">Uplink</h2>
          <div className="space-y-3 font-mono text-sm">
            <a href="mailto:sanjay.v82@outlook.com" className="block hover:text-neural transition-colors">{'[EMAIL]'} sanjay.v82@outlook.com</a>
            <a href="tel:+918248464388" className="block hover:text-neural transition-colors">{'[COMM]'} +91 8248464388</a>
            <a href="#" className="block hover:text-neural transition-colors">{'[GIT]'} Sanjay011ai</a>
            <a href="#" className="block hover:text-neural transition-colors">{'[NET]'} Sanjay V</a>
          </div>
        </motion.div>

        {/* Experience Module (Interactive Accordion) */}
        <motion.div variants={glitchVariant} className="glass p-8 rounded-2xl md:col-span-2 border border-security/30 font-mono flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-security uppercase tracking-wider flex items-center gap-3">
            <Database size={20} /> Deployment Logs
          </h2>
          <div className="space-y-3 bg-black/50 p-4 rounded-lg border border-white/5 flex-grow">
            {experiences.map((exp) => (
              <div 
                key={exp.id} 
                className={`border border-white/10 rounded-lg overflow-hidden transition-colors ${expandedExp === exp.id ? 'bg-security/5 border-security/30' : 'hover:border-white/20'}`}
              >
                <button
                  onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                  className="w-full flex justify-between items-center p-3 text-sm text-left focus:outline-none cursor-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-gray-200 font-bold">{exp.company}</span>
                    <span className="text-gray-500 hidden sm:block">|</span>
                    <span className="text-gray-400 text-xs">{exp.role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${exp.status === 'ACTIVE' ? 'bg-security/20 text-security' : 'bg-admin/20 text-admin'}`}>
                      [{exp.status}]
                    </span>
                    <motion.div
                      animate={{ rotate: expandedExp === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="text-gray-500" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedExp === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-4 pt-0 border-t border-white/5 mt-1">
                        <ul className="space-y-2 mt-3">
                          {exp.points.map((point, i) => (
                            <li key={i} className="flex gap-2 text-xs text-gray-300">
                              <span className="text-security opacity-50">{'->'}</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Module */}
        <motion.div variants={glitchVariant} className="glass p-8 rounded-2xl border border-admin/30">
          <h2 className="text-xl font-bold mb-6 text-admin uppercase tracking-wider flex items-center gap-3">
            <Code2 size={20} /> Technical Arsenal
          </h2>
          <div className="space-y-5">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-admin">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-black/50 rounded overflow-hidden">
                  <motion.div 
                    className="h-full bg-admin"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
