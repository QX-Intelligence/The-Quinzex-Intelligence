import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Philosophy = () => {
    return (
        <div className="min-h-screen bg-background noise-overlay">
            <SEO 
                title="Our Philosophy" 
                description="Learn about the Quinzex Intelligence philosophy. Our approach combines precision, robust digital engineering, and creative vision to deliver next-level experiences."
                url="https://www.quinzexintelligence.com/philosophy"
            />
            <Navigation />
            <main className="pt-20">
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default Philosophy;
