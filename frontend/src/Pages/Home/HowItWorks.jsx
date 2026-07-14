import React from 'react';
import { Search, CalendarDays, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-32 bg-[#0e0e0e] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-10">
        
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
            Simple Excellence
          </h2>
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            Getting world-class service shouldn't be complicated. Our three-step process ensures a seamless experience from start to finish.
          </p>
        </div>

        {/* 3 Step Timeline Grid */}
        <div className="relative">
          {/* Centered connecting timeline line (only visible on large screens) */}
          <div className="hidden lg:block absolute top-[40px] left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {/* Step 1: Discover */}
            <div 
              data-aos="fade-up"
              data-aos-delay="0"
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-2 border-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Search className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Discover</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Browse our curated list of verified experts specializing in high-end domestic and professional services.
              </p>
            </div>

            {/* Step 2: Book */}
            <div 
              data-aos="fade-up"
              data-aos-delay="150"
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-2 border-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-300">
                <CalendarDays className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Book</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Secure your appointment through our intuitive interface with real-time availability and transparent pricing.
              </p>
            </div>

            {/* Step 3: Experience */}
            <div 
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-2 border-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Experience</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Receive premium service executed by true masters of their craft, backed by our LuxeServe Guarantee.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
