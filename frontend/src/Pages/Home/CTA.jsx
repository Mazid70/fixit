import React from 'react';

export default function CTA({ onJoinClient, onJoinPartner }) {
  return (
    <section className="py-32 px-6 md:px-10 overflow-hidden bg-[#0e0e0e] relative">
      <div className="max-w-[1280px] mx-auto relative">
        
        {/* Interactive glow card */}
        <div 
          data-aos="fade-up"
          className="bg-[#1a1a1a]/30 backdrop-blur-xl p-12 md:p-24 rounded-3xl flex flex-col items-center text-center space-y-10 border border-white/5 relative z-10 overflow-hidden"
        >
          {/* Internal gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

          <h2 className="text-3xl md:text-6xl font-bold max-w-3xl leading-tight text-white tracking-tight">
            Ready to elevate your <br className="hidden md:block" />
            service standards?
          </h2>
          
          <p className="text-zinc-400 text-lg max-w-xl font-light">
            Join the thousands of property owners who rely on LuxeServe for unmatched expertise and reliability.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto relative z-20">
            <button 
              onClick={onJoinClient}
              className="bg-orange-500 hover:bg-orange-600 text-black px-12 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Join as a Client
            </button>
            <button 
              onClick={onJoinPartner}
              className="border border-zinc-700 hover:border-zinc-500 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-zinc-900/60 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Become a Partner
            </button>
          </div>
        </div>

        {/* Outer Background Decorative glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>
    </section>
  );
}
