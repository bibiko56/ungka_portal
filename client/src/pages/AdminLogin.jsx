import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Code, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Sign In Data:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white relative overflow-hidden font-sans">
      
      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white text-emerald-950 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-emerald-600 text-center space-y-6 relative">
          
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="absolute left-6 top-6 p-2 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition-all"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Header Text */}
          <div className="space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-emerald-950">
              Admin Sign In
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
              Sign in to access the Barangay Ungka II Management System.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left pt-2">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-950 block ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-emerald-800">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Admin@example.com"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-sm rounded-xl pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-950 block ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-emerald-800">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-sm rounded-xl pl-12 pr-12 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-500 hover:text-emerald-800 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-right pt-1">
                <a href="#forgot" className="text-xs font-semibold text-emerald-800 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Code Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-950 block ml-1">
                Code
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-emerald-800">
                  <Code className="w-5 h-5" />
                </div>
                <input
                  type={showCode ? "text" : "password"}
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter Your Code"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-sm rounded-xl pl-12 pr-12 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-4 text-gray-500 hover:text-emerald-800 transition-colors"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button & Switch Link */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                type="submit"
                className="w-44 bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all"
              >
                Sign In
              </button>

              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <Link to="/register/admin" className="font-bold underline text-emerald-800 hover:text-emerald-950">
                  Sign Up
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