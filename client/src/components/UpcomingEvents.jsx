import React, { useRef, useState, useEffect } from 'react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Tree Planting Activity',
    date: 'November 8, 2026',
    image: '/path-to-plant-hand.png', // Replace with your PNG image
  },
  {
    id: 2,
    title: 'Clean up Drive Activity',
    date: 'November 8, 2026',
    image: '/path-to-trash-hand.png', // Replace with your PNG image
  },
  {
    id: 3,
    title: 'Medical Mission 2026',
    date: 'December 12, 2026',
    image: '/path-to-medical-icon.png',
  },
  {
    id: 4,
    title: 'Youth Sports Fest',
    date: 'December 20, 2026',
    image: '/path-to-sports-icon.png',
  },
];

export default function UpcomingEvents() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track horizontal scroll position to sync custom scrollbar
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScrollableWidth = scrollWidth - clientWidth;
      
      if (totalScrollableWidth > 0) {
        const progress = (scrollLeft / totalScrollableWidth) * 100;
        setScrollProgress(progress);
      }
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d523e]">
            Up-Comming Events!
          </h2>
          <div className="w-48 h-1 bg-[#2d523e] mx-auto rounded-full"></div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pt-8 pb-6 px-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-[85%] sm:w-[450px] bg-[#1e3e2b] text-white rounded-3xl p-6 sm:p-8 relative h-64 flex flex-col justify-between shadow-xl border border-emerald-800/40 group"
            >
              {/* Left Text */}
              <div className="space-y-2 max-w-[65%] z-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {event.title}
                </h3>
                <p className="text-emerald-300 text-sm font-medium">
                  {event.date}
                </p>
              </div>

              {/* Pop-out Right Cutout Image */}
              <div className="absolute right-2 -top-6 bottom-0 w-36 sm:w-44 pointer-events-none flex items-end justify-end">
                <img
                  src={event.image}
                  alt={event.title}
                  className="max-h-[110%] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Action Button */}
              <div className="z-10 pt-4">
                <button className="bg-[#c2e260] hover:bg-[#b0d14e] text-[#1e3e2b] font-extrabold px-6 py-2.5 rounded-full transition shadow-md text-sm">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Pill Scrollbar Track */}
        <div className="w-64 max-w-full mx-auto bg-[#1e3e2b]/30 h-3 rounded-full overflow-hidden p-0.5 relative">
          <div
            className="bg-[#1e3e2b] h-full rounded-full transition-all duration-75 ease-out"
            style={{
              width: '40%', // Width of the draggable/moving thumb
              transform: `translateX(${(scrollProgress * (100 - 40)) / 100}%)`,
            }}
          />
        </div>

      </div>
    </section>
  );
}