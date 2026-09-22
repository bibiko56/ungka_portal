import React from 'react';

export default function StartUServeCTA() {
  const handleContactClick = () => {
    // Add your navigation or contact modal trigger here
    console.log('Navigate to Contact Us');
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* SECTION TITLE & UNDERLINE */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3e2b]">
            Start Using UServe Today
          </h2>
          <div className="w-48 sm:w-56 h-1 bg-[#1e3e2b] mx-auto rounded-full"></div>
        </div>

        {/* SUBTEXT DESCRIPTION */}
        <p className="text-base sm:text-lg font-semibold text-[#1e3e2b] leading-relaxed max-w-2xl mx-auto">
          Have a problem, concern, or question? Contact us directly for assistance, inquiries, and barangay-related concerns.
        </p>

        {/* CTA BUTTON */}
        <div className="pt-2">
          <button
            onClick={handleContactClick}
            className="bg-[#1e3e2b] hover:bg-[#152e20] text-white font-extrabold px-10 py-3.5 rounded-full transition duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base uppercase tracking-wider border border-emerald-700/30"
          >
            CONTACT US
          </button>
        </div>

      </div>
    </section>
  );
}