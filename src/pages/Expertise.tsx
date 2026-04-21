import Navigation from '@/components/Navigation';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Expertise = () => {
    return (
        <div className="min-h-screen bg-background noise-overlay">
            <SEO 
                title="Our Expertise" 
                description="Explore our cutting-edge digital expertise, including web development, scalable applications, and highly performant Next.js and React solutions."
                url="https://www.quinzexintelligence.com/expertise"
            />
            <Navigation />
            <main className="pt-20">
                <Services />
            </main>
            <Footer />
        </div>
    );
};

export default Expertise;
