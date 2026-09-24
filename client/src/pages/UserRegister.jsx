import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    identity: '',
    password: '',
    zone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Sign Up Data:', formData);
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
            <h2 className="text-lg font-bold text-emerald-900">Join User</h2>
            <p className="text-xs text-gray-600 font-medium max-w-md mx-auto">
              Stay connected with your community and access local services easily.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Row 1: Full Name & Email */}
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

            {/* Row 2: Phone Number, Gender & Citizen/Boarder */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              
              {/* Phone Number (Span 5) */}
              <div className="sm:col-span-5 space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-800 text-white font-bold text-xs px-3 py-2.5 rounded-xl border border-emerald-800 flex items-center justify-center">
                    +63
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Ex. 917 123 4567"
                    required
                    className="w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>
              </div>

              {/* Gender Radio Buttons (Span 3) */}
              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Gender
                </label>
                <div className="flex items-center space-x-4 py-2">
                  <label className="flex items-center space-x-1.5 text-xs text-emerald-950 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="accent-emerald-700"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs text-emerald-950 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="accent-emerald-700"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Citizen / Boarder Dropdown (Span 4) */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-emerald-950 block ml-1">
                  Citizen / Boarder
                </label>
                <select
                  name="identity"
                  value={formData.identity}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 text-emerald-950 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select Identity
                  </option>
                  <option value="resident">Resident</option>
                  <option value="boarder">Boarder</option>
                </select>
              </div>
            </div>

            {/* Row 3: Password & Zone / Area */}
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
                  Zone / Area
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 text-emerald-950 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select your zone
                  </option>
                  <option value="zone-1">Zone 1</option>
                  <option value="zone-2">Zone 2</option>
                  <option value="zone-3">Zone 3</option>
                  <option value="zone-4">Zone 4</option>
                  <option value="zone-5">Zone 5</option>
                  <option value="zone-6">Zone 6</option>
                </select>
              </div>
            </div>

            {/* Submit Button & Sign In Link */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                type="submit"
                className="w-44 bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all"
              >
                Create
              </button>

              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link to="/login/user" className="font-bold underline text-emerald-800 hover:text-emerald-950">
                  Log in
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