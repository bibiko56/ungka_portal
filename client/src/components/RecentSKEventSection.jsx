import React from 'react';

export default function RecentSKEventSection() {
  const newsItems = [
    {
      id: 1,
      title: 'PARADE MAP & ROUTE',
      image: '/path-to-parade-map.png', // Replace with your image asset
    },
    {
      id: 2,
      title: 'BULIG ESKWELA PROGRAM 2026',
      image: '/path-to-bulig-eskwela.png', // Replace with your image asset
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        {/* Slanted "Recent SK Event!" Ribbon Tag */}
        <div className="relative inline-block bg-emerald-900 text-white font-bold text-lg px-6 py-2 rounded-r-2xl rounded-tl-lg shadow-md clip-ribbon">
          Recent SK Event!
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-emerald-800 tracking-tight">
          Recent News
        </h2>
      </div>

      {/* Main Grid: Left Featured Event & Right News Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Featured Event Card (7 Columns) */}
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg group min-h-[360px] sm:min-h-[420px] flex flex-col justify-end bg-purple-950">
          <img
            src="/path-to-linggo-ng-kabataan-main.png" // Replace with your main Linggo ng Kabataan graphic
            alt="Linggo ng Kabataan 2026"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Translucent Backdrop Banner Overlay */}
          <div className="relative z-10 bg-purple-900/60 backdrop-blur-md p-6 text-white border-t border-white/10 space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold italic tracking-wide">
              LINGGO NG KABATAAN 2026
            </h3>
            <p className="text-sm italic font-light text-purple-100">
              Different stories. Different realities. <span className="font-semibold underline decoration-emerald-400">One generation, united by common dreams.</span>
            </p>
          </div>
        </div>

        {/* Right Sidebar - Recent News Panel (5 Columns) */}
        <div className="lg:col-span-5 bg-emerald-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg space-y-4">
          <div className="space-y-4">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer flex flex-col items-center space-y-2"
              >
                <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-purple-900 border border-emerald-700/50 shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-100 uppercase group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex justify-center items-center space-x-3 pt-2">
            <button
              type="button"
              aria-label="Previous News"
              className="w-9 h-9 rounded-full bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next News"
              className="w-9 h-9 rounded-full bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Title & Description Section */}
      <div className="pt-4 space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
          Barangay Ungka II Leads Tree Planting and Clean-Up Drive
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
          This Linggo ng Kabataan 2026, Barangay Ungka II celebrates the voices, talents, and dreams of its young generation. Through unity, participation, and meaningful activities, our youth come together to inspire one another and help build a stronger, more connected community.
        </p>
      </div>
    </section>
  );
}