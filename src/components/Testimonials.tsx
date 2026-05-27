import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      "Quinzex delivered a real-time analytics platform in 8 weeks that our previous agency said would take 6 months. The architecture is rock solid — we scaled to 50k concurrent users without a single incident.",
    author: "Arjun Patel",
    role: "CTO",
    company: "CareerVedha",
    metric: "50k concurrent users",
  },
  {
    id: 2,
    quote:
      "The e-commerce platform they built drove a 340% increase in conversion in the first quarter post-launch. The attention to UX detail and performance is unlike anything I've seen from a boutique studio.",
    author: "Mihail Hassan",
    role: "Founder",
    company: "MH Marble",
    metric: "340% conversion lift",
  },
  {
    id: 3,
    quote:
      "Their HRMS implementation saved our operations team 20+ hours weekly in manual reporting. Seamless data pipelines, beautiful dashboards, and zero downtime in 14 months of production.",
    author: "Priya Sharma",
    role: "VP of Operations",
    company: "InfraCorp",
    metric: "20+ hrs saved weekly",
  },
];

const partners = [
  "Vercel",
  "Supabase",
  "Stripe",
  "AWS",
  "GitHub",
  "Figma",
  "Cloudflare",
  "PlanetScale",
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const navigate = (dir: 1 | -1) => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-background" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-4">
            ◆ Client Outcomes
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">Built for </span>
            <span className="gradient-text">Results</span>
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative border border-primary/20 rounded-sm p-10 md:p-16 bg-card/40 backdrop-blur-sm shadow-[0_0_60px_rgba(196,166,98,0.05)]">
            {/* Gold quote mark */}
            <Quote className="w-10 h-10 text-primary/30 mb-8" />

            <div className="relative overflow-hidden min-h-[120px]">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-foreground text-xl md:text-2xl font-display leading-relaxed mb-8">
                  "{current.quote}"
                </p>
              </motion.div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-6">
              <motion.div
                key={`author-${current.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-foreground font-medium">{current.author}</p>
                <p className="text-muted-foreground text-sm">
                  {current.role}, <span className="text-primary">{current.company}</span>
                </p>
              </motion.div>

              <motion.div
                key={`metric-${current.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="px-4 py-2 border border-primary/30 rounded-sm text-primary font-mono text-sm"
              >
                ↑ {current.metric}
              </motion.div>
            </div>

            {/* Navigation controls */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all text-muted-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all text-muted-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setActiveIndex(i); }}
                  className={`h-px transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-primary' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partner Logo Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground/50 mb-10 font-mono">
            Trusted Technologies & Ecosystem Partners
          </p>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex gap-0">
              <motion.div
                animate={{ x: [0, -50 * partners.length] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="flex gap-16 shrink-0"
                style={{ willChange: 'transform' }}
              >
                {[...partners, ...partners].map((name, i) => (
                  <div
                    key={i}
                    className="shrink-0 px-8 py-3 border border-white/5 rounded-sm hover:border-primary/30 hover:text-primary transition-all duration-300 text-muted-foreground/40 font-mono text-sm tracking-widest uppercase cursor-default select-none"
                  >
                    {name}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
