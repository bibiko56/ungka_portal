import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Healthcare', 'Aid & Assistance', 'Barangay Programs', 'SK Event'];
const PAGE_SIZE = 6;

export default function UpcomingEvents2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter((event) => event.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const pageEvents = filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, '...', totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  if (loading) {
    return (
      <section className="bg-white py-12 px-4 sm:px-8">
        <p className="text-xs text-gray-400 text-center">Loading events...</p>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 tracking-tight">
          Upcoming Events
        </h2>
        <div className="w-48 h-1 bg-emerald-800 mx-auto rounded-full" />
      </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#1e3e2b] text-white border-[#1e3e2b]'
                  : 'bg-white text-[#1e3e2b] border-[#1e3e2b] hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {pageEvents.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center">No events in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {pageEvents.map((event) => (
              <div
                key={event._id}
                className="bg-[#1e3e2b] text-white rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between shadow-xl min-h-[360px] border border-emerald-800/40 group overflow-hidden"
              >
                <div className="space-y-3 z-10 relative max-w-[85%]">
                  <h3 className="text-2xl font-extrabold leading-snug">{event.title}</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-0.5 text-xs text-emerald-200/90 pt-2 font-medium">
                    <p>Date: {event.date}</p>
                    {event.time && <p>Time: {event.time}</p>}
                    {event.location && <p>Location: {event.location}</p>}
                  </div>
                </div>


                <div className="z-20 pt-6 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate('/volunteer')}
                    className="bg-[#c2e260] hover:bg-[#b0d14e] text-[#1e3e2b] font-extrabold px-6 py-2.5 rounded-full transition shadow-md text-xs sm:text-sm"
                  >
                    Learn More
                  </button>

                  <span className="bg-white text-[#1e3e2b] border border-[#1e3e2b] font-bold text-xs px-4 py-2 rounded-full text-center flex-1 max-w-[170px] truncate shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 font-bold text-emerald-950">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm hover:text-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {getPageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center text-sm transition ${
                  currentPage === page
                    ? 'bg-[#1e3e2b] text-white border-[#1e3e2b]'
                    : page === '...'
                    ? 'border-transparent cursor-default text-emerald-950'
                    : 'bg-white text-[#1e3e2b] border-[#1e3e2b] hover:bg-emerald-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm hover:text-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}