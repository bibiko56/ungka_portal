import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import ManageEvents from './ManageEvents';
import CommunityReports from './CommunityReports';
import AdminApprovals from './AdminApprovals';
import ManageOfficials from './ManageOfficials';
import ManageNews from './ManageNews';
import { useModal } from '../context/ModalContext';

import { Menu } from 'lucide-react';


export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('manage'); // 'manage', 'incidents', or 'approvals'
  const { alert, confirm } = useModal();

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Barangay Programs');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Volunteers Modal State & Handler
  const [selectedEventForVolunteers, setSelectedEventForVolunteers] = useState(null);
  const [volunteersList, setVolunteersList] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);

  const [incidentReports, setIncidentReports] = useState([]);
  const [loadingIncidents, setLoadingIncidents] = useState(false);

  // Incident Report Detail Modal State
  const [selectedIncidentReport, setSelectedIncidentReport] = useState(null);

  // Filter State for Category, Status, and Custom "Other" Category Input
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Pagination State for Incident Reports
  const [currentIncidentPage, setCurrentIncidentPage] = useState(1);
  const reportsPerPage = 15;

  const fetchIncidents = async () => {
    setLoadingIncidents(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/incidents`);
      const data = await res.json();
      setIncidentReports(data);
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      setLoadingIncidents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchIncidents();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/incidents/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchIncidents();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleOpenVolunteersModal = async (evt) => {
    setSelectedEventForVolunteers(evt);
    setLoadingVolunteers(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${evt._id}/volunteers`);
      if (res.ok) {
        const data = await res.json();
        setVolunteersList(data);
      }
    } catch (err) {
      console.error('Error fetching volunteers:', err);
    } finally {
      setLoadingVolunteers(false);
    }
  };

  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setTitle('');
    setTagline('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setCategory('Barangay Programs');
    setImages([]);
    setExistingImages([]);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (evt) => {
    setEditingEventId(evt._id);
    setTitle(evt.title || '');
    setTagline(evt.tagline || '');
    setDescription(evt.description || '');

    let formattedDate = '';
    if (evt.date) {
      const parsedDate = new Date(evt.date);
      if (!isNaN(parsedDate)) {
        formattedDate = parsedDate.toISOString().split('T')[0];
      }
    }
    setDate(formattedDate);

    setTime(evt.time || '');
    setLocation(evt.location || '');
    setCategory(evt.category || 'Barangay Programs');
    setImages([]);
    setExistingImages(evt.images || []);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    const confirmed = await confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEvents(events.filter((evt) => evt._id !== id));
      } else {
        await alert('Failed to delete event.', 'danger');
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      await alert('Server error while deleting event.', 'danger');
    }
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tagline', tagline);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('category', category);

    existingImages.forEach((img) => {
      formData.append('existingImages', img);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      let url = `${import.meta.env.VITE_API_URL}/api/events`;
      let method = 'POST';

      if (editingEventId) {
        url = `${import.meta.env.VITE_API_URL}/api/events/${editingEventId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save event');

      setTitle('');
      setTagline('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
      setCategory('Barangay Programs');
      setImages([]);
      setExistingImages([]);
      setEditingEventId(null);
      setIsModalOpen(false);

      fetchEvents();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const uniqueCategories = ['All', ...new Set(incidentReports.map((report) => report.category).filter(Boolean)), 'Other'];

  const filteredReports = incidentReports.filter((report) => {
    let matchesCategory = false;

    if (selectedCategoryFilter === 'All') {
      matchesCategory = true;
    } else if (selectedCategoryFilter === 'Other') {
      if (!customCategoryInput.trim()) {
        matchesCategory = true;
      } else {
        matchesCategory = report.category && report.category.toLowerCase().includes(customCategoryInput.toLowerCase());
      }
    } else {
      matchesCategory = report.category === selectedCategoryFilter;
    }

    const matchesStatus = selectedStatusFilter === 'All' || report.status === selectedStatusFilter;
    return matchesCategory && matchesStatus;
  });

  const indexOfLastReport = currentIncidentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentIncidentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalIncidentPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleCategoryChange = (e) => {
    setSelectedCategoryFilter(e.target.value);
    if (e.target.value !== 'Other') {
      setCustomCategoryInput('');
    }
    setCurrentIncidentPage(1);
  };

  const handleCustomCategoryInput = (e) => {
    setCustomCategoryInput(e.target.value);
    setCurrentIncidentPage(1);
  };

  const handleStatusChange = (e) => {
    setSelectedStatusFilter(e.target.value);
    setCurrentIncidentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex">
      <AdminSidebar
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  isOpen={mobileSidebarOpen}
  onClose={() => setMobileSidebarOpen(false)}
/>

      <main className="flex-1 p-8 space-y-6">
        <div className="md:hidden flex items-center gap-3 -mt-1 -mx-1">
    <button
      onClick={() => setMobileSidebarOpen(true)}
      className="p-2 rounded-lg bg-[#013220] text-white"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5" />
    </button>
    <span className="text-sm font-bold text-gray-800">Admin Dashboard</span>
  </div>
        {activeTab === 'manage' && (
          <ManageEvents
            events={events}
            loading={loading}
            handleOpenCreateModal={handleOpenCreateModal}
            handleOpenVolunteersModal={handleOpenVolunteersModal}
            handleOpenEditModal={handleOpenEditModal}
            handleDeleteEvent={handleDeleteEvent}
          />
        )}

        {activeTab === 'incidents' && (
          <CommunityReports
            incidentReports={incidentReports}
            loadingIncidents={loadingIncidents}
            selectedCategoryFilter={selectedCategoryFilter}
            uniqueCategories={uniqueCategories}
            customCategoryInput={customCategoryInput}
            selectedStatusFilter={selectedStatusFilter}
            handleCategoryChange={handleCategoryChange}
            handleCustomCategoryInput={handleCustomCategoryInput}
            handleStatusChange={handleStatusChange}
            filteredReports={filteredReports}
            currentIncidentReports={currentIncidentReports}
            indexOfFirstReport={indexOfFirstReport}
            indexOfLastReport={indexOfLastReport}
            currentIncidentPage={currentIncidentPage}
            setCurrentIncidentPage={setCurrentIncidentPage}
            totalIncidentPages={totalIncidentPages}
            setSelectedIncidentReport={setSelectedIncidentReport}
            handleUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeTab === 'approvals' && <AdminApprovals />}
        {activeTab === 'officials' && <ManageOfficials />}
        {activeTab === 'news' && <ManageNews />}
      </main>

      {/* CREATE / EDIT EVENT MODAL */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-gray-900">
                {editingEventId ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {message && (
              <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 rounded-xl">
                {message.text}
              </div>
            )}

            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Inter-Zone Basketball Liga"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Opening Ceremony & First Game"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Category</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                >
                  <option value="Healthcare">Healthcare</option>
                  <option value="Aid & Assistance">Aid & Assistance</option>
                  <option value="Barangay Programs">Barangay Programs</option>
                  <option value="SK Event">SK Event</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="8:00 AM - 10:00 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Barangay Covered Gym"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide event details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-800"
                ></textarea>
              </div>

              {existingImages.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Current Images</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative group w-16 h-16 border rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${img}`}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                          className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl font-bold"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {existingImages.length > 0 ? 'Upload New/Additional Images' : 'Upload Images'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-900 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#004A2D] hover:bg-[#003822] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  {submitting ? 'Saving...' : editingEventId ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW VOLUNTEERS MODAL */}
      {selectedEventForVolunteers && (
        <div
          onClick={() => setSelectedEventForVolunteers(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 uppercase">Event Participants</h3>
                <p className="text-xs text-emerald-800 font-semibold">{selectedEventForVolunteers.title}</p>
              </div>
              <button
                onClick={() => setSelectedEventForVolunteers(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {loadingVolunteers ? (
                <p className="text-xs text-gray-400 text-center py-6">Loading participant list...</p>
              ) : volunteersList.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm font-bold text-gray-700">No volunteers yet</p>
                  <p className="text-xs text-gray-400">Nobody has joined this event so far.</p>
                </div>
              ) : (
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[11px] text-gray-500 uppercase tracking-wider">
                        <th className="p-3 font-bold">Name</th>
                        <th className="p-3 font-bold">Email</th>
                        <th className="p-3 font-bold">Date Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                      {volunteersList.map((volunteer, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-3 font-bold text-gray-900">{volunteer.name || 'Anonymous User'}</td>
                          <td className="p-3 text-gray-500">{volunteer.email || 'N/A'}</td>
                          <td className="p-3 text-gray-400">{volunteer.joinedAt ? new Date(volunteer.joinedAt).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setSelectedEventForVolunteers(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INCIDENT REPORT DETAILS MODAL */}
      {selectedIncidentReport && (
        <div
          onClick={() => setSelectedIncidentReport(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto relative"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-md uppercase">
                  {selectedIncidentReport.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">{selectedIncidentReport.title}</h3>
              </div>
              <button
                onClick={() => setSelectedIncidentReport(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span>📍 Location: <strong className="text-gray-800">{selectedIncidentReport.location}</strong></span>
              <span>•</span>
              <span>Date Filed: {new Date(selectedIncidentReport.createdAt).toLocaleString()}</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Description</label>
              <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100">
                {selectedIncidentReport.description}
              </div>
            </div>

            {selectedIncidentReport.image && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Attached Photo Evidence</label>
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black/5 flex justify-center max-h-72">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${selectedIncidentReport.image}`}
                    alt="Incident Evidence"
                    className="object-contain max-h-72 w-full"
                  />
                </div>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between items-center text-xs text-gray-500">
              <div>
                Reported by: <span className="font-bold text-gray-800">{selectedIncidentReport.reportedBy?.name || selectedIncidentReport.name || 'Anonymous'}</span> ({selectedIncidentReport.reportedBy?.email || selectedIncidentReport.email || 'No email'})
              </div>
              <button
                onClick={() => setSelectedIncidentReport(null)}
                className="px-4 py-2 bg-[#004A2D] hover:bg-[#003822] text-white rounded-xl font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}