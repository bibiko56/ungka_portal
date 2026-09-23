import React from 'react';
import BarangayHallServices from '../components/BarangayHallServices';
import HealthCenterServices from '../components/HealthCenterServices';

export default function Services() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-emerald-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Barangay Services</h1>
        <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
          Explore public services provided by the Barangay Hall and Health Center for all residents of Barangay Ungka.
        </p>
      </div>

      {/* Services Components */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-16">
        <BarangayHallServices />
        <div className="border-t border-gray-200 pt-12">
          <HealthCenterServices />
        </div>
      </div>
    </div>
  );
}