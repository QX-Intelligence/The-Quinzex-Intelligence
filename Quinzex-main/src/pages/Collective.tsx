import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { teamMembers } from '@/data/team';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Collective() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <SEO 
          title="The Collective | Quinzex Intelligence"
          description="Meet the elite freelance engineering and design collective behind Quinzex Intelligence."
          url="https://www.quinzexintelligence.com/collective"
      />
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-48 md:pb-32" ref={sectionRef}>
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
              ◆ Elite Architects ◆
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">
              The <span className="gradient-text">Collective</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A specialized assembly of cloud engineers, full-stack architects, and data scientists building tomorrow's premium digital infrastructure.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <Link to={`/collective/${member.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 border border-white/5 bg-white/5 rounded-sm">
                    {/* Dark gradient overlay for consistent feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80"
                      />
                    </motion.div>

                    {/* Arrow Indicator */}
                    <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>

                    {/* Role Tag */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-mono tracking-widest uppercase backdrop-blur-sm">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm tracking-wide mb-4">
                      {member.subtitle}
                    </p>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm line-clamp-2">
                      {member.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
