import React from 'react';

export default function RecentAccomplishmentsGrid() {
  const accomplishments = [
    {
      id: 1,
      title: 'Altiora Develops and Turns Over MoneySmart Youth AI Coach',
      description:
        'Altiora Digital Services successfully conducted a Financial Literacy Workshop for the youth of Barangay Ungka II, Pavia, Iloilo.',
      date: 'November 21, 2025',
      image: '/path-to-altiora-image.png', // Replace with your image asset
    },
    {
      id: 2,
      title: 'Blood Donation Marathon',
      description:
        'Lubos ang pasalamat sang Sangguniang Kabataan (SK) Officials sang Brgy. Ungka II, Pavia, Iloilo sa madinalag-on nga paghiwat sang RMN kag iFM Iloilo Blood Donation Marathon sa GT Town Center subong nga adlaw.',
      date: 'November 24, 2025',
      image: '/path-to-blood-marathon-image.png', // Replace with your image asset
    },
    {
      id: 3,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description:
        'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'December 10, 2025',
      image: '/path-to-bahay-kalinga-image.png', // Replace with your image asset
    },
    {
      id: 4,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description:
        'The league provides a positive and competitive environment where participants can showcase their talents while strengthening camaraderie and community spirit.',
      date: 'December 15, 2025',
      image: '/path-to-basketball-league-image.png', // Replace with your image asset
    },
    {
      id: 5,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description:
        'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'November 21, 2025',
      image: '/path-to-blood-donation-image.png', // Replace with your image asset
    },
    {
      id: 6,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description:
        'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      date: 'November 24, 2025',
      image: '/path-to-cleanup-drive-image.png', // Replace with your image asset
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Section Title & Underline Divider */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 tracking-tight">
          Recent Accomplishments
        </h2>
        <div className="w-48 h-1 bg-emerald-800 mx-auto rounded-full" />
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {accomplishments.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 gap-5"
          >
            {/* Card Thumbnail Image */}
            <div className="w-full sm:w-48 h-44 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content Details */}
            <div className="flex flex-col justify-between h-full w-full space-y-3">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Date Footer */}
              <div className="pt-2 border-t border-gray-50">
                <span className="text-xs font-bold text-emerald-800">
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}