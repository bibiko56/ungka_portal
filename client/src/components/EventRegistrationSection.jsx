import React, { useState } from 'react';

export default function EventRegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    zone: '',
    gender: '',
    identity: '',
    age: '',
    selectedEvent: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Registration Data:', formData);
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Description Text */}
        <p className="text-center text-emerald-900 font-medium text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Access important barangay information, services, announcements, and community updates while having the opportunity to join upcoming events, programs, and volunteer activities. Be informed, get involved, and take part in building a more active and connected community.
        </p>

        {/* Main Event Registration Card */}
        <div className="relative bg-[#1f4a2e] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-800 overflow-hidden">
          
          {/* Card Header */}
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Register
            </h2>
            <h3 className="text-lg font-bold text-emerald-200">
              Join an Event
            </h3>
            <p className="text-xs text-emerald-100/80 max-w-md mx-auto">
              Interested in participating in our community activities? Complete the registration form to confirm your slot and receive full event details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-emerald-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-emerald-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Zone / Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-2.5 rounded-xl border border-emerald-500">
                    +63
                  </span>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Ex. 917 123 4567"
                    required
                    className="w-full bg-emerald-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Zone / Area
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  required
                  className="w-full bg-emerald-50 text-emerald-950 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all cursor-pointer"
                >
                  <option value="" disabled>Select your zone</option>
                  <option value="zone-1">Zone 1</option>
                  <option value="zone-2">Zone 2</option>
                  <option value="zone-3">Zone 3</option>
                  <option value="zone-4">Zone 4</option>
                  <option value="zone-5">Zone 5</option>
                  <option value="zone-6">Zone 6</option>
                </select>
              </div>
            </div>

            {/* Row 3: Gender, Citizen/Border, Age */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              
              {/* Gender Radio Buttons (Span 4) */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Gender
                </label>
                <div className="flex items-center space-x-4 py-2">
                  <label className="flex items-center space-x-1.5 text-xs text-emerald-100 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="accent-emerald-400"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs text-emerald-100 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="accent-emerald-400"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Citizen / Border (Span 4) */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Citizen / Border
                </label>
                <select
                  name="identity"
                  value={formData.identity}
                  onChange={handleChange}
                  required
                  className="w-full bg-emerald-50 text-emerald-950 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Identity</option>
                  <option value="resident">Resident</option>
                  <option value="boarder">Boarder</option>
                </select>
              </div>

              {/* Age (Span 4) */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-emerald-100 block ml-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  required
                  min="1"
                  className="w-full bg-emerald-50 text-emerald-950 placeholder-gray-400 font-medium text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Row 4: Selected Event (Centered dropdown) */}
            <div className="max-w-md mx-auto space-y-1 pt-2">
              <label className="text-xs font-bold text-emerald-100 block ml-1">
                Selected Event
              </label>
              <select
                name="selectedEvent"
                value={formData.selectedEvent}
                onChange={handleChange}
                required
                className="w-full bg-emerald-50 text-emerald-950 font-medium text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all cursor-pointer"
              >
                <option value="" disabled>Selected Event</option>
                <option value="clean-up">Barangay Clean-Up Drive</option>
                <option value="youth-sports">Youth Sports League</option>
                <option value="medical-mission">Medical Mission</option>
                <option value="tree-planting">Tree Planting Activity</option>
              </select>
            </div>

            {/* Submit Button & Subtext */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                type="submit"
                className="w-52 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-full shadow-lg transition-all active:scale-95"
              >
                Register Now!
              </button>

              <p className="text-[11px] text-emerald-100/80 font-medium text-center max-w-sm">
                Once submitted, you will receive a confirmation with the event schedule and meeting location.
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}