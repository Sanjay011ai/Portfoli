"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Award } from "lucide-react";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const certificates = [
    { id: 1, name: "AWS Cloud Practitioner", date: "2023", file: "/aws-certificate.pdf" },
    { id: 2, name: "TensorFlow Developer", date: "2024", file: "/tf-certificate.pdf" },
    { id: 3, name: "Advanced NLP Certification", date: "2024", file: "/nlp-certificate.pdf" }
  ];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-4 uppercase tracking-widest">
          <span className="text-neural">/</span> Certifications
        </h2>
        <p className="text-gray-500 font-mono mt-2">Verified credentials and professional achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCert(cert.file)}
            className="glass p-6 rounded-xl flex items-center justify-between cursor-none border border-neural/20 hover:border-neural/80 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-admin group-hover:text-neural transition-colors" />
              <div>
                <h3 className="text-white font-mono font-bold text-sm">{cert.name}</h3>
                <p className="text-gray-500 text-xs">Issued: {cert.date}</p>
              </div>
            </div>
            <FileText className="w-5 h-5 text-gray-500 group-hover:text-neural transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl h-[80vh] bg-background border border-neural/50 rounded-xl overflow-hidden relative flex flex-col shadow-[0_0_40px_rgba(0,234,255,0.1)]"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-neural/20 bg-black/50">
                <span className="font-mono text-neural text-sm tracking-widest">VIEWER // SECURE_UPLINK</span>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-critical transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow p-1 bg-black relative">
                {/* Fallback for when the PDF doesn't actually exist in public folder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 z-0">
                  <FileText className="w-20 h-20 text-gray-600 mb-4" />
                  <p className="text-gray-500 font-mono text-sm">Please place PDF files in the /public folder to render.</p>
                </div>

                <iframe 
                  src={`${selectedCert}#toolbar=0`} 
                  className="w-full h-full relative z-10"
                  title="Certificate PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
