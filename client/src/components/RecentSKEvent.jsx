import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecentSKEvent() {
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
  const mainEvent = skNews[0];
  const sideEvents = skNews.slice(1, 3);
  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  if (loading || !mainEvent) return null;

  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="inline-block bg-[#1e3e2b] text-white font-black text-lg sm:text-xl px-6 py-2 rounded-l-xl [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)] shadow-md">
          Recent SK Event!
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT: Featured Event Banner */}
          <div
            onClick={() => navigate(`/news/${mainEvent._id}`)}
            className="lg:col-span-7 bg-purple-900 rounded-3xl overflow-hidden shadow-xl relative min-h-[420px] flex flex-col justify-end group border border-purple-800/30 cursor-pointer"
          >
            {mainEvent.image && (
              <img
                src={imgSrc(mainEvent.image)}
                alt={mainEvent.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}

            <div className="relative z-10 bg-gradient-to-t from-purple-950/90 via-purple-900/80 to-transparent p-6 sm:p-8 space-y-2 text-white">
              <h3 className="text-2xl sm:text-3xl font-black tracking-wide uppercase">
                {mainEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-purple-100/90 font-medium leading-relaxed max-w-xl line-clamp-2">
                {mainEvent.description}
              </p>
            </div>
          </div>

          {/* RIGHT: Green Event Stack Sidebar */}
          <div className="lg:col-span-5 bg-[#1e3e2b] rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center shadow-xl space-y-6 border border-emerald-800/40">

            <div className="w-full space-y-6">
              {sideEvents.length === 0 ? (
                <p className="text-xs text-emerald-200/70 text-center italic">No other SK news yet.</p>
              ) : (
                sideEvents.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/news/${item._id}`)}
                    className="space-y-2 group cursor-pointer"
                  >
                    <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-purple-950 shadow-md border border-emerald-700/30">
                      {item.image && (
                        <img
                          src={imgSrc(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    <p className="text-center text-xs sm:text-sm font-black text-white tracking-wider uppercase">
                      {item.title}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="w-full pt-2">
              <button
                onClick={() => navigate('/news')}
                className="w-full sm:w-2/3 mx-auto block bg-transparent hover:bg-emerald-800/50 text-white font-bold py-2.5 px-6 rounded-full border border-emerald-400/50 transition text-center shadow-md text-sm"
              >
                Learn more
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}