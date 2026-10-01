import React, { useState } from 'react';
import { Calendar, MapPin, Tag, ArrowRight, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LatestNewsSection() {
  // Main featured news state/data (can be swapped dynamically)
  const [mainNews, setMainNews] = useState({
    tag: 'SANGGUNIANG KABATAAN (SK)',
    location: 'BGRY. UNGKA II, PAVIA, ILOILO',
    date: 'August 22, 2026',
    title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
    description: 'The Sangguniang Kabataan of Barangay Ungka II successfully conducted the "Baghay Kalinga" Outreach Program as part of its commitment to supporting and bringing meaningful activities closer to the community.',
    image: '/path-to-linggo-ng-kabataan-main.png', // Replace with your main image path or URL
  });

  // Related news items list with independent image sources
  const relatedNews = [
    {
      id: 1,
      title: 'PARADE MAP & ROUTE',
      description: "Let's start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!",
      date: 'August 21, 2026',
      image: '/path-to-kk-assembly.png', // Replace with thumbnail image 1
    },
    {
      id: 2,
      title: 'PARADE MAP & ROUTE',
      description: "Let's start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!",
      date: 'August 21, 2026',
      image: '/path-to-bulig-eskwela.png', // Replace with thumbnail image 2
    },
    {
      id: 3,
      title: 'PARADE MAP & ROUTE',
      description: "Let's start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!",
      date: 'August 21, 2026',
      image: '/path-to-parade-map.png', // Replace with thumbnail image 3
    },
  ];

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
        
        {/* LEFT & CENTER: Main Featured News Card (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Main Picture Box with `src` */}
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-emerald-950 shadow-inner flex items-center justify-center">
            <img 
              src={mainNews.image} 
              alt={mainNews.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback visual placeholder if image path is empty/broken
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Placeholder content if no image is provided yet */}
            <div className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-emerald-950 text-white p-6 text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Featured Main Image</span>
              <h3 className="text-xl sm:text-2xl font-black">{mainNews.title}</h3>
              <p className="text-xs text-gray-300">Update the `mainNews.image` state or prop with your image path.</p>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide">
            <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {mainNews.tag}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              {mainNews.location}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              {mainNews.date}
            </span>
          </div>

          {/* Article Title & Description */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-snug">
              {mainNews.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {mainNews.description}
            </p>
          </div>

          {/* Action Buttons & Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button className="bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                View Details
              </button>
              <button className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                Register
              </button>
            </div>

            {/* Social Share Button */}
            <button className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>


        {/* RIGHT SIDEBAR: Related News (Takes up 1 column) */}
        <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Sidebar Header */}
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

          {/* Related News List Items */}
          <div className="space-y-4">
            {relatedNews.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  // Optional: Click to preview or load into main view
                }}
                className="bg-white border border-gray-200/70 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 cursor-pointer group"
              >
                {/* Thumbnail Image with `src` */}
                <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-emerald-900 text-white text-[9px] font-bold text-center p-1">
                    Thumb
                  </div>
                </div>

                {/* Thumbnail Text Content */}
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

          {/* Bottom Pagination Dots matching reference image */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-6 h-3 bg-emerald-700 rounded-full cursor-pointer shadow-sm" />
            <div className="w-3 h-3 bg-emerald-200 rounded-full cursor-pointer hover:bg-emerald-400 transition-colors" />
            <div className="w-3 h-3 bg-emerald-200 rounded-full cursor-pointer hover:bg-emerald-400 transition-colors" />
          </div>

        </div>

      </div>

    </div>
  );
}