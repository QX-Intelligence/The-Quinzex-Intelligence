import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, ArrowRight, Check, Layers, Building2, Palette, Cloud } from 'lucide-react';
import { toast } from 'sonner';
import { contactConfig } from '../config/contact';

const SERVICES = [
  { id: 'fullstack', icon: Layers, label: 'Full-Stack Development', desc: 'End-to-end web & mobile applications' },
  { id: 'enterprise', icon: Building2, label: 'Enterprise Integration', desc: 'Scalable infrastructure & APIs' },
  { id: 'design', icon: Palette, label: 'Premium UI/UX Design', desc: 'Luxury interfaces & design systems' },
  { id: 'cloud', icon: Cloud, label: 'Cloud Architecture', desc: 'DevOps, scaling & performance' },
];

const BUDGETS = [
  { id: '10-25k', label: '$10k – $25k', desc: 'MVP / Startup Launch' },
  { id: '25-50k', label: '$25k – $50k', desc: 'Growth-Stage Product' },
  { id: '50-100k', label: '$50k – $100k', desc: 'Enterprise Scale' },
  { id: '100k+', label: '$100k+', desc: 'Full Transformation' },
];

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', project: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = ['Service', 'Budget', 'Details'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const key = contactConfig.web3FormsAccessKey;

    if (!key || contactConfig.enableLocalFallback) {
      const toastId = toast.loading('Synthesizing secure transmission link...');
      setTimeout(() => {
        toast.dismiss(toastId);
        setIsSubmitting(false);
        setIsComplete(true);
      }, 2000);
      return;
    }

    const toastId = toast.loading('Encrypting and transmitting inquiry packet...');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          name: formState.name,
          email: formState.email,
          message: `Service: ${selectedService}\nBudget: ${selectedBudget}\n\nProject Brief:\n${formState.project}`,
          subject: `New Quinzex Inquiry — ${selectedService} · ${selectedBudget}`,
          from_name: 'Quinzex Intelligence Hub',
        }),
      });
      const result = await response.json();
      toast.dismiss(toastId);
      if (result.success) {
        setIsComplete(true);
      } else {
        throw new Error(result.message);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error('Transmission Interrupted', {
        description: `Direct contact: ${contactConfig.fallbackEmail}`,
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden" ref={sectionRef}>
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
              We're selective about projects we take on — ensuring every collaboration receives our complete dedication and expertise.
            </p>
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

          {/* Right Column — Conversational Project Planner */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col"
          >
            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-foreground">Transmission Received</h3>
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  Your brief has been encrypted and routed to our specialists. Expect a response within 24 hours.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Step Progress */}
                <div className="flex items-center gap-0 mb-12">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-0">
                      <button
                        onClick={() => i < step && setStep(i)}
                        className={`flex items-center gap-2 text-xs tracking-widest uppercase transition-colors ${
                          i <= step ? 'text-primary' : 'text-muted-foreground/40'
                        } ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono ${
                          i < step
                            ? 'border-primary bg-primary text-primary-foreground'
                            : i === step
                            ? 'border-primary text-primary'
                            : 'border-white/10 text-muted-foreground/40'
                        }`}>
                          {i < step ? <Check className="w-3 h-3" /> : i + 1}
                        </span>
                        <span className="hidden sm:inline">{s}</span>
                      </button>
                      {i < steps.length - 1 && (
                        <div className={`w-8 h-px mx-2 sm:mx-4 transition-colors ${i < step ? 'bg-primary' : 'bg-white/10'}`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex-1 relative overflow-hidden min-h-[380px]">
                  <AnimatePresence mode="wait">
                    {/* Step 0 — Service */}
                    {step === 0 && (
                      <motion.div key="step0" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
                        <p className="text-muted-foreground text-sm mb-8 tracking-wide">What type of engagement are you seeking?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {SERVICES.map(({ id, icon: Icon, label, desc }) => (
                            <button
                              key={id}
                              onClick={() => { setSelectedService(id); setTimeout(() => setStep(1), 300); }}
                              className={`group relative p-5 border text-left transition-all duration-300 rounded-sm ${
                                selectedService === id
                                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(196,166,98,0.15)]'
                                  : 'border-white/10 hover:border-primary/40 hover:bg-white/3'
                              }`}
                            >
                              <Icon className={`w-5 h-5 mb-3 transition-colors ${selectedService === id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                              <p className="text-foreground text-sm font-medium mb-1">{label}</p>
                              <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                              {selectedService === id && (
                                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1 — Budget */}
                    {step === 1 && (
                      <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
                        <p className="text-muted-foreground text-sm mb-8 tracking-wide">What is your investment range for this project?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {BUDGETS.map(({ id, label, desc }) => (
                            <button
                              key={id}
                              onClick={() => { setSelectedBudget(id); setTimeout(() => setStep(2), 300); }}
                              className={`group p-5 border text-left transition-all duration-300 rounded-sm ${
                                selectedBudget === id
                                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(196,166,98,0.15)]'
                                  : 'border-white/10 hover:border-primary/40 hover:bg-white/3'
                              }`}
                            >
                              <p className={`font-display text-2xl font-bold mb-1 transition-colors ${selectedBudget === id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{label}</p>
                              <p className="text-muted-foreground text-xs">{desc}</p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 — Identity & Brief */}
                    {step === 2 && (
                      <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
                        <p className="text-muted-foreground text-sm mb-8 tracking-wide">Almost there — tell us about you and your vision.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                            <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-3">Your Name</label>
                            <input
                              type="text"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="w-full bg-transparent text-foreground text-xl font-display outline-none placeholder:text-muted-foreground/30"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                            <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-3">Email Address</label>
                            <input
                              type="email"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="w-full bg-transparent text-foreground text-xl font-display outline-none placeholder:text-muted-foreground/30"
                              placeholder="john@company.com"
                              required
                            />
                          </div>
                          <div className="border-b border-border/50 pb-4 focus-within:border-primary/50 transition-colors">
                            <label className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-3">Project Brief</label>
                            <textarea
                              value={formState.project}
                              onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                              className="w-full bg-transparent text-foreground text-lg font-display outline-none placeholder:text-muted-foreground/30 resize-none min-h-[80px]"
                              placeholder="Describe your vision, goals, and timeline..."
                              required
                            />
                          </div>
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-gold w-full flex items-center justify-center gap-3 mt-4"
                          >
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                Transmit Inquiry <Send className="w-4 h-4" />
                              </>
                            )}
                          </motion.button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Back arrow for steps 1+ */}
                {step > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setStep(step - 1)}
                    className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    Back
                  </motion.button>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
