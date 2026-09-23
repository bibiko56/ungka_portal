import React from 'react';
import SKUpcomingEvents from '../components/SKUpcomingEvents';
import SKRecentAccomplishments from '../components/SKRecentAccomplishments';

export default function Volunteer() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-emerald-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Community & Youth Volunteering</h1>
        <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
          Get involved in local initiatives, youth activities (SK), and community outreach programs in Barangay Ungka.
        </p>
      </div>

      {/* Volunteer Registration & Info */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-emerald-950">Become an Active Volunteer</h2>
          <p className="mt-2 text-gray-700 max-w-xl mx-auto">
            Join hands with local leaders and youth advocates to make a difference in our community projects, environmental drives, and health outreach programs.
          </p>
          <button className="mt-6 bg-emerald-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-900 transition">
            Sign Up as a Volunteer
          </button>
        </div>

      </div>
    </div>
  );
}