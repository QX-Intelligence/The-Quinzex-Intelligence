import Navigation from '@/components/Navigation';
import ContactSection from '@/components/Contact'; // Renamed to avoid alias conflict if needed, or just import as Contact
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Contact = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Quinzex Intelligence",
        "url": "https://www.quinzexintelligence.com/contact",
        "description": "Get in touch with Quinzex Intelligence to start building your next great digital experience."
    };

    return (
        <div className="min-h-screen bg-background noise-overlay">
            <SEO 
                title="Contact Us" 
                description="Get in touch with Quinzex Intelligence to start building your next great digital experience. We are ready to bring your vision to life."
                url="https://www.quinzexintelligence.com/contact"
                jsonLd={jsonLd}
            />
            <Navigation />
            <main className="pt-20">
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
