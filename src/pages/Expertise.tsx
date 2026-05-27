import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Cpu, Server, ShieldCheck, Terminal, Award } from 'lucide-react';

const techMatrix = [
  {
    category: 'Languages & Systems',
    icon: <Terminal className="w-5 h-5 text-primary" />,
    items: ['Python', 'Java', 'SQL', 'TypeScript', 'JavaScript', 'HTML5/CSS3']
  },
  {
    category: 'Application Frameworks',
    icon: <Cpu className="w-5 h-5 text-primary" />,
    items: ['React / Next.js', 'Spring Boot', 'Django REST Framework', 'Node.js / Express', 'Flask', 'Streamlit']
  },
  {
    category: 'Cloud & Infrastructure',
    icon: <Server className="w-5 h-5 text-primary" />,
    items: ['Kubernetes', 'AWS (S3/EC2/RDS)', 'Azure', 'Terraform', 'Docker', 'Redis', 'Kafka']
  },
  {
    category: 'DevOps & Intelligence',
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    items: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'Prometheus & Grafana', 'SonarQube', 'spaCy / NLTK', 'Pandas']
  }
];

const Expertise = () => {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <SEO 
        title="Our Expertise | Quinzex Intelligence" 
        description="Explore our cutting-edge digital expertise, enterprise systems, custom AI tools, and highly performant Next.js and Spring Boot architectures."
        url="https://www.quinzexintelligence.com/expertise"
      />
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="section-container">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 max-w-3xl"
          >
            <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
              ◆ Core Infrastructure ◆
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">
              Bespoke Digital <span className="gradient-text">Engineering</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We architect secure, scalable, and beautifully designed digital infrastructure. From high-performance React frontends to robust microservices in Spring Boot and intelligent Python data engines.
            </p>
          </motion.div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-32 border-b border-border/30 pb-20">
            {[
              {
                title: 'High Performance',
                description: 'Static edge generation, low bundle sizes, and optimized rendering engines ensuring instant user response.',
                metric: '99+ Core Web Vitals'
              },
              {
                title: 'Resilient Scalability',
                description: 'Dockerized microservice setups orchestrated with Kubernetes, ready to scale seamlessly under heavy concurrent traffic.',
                metric: '99.99% Target Uptime'
              },
              {
                title: 'Intelligence & Analytics',
                description: 'Integrated machine learning pipelines, predictive engines, and dashboard systems translating raw telemetry into actionable data.',
                metric: 'Real-time telemetry'
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-8 border border-white/5 bg-white/5 rounded-sm hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="text-xs text-primary font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" /> {pillar.metric}
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Existing Core Expertise List */}
        <Services />

        {/* Technical Infrastructure Grid */}
        <div className="section-container mt-20 md:mt-32">
          <div className="border-t border-border/30 pt-20">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
              <div>
                <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
                  ◆ Engineering Specifications ◆
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  The Technical <span className="gradient-text">Arsenal</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our comprehensive technology matrix spans critical layers of enterprise, cloud, and client engineering. Every technology is mastered at production-scale.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {techMatrix.map((matrix, idx) => (
                  <motion.div 
                    key={matrix.category}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="p-6 border border-white/5 bg-white/5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                      {matrix.icon}
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {matrix.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matrix.items.map((item) => (
                        <span 
                          key={item} 
                          className="px-2.5 py-1 bg-white/5 border border-white/5 text-xs text-muted-foreground font-mono hover:text-primary hover:border-primary/30 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default Expertise;
