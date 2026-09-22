import React, { useState } from 'react';

const skAccomplishments = [
  {
    id: 1,
    title: 'Altiora Develops and Turns Over MoneySmart Youth AI Coach',
    description: 'Altiora Digital Services successfully conducted a Financial Literacy Workshop for the youth of Barangay Ungka II, Pavia, Iloilo.',
    date: 'November 21, 2025',
    image: '/path-to-altiora.jpg',
  },
  {
    id: 2,
    title: 'Blood Donation Marathon',
    description: 'Lubos ang pasalamat sang Sangguniang Kabataan (SK) Officials sang Brgy. Ungka II, Pavia, Iloilo sa madinalag-on nga paghiwat sang RMN kag iFM Iloilo Blood Donation Marathon sa GT Town Center subong nga adlaw.',
    date: 'November 24, 2025',
    image: '/path-to-blood-marathon.jpg',
  },
  {
    id: 3,
    title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
    description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
    date: 'December 10, 2025',
    image: '/path-to-bahay-kalinga.jpg',
  },
  {
    id: 4,
    title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
    description: 'The league provides a positive and competitive environment where participants can showcase their talents while strengthening camaraderie and community spirit.',
    date: 'December 15, 2025',
    image: '/path-to-sports-event.jpg',
  },
  {
    id: 5,
    title: 'Ungka II Blood donation Drive for Drug Prevention',
    description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
    date: 'November 21, 2025',
    image: '/path-to-blood-drive-1.jpg',
  },
  {
    id: 6,
    title: 'Ungka II Blood donation Drive for Drug Prevention',
    description: 'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
    date: 'November 24, 2025',
    image: '/path-to-blood-drive-2.jpg',
  },
];

export default function SKRecentAccomplishments() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* SK HEADER WITH VIEW MORE ON THE RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3e2b]">
              SK Recent Accomplishments
            </h2>
            <div className="w-32 h-1 bg-[#1e3e2b] rounded-full mx-auto sm:mx-0"></div>
            <p className="text-[#1e3e2b] font-bold text-xs sm:text-sm pt-1">
              By: Ungka2 Katipunan Ng Kabataan
            </p>
          </div>

          {/* Right Side "View More" Button */}
          <button
            onClick={handleViewMore}
            className="bg-[#1e3e2b] hover:bg-[#152e20] text-white font-bold px-6 py-2.5 rounded-full transition shadow-md text-sm border border-emerald-700/30 flex items-center gap-2"
          >
            <span>View More</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 2x3 GRID OF CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skAccomplishments.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-5 p-2 bg-white rounded-2xl transition hover:shadow-md border border-transparent hover:border-gray-100"
            >
              {/* Thumbnail Image */}
              <div className="w-full sm:w-52 h-44 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Text Content */}
              <div className="flex-1 space-y-2 flex flex-col justify-between h-full py-1">
                <div>
                  <h4 className="text-base font-bold text-[#1e3e2b] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed pt-1 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer Date */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-xs font-semibold text-[#1e3e2b]/80">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}