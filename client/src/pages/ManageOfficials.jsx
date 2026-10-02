import React, { useEffect, useState } from 'react';

const CATEGORIES = [
  { key: 'barangay', label: 'Barangay Officials' },
  { key: 'sk', label: 'SK Officials' },
  { key: 'health', label: 'Health Center Officials' },
];

const emptyForm = {
  name: '', position: '', category: 'barangay', gender: '', bio: '', isHead: false,
};

export default function ManageOfficials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('barangay');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const token = localStorage.getItem('token');

  const fetchOfficials = async () => {
    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/officials');
      const data = await res.json();
      setOfficials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOfficials(); }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm, category: filter });
    setImageFile(null);
    setExistingImage('');
    setShowModal(true);
  };

  const openEditModal = (official) => {
    setEditingId(official._id);
    setForm({
      name: official.name,
      position: official.position,
      category: official.category,
      gender: official.gender || '',
      bio: official.bio || '',
      isHead: official.isHead,
    });
    setImageFile(null);
    setExistingImage(official.image || '');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (imageFile) fd.append('image', imageFile);
    if (existingImage) fd.append('existingImage', existingImage);

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/api/officials/${editingId}`
      : '${import.meta.env.VITE_API_URL}/api/officials';

    try {
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setShowModal(false);
      fetchOfficials();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this official? This cannot be undone.')) return;
    try {
      const res = await fetch(` ${import.meta.env.VITE_API_URL}/api/officials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOfficials((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = officials.filter((o) => o.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage Officials</h1>
          <p className="text-xs text-gray-500 font-medium">Edit barangay, SK, and health center officials</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#004A2D] hover:bg-[#003822] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
        >
          <span className="text-sm">⊕</span> Add Official
        </button>
      </div>

      <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 gap-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              filter === c.key ? 'bg-emerald-800 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 min-h-[350px]">
        {loading ? (
          <p className="text-xs text-gray-400">Loading officials...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No officials in this category yet.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((o) => (
              <div key={o._id} className="flex items-center justify-between border-b border-gray-100 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-50 border-2 border-emerald-700 flex-shrink-0">
                    {o.image && (
                      <img src={`${import.meta.env.VITE_API_URL}${o.image}`} alt={o.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {o.name} {o.isHead && <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-1">HEAD</span>}
                    </p>
                    <p className="text-xs text-gray-500">{o.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(o)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-800 text-emerald-800 font-bold text-[11px] hover:bg-emerald-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o._id)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-[11px] hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-gray-900">
              {editingId ? 'Edit Official' : 'Add Official'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" placeholder="Full name" required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <input
                type="text" placeholder="Position (e.g. Kagawad, SK Member)" required
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
              <input
                type="text" placeholder="Gender (optional)"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Short introduction / bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <input
                  type="checkbox"
                  checked={form.isHead}
                  onChange={(e) => setForm({ ...form, isHead: e.target.checked })}
                />
                Display as the head of this category (e.g. Captain, SK Chairman)
              </label>
              <div>
                <label className="text-xs font-medium text-gray-600">Photo</label>
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-xs mt-1"
                />
                {existingImage && !imageFile && (
                  <img src={`${import.meta.env.VITE_API_URL}${existingImage}`} alt="current" className="w-16 h-16 rounded-full object-cover mt-2" />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-bold text-gray-500">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900">
                  {editingId ? 'Save Changes' : 'Add Official'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}