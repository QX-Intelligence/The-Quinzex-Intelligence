import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import WhoWeAre from './WhoWeAre';
import SelectedWork from './SelectedWork';
import Services from './Services';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <main>
                <WhoWeAre />
                <SelectedWork />
                <Services />
                <Testimonials />
                <ContactForm />
            </main>
        </motion.div>
    );
};

export default Home;
