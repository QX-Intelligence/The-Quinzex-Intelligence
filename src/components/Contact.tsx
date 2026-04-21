import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: '', email: '', project: '', budget: '' });
    }, 2000);
  };

  return (
    <motion.section
      id="contact"
      className="relative py-32 md:py-48 overflow-hidden"
      ref={sectionRef}
      style={{ scale, opacity }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-charcoal" />
      <motion.div
        style={{ y: blobY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[200px]"
      />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
              ◆ Start a Project
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-12">
              <span className="text-foreground">Let's Create</span>
              <br />
              <span className="gradient-text">Together</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed text-lg mb-16 max-w-md">
              Ready to transform your vision into reality?
              We're selective about projects we take on—ensuring
              every collaboration receives our complete dedication.
            </p>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Email</p>
                <a href="mailto:hello@quinzex.com" className="text-foreground hover:text-primary transition-colors text-xl font-display hover-line">
                  hello@quinzex.com
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Location</p>
                <p className="text-foreground text-xl font-display">Global / Remote</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-transparent text-foreground text-xl md:text-2xl font-display outline-none placeholder:text-muted-foreground/30"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-transparent text-foreground text-xl md:text-2xl font-display outline-none placeholder:text-muted-foreground/30"
                  placeholder="john@company.com"
                  required
                />
              </div>

              {/* Project */}
              <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">
                  Project Brief
                </label>
                <textarea
                  value={formState.project}
                  onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                  className="w-full bg-transparent text-foreground text-lg md:text-xl font-display outline-none placeholder:text-muted-foreground/30 resize-none min-h-[100px]"
                  placeholder="Tell us about your vision..."
                  required
                />
              </div>

              {/* Budget */}
              <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">
                  Budget Range
                </label>
                <select
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  className="w-full bg-transparent text-foreground text-xl font-display outline-none cursor-pointer appearance-none"
                  required
                >
                  <option value="" className="bg-background">Select budget range</option>
                  <option value="10-25k" className="bg-background">$10,000 - $25,000</option>
                  <option value="25-50k" className="bg-background">$25,000 - $50,000</option>
                  <option value="50-100k" className="bg-background">$50,000 - $100,000</option>
                  <option value="100k+" className="bg-background">$100,000+</option>
                </select>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold w-full flex items-center justify-center gap-3 mt-12"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
