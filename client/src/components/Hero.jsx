import React from 'react';

export default function Hero() {
  return (
    <section 
  className="relative w-full min-h-[500px] md:min-h-[600px] bg-cover bg-center text-white overflow-hidden rounded-b-[40px] shadow-lg"
  style={{ backgroundImage: "url('barangay_hall.png')" }}
>
      {/* Dark Teal/Green Visual Overlay */}
      <div className="absolute inset-0 bg-emerald-950/75 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col justify-between h-full min-h-[500px] md:min-h-[600px] z-10">
        
        {/* Top Section: Integrated Search Bar */}
        <div className="w-full flex justify-start md:justify-center mb-8 md:mb-0">
          <div className="relative w-full max-w-lg">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Start Search here..."
              className="w-full bg-white/80 backdrop-blur-sm text-emerald-950 placeholder-emerald-800/60 pl-11 pr-4 py-3 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mt-auto">
          
          {/* Left Block: Hero Text and Branding */}
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <div className="space-y-1">
              <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-200">
                WELCOME TO UNGKA II PAVIA
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm leading-none">
                Arangka Pa <br />
                <span className="text-white">PAVIA</span>
              </h1>
            </div>

            <p className="text-sm md:text-lg text-emerald-100/90 leading-relaxed font-light drop-shadow-sm max-w-lg">
              Welcome to Ungka II Voluntary and information Website
            </p>

            <div className="pt-2">
              <a
                href="#about"
                className="inline-block bg-white text-emerald-950 font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-emerald-100 transition text-sm"
              >
                About-Ungka II
              </a>
            </div>
          </div>

          {/* Right Block: Glassmorphic Cards */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            
            {/* Card 1: About Ungka II */}
            <div className="flex-1 lg:w-56 bg-emerald-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-xl relative overflow-hidden group hover:bg-emerald-900/50 transition duration-300">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300">ABOUT UNGKA II</span>
                <h3 className="text-base font-bold leading-tight">Learn More About Ungka II</h3>
              </div>
              <div className="self-end mt-4">
                <button className="w-8 h-8 rounded-full bg-emerald-600/80 hover:bg-emerald-500 flex items-center justify-center text-white transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2: Barangay Officials */}
            <div className="flex-1 lg:w-56 bg-emerald-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] shadow-xl relative overflow-hidden group hover:bg-emerald-900/50 transition duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300">BARANGAY OFFICIALS</span>
                </div>

                <h3 className="text-base font-bold leading-tight">Know Your Public Servants</h3>
              </div>
              <div className="self-end mt-4">
                <button className="w-8 h-8 rounded-full bg-emerald-600/80 hover:bg-emerald-500 flex items-center justify-center text-white transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}