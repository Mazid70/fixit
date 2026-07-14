import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from './Hero.jsx';
import Categories from './Categories.jsx';
import FeaturedPros from './FeaturedPros.jsx';
import HowItWorks from './HowItWorks.jsx';
import Stats from './Stats.jsx';
import CTA from './CTA.jsx';
import Footer from '../../Layout/Footer.jsx';

export default function Home({ onNavigateToRegister, onNavigateToLogin }) {
  // Initialize and refresh AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: false,
    });
    AOS.refresh();
  }, []);

  const handleJoinAction = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    }
  };

  return (
    <div className="bg-[#0e0e0e] text-[#dae2fd] min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-400">
      {/* 1. Hero Section */}
      <Hero onSearch={handleJoinAction} />

      {/* 2. Scrolling Categories */}
      <Categories />

      {/* 3. Featured Professionals Grid */}
      <FeaturedPros onBook={handleJoinAction} />

      {/* 4. How It Works (Simple Excellence) */}
      <HowItWorks />

      {/* 5. Stats Counter */}
      <Stats />

      {/* 6. Call to Action (CTA) */}
      <CTA 
        onJoinClient={handleJoinAction} 
        onJoinPartner={handleJoinAction} 
      />
      <Footer/>
    </div>
  );
}
