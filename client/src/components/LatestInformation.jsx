import React from 'react';

const newsItems = [
  {
    id: 1,
    title: 'PARADE MAP & ROUTE',
    description: 'Let\'s start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!',
    date: 'August 21, 2026',
    image: '/path-to-parade-map.png',
  },
  {
    id: 2,
    title: 'BULIG ESKWELA PROGRAM 2026',
    description: 'The Sangguniang Kabataan of Barangay Ungka II, Pavia, Iloilo, proudly presents the Bulig Eskwela Program',
    date: 'August 22, 2026',
    image: '/path-to-bulig-eskwela.png',
  },
  {
    id: 3,
    title: 'KATIPUNAN NG KABATAAN ASSEMBLY 2026',
    description: 'Your voice, ideas, and participation matter in shaping a better future for the youth and our community.',
    date: 'August 20, 2026',
    image: '/path-to-kk-assembly.png',
  },
];

export default function LatestInformation() {
  return (
    <section className="bg-emerald-950/20 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-[#315742] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        {/* Angled Badge Title */}
        <div className="inline-block bg-white text-[#315742] font-black text-lg sm:text-xl px-6 py-2 rounded-l-xl [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)] mb-8 shadow-md">
          Latest-Information
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* MAIN FEATURED CARD (LEFT) */}
          <div className="lg:col-span-5 bg-[#264835] rounded-2xl overflow-hidden border border-emerald-700/40 shadow-lg flex flex-col justify-between group hover:border-emerald-500/60 transition">
            
            {/* Image Banner */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-purple-900">
              <img
                src="/path-to-linggo-ng-kabataan-main.png"
                alt="Linggo ng Kabataan 2026"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-t from-[#1b3527] to-[#264835]">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  SK Ungka II Conducts "Bahay Kalinga" Outreach Program
                </h3>
                
                <div className="flex items-center text-xs text-emerald-200/80 mb-4 gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>August 22, 2026</span>
                </div>

                <p className="text-xs text-emerald-100/70 leading-relaxed line-clamp-3">
                  The wait is over! Get ready as we officially open Linggo ng Kabataan 2026 – a celebration of youth participation, leadership, creativity, and meaningful community engagement.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-4">
                <button className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* SECONDARY CARDS STACK (RIGHT) */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-between">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#264835]/80 hover:bg-[#264835] border border-emerald-700/30 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4 items-center transition shadow-md group"
              >
                {/* Thumbnail Image */}
                <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-purple-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-left space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-emerald-100/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-[11px] text-emerald-200/80 pt-1 gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="self-end sm:self-center flex-shrink-0">
                  <button className="w-9 h-9 rounded-full bg-emerald-600/80 hover:bg-emerald-500 text-white flex items-center justify-center transition shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}