import React from 'react';

export default function JoinEventsHero() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/path-to-your-gym-image.png"
        alt="Barangay Ungka II Events"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/85 to-emerald-950/90" />

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
          Community & Youth Volunteering
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-normal text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Get involved in local initiatives, youth activities (SK), and community outreach programs in Barangay Ungka.
        </p>
      </div>
    </div>
  );
}