import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key, UserCircle2, ArrowLeft } from 'lucide-react';

export default function JoinAuthModal({ onClose }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    onClose();
    navigate('/login/user');
  };

  const goToSignUp = () => {
    onClose();
    navigate('/register/user');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-sm w-full p-8 pt-10 shadow-2xl relative text-center space-y-5"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1e3e2b] text-white flex items-center justify-center hover:bg-[#15301f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Icon with decorative sparkle lines */}
        <div className="relative w-24 h-24 mx-auto mt-2">
          {/* sparkle lines */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#1e3e2b]/50 rounded-full" />
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-0.5 bg-[#1e3e2b]/50 rounded-full" />
          <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-0.5 bg-[#1e3e2b]/50 rounded-full" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-0.5 bg-[#1e3e2b]/40 rounded-full rotate-45" />
          <span className="absolute -top-0.5 -left-0.5 w-2 h-0.5 bg-[#1e3e2b]/40 rounded-full -rotate-45" />

          <div className="w-24 h-24 rounded-full bg-[#1e3e2b] flex items-center justify-center shadow-lg">
            <Lock className="w-10 h-10 text-lime-400" strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-xl font-black text-[#1e3e2b] leading-snug px-2">
          You need to log in first before you can register.
        </h2>
        <p className="text-xs text-gray-500">
          Please log in to your account to continue.
        </p>

        {/* Sign In button */}
        <button
          onClick={goToLogin}
          className="w-full bg-[#1e3e2b] hover:bg-[#15301f] text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <UserCircle2 className="w-4 h-4" />
          Sign In
        </button>

        <p className="text-xs text-gray-500">
          Don't have an account?{' '}
          <button onClick={goToSignUp} className="font-bold text-[#1e3e2b] hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}