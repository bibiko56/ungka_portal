import React from 'react';

export default function CommunityReports({
  incidentReports,
  loadingIncidents,
  selectedCategoryFilter,
  uniqueCategories,
  customCategoryInput,
  selectedStatusFilter,
  handleCategoryChange,
  handleCustomCategoryInput,
  handleStatusChange,
  filteredReports,
  currentIncidentReports,
  indexOfFirstReport,
  indexOfLastReport,
  currentIncidentPage,
  setCurrentIncidentPage,
  totalIncidentPages,
  setSelectedIncidentReport,
  handleUpdateStatus
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Community Incident & Issue Reports</h1>
          <p className="text-xs text-gray-500 font-medium">Review and update maintenance or safety complaints filed by residents.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-600">Category:</label>
              <select
                value={selectedCategoryFilter}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-800 bg-white font-medium text-gray-700"
              >
                {uniqueCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat === 'Other' ? 'Other...' : cat}
                  </option>
                ))}
              </select>

              {selectedCategoryFilter === 'Other' && (
                <input
                  type="text"
                  placeholder="Type custom category..."
                  value={customCategoryInput}
                  onChange={handleCustomCategoryInput}
                  className="border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-800 bg-white font-medium text-gray-700 w-36"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-600">Status:</label>
              <select
                value={selectedStatusFilter}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-800 bg-white font-medium text-gray-700"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-gray-400 font-medium">
            Total matching: <span className="font-bold text-gray-700">{filteredReports.length}</span>
          </div>
        </div>

        {loadingIncidents ? (
          <p className="text-xs text-gray-400">Loading reports...</p>
        ) : filteredReports.length === 0 ? (
          <p className="text-xs text-gray-400 italic py-6 text-center">No incident reports match your selected filters.</p>
        ) : (
          <>
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] text-gray-500 uppercase tracking-wider">
                    <th className="p-3 font-bold">Issue</th>
                    <th className="p-3 font-bold">Category</th>
                    <th className="p-3 font-bold">Location</th>
                    <th className="p-3 font-bold">Description</th>
                    <th className="p-3 font-bold">Date & Time Filed</th>
                    <th className="p-3 font-bold">Reported By</th>
                    <th className="p-3 font-bold">Status</th>
                    <th className="p-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {currentIncidentReports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{report.title}</p>
                      </td>
                      <td className="p-3">
                        <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {report.category}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">
                         {report.location}
                      </td>
                      <td className="p-3 text-gray-500 max-w-xs">
                        <p className="truncate">{report.description}</p>
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        <p className="font-medium text-gray-800">
                          {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {report.createdAt ? new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </p>
                      </td>
                      <td className="p-3 text-gray-600">
                        <p className="font-medium">{report.reportedBy?.name || report.name || 'Anonymous'}</p>
                        <p className="text-[10px] text-gray-400">{report.reportedBy?.email || report.email}</p>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          report.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedIncidentReport(report)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-[11px] transition-colors"
                        >
                          View Details
                        </button>

                        <select
                          value={report.status}
                          onChange={(e) => handleUpdateStatus(report._id, e.target.value)}
                          className="border border-gray-300 rounded-lg p-1 text-[11px] focus:outline-none focus:border-emerald-800 bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalIncidentPages > 1 && (
              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-500">
                  Showing <span className="font-bold">{indexOfFirstReport + 1}</span> to <span className="font-bold">{Math.min(indexOfLastReport, filteredReports.length)}</span> of <span className="font-bold">{filteredReports.length}</span> reports
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentIncidentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentIncidentPage === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="px-3 py-1.5 text-xs font-semibold text-gray-600">
                    Page {currentIncidentPage} of {totalIncidentPages}
                  </span>

                  <button
                    onClick={() => setCurrentIncidentPage((prev) => Math.min(prev + 1, totalIncidentPages))}
                    disabled={currentIncidentPage === totalIncidentPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}