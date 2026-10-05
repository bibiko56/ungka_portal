import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function SkNews() {
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

  const skNews = news.filter((n) => n.section === 'sk');
  const mainNews = skNews[0];
  const sidebarNews = skNews.slice(1, 4);
  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400">Loading SK news...</p>
      </div>
    );
  }

  if (!mainNews) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400 italic">No SK news posted yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">

      <div>
        <span className="inline-block bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-lg shadow-sm">
          SK-News
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div
          onClick={() => navigate(`/news/${mainNews._id}`)}
          className="lg:col-span-6 bg-purple-950/90 border border-purple-900 rounded-3xl overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-[340px] sm:h-[400px] bg-purple-900 overflow-hidden flex items-center justify-center">
            {mainNews.image ? (
              <img src={imgSrc(mainNews.image)} alt={mainNews.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-300">No image</span>
            )}
          </div>
          <div className="p-6 sm:p-8 text-white space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                {mainNews.title}
              </h2>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(mainNews.date)}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-light">
                {mainNews.description}
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-sm transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          {sidebarNews.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No other SK news yet.</p>
          ) : (
            sidebarNews.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/news/${item._id}`)}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                  {item.image && (
                    <img src={imgSrc(item.image)} alt={item.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <h4 className="text-xs font-black text-emerald-950 uppercase truncate">{item.title}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.date)}
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}