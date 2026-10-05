import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function RecentAccomplishments() {
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
  const heroAccomplishments = accomplishments.slice(0, 2);
  const secondaryAccomplishments = accomplishments.slice(2, 6);
  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  if (loading || accomplishments.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">

        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3e2b]">
            Recent Accomplishments
          </h2>
          <div className="w-48 h-1 bg-[#1e3e2b] mx-auto rounded-full"></div>
        </div>

        {/* TOP SECTION: Hero Cards */}
        {heroAccomplishments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heroAccomplishments.map((card) => (
              <div
                key={card._id}
                onClick={() => navigate(`/news/${card._id}`)}
                className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl group border border-gray-100 flex flex-col justify-end cursor-pointer"
              >
                {card.image && (
                  <img
                    src={imgSrc(card.image)}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                <div className="relative z-10 bg-[#1e3e2b]/85 backdrop-blur-md p-6 text-white space-y-2 border-t border-white/10">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {secondaryAccomplishments.length > 0 && (
          <>
            <div className="border-b border-emerald-900/20 my-8"></div>

            {/* BOTTOM SECTION: Secondary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {secondaryAccomplishments.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/news/${item._id}`)}
                  className="flex flex-col sm:flex-row items-center gap-5 p-2 bg-white rounded-2xl transition hover:shadow-md border border-transparent hover:border-gray-100 cursor-pointer"
                >
                  <div className="w-full sm:w-48 h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-inner">
                    {item.image && (
                      <img
                        src={imgSrc(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-2 flex flex-col justify-between h-full py-1">
                    <div>
                      <h4 className="text-base font-bold text-[#1e3e2b] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed pt-1 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs font-semibold text-[#1e3e2b]/80">
                        {formatDate(item.date)}
                      </span>

                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/news/${item._id}`); }}
                        className="text-[#1e3e2b] hover:text-emerald-600 transition p-1"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}