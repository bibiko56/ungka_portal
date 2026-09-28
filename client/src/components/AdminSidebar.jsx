import React from 'react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-[#013220] text-white flex flex-col min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-xl font-black tracking-wide text-[#00E676]">UServe Admin</h1>
        <p className="text-[11px] text-emerald-200/60 font-medium">Barangay Management Panel</p>
      </div>

      <nav className="space-y-2 flex-1">
        <button
          onClick={() => setActiveTab('manage')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'manage'
              ? 'bg-[#005C38] text-white'
              : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
          }`}
        >
           Manage Events
        </button>

        <button
          onClick={() => setActiveTab('incidents')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'incidents'
              ? 'bg-[#005C38] text-white'
              : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
          }`}
        >
          Community Reports
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'approvals'
              ? 'bg-[#005C38] text-white'
              : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
          }`}
        >
        Admin Approvals
        </button>

        <button
  onClick={() => setActiveTab('officials')}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
    activeTab === 'officials'
      ? 'bg-[#005C38] text-white'
      : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
  }`}
>
  Manage Officials
</button>
      </nav>
    </aside>
  );
}