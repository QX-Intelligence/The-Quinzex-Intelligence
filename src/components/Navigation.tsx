import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Expertise', href: '/expertise' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Portfolio', href: '/portfolio' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-background/90 backdrop-blur-md' : ''
        }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-24 border-b border-transparent dark:border-border/30 transition-colors duration-300">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 group"
          >
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <span className="font-display text-2xl font-bold tracking-tight gradient-text">
                QUINZEX
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary to-transparent opacity-50" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`transition-colors duration-300 text-xs uppercase tracking-[0.3em] hover-line ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-8">
            <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">
              {currentTime}
            </span>

            {/* Creative Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-14 h-7 rounded-full bg-muted border border-border overflow-hidden transition-colors duration-300"
            >
              <motion.div
                initial={false}
                animate={{
                  x: theme === 'dark' ? 28 : 2,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute top-1 left-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg"
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-primary-foreground" />
                ) : (
                  <Sun className="w-3 h-3 text-primary-foreground" />
                )}
              </motion.div>
              {/* Background Icons for context */}
              <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                <Sun className="w-3 h-3 text-muted-foreground/50 opacity-0 dark:opacity-0" /> {/* Hide in light mode logic if needed, but simple slide is usually enough */}
              </div>
            </button>

            <Link
              to="/contact"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs uppercase tracking-[0.3em] text-primary hover:text-foreground transition-colors hover-line"
              >
                Contact
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-foreground" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1.5 p-2"
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-6 h-px bg-foreground block"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-px bg-foreground block"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                className="w-6 h-px bg-foreground block"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl"
            >
              <div className="py-12 flex flex-col gap-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-foreground text-3xl font-display font-bold block"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold inline-block text-center mt-8"
                >
                  Start Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
