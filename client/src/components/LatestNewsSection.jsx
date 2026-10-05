import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Tag, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function LatestNewsSection() {
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

  const latestNews = news.filter((n) => n.section === 'latest');
  const mainNews = latestNews[0];
  const relatedNews = latestNews.slice(1, 4);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400">Loading news...</p>
      </div>
    );
  }

  if (!mainNews) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400 italic">No news articles yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">

      {/* Top Header Tag */}
      <div className="mb-6">
        <span className="inline-block bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg shadow-sm">
          Latest-News
        </span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* LEFT & CENTER: Main Featured News Card */}
        <div
          onClick={() => navigate(`/news/${mainNews._id}`)}
          className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 cursor-pointer hover:shadow-md transition-shadow"
        >

          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-emerald-950 shadow-inner flex items-center justify-center">
            {mainNews.image ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${mainNews.image}`}
                alt={mainNews.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-emerald-950 text-white p-6 text-center space-y-2 w-full h-full">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Featured Story</span>
                <h3 className="text-xl sm:text-2xl font-black">{mainNews.title}</h3>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide">
            {mainNews.tag && (
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {mainNews.tag}
              </span>
            )}
            {mainNews.location && (
              <span className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {mainNews.location}
              </span>
            )}
            <span className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              {formatDate(mainNews.date)}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-snug">
              {mainNews.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {mainNews.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <span className="text-emerald-950 text-xs font-bold">Read full article →</span>
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR: Related News */}
        <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 shadow-sm space-y-6">

          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-base font-black text-emerald-950 tracking-wide">Related News</h3>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs shadow-sm hover:bg-emerald-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs shadow-sm hover:bg-emerald-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {relatedNews.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No other articles yet.</p>
          ) : (
            <div className="space-y-4">
              {relatedNews.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/news/${item._id}`)}
                  className="bg-white border border-gray-200/70 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-900 text-white text-[9px] font-bold text-center p-1">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide truncate group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}