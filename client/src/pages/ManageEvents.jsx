import React from 'react';

export default function ManageEvents({ events, loading, handleOpenCreateModal, handleOpenVolunteersModal, handleOpenEditModal, handleDeleteEvent }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Event & Outreach Management</h1>
          <p className="text-xs text-gray-500 font-medium">Manage public events and volunteer activities for UServe</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-[#004A2D] hover:bg-[#003822] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
        >
          <span className="text-sm">⊕</span> Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">TOTAL PUBLISHED EVENTS</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{events.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">SYSTEM STATUS</p>
            <p className="text-2xl font-black text-gray-900 mt-1">Active</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 min-h-[350px]">
        <h2 className="text-sm font-bold text-gray-900">Active Events List</h2>

        {loading ? (
          <p className="text-xs text-gray-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No published events found.</p>
        ) : (
          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt._id}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">{evt.title}</h3>
                    <div className="flex items-center gap-2">
                    {evt.category && (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {evt.category}
                        </span>
                    )}
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">PUBLISHED</span>
                  </div>
                </div>

                  {evt.tagline && <p className="text-xs font-semibold text-emerald-800 uppercase mb-1">{evt.tagline}</p>}

                  <p className="text-xs text-gray-500 uppercase tracking-tight mb-4 line-clamp-2">{evt.description}</p>

                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1 font-semibold">Date: {evt.date}</span>
                    <span className="flex items-center gap-1 font-semibold">Time: {evt.time}</span>
                    <span className="flex items-center gap-1 font-semibold">Location: {evt.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap self-end sm:self-center">
                  <button
                    onClick={() => handleOpenVolunteersModal(evt)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-800 text-emerald-800 font-bold text-[11px] hover:bg-emerald-50 transition-colors"
                  >
                    View Volunteers
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(evt)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-800 text-emerald-800 font-bold text-[11px] hover:bg-emerald-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(evt._id)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}