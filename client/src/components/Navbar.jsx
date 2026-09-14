import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
            U
          </div>
          <span className="font-bold text-lg text-emerald-950">
            BARANGAY UNGKA
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <a href="#home" className="hover:text-emerald-700 transition">Home</a>
          <a href="#about" className="hover:text-emerald-700 transition">About Us</a>
          <a href="#services" className="hover:text-emerald-700 transition">Services</a>
          <a href="#news" className="hover:text-emerald-700 transition">News & Updates</a>
          <a href="#officials" className="hover:text-emerald-700 transition">Officials</a>
          <a href="#contact" className="hover:text-emerald-700 transition">Contact</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900 transition">
            Portal Login
          </button>
        </div>

      </div>
    </header>
  );
}