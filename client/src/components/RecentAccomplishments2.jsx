import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecentAccomplishments2() {
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

  const accomplishments = news.filter((n) => n.section === 'accomplishments');
  const mainAccomplishment = accomplishments[0];
  const galleryCards = accomplishments.slice(1, 4);
  const sidebarAccomplishments = accomplishments.slice(4, 9);

  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400">Loading accomplishments...</p>
      </div>
    );
  }

  if (!mainAccomplishment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        <p className="text-xs text-gray-400 italic">No accomplishments posted yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div className="lg:col-span-2 space-y-8">

          <div
            onClick={() => navigate(`/news/${mainAccomplishment._id}`)}
            className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden bg-emerald-950 shadow-inner flex items-center justify-center">
              {mainAccomplishment.image ? (
                <img src={imgSrc(mainAccomplishment.image)} alt={mainAccomplishment.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-emerald-300 font-bold">No image</span>
              )}
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-snug">
                {mainAccomplishment.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {mainAccomplishment.description}
              </p>
              <span className="inline-block text-emerald-800 text-xs font-bold">Read full story →</span>
            </div>
          </div>

          <div className="w-full h-0.5 bg-emerald-800/40 rounded-full my-6" />

          {galleryCards.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {galleryCards.map((card) => (
                <div
                  key={card._id}
                  onClick={() => navigate(`/news/${card._id}`)}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                    {card.image && (
                      <img
                        src={imgSrc(card.image)}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-xs font-black text-emerald-950">{card.title}</h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar Accomplishments */}
        <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-black text-emerald-950 tracking-wide border-b border-gray-200 pb-4">
            Recent Accomplishments
          </h3>
          {sidebarAccomplishments.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No more accomplishments yet.</p>
          ) : (
            <div className="space-y-4">
              {sidebarAccomplishments.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/news/${item._id}`)}
                  className="bg-white border border-gray-200/70 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img src={imgSrc(item.image)} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-xs font-black text-emerald-950 uppercase truncate group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{item.description}</p>
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