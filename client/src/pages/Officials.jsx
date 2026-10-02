import React, { useEffect, useState } from 'react';

const TABS = [
  { key: 'barangay', label: 'Barangay Officials', heading: 'Barangay Officials – Barangay Ungka II', desc: "The Barangay Officials of Ungka II serve the community by providing essential services, addressing residents' concerns, managing barangay programs, and supporting the overall development of the community." },
  { key: 'sk', label: 'SK Officials', heading: 'Sangguniang Kabataan (SK) – Barangay Ungka II', desc: 'The Sangguniang Kabataan (SK) of Barangay Ungka II serves the youth by organizing programs, activities, and projects that promote leadership, participation, education, sports, and community development.' },
  { key: 'health', label: 'Health Center Officials', heading: 'Health Center Officials – Barangay Ungka II', desc: 'The Barangay Health Center provides essential health services to residents by promoting wellness, disease prevention, maternal and child care, health education, and accessible community-based healthcare.' },
];

function OfficialCard({ official, large, onClick }) {
  const size = large ? 'w-24 h-24 sm:w-28 sm:h-28 text-xl' : 'w-20 h-20 sm:w-24 sm:h-24 text-sm';
  return (
    <button
      onClick={() => onClick(official)}
      className="flex flex-col items-center text-center space-y-2 group"
    >
      <div className={`${size} rounded-full border-4 border-emerald-700 bg-emerald-50 overflow-hidden shadow-md flex items-center justify-center font-bold text-emerald-800 group-hover:scale-105 transition-transform`}>
        {official.image ? (
          <img src={`${import.meta.env.VITE_API_URL}${official.image}`} alt={official.name} className="w-full h-full object-cover" />
        ) : (
          official.position?.slice(0, 3).toUpperCase()
        )}
      </div>
      <div>
        <h4 className={`${large ? 'text-sm' : 'text-xs'} font-black text-gray-900 tracking-wide`}>{official.name}</h4>
        <p className={`${large ? 'text-xs' : 'text-[10px]'} font-bold text-emerald-700 tracking-wider`}>{official.position}</p>
      </div>
    </button>
  );
}

function OfficialModal({ official, onClose }) {
  if (!official) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 pt-16 w-full max-w-sm relative text-center space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full border-2 border-emerald-700 text-emerald-700 flex items-center justify-center font-bold hover:bg-emerald-50"
        >
          ✕
        </button>
        <div className="w-28 h-28 rounded-full border-4 border-emerald-700 bg-emerald-50 overflow-hidden shadow-md mx-auto -mt-24">
          {official.image ? (
            <img src={`${import.meta.env.VITE_API_URL}${official.image}`} alt={official.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-emerald-800">
              {official.position?.slice(0, 3).toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-left space-y-1 pt-2">
          <p className="text-sm"><span className="font-bold">Name:</span> {official.name}</p>
          <p className="text-sm"><span className="font-bold">Role:</span> {official.position}</p>
          {official.gender && <p className="text-sm"><span className="font-bold">Gender:</span> {official.gender}</p>}
        </div>
        {official.bio && (
          <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">{official.bio}</p>
        )}
      </div>
    </div>
  );
}

export default function Officials() {
  const [activeTab, setActiveTab] = useState('barangay');
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/officials`)
      .then((res) => res.json())
      .then((data) => setOfficials(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const tab = TABS.find((t) => t.key === activeTab);
  const categoryOfficials = officials.filter((o) => o.category === activeTab);
  const head = categoryOfficials.find((o) => o.isHead);
  const rest = categoryOfficials.filter((o) => !o.isHead);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black tracking-tight text-emerald-950">
          Public Servants of <span className="text-emerald-700">Ungka II</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Browse through our barangay leaders, youth council, and health center representatives.
        </p>
        <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full" />
      </div>

      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner gap-1 sm:gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === t.key ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-600 hover:text-emerald-950 hover:bg-gray-200/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-emerald-800 text-center space-y-3 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950">{tab.heading}</h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">{tab.desc}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-12">
          {loading ? (
            <p className="text-center text-xs text-gray-400">Loading officials...</p>
          ) : categoryOfficials.length === 0 ? (
            <p className="text-center text-xs text-gray-400 italic">No officials added for this category yet.</p>
          ) : (
            <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
              {head && <OfficialCard official={head} large onClick={setSelected} />}
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                {rest.map((o) => (
                  <OfficialCard key={o._id} official={o} onClick={setSelected} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <OfficialModal official={selected} onClose={() => setSelected(null)} />
    </div>
  );
}