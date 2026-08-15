import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Eye, Shield, Cpu, ChevronRight } from 'lucide-react';

const pillars = [
  {
    title: 'Aesthetics',
    icon: <Eye className="w-8 h-8 text-primary" />,
    intro: 'We believe digital interactions are emotional. A premium application must captivate on first touch.',
    points: ['Custom motion-flow architectures', 'High-end glassmorphism styling', 'Tailored, elegant micro-animations', 'Pixel-perfect responsive layouts']
  },
  {
    title: 'Architecture',
    icon: <Shield className="w-8 h-8 text-primary" />,
    intro: 'Visuals without integrity are hollow. We engineer resilient distributed systems that stand standard.',
    points: ['Robust Spring Boot microservices', 'Highly-optimized SQL/NoSQL structures', 'JWT access & refresh auth systems', 'WebSockets and event-driven patterns']
  },
  {
    title: 'Automation',
    icon: <Cpu className="w-8 h-8 text-primary" />,
    intro: 'Complexity is automated. We deploy zero-downtime, fully-audited environments that scale automatically.',
    points: ['Continuous GitHub Actions pipelines', 'Automated EKS / Kubernetes deployments', 'Real-time telemetry and alerts', 'SEO structure optimization']
  }
];

const clientJourney = [
  {
    step: '01',
    phase: 'Strategic Alignment',
    description: 'We align deeply with your core objectives, drafting precise software blueprints and selecting the optimal technology stack.'
  },
  {
    step: '02',
    phase: 'System Architecture',
    description: 'We construct database diagrams, draft API specifications, and design interactive visual layouts before writing code.'
  },
  {
    step: '03',
    phase: 'Elite Crafting',
    description: 'Our engineers construct application layers under comprehensive unit test coverage, ensuring bulletproof stability.'
  },
  {
    step: '04',
    phase: 'Performance Testing',
    description: 'We perform high-concurrency load testing, complete security audits, and optimize SEO attributes to the peak.'
  },
  {
    step: '05',
    phase: 'Orchestrated Launch',
    description: 'We deploy to edge Content Delivery Networks (CDNs) and set up persistent observability dashboards to secure longevity.'
  }
];

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <SEO 
        title="Our Philosophy | Quinzex Intelligence" 
        description="Learn about the Quinzex Intelligence philosophy. Our approach combines precision UI aesthetics, robust systems architecture, and DevOps automation."
        url="https://www.quinzexintelligence.com/philosophy"
      />
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="section-container">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 max-w-3xl"
          >
            <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
              ◆ Operating Convictions ◆
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">
              A Obsession with <span className="gradient-text">Craft</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We do not accept mediocrity. Every component, line of code, and deployment pipeline is designed with deliberate precision. We combine art and infrastructure.
            </p>
          </motion.div>

          {/* Triple-A standard */}
          <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="p-10 border border-white/5 bg-white/5 rounded-sm hover:border-primary/30 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {pillar.intro}
                  </p>
                </div>
                
                <ul className="space-y-3 border-t border-white/5 pt-6">
                  {pillar.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
                      <ChevronRight className="w-3.5 h-3.5 text-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Existing About philosophy cards */}
        <About />

        {/* Client Journey Flow */}
        <div className="section-container mt-20 md:mt-32">
          <div className="border-t border-border/30 pt-20">
            <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
              ◆ Client Execution Strategy ◆
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
              The Path to <span className="gradient-text">Delivery</span>
            </h2>

            <div className="grid md:grid-cols-5 gap-6">
              {clientJourney.map((journey, idx) => (
                <motion.div
                  key={journey.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative p-6 border border-white/5 bg-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <span className="text-primary/30 font-mono text-4xl font-bold block mb-4">
                      {journey.step}
                    </span>
                    <h4 className="font-display text-lg font-bold text-foreground mb-3">
                      {journey.phase}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {journey.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default Philosophy;
