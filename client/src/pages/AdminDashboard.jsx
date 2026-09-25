import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-950">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {user?.fullName || 'Admin'}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 text-sm">
          Welcome to the UServe Admin Panel. You can start building your administrative features here.
        </div>
      </div>
    </div>
  );
}