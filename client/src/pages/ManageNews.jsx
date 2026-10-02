import React, { useEffect, useState } from 'react';

const emptyForm = { title: '', description: '', tag: '', location: '', date: '' };

const toInputDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

export default function ManageNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const token = localStorage.getItem('token');

  const fetchNews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news`);
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: toInputDate(new Date()) });
    setImageFile(null);
    setExistingImage('');
    setShowModal(true);
  };

  const openEditModal = (article) => {
    setEditingId(article._id);
    setForm({
      title: article.title,
      description: article.description,
      tag: article.tag || '',
      location: article.location || '',
      date: toInputDate(article.date),
    });
    setImageFile(null);
    setExistingImage(article.image || '');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (imageFile) fd.append('image', imageFile);
    if (existingImage) fd.append('existingImage', existingImage);

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/api/news/${editingId}`
      : `${import.meta.env.VITE_API_URL}/api/news`;

    try {
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setShowModal(false);
      fetchNews();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news article? This cannot be undone.')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setNews((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage News</h1>
          <p className="text-xs text-gray-500 font-medium">Add and edit articles shown on the News & Updates page</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#004A2D] hover:bg-[#003822] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
        >
          <span className="text-sm">⊕</span> Add Article
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 min-h-[350px]">
        {loading ? (
          <p className="text-xs text-gray-400">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No news articles yet.</p>
        ) : (
          <div className="space-y-3">
            {news.map((n, i) => (
              <div key={n._id} className="flex items-center justify-between border-b border-gray-100 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-emerald-50 border border-gray-200 flex-shrink-0">
                    {n.image && (
                      <img src={`${import.meta.env.VITE_API_URL}${n.image}`} alt={n.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {n.title} {i === 0 && <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-1">FEATURED</span>}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {n.tag && ` · ${n.tag}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(n)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-800 text-emerald-800 font-bold text-[11px] hover:bg-emerald-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n._id)}
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
              {editingId ? 'Edit Article' : 'Add Article'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" placeholder="Title" required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Description"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <input
                type="text" placeholder="Tag (e.g. SANGGUNIANG KABATAAN (SK))"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <input
                type="text" placeholder="Location (e.g. BGRY. UNGKA II, PAVIA, ILOILO)"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <div>
                <label className="text-xs font-medium text-gray-600">Date</label>
                <input
                  type="date" required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Photo</label>
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-xs mt-1"
                />
                {existingImage && !imageFile && (
                  <img src={`${import.meta.env.VITE_API_URL}${existingImage}`} alt="current" className="w-20 h-20 rounded-xl object-cover mt-2" />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-bold text-gray-500">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900">
                  {editingId ? 'Save Changes' : 'Add Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}