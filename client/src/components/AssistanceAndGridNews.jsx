import React, { useState } from 'react';
import { Share2, PhoneCall } from 'lucide-react';

export default function AssistanceAndGridNews() {
  // Array of news / program items for the 4-card grid
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'November 21, 2025',
      image: 'path-to-blood-donation-image.png', // Replace with your image path
    },
    {
      id: 2,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description: 'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      date: 'November 24, 2025',
      image: 'path-to-tree-planting-image.png', // Replace with your image path
    },
    {
      id: 3,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'December 10, 2025',
      image: 'path-to-bahay-kalinga-image.png', // Replace with your image path
    },
    {
      id: 4,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description: 'The league provides a positive and competitive environment where participants can showcase their talents while strengthening camaraderie and community spirit.',
      date: 'December 18, 2025',
      image: 'path-to-basketball-league-image.png', // Replace with your image path
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-16">
      
      {/* ================= ASSISTANCE BANNER SECTION ================= */}
      <div className="relative w-full">
        <div className="bg-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-visible">
          
          {/* Left Side: Illustration / Character Image Placeholder with `src` */}
          <div className="absolute -top-12 left-6 sm:left-10 hidden md:block w-36 lg:w-44 h-44">
            <img 
              src="path-to-mascot.png" 
              alt="Support Assistant" 
              className="w-full h-full object-contain filter drop-shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback avatar box if image asset is not yet added */}
            <div className="hidden w-32 h-32 rounded-full bg-emerald-700 border-4 border-emerald-800 items-center justify-center text-xs font-bold text-center p-2 shadow-lg">
              Support Mascot Image
            </div>
          </div>

          {/* Spacer for desktop layout since image overflows at the top/left */}
          <div className="hidden md:block w-28 lg:w-36 flex-shrink-0" />

          {/* Right Side: Assistance Text & Hotline Info */}
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


      {/* ================= DIVIDER LINE ================= */}
      <div className="w-full h-0.5 bg-emerald-700/40 rounded-full" />


      {/* ================= 2-COLUMN NEWS / PROGRAMS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {newsItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-gray-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6 group"
          >
            {/* Thumbnail Image with `src` (Uniform size matching reference) */}
            <div className="w-full sm:w-44 h-36 rounded-2xl bg-gray-200 overflow-hidden flex-shrink-0 relative shadow-inner">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-emerald-950 text-white text-[10px] font-bold text-center p-2">
                Card Image
              </div>
            </div>

            {/* Information & Actions */}
            <div className="space-y-3 flex-1 w-full flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide leading-snug group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Date and Share Button Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-500">
                  {item.date}
                </span>

                <button className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-sm transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}