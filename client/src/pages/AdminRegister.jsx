import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateCode = () => {
    // Generate a quick random verification code or hook into your API logic
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData((prev) => ({ ...prev, verificationCode: generated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Admin Sign Up Data:', formData);
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

            {/* Row 2: Password & Generate Verification Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Generate Verification Code
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    placeholder="Generate Verification Code"
                    required
                    className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl pl-4 pr-24 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="absolute right-1.5 text-xs font-bold bg-emerald-800 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition-all active:scale-95"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Confirm Password (Left-aligned column) */}
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

            {/* Submit Button & Switch Link */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                type="submit"
                className="w-44 bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all"
              >
                Create
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