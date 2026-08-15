import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const text = "QUINZEX INTELLIGENCE";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 5500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202] overflow-hidden"
        >
          {/* Deep Space Background Atmosphere */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
            <div className="absolute inset-0 noise-overlay opacity-50" />
          </div>

          <div className="relative w-full max-w-[90vw] flex flex-col items-center">
            {/* The Main Typography Container */}
            <div className="relative group overflow-visible">

              {/* Reflective Surface (Bottom) */}
              <div
                className="absolute top-[100%] left-0 right-0 h-32 opacity-20 pointer-events-none"
                style={{
                  perspective: '1000px',
                  transform: 'rotateX(180deg) scaleY(1.5)',
                  maskImage: 'linear-gradient(to bottom, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                }}
              >
                <div className="flex justify-between items-center w-full whitespace-nowrap">
                  {text.split("").map((char, i) => (
                    <motion.span
                      key={`mirror-${i}`}
                      initial={{ y: 0 }}
                      animate={{ y: 0 }}
                      className="font-display text-[3.5vw] md:text-[3.8vw] font-black tracking-tighter text-primary blur-[2px]"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* The Horizon Beam */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute top-[100%] left-[-10%] right-[-10%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-30 shadow-[0_0_25px_rgba(196,166,98,0.8)]"
              />

              {/* Emerging Text Container */}
              <div className="relative flex justify-between items-center w-full whitespace-nowrap overflow-hidden py-2">
                {text.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "150%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.8 + i * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-display text-[3.5vw] md:text-[3.8vw] font-black tracking-tighter gradient-text relative z-20"
                  >
                    {char === " " ? "\u00A0" : char}

                    {/* Liquid Sheen Overlay */}
                    <motion.span
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Prestige Status Indicators */}
            <div className="mt-24 flex items-center gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(196,166,98,1)]"
              />
              <motion.p
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 0.4, letterSpacing: "0.5em" }}
                transition={{ duration: 2, delay: 2 }}
                className="font-mono text-[8px] md:text-[10px] uppercase text-cream whitespace-nowrap"
              >
                Forging Digital Excellence
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(196,166,98,1)]"
              />
            </div>
          </div>

          {/* Golden Floating Embers */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: "110%",
                opacity: 0
              }}
              animate={{
                y: "-10%",
                opacity: [0, 0.5, 0],
                x: (Math.random() * 100 - 50) + (Math.random() * 20 - 10) + "%"
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
