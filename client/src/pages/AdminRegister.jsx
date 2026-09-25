import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, CheckCircle2 } from 'lucide-react';

export default function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Admin registration failed');
      }

      // Trigger modal notification (Do NOT call login context)
      setShowPendingModal(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowPendingModal(false);
    navigate('/'); // Navigate to homepage logged out
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white relative overflow-hidden font-sans">
      
      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white text-emerald-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-emerald-600 relative">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="absolute left-6 top-6 sm:left-8 sm:top-8 p-2 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition-all"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Header Text */}
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-3xl font-extrabold tracking-wide text-emerald-950">
              Sign Up
            </h1>
            <h2 className="text-lg font-bold text-emerald-900">Admin User</h2>
            <p className="text-xs text-gray-600 font-medium max-w-md mx-auto">
              Stay connected with your community and access local services easily.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl border border-red-200 text-left mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-emerald-800">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="0912 345 6789"
                    required
                    className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Submit Button & Links */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-44 bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Create'}
              </button>

              <p className="text-[11px] text-gray-500 font-medium text-center">
                Admin registration is restricted to authorized Barangay Ungka II personnel.
              </p>

              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link to="/login/admin" className="font-bold underline text-emerald-800 hover:text-emerald-950">
                  Log In
                </Link>
              </p>
            </div>

          </form>
        </div>
      </main>

      {/* Account Review Pending Modal */}
      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-emerald-600 text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-emerald-950">
              Account Registration Submitted
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your admin account request has been registered and is currently <strong>under review</strong> by system administrators.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-medium">
              A verification code and status update will be sent via SMS to{' '}
              <span className="font-bold">{formData.phoneNumber || 'your registered phone number'}</span> upon approval.
            </div>

            <button
              onClick={handleModalClose}
              type="button"
              className="w-full bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl hover:bg-emerald-900 transition-all active:scale-95 shadow-md"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}

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