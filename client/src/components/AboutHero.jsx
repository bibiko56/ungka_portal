import React from 'react';

export default function AboutHero() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/path-to-your-gt-town-center.png"
        alt="Barangay Ungka II Aerial View"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/80 to-emerald-950/85" />

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md">
          About UServe & About US
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-normal text-emerald-50 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
          A modern platform designed to provide residents of Barangay Ungka II with easy access to barangay and health center services through innovation, accessibility, and reliable digital solutions. UServe helps residents conveniently discover, request, and access essential services offered by barangay officials and health center personnel, promoting efficient service delivery and a healthier, more connected community.
        </p>
      </div>
    </div>
  );
}