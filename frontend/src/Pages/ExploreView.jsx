import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  Star,
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export default function ExploreView({ onBookPro }) {
  const navigate = useNavigate();

  // Simple state for data, loading, and selected modal
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPro, setSelectedPro] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch data directly from public folder
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setProfessionals(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching professionals:', err);
        setIsLoading(false);
      });
  }, []);

  // Category Options for sidebar display
  const categoriesList = [
    'Concierge Services',
    'Wellness & Spa',
    'Private Dining',
    'Luxury Travel',
  ];

  // Handle direct booking action
  const handleInitiateBooking = pro => {
    setSelectedPro(pro);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedPro(null);
      if (onBookPro) {
        onBookPro(pro);
      } else {
        navigate('/register');
      }
    }, 1500);
  };

  return (
    <div className="bg-[#0e0e0e] pt-10 text-[#e5e2e1] min-h-screen font-sans pb-24 relative selection:bg-orange-500/30 selection:text-orange-400">
      {/* Top Mobile Filter Toggle Bar */}
      <div className="lg:hidden max-w-[1280px] mx-auto px-6 pt-6 flex justify-between items-center border-b border-zinc-800/80 pb-4">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-orange-500 font-bold active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
        <span className="text-xs font-mono text-zinc-500">
          {professionals.length} Results Found
        </span>
      </div>

      {/* Main Content Area */}
      <main className="pt-8 lg:pt-12 max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters (Design Display) */}
        <aside
          className={`
          ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-[#0e0e0e] p-6 overflow-y-auto block' : 'hidden lg:block'}
          lg:w-72 flex-shrink-0 space-y-8 lg:sticky lg:top-24 lg:h-fit lg:self-start lg:pr-4
        `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-orange-500" />
              <span>Search Filters</span>
            </h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Filters
            </h3>
            <span className="text-orange-500 text-xs font-mono uppercase tracking-wider cursor-pointer hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </span>
          </div>

          {/* Category Filter Section */}
          <section className="space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              Category
            </p>
            <div className="space-y-3">
              {categoriesList.map((cat, i) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    defaultChecked={i === 0}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-zinc-950 accent-orange-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-colors ${i === 0 ? 'text-white font-semibold' : 'text-zinc-400 group-hover:text-zinc-200'}`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Price Range Section */}
          <section className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                Price per Hour
              </p>
              <span className="text-xs font-mono text-orange-500 font-bold">
                $500 max
              </span>
            </div>
            <div className="px-1">
              <input
                type="range"
                min="50"
                max="500"
                defaultValue="500"
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between mt-2 font-mono text-xs text-zinc-500">
                <span>$50</span>
                <span>$500+</span>
              </div>
            </div>
          </section>

          {/* Rating Section */}
          <section className="space-y-4 pt-4 border-t border-zinc-900">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              Min. Rating
            </p>
            <div className="flex flex-wrap gap-2">
              {['All', '4.0+', '4.5+', '4.8+'].map((rate, i) => (
                <button
                  key={rate}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    i === 0
                      ? 'border border-orange-500 bg-orange-500/10 text-orange-500 font-bold'
                      : 'border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {rate}
                </button>
              ))}
            </div>
          </section>

          {/* Location Filter Section */}
          <section className="space-y-4 pt-4 border-t border-zinc-900">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              Location
            </p>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                defaultValue="Los Angeles, CA"
                placeholder="e.g. Los Angeles, CA"
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-orange-500 text-xs text-white placeholder-zinc-600 transition-colors"
              />
            </div>
          </section>

          {/* Mobile Apply Button */}
          {isMobileFilterOpen && (
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-8 bg-orange-500 text-black font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Results Main Content Column */}
        <div className="flex-1 space-y-8">
          {/* Search Header Bar & Sort */}
          <header className="space-y-6 bg-zinc-950/60 p-6 sm:p-8 rounded-2xl border border-zinc-900/80 backdrop-blur-md">
            {/* Top Interactive Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500" />
                <input
                  type="text"
                  placeholder="Search executive chauffeur, spa, sommelier..."
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-mono text-zinc-500">
                  Sort by:
                </span>
                <select
                  defaultValue="Most Relevant"
                  className="bg-zinc-900 border border-zinc-800 text-white font-mono text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Most Relevant">Most Relevant</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Results Title Count */}
            <div className="pt-2 border-t border-zinc-900/50 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                  {professionals.length || 9} Premium Professionals
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Curated elite service specialists available for immediate
                  dispatch.
                </p>
              </div>
            </div>
          </header>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/20 border border-zinc-800/60 rounded-2xl">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
              <p className="text-sm font-mono text-zinc-400">
                Loading professionals data...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {professionals.map((pro, index) => (
                <div
                  key={pro.id || index}
                  data-aos="fade-up"
                  data-aos-delay={(index % 6) * 80}
                  className="bg-[#1c1b1b]/40 backdrop-blur-xl border border-[#584237]/30 rounded-2xl p-6 group hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top Row: Avatar & Rating */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <img
                          src={pro.image}
                          alt={pro.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 shadow-md group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {pro.verified && (
                          <div
                            className="absolute -bottom-1 -right-1 bg-orange-500 text-black p-0.5 rounded-full"
                            title="Verified Professional"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end text-orange-400 mb-0.5 font-bold font-mono text-sm">
                          <Star className="w-4 h-4 fill-orange-500 text-orange-500 mr-1" />
                          <span>{pro.rating?.toFixed(1) || '5.0'}</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          {pro.bookings} Bookings
                        </p>
                      </div>
                    </div>

                    {/* Pro Name & Specialty */}
                    <div className="space-y-1.5 mb-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                        {pro.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed line-clamp-2">
                        {pro.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Row: Pricing & Action */}
                  <div className="pt-5 border-t border-zinc-800/60 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-lg font-black text-orange-400 font-mono">
                        ${pro.rate}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 ml-1">
                        / hr
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPro(pro)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-orange-500 hover:text-black text-white rounded-full text-xs font-bold font-mono transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Bar */}
          <div className="mt-12 flex items-center justify-center gap-2 pt-6 border-t border-zinc-900">
            <button className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full font-bold font-mono text-xs bg-orange-500 text-black">
              1
            </button>
            <button className="w-9 h-9 rounded-full font-bold font-mono text-xs border border-zinc-800 text-zinc-400 hover:border-orange-500">
              2
            </button>
            <button className="w-9 h-9 rounded-full font-bold font-mono text-xs border border-zinc-800 text-zinc-400 hover:border-orange-500">
              3
            </button>
            <span className="text-zinc-600 px-1 font-mono text-xs">...</span>
            <button className="w-9 h-9 rounded-full font-bold font-mono text-xs border border-zinc-800 text-zinc-400 hover:border-orange-500">
              12
            </button>
            <button className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Professional Detail Modal */}
      {selectedPro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedPro(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-2xl bg-[#121212] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPro(null)}
              className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white bg-zinc-900 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <img
                src={selectedPro.image}
                alt={selectedPro.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedPro.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                    Verified Pro
                  </span>
                </div>
                <p className="text-xs text-orange-400 font-mono font-semibold">
                  {selectedPro.specialty}
                </p>
                <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{selectedPro.location}</span>
                </p>
              </div>
            </div>

            {/* Performance Stats Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950/80 rounded-2xl border border-zinc-900 text-center">
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Rating
                </p>
                <p className="text-base font-bold text-orange-400 font-mono flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-orange-500" />
                  <span>{selectedPro.rating}</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Bookings
                </p>
                <p className="text-base font-bold text-white font-mono">
                  {selectedPro.bookings}+
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Rate
                </p>
                <p className="text-base font-bold text-white font-mono">
                  ${selectedPro.rate}/hr
                </p>
              </div>
            </div>

            {/* Description & Experience */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                About the Professional
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {selectedPro.description}
              </p>
            </div>

            {/* Key Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPro.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Dispatch Availability */}
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Next Available Slot:</span>
              </span>
              <span className="text-orange-400 font-bold font-mono">
                {selectedPro.availability}
              </span>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleInitiateBooking(selectedPro)}
                disabled={bookingConfirmed}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-80"
              >
                {bookingConfirmed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black animate-bounce" />
                    <span>Booking Reserved! Directing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      Book {selectedPro.name} (${selectedPro.rate}/hr)
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
