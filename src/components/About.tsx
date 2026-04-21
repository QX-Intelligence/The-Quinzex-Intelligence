import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const philosophyPoints = [
  {
    title: 'Precision',
    description: 'Every decision is deliberate. Every detail matters. We engineer perfection into every interaction.',
  },
  {
    title: 'Innovation',
    description: 'We don\'t follow trends—we define them. Pioneering solutions that shape the future of digital.',
  },
  {
    title: 'Excellence',
    description: 'Mediocrity is not in our vocabulary. We deliver nothing less than extraordinary results.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.08, 0.03]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden" ref={sectionRef}>
      {/* Background Marquee Text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <motion.div style={{ x: x1, opacity: marqueeOpacity }} className="flex whitespace-nowrap">
          <span className="font-display text-[20vw] font-bold tracking-tight text-foreground">
            INTELLIGENCE • PRECISION • INNOVATION • EXCELLENCE •&nbsp;
          </span>
          <span className="font-display text-[20vw] font-bold tracking-tight text-foreground">
            INTELLIGENCE • PRECISION • INNOVATION • EXCELLENCE •&nbsp;
          </span>
        </motion.div>
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left Column */}
          <div className="relative">
            <motion.div style={{ y: titleY }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              >
                <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
                  ◆ Our Philosophy
                </span>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-12">
                  <span className="text-foreground">Built on</span>
                  <br />
                  <span className="gradient-text">Conviction</span>
                </h2>

                <div className="space-y-8 mb-16">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Quinzex Intelligence is not just a collective—it's a philosophy.
                    We believe that exceptional digital experiences arise from the
                    intersection of technical mastery and artistic vision.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our team comprises elite engineers, visionary designers, and
                    strategic minds who share an obsession with pushing boundaries.
                    Every project is an opportunity to redefine what's possible.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 border-t border-border/50 pt-12">
                  {[
                    { value: '98%', label: 'Client Retention' },
                    { value: '50+', label: 'Projects Shipped' },
                    { value: '15', label: 'Elite Members' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      <p className="font-display text-4xl md:text-5xl font-bold gradient-text counter-number">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Philosophy Cards */}
          <div className="relative">
            <motion.div style={{ y: contentY }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="space-y-6"
              >
                {philosophyPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    className="group p-8 md:p-12 border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-default bg-background/50 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-8">
                      <span className="text-primary font-mono text-sm tracking-widest mt-1">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:gradient-text transition-all duration-500 mb-4">
                          {point.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="btn-outline-gold block text-center mt-12 bg-background/50 backdrop-blur-sm"
                >
                  Join Our Vision
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
