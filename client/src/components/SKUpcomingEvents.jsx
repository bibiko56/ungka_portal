import React, { useState } from 'react';

const skEventsData = [
  {
    id: 1,
    title: 'YOUR CAREER JOURNEY STARTS HERE!',
    description: 'Your resume is your first introduction. Your interview is your opportunity to make an impression. So, why not be ready for both?',
    subText: 'As part of Linggo ng Kabataan 2026, the Sangguniang Kabataan of Barangay Ungka II, Pavia, Iloilo invites the youth to our Resume Workshop and Interview Skills Training – a practical session designed to help young people become more confident, prepared, and career-ready.',
    date: 'August 22, 2026',
    category: 'Education Support',
    filterCategory: 'Aid & Assistance',
    image: '/path-to-resume-workshop.png',
  },
  {
    id: 2,
    title: 'BULIG ESKWELA PROGRAM 2026',
    description: 'Education is a journey, and no student should have to walk it without the support they need.',
    subText: 'The Sangguniang Kabataan of Barangay Ungka II, Pavia, Iloilo, proudly presents the Bulig Eskwela Program – an initiative that aims to provide essential educational kits to college students and help lessen the financial burden of their academic journey.',
    date: 'August 22, 2026',
    category: 'Education Support',
    filterCategory: 'Aid & Assistance',
    image: '/path-to-bulig-eskwela.png',
  },
  {
    id: 3,
    title: 'BLOOD DONATION DRIVE FOR DRUG PREVENTION',
    description: 'One donation can save lives. One choice can change a future.',
    subText: 'As part of Linggo ng Kabataan 2026, the Sangguniang Kabataan of Ungka II, Pavia, Iloilo invites everyone to join our Blood Donation Drive for Drug Prevention – a meaningful initiative that promotes health, youth participation, and a drug-free community.',
    date: 'August 23, 2026',
    category: 'Health Support',
    filterCategory: 'Healthcare',
    image: '/path-to-blood-donation.png',
  },
  {
    id: 4,
    title: 'INTER-ZONE BASKETBALL LIGA 2026',
    description: 'Unleash your passion on the court and show your barangay spirit!',
    subText: 'Join the Sangguniang Kabataan in promoting sportsmanship, fitness, and unity across all zones of Barangay Ungka II.',
    date: 'August 25, 2026',
    category: 'Sports Support',
    filterCategory: 'Barangay Programs',
    image: '/path-to-basketball-liga.png',
  },
];

const filterCategories = ['All', 'Healthcare', 'Aid & Assistance', 'Barangay Programs'];

export default function SKUpcomingEvents() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredEvents = selectedCategory === 'All'
    ? skEventsData
    : skEventsData.filter((item) => item.filterCategory === selectedCategory);

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Title & Subtitle */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3e2b]">
            SK Up-Coming Events
          </h2>
          <div className="w-48 h-1 bg-[#1e3e2b] mx-auto rounded-full"></div>
          <p className="text-[#1e3e2b] font-bold text-sm sm:text-base pt-1">
            By: Ungka2 Katipunan Ng Kabataan
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(3);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm sm:text-base border-2 transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#1e3e2b] text-white border-[#1e3e2b]'
                  : 'bg-white text-[#1e3e2b] border-[#1e3e2b] hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Settings / Filter Icon */}
          <button className="p-2.5 rounded-full bg-[#1e3e2b] text-white hover:bg-[#152e20] transition shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        {/* List of Wide Cards */}
        <div className="space-y-10 pt-4">
          {displayedEvents.map((item) => (
            <div key={item.id} className="group">
              
              {/* Main Dark Green Banner Card */}
              <div className="bg-[#2a4d38] text-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch border border-emerald-800/40">
                
                {/* Left Flyer Graphic */}
                <div className="w-full md:w-64 lg:w-72 h-64 md:h-auto flex-shrink-0 bg-purple-950 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right Details Container */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                      {item.description}
                    </p>

                    <p className="text-xs text-emerald-200/80 leading-relaxed italic">
                      {item.subText}
                    </p>
                  </div>

                  {/* Date Metadata */}
                  <div className="flex items-center gap-2 text-xs font-bold text-white pt-2">
                    <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{item.date}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Action Pill & Category Tag */}
              <div className="flex items-center gap-2 mt-3 pl-2">
                <button className="bg-[#c2e260] hover:bg-[#b0d14e] text-[#1e3e2b] font-extrabold px-6 py-2 rounded-full transition shadow-md text-xs sm:text-sm">
                  Learn More
                </button>

                <div className="bg-white text-[#1e3e2b] border border-[#1e3e2b] font-bold text-xs px-5 py-2 rounded-full shadow-sm">
                  {item.category}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < filteredEvents.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleViewMore}
              className="bg-[#1e3e2b] hover:bg-[#152e20] text-white font-extrabold px-10 py-3.5 rounded-full transition shadow-lg text-sm sm:text-base border border-emerald-600/40"
            >
              View More
            </button>
          </div>
        )}

      </div>
    </section>
  );
}