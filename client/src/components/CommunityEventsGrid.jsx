import React from 'react';

export default function CommunityEventsGrid() {
  const events = [
    {
      id: 1,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description:
        'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'November 21, 2025',
      image: '/path-to-blood-donation-image.png', // Replace with your image path
    },
    {
      id: 2,
      title: 'Ungka II Blood donation Drive for Drug Prevention',
      description:
        'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      date: 'November 24, 2025',
      image: '/path-to-cleanup-drive-image.png', // Replace with your image path
    },
    {
      id: 3,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description:
        'This activity encourages residents to donate blood to help save lives while raising awareness about the importance of staying away from illegal drugs.',
      date: 'December 10, 2025',
      image: '/path-to-bahay-kalinga-image.png', // Replace with your image path
    },
    {
      id: 4,
      title: 'SK Ungka II Conducts "Bahay Kalinga" Outreach Program',
      description:
        'The league provides a positive and competitive environment where participants can showcase their talents while strengthening camaraderie and community spirit.',
      date: 'December 15, 2025',
      image: '/path-to-basketball-league-image.png', // Replace with your image path
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 2x2 Grid of Event Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 gap-5 border border-gray-100"
          >
            {/* Event Image */}
            <div className="w-full sm:w-48 h-44 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Content */}
            <div className="flex flex-col justify-between h-full w-full space-y-3">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-emerald-800 leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>

              {/* Date & Share Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-xs font-semibold text-emerald-800">
                  {event.date}
                </span>
                <button
                  type="button"
                  aria-label="Share Event"
                  className="p-1.5 text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Paragraph */}
      <div className="pt-6">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-800 leading-relaxed text-left">
          Barangay Ungka II continues to grow through unity, active participation, and community involvement. Together, residents and local officials work to create a safer, more informed, and stronger community for everyone.
        </p>
      </div>
    </section>
  );
}