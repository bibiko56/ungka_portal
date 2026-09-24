// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleRoleSelect = (role) => {
    if (mode === 'signup') {
      navigate(`/register/${role}`); // Navigates to User/Admin registration form
    } else {
      if (role === 'admin') {
        navigate('/login/admin'); // Redirects to AdminLogin.jsx
      } else {
        navigate('/login/user');  // Redirects to UserLogin.jsx
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white relative overflow-hidden">
      
      {/* Main Role Selection Modal Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white text-emerald-950 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-emerald-600 text-center space-y-6">
          
          {/* Toggle Tab: Sign In vs Sign Up */}
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200 mb-2">
            <button
              onClick={() => setMode('login')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === 'login'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-emerald-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-emerald-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Header Text */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-emerald-950">
              {mode === 'signup' ? 'Create an Account' : 'Select your Role'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
              {mode === 'signup'
                ? 'Choose your role to register for the Barangay Ungka II System.'
                : 'Choose how you want to access the Barangay Ungka II System.'}
            </p>
          </div>

          {/* Cards Grid: User vs Admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* User Option Card */}
            <div
              onClick={() => handleRoleSelect('user')}
              className="bg-gray-50 text-emerald-950 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-2 border-emerald-600 hover:border-emerald-800"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 group-hover:bg-emerald-200 transition-colors mt-2">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-emerald-900">
                  {mode === 'signup' ? 'Register as User' : 'User'}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed px-2">
                  Access barangay services, announcements, requirements, and volunteer activities.
                </p>
              </div>
            </div>

            {/* Admin Option Card */}
            <div
              onClick={() => handleRoleSelect('admin')}
              className="bg-gray-50 text-emerald-950 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-2 border-emerald-600 hover:border-emerald-800"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 group-hover:bg-emerald-200 transition-colors mt-2">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-emerald-900">
                  {mode === 'signup' ? 'Register as Admin' : 'Admin'}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed px-2">
                  Manage users, announcements, volunteer events, applications, and system information.
                </p>
              </div>
            </div>

          </div>

          {/* Quick Footer Switch */}
          <p className="text-xs text-gray-600 pt-2">
            {mode === 'login' ? (
              <>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-bold underline text-emerald-800 hover:text-emerald-950"
                >
                  Sign Up here
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold underline text-emerald-800 hover:text-emerald-950"
                >
                  Sign In here
                </button>
              </>
            )}
          </p>

        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 bg-emerald-800 text-emerald-100 text-xs py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-emerald-700">
        <p>© 2026 UServe digital Website. Built for the community.</p>
        <div className="flex items-center space-x-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </footer>

    </div>
  );
}