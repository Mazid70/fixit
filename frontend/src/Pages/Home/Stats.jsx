import React from 'react';

const STATS = [
  { id: 'pros', value: '50k+', label: 'Verified Pros' },
  { id: 'bookings', value: '1M+', label: 'Successful Bookings' },
  { id: 'rating', value: '4.9/5', label: 'Average Rating' },
  { id: 'support', value: '24/7', label: 'Expert Support' }
];

export default function Stats() {
  return (
    <section className="py-24 border-y border-zinc-800 bg-[#060606]">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, index) => (
            <div 
              key={stat.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="space-y-2"
            >
              <p className="text-orange-500 font-bold text-4xl md:text-5xl font-display tracking-tight">
                {stat.value}
              </p>
              <p className="text-zinc-500 uppercase tracking-widest text-xs font-mono font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
