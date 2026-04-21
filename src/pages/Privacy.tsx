import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background noise-overlay">
            <Navigation />
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground">
                    <p>Last updated: January 2026</p>
                    <p>
                        At Quinzex Intelligence, we value your privacy and are committed to protecting your personal data.
                        This policy outlines how we collect, use, and safeguard your information when you visit our website
                        or engage with our services.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">1. Information Collection</h2>
                    <p>
                        We collect information that you voluntarily provide to us when expressing interest in obtaining
                        information about us or our products and services, when participating in activities on the Website,
                        or otherwise when interacting with us.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">2. Use of Information</h2>
                    <p>
                        We use the information we collect or receive to communicate with you, provide our services,
                        and improve your experience. We do not share your personal information with third parties
                        except as necessary to provide our services or as required by law.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">3. Data Security</h2>
                    <p>
                        We adhere to strict security protocols to prevent unauthorized access, disclosure, modification,
                        or unauthorized destruction of data.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
