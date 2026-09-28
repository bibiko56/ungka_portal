import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocalsZones() {
  const zones = [
    {
      zone: 'Zone 1',
      description: 'Zone 1 is a welcoming community within Barangay Ungka II, Iloilo City, dedicated to promoting unity, safety, and the well-being of its residents. Through accessible barangay and health center services, the zone supports the everyday needs of the community.',
    },
    {
      zone: 'Zone 2',
      description: 'Zone 2 is a growing community that values cooperation, accessibility, and active participation. With the support of barangay officials and health center personnel, the zone strives to provide residents with essential services and assistance.',
    },
    {
      zone: 'Zone 3',
      description: 'Zone 3 is committed to fostering a safe, healthy, and harmonious environment for its residents. Through collaboration between the community, barangay officials, and health workers, the zone promotes accessible public services and community welfare.',
    },
    {
      zone: 'Zone 4',
      description: 'Zone 4 is a vibrant community that values responsive public service and strong community involvement. The zone helps connect residents with important barangay programs, health services, and other forms of assistance that support their daily needs.',
    },
    {
      zone: 'Zone 5',
      description: 'Zone 5 is a community built on cooperation, inclusivity, and concern for the welfare of its residents. Together with barangay officials and health center personnel, the zone promotes accessible services that contribute to a safer and healthier community.',
    },
    {
      zone: 'Zone 6',
      description: 'Zone 6 is dedicated to creating a supportive and connected community for its residents. Through barangay programs and health center services, the zone works to make essential assistance more accessible while encouraging residents to participate in community development.',
    },
    {
      zone: 'Zone 7',
      description: 'Zone 7 is a community focused on unity, public service, and the well-being of its residents. With the continued support of barangay officials and health workers, the zone strives to provide reliable services and promote a safe, healthy, and connected community.',
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 pt-2 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12 border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        
        {/* Section Header with matching custom tag design */}
        <div className="space-y-3">
          <div className="inline-block bg-[#1e4620] text-white px-6 py-2 rounded-r-2xl font-black tracking-wider text-lg shadow-sm">
            Locals:
          </div>
          <div className="w-12 h-1 bg-emerald-600 rounded-full ml-1" />
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {zones.map((item, index) => (
            <div 
              key={index} 
              className="space-y-2 p-6 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-2 text-emerald-950">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold">{item.zone}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}