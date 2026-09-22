import React from 'react';

const sideEvents = [
  {
    id: 1,
    title: 'PARADE MAP & ROUTE',
    image: '/path-to-parade-map.png',
  },
  {
    id: 2,
    title: 'BULIG ESKWELA PROGRAM 2026',
    image: '/path-to-bulig-eskwela.png',
  },
];

export default function RecentSKEvent() {
  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Angled Badge Title */}
        <div className="inline-block bg-[#1e3e2b] text-white font-black text-lg sm:text-xl px-6 py-2 rounded-l-xl [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)] shadow-md">
          Recent SK Event!
        </div>

        {/* Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Featured Event Banner */}
          <div className="lg:col-span-7 bg-purple-900 rounded-3xl overflow-hidden shadow-xl relative min-h-[420px] flex flex-col justify-end group border border-purple-800/30">
            {/* Background Image / Poster */}
            <img
              src="/path-to-linggo-ng-kabataan-main.png"
              alt="Linggo ng Kabataan 2026"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Bottom Overlay Info Banner */}
            <div className="relative z-10 bg-gradient-to-t from-purple-950/90 via-purple-900/80 to-transparent p-6 sm:p-8 space-y-2 text-white">
              <h3 className="text-2xl sm:text-3xl font-black tracking-wide uppercase">
                Linggo ng Kabataan 2026
              </h3>
              <p className="text-xs sm:text-sm text-purple-100/90 font-medium leading-relaxed max-w-xl">
                Different stories. Different realities. <span className="font-bold text-white">One generation, united by common dreams.</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Green Event Stack Sidebar */}
          <div className="lg:col-span-5 bg-[#1e3e2b] rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center shadow-xl space-y-6 border border-emerald-800/40">
            
            {/* Stacked Thumbnails */}
            <div className="w-full space-y-6">
              {sideEvents.map((item) => (
                <div key={item.id} className="space-y-2 group cursor-pointer">
                  {/* Thumbnail Container */}
                  <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-purple-950 shadow-md border border-emerald-700/30">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Thumbnail Label */}
                  <p className="text-center text-xs sm:text-sm font-black text-white tracking-wider uppercase">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <div className="w-full pt-2">
              <button className="w-full sm:w-2/3 mx-auto block bg-transparent hover:bg-emerald-800/50 text-white font-bold py-2.5 px-6 rounded-full border border-emerald-400/50 transition text-center shadow-md text-sm">
                Learn more
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}