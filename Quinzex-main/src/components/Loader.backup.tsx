import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const text = "QUINZEX INTELLIGENCE";
const chars = "ABCDEFGHIKLMNOPQRSTVXYZ$@#&0123456789";

interface LoaderProps {
  onComplete: () => void;
}

const DecryptChar = ({ char, index, isExiting }: { char: string; index: number; isExiting: boolean }) => {
  const [displayChar, setDisplayChar] = useState(chars[Math.floor(Math.random() * chars.length)]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (char === " ") {
      setIsLocked(true);
      setDisplayChar(" ");
      return;
    }

    let iterations = 0;
    const maxIterations = 10 + index * 2;
    
    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setIsLocked(true);
        setDisplayChar(char);
        clearInterval(interval);
      } else {
        setDisplayChar(chars[Math.floor(Math.random() * chars.length)]);
        iterations++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [char, index]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        color: isLocked ? (index < 7 ? "#00d4ff" : "#ffffff") : "#444",
        textShadow: isLocked ? (index < 7 ? "0 0 20px rgba(0,212,255,0.5)" : "0 0 20px rgba(255,255,255,0.3)") : "none"
      }}
      className={`font-display text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter inline-block ${
        char === " " ? "w-4 md:w-8" : ""
      }`}
    >
      {displayChar}
    </motion.span>
  );
};

export default function Loader({ onComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowContent(false);
        onComplete();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Digital Scanline */}
          <motion.div 
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-primary/30 z-10 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
          />

          {/* Background Grid/Noise */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#00d4ff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-20 flex flex-wrap justify-center gap-x-1 px-8 max-w-7xl">
            {text.split("").map((char, i) => (
              <DecryptChar key={i} char={char} index={i} isExiting={isExiting} />
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mt-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="mt-4 font-mono text-[10px] tracking-[0.5em] uppercase text-primary"
          >
            System Intelligence Initialized
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
