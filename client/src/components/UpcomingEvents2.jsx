import React, { useState } from 'react';

const eventsData = [
  {
    id: 1,
    title: 'Scholarship Assistance',
    description: 'Guidance session for students applying for municipal and provincial scholarships.',
    date: 'March 10, 2026',
    time: '5:00 PM – 6:30 PM',
    location: 'Barangay Covered Court',
    category: 'Education Support',
    filterCategory: 'Aid & Assistance',
    image: '/path-to-graduation-jar.png',
  },
  {
    id: 2,
    title: 'Inter-Zone Basketball Liga',
    description: 'Opening ceremony and first game of the Inter-Zone Liga Tournament.',
    date: 'March 15, 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'Barangay Health Center',
    category: 'Sports',
    filterCategory: 'Barangay Programs',
    image: '/path-to-basketball.png',
  },
  {
    id: 3,
    title: 'Typhoon Preparedness Meeting',
    description: 'Community briefing on evacuation procedures and emergency hotlines for all residents.',
    date: 'March 10, 2026',
    time: '5:00 PM – 6:30 PM',
    location: 'Barangay Covered Court',
    category: 'Emergency & Calamity',
    filterCategory: 'Barangay Programs',
    image: '/path-to-typhoon-responders.png',
  },
  {
    id: 4,
    title: 'Free Pet Vaccination',
    description: 'Free vaccination for anti-rabies shots for pets. Please bring vaccination cards and valid ID.',
    date: 'March 11, 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'Barangay Health Center',
    category: 'Pet & Healthcare',
    filterCategory: 'Healthcare',
    image: '/path-to-vaccination.png',
  },
  {
    id: 5,
    title: 'Community Clean-Up Drive',
    description: 'Residents are encouraged to participate in a clean-up drive to maintain cleanliness in all zones.',
    date: 'March 12, 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'Barangay Health Center',
    category: 'Community Event',
    filterCategory: 'Barangay Programs',
    image: '/path-to-clean-up.png',
  },
  {
    id: 6,
    title: 'Relief Goods Distribution',
    description: 'Distribution of food packs for qualified low-income families. Bring your claim stub.',
    date: 'March 25, 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'Barangay Health Center',
    category: 'Community Event',
    filterCategory: 'Aid & Assistance',
    image: '/path-to-aid-assistance.png',
  },
];

const categories = ['All', 'Healthcare', 'Aid & Assistance', 'Barangay Programs'];

export default function UpcomingEvents2() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = selectedCategory === 'All'
    ? eventsData
    : eventsData.filter((event) => event.filterCategory === selectedCategory);

  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#1e3e2b] text-white border-[#1e3e2b]'
                  : 'bg-white text-[#1e3e2b] border-[#1e3e2b] hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Filter/Sort Icon Button */}
          <button className="p-2.5 rounded-full bg-[#1e3e2b] text-white hover:bg-[#152e20] transition shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1e3e2b] text-white rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between shadow-xl min-h-[360px] border border-emerald-800/40 group overflow-hidden"
            >
              {/* Event Content */}
              <div className="space-y-3 z-10 relative max-w-[85%]">
                <h3 className="text-2xl font-extrabold leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-0.5 text-xs text-emerald-200/90 pt-2 font-medium">
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                </div>
              </div>

              {/* Pop-out / Floating Image */}
              {event.image && (
                <div className="absolute right-0 bottom-16 w-44 h-48 pointer-events-none flex items-end justify-end z-10">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Bottom Action & Category Tag */}
              <div className="z-20 pt-6 flex items-center justify-between gap-2">
                <button className="bg-[#c2e260] hover:bg-[#b0d14e] text-[#1e3e2b] font-extrabold px-6 py-2.5 rounded-full transition shadow-md text-xs sm:text-sm">
                  Learn More
                </button>

                <span className="bg-white text-[#1e3e2b] border border-[#1e3e2b] font-bold text-xs px-4 py-2 rounded-full text-center flex-1 max-w-[170px] truncate shadow-sm">
                  {event.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 pt-8 font-bold text-emerald-950">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 text-sm hover:text-emerald-700 transition"
          >
            Preview
          </button>

          {[1, 2, 3, '...', 7, 8, 9].map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center text-sm transition ${
                currentPage === page
                  ? 'bg-[#1e3e2b] text-white border-[#1e3e2b]'
                  : 'bg-white text-[#1e3e2b] border-[#1e3e2b] hover:bg-emerald-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 text-sm hover:text-emerald-700 transition"
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
}