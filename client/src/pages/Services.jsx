import React from 'react';
import ServicesBanner from '../components/ServicesBanner';
import BarangayHallServices from '../components/BarangayHallServices';
import HealthCenterServices from '../components/HealthCenterServices';

export default function Services() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <ServicesBanner />

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