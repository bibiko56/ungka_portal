import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function UserLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Sign In Data:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login triggered');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login triggered');
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
              Sign In
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
              Sign in to access Barangay Ungka II services and updates.
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
                  placeholder="name@example.com"
                  required
                  className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-sm rounded-xl pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-emerald-950 block">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-emerald-800 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-emerald-800">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
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
            </div>

            {/* Submit Button & Switch Link */}
            <div className="pt-2 flex flex-col items-center space-y-3">
              <button
                type="submit"
                className="w-44 bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all"
              >
                Sign In
              </button>

              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <Link to="/register/user" className="font-bold underline text-emerald-800 hover:text-emerald-950">
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500">
                Or Continue with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social Logins: Google & Facebook */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-xs py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-xs py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
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