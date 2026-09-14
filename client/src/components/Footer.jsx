import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-12 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                U
              </div>
              <span className="font-bold text-lg text-white tracking-wide">
                BARANGAY UNGKA
              </span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Official community portal providing accessible online services, announcements, and local updates for all residents.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition">Barangay Services</a></li>
              <li><a href="#news" className="hover:text-white transition">News & Updates</a></li>
            </ul>
          </div>

          {/* Column 3: Community Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li><a href="#clearance" className="hover:text-white transition">Barangay Clearance</a></li>
              <li><a href="#indigency" className="hover:text-white transition">Certificate of Indigency</a></li>
              <li><a href="#permit" className="hover:text-white transition">Business Permit</a></li>
              <li><a href="#blotter" className="hover:text-white transition">Blotter / Incident Report</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <p className="text-sm text-emerald-200/80 mb-2">Barangay Hall, Main Road</p>
            <p className="text-sm text-emerald-200/80 mb-4">Hotline: (033) 345-6789</p>
            <div className="flex space-x-4 text-emerald-300">
              <a href="#fb" className="hover:text-white transition">Facebook</a>
              <a href="#twitter" className="hover:text-white transition">Twitter</a>
              <a href="#insta" className="hover:text-white transition">Instagram</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} Barangay Ungka. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}