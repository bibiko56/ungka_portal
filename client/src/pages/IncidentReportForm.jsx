import React, { useState } from 'react';

export default function IncidentReportForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Maintenance');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  
  // States for UI messages and loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false); // 👈 Added this missing state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setSubmitting(true);

    const storedUser = localStorage.getItem('user');
    let userData = {};
    if (storedUser) {
      try {
        userData = JSON.parse(storedUser);
      } catch (err) {
        console.error('Error parsing user data', err);
      }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', location);
    
    formData.append('userId', userData._id || userData.id || '');
    formData.append('name', userData.fullName || userData.name || userData.username || 'Anonymous');
    formData.append('email', userData.email || '');

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/incidents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit report');

      // Success message shown in the UI
      setSuccessMessage('Incident reported successfully!');
      
      // Clear form inputs
      setTitle('');
      setCategory('Maintenance');
      setLocation('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">File a Community Report</h2>
      <p className="text-sm text-gray-500 mb-6">Report maintenance issues, safety hazards, or sanitation problems.</p>

      {/* Success Banner UI */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium flex items-center gap-2">
          <span>✅</span> {successMessage}
        </div>
      )}

      {/* Error Banner UI */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
          <span>⚠️</span> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Issue Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Broken streetlight on Purok 3"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800 bg-white"
            >
              <option value="Maintenance">Maintenance</option>
              <option value="Safety/Security">Safety/Security</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Noise">Noise</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Location / Purok</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Barangay Hall"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Description</label>
          <textarea
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide specific details about the issue..."
            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Attach Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-900 hover:file:bg-emerald-100"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#004A2D] hover:bg-[#003822] text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting Report...' : 'Submit Incident Report'}
        </button>
      </form>
    </div>
  );
}