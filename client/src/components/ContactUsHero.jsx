import React from 'react';

export default function ContactUsHero() {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/path-to-your-gt-town-center.png" // Replace with your GT Town Center image path
        alt="GT Town Center Area"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/80 to-emerald-950/85" />

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg lg:text-xl font-normal text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Have questions, concerns, or need assistance? We're here to help! At UServe, we value your feedback and are always ready to assist our users.
        </p>
      </div>
    </div>
  );
}