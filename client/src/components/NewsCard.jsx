import React from 'react';

export default function NewsCards() {
  const newsItems = [
    {
      id: 1,
      title: 'Barangay Ungka II Leads Tree Planting and Clean-Up Drive',
      description:
        'Pavia, Iloilo - In a strong show of community spirit, Barangay Ungka II recently led a comprehensive Tree Planting and Clean-Up Drive.',
      image: '/path-to-tree-planting-image.png', // Replace with your image path
    },
    {
      id: 2,
      title: 'Barangay Ungka II Clean-Up Drive 2025',
      description:
        'Volunteers work together to collect waste, clear public areas, and maintain a healthy and safe environment.',
      image: '/path-to-cleanup-drive-image.png', // Replace with your image path
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden shadow-lg bg-gray-900 border-b-4 border-emerald-800 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Card Background Image */}
            <div className="h-80 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Glassmorphism Text Overlay Panel */}
            <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-md p-6 border-t border-white/10 text-white space-y-2">
              <h3 className="text-xl font-bold leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}