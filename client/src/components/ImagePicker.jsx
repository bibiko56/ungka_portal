import React, { useEffect, useRef, useState } from 'react';
import { X, ImagePlus } from 'lucide-react';

const MAX_MB = 5;

const toSrc = (path) =>
  /^(https?:|blob:|data:)/.test(path) ? path : `${import.meta.env.VITE_API_URL}${path}`;

/**
 * Photo chooser with previews and a remove (✕) button on every photo.
 *
 * existing / onExistingChange  -> photos already saved on the server (array of paths)
 * files / onFilesChange        -> newly chosen File objects (array)
 * max = 1                      -> single-photo mode (choosing a new one replaces the old one)
 */
export default function ImagePicker({
  label = 'Photo',
  max = 1,
  existing = [],
  onExistingChange = () => {},
  files = [],
  onFilesChange = () => {},
  rounded = 'rounded-xl',
  thumb = 'w-20 h-20',
  dark = false, // set on dark/green backgrounds so the label and errors stay readable
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const single = max === 1;
  const total = existing.length + files.length;

  // One preview URL per File object, cached so re-renders don't recreate them
  const urlCache = useRef(new Map());
  const previews = files.map((f) => {
    if (!urlCache.current.has(f)) urlCache.current.set(f, URL.createObjectURL(f));
    return urlCache.current.get(f);
  });
  useEffect(() => {
    // free URLs of files that were removed
    urlCache.current.forEach((url, f) => {
      if (!files.includes(f)) {
        URL.revokeObjectURL(url);
        urlCache.current.delete(f);
      }
    });
  });
  useEffect(() => {
    const cache = urlCache.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  const handlePick = (e) => {
    const picked = Array.from(e.target.files || []);
    e.target.value = ''; // lets the same file be chosen again after removing it
    setError('');
    if (picked.length === 0) return;

    const valid = picked.filter((f) => f.type.startsWith('image/') && f.size <= MAX_MB * 1024 * 1024);
    if (valid.length < picked.length) {
      setError(`Only image files up to ${MAX_MB}MB are allowed.`);
    }
    if (valid.length === 0) return;

    if (single) {
      onExistingChange([]);
      onFilesChange([valid[0]]);
      return;
    }

    const room = max - total;
    if (valid.length > room) {
      setError(`You can have up to ${max} photos.`);
    }
    onFilesChange([...files, ...valid.slice(0, Math.max(room, 0))]);
  };

  const removeExisting = (idx) => {
    setError('');
    onExistingChange(existing.filter((_, i) => i !== idx));
  };
  const removeNew = (idx) => {
    setError('');
    onFilesChange(files.filter((_, i) => i !== idx));
  };

  const canAdd = single || total < max;

  const renderThumb = (key, src, alt, onRemove) => (
    <div key={key} className={`relative ${thumb} flex-shrink-0`}>
      <img src={src} alt={alt} className={`w-full h-full object-cover border border-gray-200 bg-gray-50 ${rounded}`} />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove photo"
        title="Remove photo"
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div>
      <label className={`text-xs font-semibold block mb-1 ${dark ? 'text-white' : 'text-gray-700'}`}>
        {label}
        {!single && <span className={`font-normal ${dark ? 'text-white/60' : 'text-gray-400'}`}> ({total}/{max})</span>}
      </label>

      {total > 0 && (
        <div className="flex flex-wrap gap-3 mb-2 pt-2">
          {existing.map((img, i) => (
            renderThumb(`old-${img}-${i}`, toSrc(img), 'Current photo', () => removeExisting(i))
          ))}
          {previews.map((url, i) => (
            renderThumb(url, url, 'New photo', () => removeNew(i))
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={!single}
        onChange={handlePick}
        className="hidden"
      />

      {canAdd && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-emerald-700/50 bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
        >
          <ImagePlus className="w-4 h-4" />
          {single ? (total > 0 ? 'Replace photo' : 'Choose photo') : total > 0 ? 'Add more photos' : 'Choose photos'}
        </button>
      )}

      {error && <p className={`text-[11px] font-medium mt-1 ${dark ? 'text-red-200' : 'text-red-600'}`}>{error}</p>}
    </div>
  );
}