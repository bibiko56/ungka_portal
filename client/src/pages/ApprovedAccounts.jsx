import React, { useEffect, useState } from 'react';
import { useModal } from '../context/ModalContext';

export default function ApprovedAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'user', 'admin'
  const [search, setSearch] = useState('');
  const { alert, confirm } = useModal();

  const token = localStorage.getItem('token');

  const fetchApproved = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/approved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setAccounts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApproved(); }, []);

  const handleRevoke = async (type, id, name) => {
    const confirmed = await confirm(
      `Revoke approval for ${name}? They'll be moved back to Pending Approvals and won't be able to log in until re-approved.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/revoke/${type}/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setAccounts((prev) => prev.filter((a) => a._id !== id));
      await alert('Approval revoked. This account now needs re-approval before logging in.', 'success');
    } catch (err) {
      await alert(err.message, 'danger');
    }
  };

  const filtered = accounts
    .filter((a) => (filterType === 'all' ? true : a.accountType === filterType))
    .filter((a) => {
      const q = search.toLowerCase();
      return (
        a.fullName?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phoneNumber?.toLowerCase().includes(q)
      );
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Approved Users & Admins</h1>
        <p className="text-xs text-gray-500 font-medium">Residents and admins currently able to log in</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">

        {/* Filter + Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-2">
            {[
              { key: 'all', label: `All (${accounts.length})` },
              { key: 'user', label: `Users (${accounts.filter((a) => a.accountType === 'user').length})` },
              { key: 'admin', label: `Admins (${accounts.filter((a) => a.accountType === 'admin').length})` },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  filterType === f.key ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs w-full sm:w-64"
          />
        </div>

        {loading && <p className="text-xs text-gray-500 italic">Loading...</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}

        {!loading && !error && (
          filtered.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-4">No approved accounts match this filter.</p>
          ) : (
            <div className="border border-gray-100 rounded-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] text-gray-500 uppercase tracking-wider">
                    <th className="p-3 font-bold">Name</th>
                    <th className="p-3 font-bold">Type</th>
                    <th className="p-3 font-bold">Email</th>
                    <th className="p-3 font-bold">Phone</th>
                    <th className="p-3 font-bold">Zone</th>
                    <th className="p-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {filtered.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-3 font-bold text-gray-900">{a.fullName}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          a.accountType === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {a.accountType.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">{a.email}</td>
                      <td className="p-3 text-gray-500">{a.phoneNumber}</td>
                      <td className="p-3 text-gray-400">{a.zone ? a.zone.replace('zone-', 'Zone ') : '—'}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRevoke(a.accountType, a._id, a.fullName)}
                          className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-amber-200 transition-colors"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}