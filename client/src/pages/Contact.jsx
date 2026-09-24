import React from 'react';
import ContactUsHero from '../components/ContactUsHero';
import StartUServeCTA from '../components/StartUServeCTA';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <ContactUsHero />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Contact Form & Info Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-950">Barangay Hall Information</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-emerald-900">Address:</p>
                <p>Barangay Hall, Ungka, Philippines</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-900">Office Hours:</p>
                <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-900">Emergency Hotline:</p>
                <p>(033) 123-4567 / +63 912 345 6789</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-900">Email Address:</p>
                <p>info@barangayungka.gov.ph</p>
              </div>
            </div>
          </div>

          {/* Direct Message Form */}
          <form className="bg-slate-50 p-6 rounded-2xl border border-gray-200 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-xl font-bold text-emerald-950">Send Us a Message</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-800 focus:outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-800 focus:outline-none" placeholder="yourname@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-800 focus:outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-800 text-white font-semibold py-2.5 rounded-lg hover:bg-emerald-900 transition">
              Submit Inquiry
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}