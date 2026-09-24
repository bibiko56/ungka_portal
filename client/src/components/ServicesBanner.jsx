import React from 'react';

export default function ServiceBanner() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/path-to-your-barangay-gym-image.png"
        alt="Barangay Ungka II Covered Court Community Event"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/80 to-emerald-950/85" />

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
          Barangay Services
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-normal text-emerald-50 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
          Provides residents with easy access to clearances, certificates, permits, document requests, community assistance, and other essential barangay services, helping make transactions faster, easier, and more convenient.
        </p>
      </div>
    </div>
  );
}