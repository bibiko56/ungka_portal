import React from 'react';
import LatestInformation from '../components/LatestInformation';
import UpcomingEvents from '../components/UpcomingEvents';
import UpcomingEvents2 from '../components/UpcomingEvents2';

export default function NewsUpdate() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-emerald-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">News & Announcements</h1>
        <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
          Stay updated with official announcements, upcoming events, and community developments in Barangay Ungka.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <LatestInformation />
        <div className="border-t border-gray-200 pt-12">
          <UpcomingEvents />
        </div>
        <UpcomingEvents2 />
      </div>
    </div>
  );
}