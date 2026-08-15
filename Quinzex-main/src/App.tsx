import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Expertise from "./pages/Expertise";
import Philosophy from "./pages/Philosophy";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProjectFeatures from "./pages/ProjectFeatures";
import Collective from "./pages/Collective";
import MemberProfile from "./pages/MemberProfile";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";

import { ThemeProvider } from "next-themes";
import SmoothScroll from "./components/SmoothScroll";
import TargetCursor from "./components/TargetCursor";
import CanvasCursor from "./components/CanvasCursor";
import PageTransition from "./components/PageTransition";
import { HelmetProvider } from "react-helmet-async";
import AIAssistant from "./components/AIAssistant";


const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    }
  }, []);

  // Setup global haptics
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!('vibrate' in navigator)) return;

      const target = e.target as HTMLElement;
      // Check if target or parent is interactive
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]');

      if (isInteractive) {
        // Subtle haptic pulse for interaction
        navigator.vibrate(15);
      }
    };

    const handleGlobalSubmit = () => {
      if (!('vibrate' in navigator)) return;
      // Slightly stronger pulse for submission
      navigator.vibrate(35);
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('submit', handleGlobalSubmit);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('submit', handleGlobalSubmit);
    };
  }, []);


  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="quinzex-theme">
          <TooltipProvider>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Loader key="loader" onComplete={() => setIsLoading(false)} />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Toaster />
                <Sonner />
                <CanvasCursor />
                <TargetCursor />
                <SmoothScroll />
                <AIAssistant />
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                    <Route path="/expertise" element={<PageTransition><Expertise /></PageTransition>} />
                    <Route path="/philosophy" element={<PageTransition><Philosophy /></PageTransition>} />
                    <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                    <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                    <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                    <Route path="/features" element={<PageTransition><ProjectFeatures /></PageTransition>} />
                    <Route path="/collective" element={<PageTransition><Collective /></PageTransition>} />
                    <Route path="/collective/:id" element={<PageTransition><MemberProfile /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};


export default App;
