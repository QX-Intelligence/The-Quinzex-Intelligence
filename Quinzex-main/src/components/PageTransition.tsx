import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1], // premium custom ease-out
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0], // premium custom ease-in
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen origin-top"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
