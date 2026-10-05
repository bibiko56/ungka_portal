import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function AssistanceAndGridNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/news`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const newsItems = news.filter((n) => n.section === 'assistance');
  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-16">

      {/* ================= ASSISTANCE BANNER SECTION (static) ================= */}
      <div className="relative w-full">
        <div className="bg-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible">
          <div className="hidden md:block w-28 lg:w-36 flex-shrink-0" />
          <div className="flex-1 space-y-3 text-center md:text-left z-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Do You Need Assistance?
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
              Our support team is ready to help you with your concerns and emergency needs.
            </p>
            <div className="pt-2">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Barangay Hotline: <span className="text-emerald-300">0912 345 6789</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-0.5 bg-emerald-700/40 rounded-full" />

      {/* ================= 2-COLUMN NEWS / PROGRAMS GRID (dynamic) ================= */}
      {loading ? (
        <p className="text-xs text-gray-400">Loading programs...</p>
      ) : newsItems.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No assistance programs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {newsItems.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/news/${item._id}`)}
              className="bg-white border border-gray-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6 group cursor-pointer"
            >
              <div className="w-full sm:w-44 h-36 rounded-2xl bg-gray-200 overflow-hidden flex-shrink-0 shadow-inner">
                {item.image && (
                  <img
                    src={imgSrc(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="space-y-3 flex-1 w-full flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500">{formatDate(item.date)}</span>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}