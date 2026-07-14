import React, { useRef } from 'react';
import { Palette, Zap, Leaf, Shield, Wrench, Droplet, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'interior',
    title: 'Interior Designer',
    count: '1.2k+ Experts',
    icon: Palette,
  },
  {
    id: 'electrical',
    title: 'Electrician',
    count: '850 Experts',
    icon: Zap,
  },
  {
    id: 'landscape',
    title: 'Landscaper',
    count: '640 Experts',
    icon: Leaf,
  },
  {
    id: 'security',
    title: 'Tech Security',
    count: '420 Experts',
    icon: Shield,
  },
  {
    id: 'structural',
    title: 'Structural Pro',
    count: '930 Experts',
    icon: Wrench,
  },
  {
    id: 'plumbing',
    title: 'Master Plumber',
    count: '1.1k Experts',
    icon: Droplet,
  }
];

export default function Categories() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-[#0e0e0e] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-10 flex justify-between items-end mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Premium Categories
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal scrollable categories */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-10 pb-4 max-w-[1280px] mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex-shrink-0 w-64 bg-[#1a1a1a]/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:bg-orange-500 transition-all duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-orange-500/10 text-orange-500 group-hover:bg-white/20 group-hover:text-white transition-all">
                <Icon className="w-8 h-8 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-black transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-zinc-400 group-hover:text-black/80 mt-2 font-mono uppercase tracking-wider transition-colors">
                {cat.count}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
