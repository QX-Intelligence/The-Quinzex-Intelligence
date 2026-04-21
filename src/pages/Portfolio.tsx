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
                title="Our Portfolio" 
                description="View the collection of high-impact digital solutions, web applications, and premium experiences crafted by Quinzex Intelligence."
                url="https://www.quinzexintelligence.com/portfolio"
                jsonLd={jsonLd}
            />
            <Navigation />
            <main className="pt-20">
                <Work />
            </main>
            <Footer />
        </div>
    );
};

export default Portfolio;
