import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Full-Stack',
    subtitle: 'High-Performance Web Apps',
    description: 'Engineering scalable, SEO-optimized web applications using modern frameworks. We specialize in React, Next.js, and Node.js for ultra-fast, responsive user experiences.',
    capabilities: ['React / Next.js', 'Node.js', 'Redux / Zustand', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Enterprise',
    subtitle: 'Robust Backends & Architecture',
    description: 'Building resilient enterprise systems with Java Springboot and Microservices architecture. We ensure horizontal scalability and industrial-grade security.',
    capabilities: ['Java Springboot', 'Microservices', 'Kubernetes', 'PostgreSQL / MongoDB'],
  },
  {
    number: '03',
    title: 'Intelligence',
    subtitle: 'AI, Django & Machine Learning',
    description: 'Harnessing the power of AI with Django and Flask. From predictive analytics to complex data modeling, we build the brains of your digital products.',
    capabilities: ['Django / Flask', 'Machine Learning', 'Computer Vision', 'Generative AI'],
  },
  {
    number: '04',
    title: 'Infrastructure',
    subtitle: 'Cloud, CI/CD & Deployment',
    description: 'Automating excellence with AWS and GitHub Actions. We deploy secure, high-availability environments that scale with your business growth.',
    capabilities: ['AWS / Azure', 'GitHub Actions', 'Docker / CI/CD', 'SEO Management'],
  },
];

function ServiceItem({ service, index }: { service: typeof services[0]; index: number }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group border-t border-border/50 py-16 md:py-24 cursor-pointer"
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Number */}
        <motion.span
          animate={{ x: isHovered ? 10 : 0 }}
          className="text-primary font-mono text-sm tracking-widest md:col-span-1"
        >
          {service.number}
        </motion.span>

        {/* Title */}
        <div className="md:col-span-4">
          <motion.h3
            animate={{ x: isHovered ? 20 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground group-hover:gradient-text transition-all duration-500"
          >
            {service.title}
          </motion.h3>
          <motion.p
            animate={{ x: isHovered ? 20 : 0, opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-muted-foreground text-sm tracking-[0.2em] uppercase mt-2"
          >
            {service.subtitle}
          </motion.p>
        </div>

        {/* Description */}
        <motion.p
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          className="md:col-span-4 text-muted-foreground leading-relaxed text-sm md:text-base"
        >
          {service.description}
        </motion.p>

        {/* Capabilities */}
        <motion.div
          animate={{ x: isHovered ? -10 : 0, opacity: isHovered ? 1 : 0.5 }}
          className="md:col-span-3 flex flex-wrap gap-2"
        >
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              className="text-xs tracking-wider uppercase text-muted-foreground border border-border/50 px-3 py-1.5 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300"
            >
              {cap}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const listY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="services" className="relative py-32 md:py-48" ref={sectionRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <motion.div
            style={{ y: headerY }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
                ◆ Core Expertise
              </span>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold">
                <span className="text-foreground">What We</span>
                <br />
                <span className="gradient-text">Master</span>
              </h2>
            </div>

            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-right">
              Four pillars of excellence, unified by an uncompromising
              commitment to craft. Each discipline elevated to an art form.
            </p>
          </motion.div>
        </div>

        {/* Services List */}
        <motion.div style={{ y: listY }}>
          {services.map((service, index) => (
            <ServiceItem key={service.number} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
