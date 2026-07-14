import React from 'react';
import { Star, ShieldCheck, CalendarRange, ArrowRight } from 'lucide-react';

const PROS = [
  {
    id: 'julian',
    name: 'Julian Thorne',
    specialty: 'Elite Interior Architect',
    rating: '4.9',
    bookings: '420+',
    rate: '$250',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp50BpSlvPZIVT8KvHjasRu6IoAr487JK4hW0tKrwHlKQbmuK-rY_dF1N_IuOtshKVHrNambTGZj8uyNw6Ge74fQYTLwEi1vpYSgl0f_tIh8AA41d7epW9lcTpaI66gk9gTr1qQRf5376ECTcp5TNSubHf9JIExdvkYsgzq2V9fU21S6ZbDEjC6-J6zIOMx474LLrHYE2IHhxp2GKrSvwaKYAMBcVO9B8laTKRkQ-J0u_WP43Nm4bsLjCNRn-SC-mFriILr4ychV18'
  },
  {
    id: 'elena',
    name: 'Elena Vance',
    specialty: 'Master Electrician',
    rating: '5.0',
    bookings: '1.2k+',
    rate: '$180',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjfbrcmnSHb-4rA4s06-6wUp-DejntJJqGPYGc8dzISD0NdT691Q9-y7qWz-MSDw3UCsw3XBfCQ-sPE4KqPduHxpso8pstOcfoLPM52q0XFtJxGmYQz7QxCYa8TaxUHsLBusxTOQqRJR7eJp6L6epzEKg34S7kaybEONvXSEEMzU0PfxHf0wjnB1_DyR4rCO5plvMx9sqYQO6juNUfH7ljZChKvZ184qCc0VXMYlI1KgtKaJfNxoirdoJqE2ZeA2-jU6AiedcECgea'
  },
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    specialty: 'Smart Systems Expert',
    rating: '4.8',
    bookings: '280+',
    rate: '$210',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz1wPiQN7XVGyCI7906D-RQfxxMG6GQYvTAY3WdYnva2vjCbTwl8V0Hk7L0z3N5YCv6d29zcwqHNiHjti-JUWJiUrAJ2FK1Q1qBpZRlwJL3DTsYDpxpj2969ikGGMKANg0L9c2-XZbEg110ZrQzqhrrD1hE5UD-TeYHsrQgCJ-xHkq14rC50O6GlJIhjzV_duKhxPdJQ3frbmmcMJApqZ61ADoDLwKACaIeHUJaslQ-j7aPmbtidWctgHXnDobLmRnJLGiY3zc-x18'
  }
];

export default function FeaturedPros({ onBook }) {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs font-mono">
              Top Rated
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Featured Professionals
            </h2>
          </div>
          <button 
            onClick={onBook}
            className="text-orange-500 font-semibold flex items-center gap-2 hover:translate-x-1.5 transition-transform duration-300 text-sm focus:outline-none"
          >
            <span>View all verified experts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROS.map((pro, index) => (
            <div 
              key={pro.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-[#1a1a1a]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Profile Image container */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={pro.image} 
                  alt={`${pro.name} portrait`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        {pro.name}
                      </h3>
                      <p className="text-zinc-400 text-xs font-medium tracking-wide">
                        {pro.specialty}
                      </p>
                    </div>
                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
                      <span>{pro.rating}</span>
                    </div>
                  </div>

                  {/* Verification & Booking Counts */}
                  <div className="flex items-center gap-4 text-zinc-400 text-xs">
                    <div className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-orange-500" />
                      <span>Verified</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <CalendarRange className="w-4 h-4 text-orange-500/80" />
                      <span>{pro.bookings} Bookings</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-6 border-t border-zinc-800/40 flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Starting at</p>
                    <p className="text-white font-bold text-lg font-mono">
                      {pro.rate}
                      <span className="text-xs font-normal text-zinc-500">/hr</span>
                    </p>
                  </div>
                  <button 
                    onClick={onBook}
                    className="bg-white text-black hover:bg-orange-500 hover:text-black font-bold py-2.5 px-6 rounded-full text-xs transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
