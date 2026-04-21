import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const textPrimary = "QUINZEX";
const textSecondary = "INTELLIGENCE";

interface LoaderProps {
  onComplete: () => void;
}

// Reusable component 
const AnimatedLetter = ({ char, index, baseDelay, sizeClass, strokeWidth, triggerHaptics, userInteracted }: any) => {
  if (char === " ") return <span className="w-4 md:w-8 inline-block" />;

  // Trigger Haptic Feedback when the stroke starts
  useEffect(() => {
    if (!triggerHaptics || !userInteracted) return;

    // Calculate the exact moment this letter starts drawing
    const timing = (baseDelay + (index * 0.3)) * 1000;
    // Add delay so vibration happens slightly after stroke starts
    const vibrationDelay = timing + 100; // 100ms after stroke starts (reduced from 800ms)

    const timer = setTimeout(() => {
      // Short, sharp vibration (Taptic Engine feel)
      console.log(`🔔 Attempting vibration for letter "${char}" at index ${index}`);

      if ('vibrate' in navigator) {
        const success = navigator.vibrate(200); // 50ms short pulse for distinct feel
        console.log(`✅ Vibration API called for "${char}":`, success);
      } else {
        console.warn('❌ Vibration API not supported on this device/browser');
      }
    }, vibrationDelay);

    return () => clearTimeout(timer);
  }, [baseDelay, index, triggerHaptics, userInteracted, char]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ghost Letter for Layout */}
      <span className={`font-display font-black tracking-widest text-transparent select-none leading-none ${sizeClass}`}>
        {char}
      </span>

      {/* SVG Overlay for Animation */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-display font-black ${sizeClass}`}
          fill="url(#gold-gradient)"
          fillOpacity="0"
          stroke="url(#gold-stroke)"
          strokeWidth={strokeWidth}
          strokeDasharray="1000"
          strokeDashoffset="1000"
          animate={{
            strokeDashoffset: 0,
            fillOpacity: 1
          }}
          transition={{
            strokeDashoffset: {
              duration: 2,
              ease: "easeInOut",
              delay: baseDelay + (index * 0.3)
            },
            fillOpacity: {
              duration: 1.5,
              ease: "linear",
              delay: baseDelay + (index * 0.3) + 1.8
            }
          }}
          style={{
            filter: "drop-shadow(0 0 2px rgba(196,166,98,0.5))"
          }}
        >
          {char}
        </motion.text>
      </svg>
    </div>
  );
};

export default function Loader({ onComplete }: LoaderProps) {
  const [showContent, setShowContent] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-start on desktop (no vibration support needed)
      if (!mobile) {
        setUserInteracted(true);
        setShowStartButton(false);
      }
    };
    checkMobile();
  }, []);

  const handleStartExperience = () => {
    console.log('🚀 User clicked Start Experience button');
    console.log('📱 Device info:', {
      userAgent: navigator.userAgent,
      vibrateSupported: 'vibrate' in navigator,
      platform: navigator.platform
    });

    // Test vibration immediately on click
    if ('vibrate' in navigator) {
      const testResult = navigator.vibrate(150); // Longer test vibration for clear feedback
      console.log('🧪 Test vibration result:', testResult);
    }

    setUserInteracted(true);
    setShowStartButton(false);
  };

  useEffect(() => {
    if (!userInteracted) return;

    // Exit sequence - only starts after user interaction
    const completeTimer = setTimeout(() => {
      setShowContent(false);
      setTimeout(onComplete, 1200);
    }, 7500);

    return () => clearTimeout(completeTimer);
  }, [onComplete, userInteracted]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 15,
            filter: "blur(20px)"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#C4A662]"
        >

          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4A662" />
                <stop offset="50%" stopColor="#FAE19D" />
                <stop offset="100%" stopColor="#C4A662" />
              </linearGradient>

              <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" />
                <stop offset="100%" stopColor="#C4A662" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-center gap-6">

            {/* --- COOKIE CONSENT MODAL (Mobile Only) --- */}
            {showStartButton && isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 left-4 right-4 z-50 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md sm:bottom-8"
              >
                <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#C4A662]/20 rounded-2xl p-4 sm:p-6 shadow-[0_8px_32px_rgba(196,166,98,0.15)]">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-[#C4A662] font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">🍪 We value your privacy</h3>
                      <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                        We use cookies to enhance your experience and provide personalized content. By continuing, you agree to our use of cookies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <button
                      onClick={handleStartExperience}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#C4A662] to-[#FAE19D] text-[#050505] font-semibold text-[10px] sm:text-xs tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,166,98,0.4)] active:scale-95"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleStartExperience}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 border border-[#C4A662]/30 text-[#C4A662] font-semibold text-[10px] sm:text-xs tracking-wide uppercase rounded-lg transition-all duration-300 hover:bg-[#C4A662]/10 active:scale-95"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- PRIMARY TEXT: QUINZEX (Only animates after user interaction on mobile) --- */}
            {/* Added: triggerHaptics prop logic (Enabled) */}
            {userInteracted && (
              <>
                <div className="flex flex-row items-center justify-center gap-1 md:gap-2">
                  {textPrimary.split("").map((char, i) => (
                    <AnimatedLetter
                      key={i}
                      char={char}
                      index={i}
                      baseDelay={0.5}
                      // FIXED SIZE: Reduced min from 3rem to 2rem for mobile
                      sizeClass="text-[clamp(2.5rem,9vw,6rem)]"
                      strokeWidth="1.5px"
                      triggerHaptics={true}
                      userInteracted={userInteracted}
                    />
                  ))}
                </div>

                {/* --- DIVIDER LINE --- */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 3, duration: 1.5, ease: "circOut" }}
                  className="h-[1px] w-[90%] bg-gradient-to-r from-transparent via-[#C4A662] to-transparent"
                />

                {/* --- SECONDARY TEXT: INTELLIGENCE --- */}
                <div className="flex flex-row items-center justify-center gap-[2px] md:gap-1">
                  {textSecondary.split("").map((char, i) => (
                    <AnimatedLetter
                      key={i}
                      char={char}
                      index={i}
                      baseDelay={2.5}
                      // FIXED SIZE: Reduced min from 1.8rem to 1.1rem for mobile (60%)
                      sizeClass="text-[clamp(1.6rem,5.4vw,3.9rem)]"
                      strokeWidth="2px"
                      triggerHaptics={false} // Only primary vibrates? Or maybe both. Keeping off for secondary to avoid noise.
                      userInteracted={userInteracted}
                    />
                  ))}
                </div>
              </>
            )}

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
