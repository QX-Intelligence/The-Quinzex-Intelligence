import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Expertise from "./pages/Expertise";
import Philosophy from "./pages/Philosophy";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProjectFeatures from "./pages/ProjectFeatures";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";

import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import TargetCursor from "./components/TargetCursor";
import CanvasCursor from "./components/CanvasCursor";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => {
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
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/expertise" element={<Expertise />} />
                    <Route path="/philosophy" element={<Philosophy />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/features" element={<ProjectFeatures />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
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
