import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, X, ExternalLink, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    id: '01',
    title: 'CareerVedha',
    subtitle: 'EdTech & Analytics Platform',
    category: 'Full-Stack / Next.js',
    year: '2024',
    url: 'https://careervedha.com',
    image: 'https://images.unsplash.com/photo-1523240715630-971c72f15718?w=1200&q=80',
  },
  {
    id: '02',
    title: 'MH Marble',
    subtitle: 'Premium E-Commerce Showcase',
    category: 'Architecture / React',
    year: '2024',
    url: 'https://mhmarble.com',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80',
  },
  {
    id: '03',
    title: 'Nexus',
    subtitle: 'Real-time Chatting App',
    category: 'Socket.io / Node.js',
    year: '2023',
    url: 'https://nexus-sage-chi.vercel.app/',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80',
  },
  {
    id: '04',
    title: 'HRMS',
    subtitle: 'Enterprise Management System',
    category: 'Dashboard / Java',
    year: '2023',
    url: 'https://hrms-front-end-woad.vercel.app/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
];

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer block"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Top Info */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <span className="text-primary font-mono text-sm tracking-widest">
            {project.id}
          </span>
          <span className="text-muted-foreground text-xs tracking-widest">
            {project.year}
          </span>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-full border border-primary flex items-center justify-center"
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="pt-8">
        <motion.div
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground group-hover:gradient-text transition-all duration-500">
            {project.title}
          </h3>
          <p className="text-muted-foreground mt-1">{project.subtitle}</p>
        </motion.div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-4">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Staggered columns effect
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Moves faster up
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [50, -50]); // Moves normally
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [100, 0]); // Moves slower

  const getColumnY = (index: number) => {
    if (index % 3 === 0) return yColumn1;
    if (index % 3 === 1) return yColumn2;
    return yColumn3;
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };

  return (
    <section id="work" className="relative py-20 md:py-32" ref={sectionRef}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-4">
                ◆ Selected Work
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-foreground">Featured</span>
                <br />
                <span className="gradient-text">Projects</span>
              </h2>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="text-xs tracking-[0.3em] uppercase">View All Work</span>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div key={project.id} style={{ y: getColumnY(index) }}>
              <ProjectCard 
                project={project} 
                index={index} 
                onClick={() => handleProjectClick(project)} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Private Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col">
          <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-display font-bold text-foreground">
                    {selectedProject?.title}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">
                    {selectedProject?.category}
                  </p>
                </div>
             </div>
             
             <div className="flex items-center gap-3 pr-8">
                <div className="hidden md:flex gap-2 mr-4">
                   <div className="w-2 h-2 rounded-full bg-red-500/50" />
                   <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                   <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <a 
                  href={selectedProject?.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                  title="Open in new tab (Expose URL)"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </a>
             </div>
          </DialogHeader>
          
          <div className="flex-1 w-full h-full relative bg-black/20">
            {selectedProject && (
              <iframe
                src={selectedProject.url}
                className="w-full h-full border-none"
                title={selectedProject.title}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            )}
            
            {/* Elegant overlay to handle potential loading issues or to style the 'private' feel */}
            <div className="absolute inset-0 pointer-events-none border-t border-white/5" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
