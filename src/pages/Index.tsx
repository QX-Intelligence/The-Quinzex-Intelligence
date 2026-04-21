import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Quinzex Intelligence",
      "url": "https://www.quinzexintelligence.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Quinzex Intelligence",
      "url": "https://www.quinzexintelligence.com",
      "logo": "https://www.quinzexintelligence.com/favicon.png",
      "sameAs": [
        "https://twitter.com/quinzex",
        "https://www.linkedin.com/company/quinzex"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <SEO jsonLd={jsonLd} />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
