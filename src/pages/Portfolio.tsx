import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Work from '@/components/Work';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Portfolio = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Our Portfolio | Quinzex Intelligence",
        "url": "https://www.quinzexintelligence.com/portfolio",
        "description": "View the collection of high-impact digital solutions, web applications, and premium experiences crafted by Quinzex Intelligence."
    };

    return (
        <div className="min-h-screen bg-background noise-overlay">
            <SEO 
                title="Our Portfolio | Quinzex Intelligence" 
                description="View the collection of high-impact digital solutions, web applications, and premium experiences crafted by Quinzex Intelligence."
                url="https://www.quinzexintelligence.com/portfolio"
                jsonLd={jsonLd}
            />
            <Navigation />
            <main className="pt-32 md:pt-48 pb-20">
                <div className="section-container mb-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-primary text-xs tracking-[0.5em] uppercase font-mono block mb-6">
                            ◆ Engineering Registry ◆
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">
                            Crafted <span className="gradient-text">Ecosystems</span>
                        </h1>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            A record of high-impact digital products we have delivered. Every application is optimized for speed, responsive accuracy, and absolute architectural integrity. Select any card to open a secure sandbox interactive preview.
                        </p>
                    </motion.div>
                </div>
                <Work />
            </main>
            <Footer />
        </div>
    );
};

export default Portfolio;
