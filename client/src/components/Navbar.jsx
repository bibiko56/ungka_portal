import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Read logged in user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error reading user data:', err);
      }
    } else {
      setUser(null);
    }
  }, [location]); // Re-run check whenever route changes

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Strictly check if logged in user is an admin
  const isAdmin = user && (user.role === 'admin' || user.isAdmin === true);

  const navLinkClass = (path) => {
  const isActive = location.pathname === path;
  return `relative pb-1 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-emerald-800 after:transition-all after:duration-300 ${
    isActive
      ? 'text-emerald-800 font-bold after:w-full'
      : 'hover:text-emerald-800 after:w-0 hover:after:w-full'
  }`;
};

  return (
    <nav className="bg-white border-b border-gray-100 py-3 px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
            U
          </div>
          <span className="font-bold text-lg text-emerald-950">UServe</span>
        </Link>

        {/* Navigation Links */}
        {/* Navigation Links */}
<div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
  <Link to="/" className={navLinkClass('/')}>Home</Link>
  <Link to="/about" className={navLinkClass('/about')}>About Us</Link>
  <Link to="/services" className={navLinkClass('/services')}>Services</Link>
  <Link to="/news" className={navLinkClass('/news')}>News & Updates</Link>
  <Link to="/volunteer" className={navLinkClass('/volunteer')}>Volunteer & Events</Link>
  <Link to="/report-issue" className={navLinkClass('/report-issue')}>Report Issue</Link>
  <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>

  {/* 🟢 EXCLUSIVE ADMIN DASHBOARD LINK — kept as a button style, no underline */}
  {isAdmin && (
    <Link
      to="/admin/dashboard"
      className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${
        location.pathname === '/admin/dashboard'
          ? 'bg-emerald-800 text-white'
          : 'bg-emerald-50 text-emerald-900 border border-emerald-800/30 hover:bg-emerald-100'
      }`}
    >
      Dashboard
    </Link>
  )}
</div>

        {/* User Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                Hi, <strong className="text-gray-800">{user.fullName || 'there'}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}