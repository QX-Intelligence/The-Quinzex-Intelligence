import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import Scene3D from './Scene3D';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* 3D Scene */}
        <Scene3D />

        {/* Content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 h-full flex flex-col justify-between section-container py-32"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start pt-20">
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-muted-foreground text-xs tracking-[0.3em] uppercase max-w-[200px] leading-relaxed"
            >
              Premium Digital
              <br />Intelligence Collective
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-muted-foreground text-xs tracking-[0.3em] uppercase text-right max-w-[200px] leading-relaxed hidden md:block"
            >
              Crafting Tomorrow's
              <br />Digital Experiences
            </motion.p>
          </div>

          {/* Main Title */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="mb-6"
              >
                <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono">
                  ◆ Est. 2026 ◆
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-bold tracking-tight"
                >
                  <span className="block text-white">WE BUILD</span>
                  <span className="block gradient-text gold-glow">INTELLIGENCE</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-primary text-sm tracking-[0.4em] uppercase font-mono mt-8"
                >
                  Expert Web & App Development Collective
                </motion.p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end pb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center"
              >
                <ArrowDownRight className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Scroll to explore
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="hidden md:block text-right"
            >
              <p className="text-5xl font-display font-bold gradient-text">50+</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Projects Delivered
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div >
    </section >
  );
}
