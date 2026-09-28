import React from 'react';
import Population from '../components/Population';
import AboutUsSection from '../components/AboutUsSection';
import LocalsZones from '../components/LocalsZones';

export default function About() {
  return (
    <div className="space-y-8 py-8 px-4 max-w-7xl mx-auto">
      {/* 1. Put AboutUsSection first if that's your header section */}
      <AboutUsSection />

      {/* 2. Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-950 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide efficient, transparent, and accessible public services to all residents of Barangay Ungka, while maintaining peace, order, and sustainable community development.
          </p>
        </div>
        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-950 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            A self-reliant, peaceful, and vibrant barangay driven by an empowered community and accountable local governance.
          </p>
        </div>
      </div>

      {/* 3. Population component */}
      <Population showBanner={false}/>
      <LocalsZones />
    </div>
  );
}