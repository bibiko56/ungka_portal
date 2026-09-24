import React, { useRef } from 'react';

const servicesData = [
  {
    id: 1,
    title: 'Medical Consultation',
    description: 'Provides basic check-ups, consultations, and health advice for residents.',
    image: '/path-to-medical-consultation.png',
  },
  {
    id: 2,
    title: 'Immunization',
    description: 'Offers routine vaccinations to help protect children and residents from diseases.',
    image: '/path-to-immunization.png',
  },
  {
    id: 3,
    title: 'Dengue Prevention',
    description: 'Provides information and guidance on preventing dengue and controlling mosquito breeding.',
    image: '/path-to-dengue-prevention.png',
  },
  {
    id: 4,
    title: 'Medicine Assistance',
    description: 'Helps residents access available medicines for common health conditions.',
    image: '/path-to-medicine-assistance.png',
  },
  {
    id: 5,
    title: 'Maternal & Child Care',
    description: 'Comprehensive check-ups and nutritional monitoring for expecting mothers and infants.',
    image: '/path-to-maternal-care.png',
  },
  {
    id: 6,
    title: 'Child Health',
    description: 'Growth monitoring, nutrition assessment, and health check-ups for children.',
    image: '/path-to-child-care.png',
  },
  {
    id: 7,
    title: 'Health Screening',
    description: 'Basic monitoring such as blood pressure, temperature, and other available screenings.',
    image: '/path-to-health-screening.png',
  },
  {
    id: 8,
    title: 'Nutrition Services',
    description: 'Nutrition counseling and monitoring for children, mothers, and other residents.',
    image: '/path-to-nutrition.png',
  },
  {
    id: 9,
    title: 'First Aid',
    description: 'Assistance for minor injuries and common health concerns.',
    image: '/path-to-first-aid.png',
  },
  {
    id: 10,
    title: 'Health Records',
    description: 'Assistance with available health-related records and certifications.',
    image: '/path-to-health-record.png',
  },
  {
    id: 11,
    title: 'Health Educationh',
    description: 'Information campaigns about sanitation, hygiene, disease prevention, and healthy living.',
    image: '/path-to-health-education.png',
  }
];

export default function HealthCenterServices() {
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
      <div className="inline-block bg-[#1e3e2b] text-white font-extrabold text-xl sm:text-2xl px-6 py-2.5 rounded-r-full shadow-md">
          Health Center Services
        </div>
      
      {/* SERVICES OFFERED HEADING */}
      <h3 className="text-2xl sm:text-3xl font-black text-[#1e3e2b]">
        Services Offered:
      </h3>

      {/* WHITE BACKGROUND BOX WITH GREEN BORDER */}
      <div className="bg-white border-2 border-[#1e3e2b] rounded-3xl p-6 sm:p-8 text-gray-800 shadow-md space-y-6">
        
        {/* Intro Subtext */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl font-medium">
          The Barangay Ungka II Health Center offers basic healthcare services, including check-ups, immunization, maternal and child care, medicine assistance, and health education.
        </p>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#1e3e2b] scrollbar-track-gray-100 snap-x snap-mandatory scroll-smooth"
        >
          {servicesData.map((service) => (
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