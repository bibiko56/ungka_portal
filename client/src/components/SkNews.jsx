import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function SkNews() {
  // Main featured SK news state
  const [mainNews, setMainNews] = useState({
    title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
    date: 'August 22, 2026',
    description: 'The wait is over! Get ready as we officially open Linggo ng Kabataan 2026 - a celebration of youth participation, leadership, creativity, and meaningful community engagement.',
    image: 'path-to-linggo-ng-kabataan-main.png', // Replace with your main feature image path
  });

  // Right sidebar SK news list items with independent `src`
  const sidebarNews = [
    {
      id: 1,
      title: 'PARADE MAP & ROUTE',
      description: "Let's start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!",
      date: 'August 21, 2026',
      image: 'path-to-parade-map.png',
    },
    {
      id: 2,
      title: 'BULIG ESKWELA PROGRAM 2026',
      description: 'The Sangguniang Kabataan of Barangay Ungka II, Pavia, Iloilo, proudly presents the Bulig Eskwela Program',
      date: 'August 22, 2026',
      image: 'path-to-bulig-eskwela.png',
    },
    {
      id: 3,
      title: 'KATIPUNAN NG KABATAAN ASSEMBLY 2026',
      description: 'Your voice, ideas, and participation matter in shaping a better future for the youth and our community.',
      date: 'August 20, 2026',
      image: 'path-to-kk-assembly.png',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Top Header Tag */}
      <div>
        <span className="inline-block bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-lg shadow-sm">
          SK-News
        </span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Featured SK News Card (Takes up 6 cols) */}
        <div className="lg:col-span-6 bg-purple-950/90 border border-purple-900 rounded-3xl overflow-hidden shadow-md flex flex-col">
          
          {/* Main Featured Image with `src` */}
          <div className="relative w-full h-[340px] sm:h-[400px] bg-purple-900 overflow-hidden flex items-center justify-center">
            <img 
              src={mainNews.image} 
              alt={mainNews.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 hidden flex-col items-center justify-center bg-purple-950 text-white p-6 text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Main SK Image Placeholder</span>
              <p className="text-xs text-gray-300">Update `mainNews.image` state or prop with your path.</p>
            </div>
          </div>

          {/* Card Content Overlay / Box */}
          <div className="p-6 sm:p-8 text-white space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                {mainNews.title}
              </h2>
              
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                <Calendar className="w-3.5 h-3.5" />
                <span>{mainNews.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-light">
                {mainNews.description}
              </p>
            </div>

            {/* Action Arrow Button */}
            <div className="flex justify-end pt-2">
              <button className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-sm transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>


        {/* RIGHT COLUMN: Sidebar News Cards List (Takes up 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {sidebarNews.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-5 group"
            >
              {/* Thumbnail Image with `src` */}
              <div className="w-full sm:w-32 h-28 rounded-xl bg-purple-950 overflow-hidden flex-shrink-0 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-purple-950 text-white text-[10px] font-bold text-center p-1">
                  Thumbnail
                </div>
              </div>

              {/* Sidebar Item Content */}
              <div className="space-y-2 flex-1 min-w-0 w-full">
                <h3 className="text-sm sm:text-base font-black text-emerald-950 tracking-wide uppercase truncate group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{item.date}</span>
                  </div>

                  <button className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Closing Banner Text matching reference image */}
      <div className="pt-4 px-2">
        <p className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed max-w-5xl">
          Barangay Ungka II continues to grow through unity, active participation, and community involvement. Together, residents and local officials work to create a safer, more informed, and stronger community for everyone.
        </p>
      </div>

    </div>
  );
}