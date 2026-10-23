import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import servicePopups from '../data/servicePopups';

// Popup that shows how a service works (where/when or requirements).
// Pass the service card's title; it looks up the content in servicePopups.
// Close with the X, Escape, or by clicking outside the card.
export default function ServiceModal({ title, onClose }) {
  const info = title ? servicePopups[title] : null;

  useEffect(() => {
    if (!info) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [info, onClose]);

  if (!info) return null;

  const heading = info.heading || title;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border-2 border-[#1e3e2b] rounded-2xl px-8 py-10 sm:px-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-[#1e3e2b] text-[#1e3e2b] text-lg leading-none flex items-center justify-center hover:bg-emerald-50 transition-colors"
        >
          ✕
        </button>

        <h2 id="service-modal-title" className="pr-10 text-xl sm:text-2xl font-bold text-gray-900">
          {heading}:
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-800 leading-relaxed">{info.description}</p>

        {info.where && (
          <>
            <h3 className="mt-8 text-lg sm:text-xl font-bold text-gray-900">Where:</h3>
            <p className="mt-1 text-sm sm:text-base text-gray-800">{info.where}</p>
          </>
        )}

        {info.when && (
          <>
            <h3 className="mt-6 text-lg sm:text-xl font-bold text-gray-900">When:</h3>
            <p className="mt-1 text-sm sm:text-base text-gray-800">{info.when}</p>
          </>
        )}

        {info.requirements && (
          <>
            <h3 className="mt-8 text-lg sm:text-xl font-bold text-gray-900">Requirements</h3>
            <p className="mt-3 text-sm sm:text-base text-gray-800">{info.requirementsIntro}</p>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-sm sm:text-base text-gray-900 font-medium">
              {info.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}