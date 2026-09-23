import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper for conditional styling on active routes
  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 text-sm font-medium ${
      isActive
        ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1'
        : 'text-gray-700 hover:text-emerald-700'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
            U
          </div>
          <span className="font-bold text-lg text-emerald-950">
            BARANGAY UNGKA
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/news" className={linkClass}>
            News & Updates
          </NavLink>
          {/* FIX: Changed /volunteek -> /volunteer */}
          <NavLink to="/volunteer" className={linkClass}>
            Volunteer
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <button className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900 transition">
            Portal Login
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none p-1"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            News & Updates
          </NavLink>
          <NavLink
            to="/volunteer"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            Volunteer
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-1 text-sm font-medium ${isActive ? 'text-emerald-800 font-bold' : 'text-gray-700'}`
            }
          >
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
}