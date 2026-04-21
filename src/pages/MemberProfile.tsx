import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { teamMembers } from '@/data/team';
import { ArrowLeft, ExternalLink, Code2, Cpu, Wrench } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function MemberProfile() {
  const { id } = useParams<{ id: string }>();
  const member = teamMembers.find(m => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display font-bold mb-4">Member Not Found</h1>
        <Link to="/collective" className="text-primary hover:underline">Return to Collective</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <SEO 
          title={`${member.name} - ${member.role} | Quinzex Intelligence`}
          description={member.description}
      />
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="section-container max-w-5xl">
          
          {/* Back Navigation */}
          <Link 
            to="/collective" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs tracking-[0.2em] uppercase font-mono">Back to Collective</span>
          </Link>

          {/* Member Header */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-sm border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-mono tracking-widest uppercase mb-6">
                {member.role}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                {member.name}
              </h1>
              <p className="text-xl text-primary/80 font-mono tracking-wide mb-8">
                {member.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-10">
                {member.description}
              </p>
              
              <a 
                href={member.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center gap-3"
              >
                <span>View Full Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-4 mb-8 flex items-center gap-3">
                <Wrench className="w-5 h-5 text-primary" />
                Technical Arsenal
              </h2>
              <div className="space-y-8">
                {member.skills.map((skillGroup, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm tracking-[0.2em] font-mono text-muted-foreground uppercase mb-4">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-md text-sm text-foreground/90 font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-4 mb-8 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-primary" />
                Featured Deployments
              </h2>
              <div className="space-y-8">
                {member.projects.map((project, idx) => (
                  <div key={idx} className="group relative p-6 rounded-xl border border-white/5 bg-white/5 hover:border-primary/30 transition-colors duration-300">
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] tracking-wider font-mono text-primary/70 uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
