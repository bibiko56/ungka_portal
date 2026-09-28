import React, { useEffect, useState } from 'react';

export default function AdminApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'user', or 'admin'

  const token = localStorage.getItem('token');

  const fetchPending = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPending(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (type, id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/approve/${type}/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPending((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDecline = async (type, id) => {
    if (!window.confirm('Decline this registration? This cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/decline/${type}/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPending((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtered array based on active filter state
  const filteredPending = pending.filter((p) => {
    if (filterType === 'all') return true;
    return p.accountType === filterType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Admin & User Approvals</h1>
        <p className="text-xs text-gray-500 font-medium">Review and manage resident and admin account requests</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        {/* Filter Selection Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
          <span className="text-xs font-semibold text-gray-600 mr-2">Filter Requests:</span>
          
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'all'
                ? 'bg-emerald-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({pending.length})
          </button>

          <button
            onClick={() => setFilterType('user')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'user'
                ? 'bg-emerald-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Users Only ({pending.filter((p) => p.accountType === 'user').length})
          </button>

          <button
            onClick={() => setFilterType('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'admin'
                ? 'bg-emerald-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Admins Only ({pending.filter((p) => p.accountType === 'admin').length})
          </button>
        </div>

        {loading && <p className="text-xs text-gray-500 italic">Loading...</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
        {!loading && filteredPending.length === 0 && (
          <p className="text-xs text-gray-500 italic py-4">No pending requests match this filter.</p>
        )}

        <div className="space-y-3">
          {filteredPending.map((p) => (
            <div key={p._id} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {p.fullName}{' '}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${
                    p.accountType === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.accountType.toUpperCase()}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{p.email} · {p.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(p.accountType, p._id)}
                  className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(p.accountType, p._id)}
                  className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}