import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, ArrowLeft, Share2 } from 'lucide-react';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    window.scrollTo(0, 0);

    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setArticle(data);

        // Pick a few other articles at random to recommend
        const all = await fetch(`${import.meta.env.VITE_API_URL}/api/news`).then((r) => r.json());
        const others = all.filter((a) => a._id !== id);
        const shuffled = others.sort(() => 0.5 - Math.random());
        setRecommended(shuffled.slice(0, 3));
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const imgSrc = (img) => (img ? `${import.meta.env.VITE_API_URL}${img}` : '');

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
        <p className="text-xs text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans text-center space-y-4">
        <h1 className="text-xl font-black text-emerald-950">Article not found</h1>
        <p className="text-sm text-gray-500">This article may have been removed.</p>
        <Link to="/news" className="inline-block text-sm font-bold text-emerald-700 hover:underline">
          ← Back to News & Updates
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="relative w-full h-[260px] sm:h-[420px] rounded-3xl overflow-hidden bg-emerald-950 shadow-inner flex items-center justify-center">
          {article.image ? (
            <img src={imgSrc(article.image)} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-emerald-300 font-bold">No image</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide">
          {article.tag && (
            <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {article.tag}
            </span>
          )}
          {article.location && (
            <span className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              {article.location}
            </span>
          )}
          <span className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            {formatDate(article.date)}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight leading-snug">
            {article.title}
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {article.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link to="/news" className="text-xs font-bold text-emerald-800 hover:underline">
            ← Back to News & Updates
          </Link>
          <button className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Recommended articles */}
        {recommended.length > 0 && (
          <div className="pt-8 border-t border-gray-100 space-y-5">
            <h2 className="text-lg font-black text-emerald-950">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recommended.map((item) => (
                <button
                  key={item._id}
                  onClick={() => navigate(`/news/${item._id}`)}
                  className="text-left bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-full h-32 bg-gray-200 overflow-hidden">
                    {item.image ? (
                      <img
                        src={imgSrc(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-900 text-white text-[9px] font-bold">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-black text-emerald-950 uppercase line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500">{formatDate(item.date)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}