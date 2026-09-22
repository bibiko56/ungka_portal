import React from 'react';

export default function JoinCommunityBanner() {
  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-[#1e3e2b] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Call to Action & Button */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
              Do you want to join our<br className="hidden sm:block" /> community events?
            </h2>

            <div>
              <button className="bg-[#2e7d43] hover:bg-[#256637] text-white font-bold py-3 px-8 rounded-full border border-emerald-400/30 transition duration-200 shadow-lg text-sm sm:text-base">
                Join Now!
              </button>
            </div>
          </div>

          {/* CENTER COLUMN: Overlapping Circular Badges */}
          <div className="lg:col-span-4 flex items-center justify-center relative py-6">
            <div className="relative flex items-center justify-center w-full max-w-[320px] h-44">
              
              {/* Left Badge (Green Logo) */}
              <div className="absolute left-0 z-10 w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full p-1.5 shadow-2xl flex items-center justify-center transform -translate-x-2">
                <img
                  src="/path-to-green-leaf-logo.png"
                  alt="Barangay Emblem Left"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Center Main Badge (Barangay Ungka II Official Seal) */}
              <div className="absolute z-20 w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full p-1.5 shadow-2xl flex items-center justify-center -top-2">
                <img
                  src="/path-to-barangay-ungka-seal.png"
                  alt="Barangay Ungka II Seal"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Right Badge (Linggo ng Kabataan Emblem) */}
              <div className="absolute right-2 z-30 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full p-1.5 shadow-2xl flex items-center justify-center translate-y-4">
                <img
                  src="/path-to-linggo-ng-kabataan-badge.png"
                  alt="Linggo ng Kabataan Badge"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Subtext */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <p className="text-emerald-100/90 text-base sm:text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              Take part in our community events and be part of something amazing!
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}