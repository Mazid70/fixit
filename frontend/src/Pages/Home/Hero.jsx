import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ service, location });
    }
  };

  return (
    <section className="relative min-h-[750px] flex flex-col items-center justify-center text-center px-6 md:px-10 overflow-hidden bg-[#0e0e0e]">
      {/* Radial Gradient Background Accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.08)_0%,transparent_60%)]"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Main Heading */}
        <h1 
          data-aos="fade-up" 
          data-aos-duration="800"
          className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight font-sans text-[#dae2fd]"
        >
          Master your domain with <br />
          <span className="text-orange-500 italic font-serif font-light">premium</span> local experts.
        </h1>

        {/* Subtext */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="100"
          data-aos-duration="800"
          className="text-[#c3c6d7] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          The elite marketplace for high-end services, from architectural design to precision technical maintenance. Curated for those who demand excellence.
        </p>

        {/* Search Bar Form */}
        <form 
          onSubmit={handleSearchSubmit}
          data-aos="fade-up" 
          data-aos-delay="200"
          data-aos-duration="800"
          className="bg-[#1a1a1a]/40 backdrop-blur-md p-2 rounded-xl md:rounded-full border border-white/5 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto mt-12 w-full"
        >
          {/* Service Input */}
          <div className="flex items-center gap-3 px-6 py-3 w-full md:w-1/2">
            <Search className="text-orange-500 w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#dae2fd] w-full placeholder-[#8d90a0] text-sm" 
              placeholder="What service do you need?" 
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-zinc-800"></div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-6 py-3 w-full md:w-1/3">
            <MapPin className="text-orange-500 w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#dae2fd] w-full placeholder-[#8d90a0] text-sm" 
              placeholder="Your location" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-orange-500 text-black hover:bg-orange-600 active:scale-95 duration-200 px-8 py-4 rounded-xl md:rounded-full font-bold text-sm w-full md:w-auto transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            Search Experts
          </button>
        </form>
      </div>
    </section>
  );
}
