import React, { useState, useRef, useEffect } from 'react';

const featuresData = [
  {
    id: 1,
    title: 'Barangay Activities and Events',
    description: 'Get notifications about sports events, community activities, meetings, and other barangay gatherings to encourage community participation.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Health & Medical Services',
    description: 'Access information on health center schedules, free checkups, vaccination drives, and medical clearance requests.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Community Announcements',
    description: 'Stay connected with your barangay, receive timely updates, and communicate easily with local officials anytime, anywhere.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A2.5 2.5 0 013 11.2V8.8a2.5 2.5 0 012.436-2.483L11 5.882" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Barangay Information Hub',
    description: 'Access important barangay information quickly, including services, office hours, requirements, contacts, and community resources.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Barangay Requirements',
    description: 'Easily check the requirements needed for barangay services, such as residency certificates, barangay clearances, permits, and other documents.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const cardRefs = useRef([]);
  const trackRef = useRef(null);

  // Auto-center active card
  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  const handleScroll = (direction) => {
    if (direction === 'left') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setActiveIndex((prev) => Math.min(prev + 1, featuresData.length - 1));
    }
  };

  // Custom Drag Calculations for Bottom Track
  const calculateIndexFromPointer = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newIndex = Math.round(percentage * (featuresData.length - 1));
    setActiveIndex(newIndex);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    calculateIndexFromPointer(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    calculateIndexFromPointer(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Fallback for untracked release
    }
  };

  return (
    <section className="bg-[#2d523e] text-white py-16 px-4 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase mb-3">
          FEATURES WEBSITE
        </h2>
        <p className="text-emerald-100/80 text-sm sm:text-base max-w-2xl mx-auto">
          Smart tools designed to improve communication and support within the barangay community.
        </p>
      </div>

      {/* Main Carousel Wrapper */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          disabled={activeIndex === 0}
          className="z-20 p-2.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 backdrop-blur-md text-emerald-200 hover:bg-emerald-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          aria-label="Previous Feature"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </button>

        {/* Scrollable Cards Container */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto py-8 px-[35vw] scrollbar-none scroll-smooth items-center w-full">
          {featuresData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer transition-all duration-300 transform flex-shrink-0 w-64 sm:w-72 rounded-2xl p-6 border flex flex-col items-center text-center ${
                  isActive
                    ? 'bg-emerald-900/90 border-emerald-400/80 shadow-2xl scale-110 z-10 -translate-y-2'
                    : 'bg-emerald-950/40 border-emerald-800/40 opacity-50 hover:opacity-80 scale-95'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md transition-colors ${
                    isActive ? 'bg-emerald-500 ring-4 ring-emerald-400/30' : 'bg-emerald-700/80'
                  }`}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-xs text-emerald-100/70 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          disabled={activeIndex === featuresData.length - 1}
          className="z-20 p-2.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 backdrop-blur-md text-emerald-200 hover:bg-emerald-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          aria-label="Next Feature"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

      </div>

      {/* Smooth Drag Slider Track */}
      <div className="mt-8 flex justify-center">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-56 sm:w-72 h-5 bg-emerald-950/80 rounded-full border border-emerald-800/80 relative p-1 cursor-grab active:cursor-grabbing touch-none flex items-center shadow-inner"
        >
          {/* Animated Sliding Thumb / Pill */}
          <div
            className="h-full bg-emerald-300 rounded-full shadow-md transition-all duration-150 pointer-events-none"
            style={{
              width: `${100 / featuresData.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}