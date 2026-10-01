import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function RecentAccomplishments2() {
  // Main featured accomplishment state
  const [mainAccomplishment, setMainAccomplishment] = useState({
    title: 'Barangay Ungka II Leads Tree Planting and Clean-Up Drive',
    description: 'Pavia, Iloilo – In a strong show of community spirit, Barangay Ungka II recently conducted a comprehensive tree planting and clean-up drive. The activity brought residents together to help promote environmental awareness and maintain a cleaner, greener community.',
    image: 'path-to-tree-planting-image.png', // Replace with your main feature image path
  });

  // Bottom gallery cards list with independent `src`
  const galleryCards = [
    {
      id: 1,
      title: 'Barangay Ungka II Clean-Up Drive 2025',
      description: 'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      image: 'path-to-tree-planting-image2.png',
    },
    {
      id: 2,
      title: 'Ungka II Blood Donation Drive for Drug Prevention',
      description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      image: 'path-to-blood-donation-image.png',
    },
    {
      id: 3,
      title: 'Barangay Ungka II Clean-Up Drive 2025',
      description: 'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      image: 'path-to-cleanup-drive-image.png',
    },
  ];

  // Recent Accomplishments sidebar list items with independent `src`
  const sidebarAccomplishments = [
    {
      id: 1,
      title: 'Altiora Develops and Turns Over MoneySmart Youth AI Coach',
      description: 'Altiora Digital Services successfully conducted a Financial Literacy Workshop for the youth of Barangay Ungka II, Pavia, Iloilo.',
      image: 'path-to-altiora-image.png',
    },
    {
      id: 2,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description: 'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      image: 'path-to-bahay-kalinga-image.png',
    },
    {
      id: 3,
      title: 'Ungka II Blood Donation Drive for Drug Prevention',
      description: "Let's start the celebration of Linggo ng Kabataan 2026 tomorrow with our Opening Parade and Sama-Samang Saya: A Community Fun Game!",
      image: 'path-to-blood-donation-image.png',
    },
    {
      id: 4,
      title: 'Tree Planting (With Sk)',
      description: 'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      image: 'path-to-cleanup-drive-image.png',
    },
    {
      id: 5,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description: 'The league provides a positive and competitive environment where participants can showcase their talents while strengthening camaraderie and community spirit.',
      image: 'path-to-basketball-league-image.png',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT & CENTER: Main Featured Article Section (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Featured Post Box (Image Left, Text Right) */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Main Image with `src` */}
            <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden bg-emerald-950 shadow-inner flex items-center justify-center">
              <img 
                src={mainAccomplishment.image} 
                alt={mainAccomplishment.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-emerald-900 text-white p-4 text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Main Accomplishment Image</span>
                <p className="text-xs">Update `mainAccomplishment.image` path.</p>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-snug">
                {mainAccomplishment.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {mainAccomplishment.description}
              </p>
            </div>

          </div>

          {/* Closing Summary Text & Hashtags */}
          <div className="space-y-4 px-2">
            <p className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">
              Together, through unity and responsible action, the community can help create a cleaner, greener, and better place for everyone. 🌱🌳
            </p>
            
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold text-emerald-800">
              <span>#BarangayUngkaII</span>
              <span>#CommunityNews</span>
              <span>#TreePlanting</span>
              <span>#CleanUpDrive</span>
              <span>#EnvironmentalAwareness</span>
              <span>#PaviaIloilo</span>
              <span>#CommunitySpirit</span>
              <span>#GoGreen</span>
              <span>#CleanAndGreen</span>
            </div>
          </div>

          {/* Divider Line matching reference image */}
          <div className="w-full h-0.5 bg-emerald-800/40 rounded-full my-6" />

          {/* Bottom 3 Cards Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {galleryCards.map((card) => (
              <div 
                key={card.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow"
              >
                {/* Card Image with `src` */}
                <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-emerald-900 text-white text-[10px] font-bold">
                    Gallery Image
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wide leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Navigation Arrow */}
          <div className="flex justify-end pt-2">
            <button className="w-9 h-9 rounded-full bg-emerald-900 text-white flex items-center justify-center shadow-sm hover:bg-emerald-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>


        {/* RIGHT SIDEBAR: Recent Accomplishments (Takes up 1 column) */}
        <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Sidebar Header */}
          <div className="border-b border-gray-200 pb-4 text-center sm:text-left">
            <h3 className="text-lg font-black text-emerald-950 tracking-tight">Recent Accomplishments</h3>
          </div>

          {/* Sidebar List Items */}
          <div className="space-y-4">
            {sidebarAccomplishments.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-gray-200/70 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex items-start gap-3 group"
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
                  <h4 className="text-xs font-black text-emerald-950 tracking-wide line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}