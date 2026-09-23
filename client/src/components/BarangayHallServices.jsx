import React, { useRef } from 'react';

const barangayServicesData = [
  {
    id: 1,
    title: 'Complaints',
    description: 'Filing official reports, blotters, or disputes for local dispute resolution (Katarungang Pambarangay).',
    image: '/path-to-complaints.png',
  },
  {
    id: 2,
    title: 'Summon',
    description: 'Issuing formal notices or summonses for involved parties to attend barangay conciliation sessions.',
    image: '/path-to-summon.png',
  },
  {
    id: 3,
    title: 'Inquiries',
    description: 'Processing general questions regarding local barangay records, requirements, fees, and government programs.',
    image: '/path-to-inquiries.png',
  },
  {
    id: 4,
    title: 'Certification',
    description: 'Issuing official barangay certificates, clearances, and endorsements for employment, business, or government requirements.',
    image: '/path-to-certification.png',
  },
  {
    id: 5,
    title: 'Barangay Clearance',
    description: 'Processing official clearance permits for residency verification, business operations, and legal applications.',
    image: '/path-to-clearance.png',
  },
  {
    id: 6,
    title: 'Cedula',
    description: 'Securing a Community Tax Certificate (CTC), an essential government-issued identification document...',
    image: '/path-to-cedula.png',
  },
  {
    id: 7,
    title: 'Official Receipts',
    description: 'Issuing proof of payment for local fees, permits, taxes, or other financial transactions processed by the office.',
    image: '/path-to-official-receipts.png',
  },
];

export default function BarangayHallServices() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* SECTION HEADER BANNER */}
      <div className="space-y-6">
        {/* Slanted Green Header Badge */}
        <div className="inline-block bg-[#1e3e2b] text-white font-extrabold text-xl sm:text-2xl px-6 py-2.5 rounded-r-full shadow-md">
          Barangay Hall Services
        </div>

        {/* Hero Banner with Dark Gradient Overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 sm:h-96 bg-gray-900">
          <img
            src="/path-to-barangay-officials.jpg"
            alt="Barangay Ungka II Hall Officials"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
              Barangay Ungka II Hall Services
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-3xl leading-relaxed">
              The Barangay Ungka II Hall provides administrative assistance, dispute resolution, public inquiries, and official documentation services to support the community's governance and public needs.
            </p>
          </div>
        </div>
      </div>

      {/* SERVICES OFFERED HEADING */}
      <h3 className="text-2xl sm:text-3xl font-black text-[#1e3e2b]">
        Services Offered:
      </h3>

      {/* WHITE BACKGROUND BOX WITH GREEN BORDER */}
      <div className="bg-white border-2 border-[#1e3e2b] rounded-3xl p-6 sm:p-8 text-gray-800 shadow-md space-y-6">
        
        {/* Intro Subtext */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl font-medium">
          Barangay Ungka II offers administrative and public service assistance, including complaint blotters, conciliation summons, general inquiries, and official certifications.
        </p>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#1e3e2b] scrollbar-track-gray-100 snap-x snap-mandatory scroll-smooth"
        >
          {barangayServicesData.map((service) => (
            <div
              key={service.id}
              className="min-w-[260px] sm:min-w-[280px] max-w-[280px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between snap-start flex-shrink-0 group hover:shadow-md transition duration-300"
            >
              {/* Card Image */}
              <div className="h-44 w-full bg-gray-100 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Text Content */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-2">
                <h4 className="font-bold text-base text-[#1e3e2b] leading-snug">
                  {service.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button className="bg-[#1e3e2b] hover:bg-[#152e20] text-white font-extrabold px-6 py-2.5 rounded-full transition shadow-sm text-xs sm:text-sm">
            View More
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="p-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#1e3e2b] transition shadow-sm border border-[#1e3e2b]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="p-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#1e3e2b] transition shadow-sm border border-[#1e3e2b]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}