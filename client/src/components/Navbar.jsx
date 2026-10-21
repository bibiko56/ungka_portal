import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/getInitials';
import NotificationBell from './NotificationBell';
import ProfileMenu from './ProfileMenu';
import LogoutConfirmModal from './LogoutConfirmModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu automatically whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Both logout buttons open the confirmation first
  const requestLogout = () => {
    setMobileOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
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

  const mobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-emerald-50 text-emerald-800'
        : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-800'
    }`;
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/news', label: 'News & Updates' },
    { to: '/volunteer', label: 'Volunteer & Events' },
    { to: '/report-issue', label: 'Report Issue' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 py-3 px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="UServe logo" className="h-8 w-auto" />
          <span className="font-bold text-lg text-emerald-950">UServe</span>
        </Link>

        {/* Navigation Links — desktop only */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {/* Admin dashboard link */}
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

        {/* Right side: bell, profile / auth buttons, hamburger */}
        <div className="flex items-center gap-1 sm:gap-2">
          {user && <NotificationBell />}

          {/* Desktop only */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <ProfileMenu user={user} onLogout={requestLogout} />
            ) : (
              <>
                <Link
                  to="/register/user"
                  className="border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Hamburger toggle — mobile only */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={mobileLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/admin/dashboard'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-50 text-emerald-900'
              }`}
            >
              Dashboard
            </Link>
          )}

          <div className="pt-3 mt-2 border-t border-gray-100 space-y-1">
            {user ? (
              <>
                <div className="px-4 pb-2 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-emerald-800 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {getInitials(user.fullName)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link to="/profile" className={mobileLinkClass('/profile')}>Profile</Link>
                <Link to="/settings" className={mobileLinkClass('/settings')}>Settings</Link>
                <button
                  onClick={requestLogout}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4">
                <Link
                  to="/register/user"
                  className="flex-1 text-center border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="flex-1 text-center bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <LogoutConfirmModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </nav>
  );
}