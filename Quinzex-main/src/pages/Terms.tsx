import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-background noise-overlay">
            <Navigation />
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground">
                    <p>Last updated: January 2026</p>
                    <p>
                        Please read these Terms of Service completely using quinzex.com which is owned and operated by Quinzex Intelligence.
                        This Agreement documents the legally binding terms and conditions attached to the use of the Site at quinzex.com.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                        In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable
                        to such services.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">2. Intellectual Property</h2>
                    <p>
                        The Site and its original content, features, and functionality are owned by Quinzex Intelligence and are protected
                        by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>

                    <h2 className="text-foreground font-display text-2xl font-bold mt-8">3. Termination</h2>
                    <p>
                        We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction
                        of all information associated with you.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
