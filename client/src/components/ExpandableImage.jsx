import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Drop-in <img> that opens a full-screen preview when clicked.
// Close with the X button, Escape, or by clicking outside the image.
export default function ExpandableImage({ src, alt = '', className = '', ...rest }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-zoom-in`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        {...rest}
      />

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Image preview'}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-emerald-900 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>,
          document.body
        )}
    </>
  );
}