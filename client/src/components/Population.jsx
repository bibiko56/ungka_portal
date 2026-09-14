import React from 'react';

export default function Population() {
  return (
    <div className="bg-white text-gray-800 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* TOP SECTION: Population Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2d523e] leading-tight decoration-[#2d523e] decoration-4 underline-offset-8">
              Barangay Ungka II<br />
              Population
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              According to the Philippine Statistics Authority (PSA), Barangay Ungka II, Pavia, Iloilo had a population of 5,641 residents in the 2024 POPCEN, making it the 4th most populous barangay in Pavia. It is classified as an urban barangay.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Barangay Ungka II is an urban and growing community in Pavia, Iloilo, known as the "Commercial Center of Pavia." It is home to major shopping centers and businesses, making it an active area for residents, visitors, and commercial activities. Its growing population highlights the need for fast, accessible, and organized community information and services.
            </p>

            <button className="bg-[#2d523e] hover:bg-[#234232] text-white font-semibold py-3 px-8 rounded-xl transition duration-200 shadow-md">
              Learn more
            </button>
          </div>

          {/* Right Map Image */}
          <div className="flex justify-center items-center">
            <img
              src="map.png" 
              alt="Barangay Ungka II Map"
              className="w-full max-w-lg object-contain drop-shadow-xl"
            />
          </div>

        </div>

        {/* BOTTOM SECTION: Hotline Assistance Banner */}
        <div className="bg-[#1e3e2b] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          
          {/* Illustration Container */}
          <div className="flex-shrink-0 w-36 sm:w-44">
            <img
              src="avatar.png" 
              alt="Support Avatar"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Text and Hotline Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Do You Need Assistance?
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-xl">
              Our support team is ready to help you with your concerns and emergency needs.
            </p>
            <p className="text-xl sm:text-2xl font-black text-white pt-2">
              Barangay Hotline: <span className="text-emerald-300">0912 345 6789</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}