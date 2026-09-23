import React from 'react';

export default function ServicesBanner() {
  return (
    <section className="relative bg-emerald-950 text-white min-h-[420px] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Image with Dark Green Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          // Replace with your actual image path or asset import
          backgroundImage: `url('/path-to-your-barangay-gym-image.png')`
        }}
      />
      
      {/* Gradient Overlay for the dark green tint */}
      <div className="absolute inset-0 bg-emerald-950/70" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Barangay Services
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl font-normal text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Provides residents with easy access to clearances, certificates,
          permits, document requests, community assistance, and other
          essential barangay services, helping make transactions faster,
          easier, and more convenient.
        </p>
      </div>
    </section>
  );
}