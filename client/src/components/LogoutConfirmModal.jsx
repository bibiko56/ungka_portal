import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function LogoutConfirmModal({ onConfirm, onCancel }) {
  const dialogRef = useRef(null);
  const confirmRef = useRef(null);
  const cancelRef = useRef(null);

  // On open: focus "Cancel" (the safe choice), lock page scroll, and restore both on close
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    cancelRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  // Escape closes the dialog, and Tab stays inside it
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
        return;
      }
      if (e.key !== 'Tab') return;

      const first = confirmRef.current;
      const last = cancelRef.current;
      const active = document.activeElement;

      if (!dialogRef.current?.contains(active)) {
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  // Rendered into <body> so it always sits above the navbar and the admin sidebar
  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-description"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#1f4d2e] text-white rounded-3xl px-6 py-9 sm:px-10 text-center shadow-2xl"
      >
        <h2 id="logout-title" className="text-xl sm:text-2xl font-bold leading-snug">
          Are you sure you want to log out?
        </h2>
        <p id="logout-description" className="mt-2 text-sm text-white/90">
          You can always log back in at any time.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="bg-[#c2e260] hover:bg-[#b0d14e] text-gray-900 font-bold text-sm px-7 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f4d2e]"
          >
            Log Out
          </button>
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm px-7 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2e260] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f4d2e]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}