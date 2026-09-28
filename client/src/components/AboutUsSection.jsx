import React from 'react';
import { ShieldCheck, HeartHandshake, Users } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="w-full bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12 border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        
        {/* Simple Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-950">
            About Us
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Intro Paragraph */}
        <p className="text-center text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
          Barangay Ungka II is a growing and vibrant community committed to providing accessible, responsive, and reliable services to its residents through dedicated local governance.
        </p>

        {/* Clean 3-Column Feature List with borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-2 flex flex-col items-center text-center p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Efficient Service</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Focusing on public health, safety, and reliable community development support.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center text-center p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-1">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Digital Innovation</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Embracing platforms like UServe to make barangay services seamless to access.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center text-center p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-1">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Connected Community</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bridging residents directly with local officials for faster assistance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}