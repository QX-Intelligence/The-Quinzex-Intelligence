import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/quinzex' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/quinzex' },
  { name: 'Dribbble', href: '#' },
  { name: 'GitHub', href: 'https://github.com/siar-cj' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  // Create a reveal effect
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-250, 0]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0.5, 1]);

  return (
    <motion.footer
      ref={footerRef}
      style={{ y, opacity }}
      className="relative py-20 border-t border-border/30 bg-background z-10"
    >
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl font-bold gradient-text mb-4">
              QUINZEX
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium digital intelligence collective.
              Crafting tomorrow's experiences today.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Expertise', path: '/expertise' },
                { name: 'Philosophy', path: '/philosophy' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-foreground hover:text-primary transition-colors text-sm hover-line"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {['Full-Stack', 'Enterprise', 'Intelligence', 'Infrastructure'].map((item) => (
                <li key={item}>
                  <span className="text-foreground/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Connect
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                >
                  <span className="text-sm">{link.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-border/30">
          <p className="text-muted-foreground text-xs tracking-wider">
            © {currentYear} Quinzex Intelligence. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-xs tracking-wider transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-xs tracking-wider transition-colors">
              Terms of Service
            </Link>
          </div>

          <p className="text-muted-foreground text-xs tracking-wider">
            Crafted with precision ◆
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
