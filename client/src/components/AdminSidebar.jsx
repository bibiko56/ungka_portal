import React from 'react';
import { X } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const selectTab = (tab) => {
    setActiveTab(tab);
    onClose(); // closes the drawer automatically on mobile after picking a tab
  };

  return (
    <>
      {/* Dark backdrop — mobile only, shown while the drawer is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`w-64 bg-[#013220] text-white flex flex-col min-h-screen p-6 fixed md:static top-0 left-0 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="md:hidden self-end mb-4 p-1.5 text-emerald-200 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h1 className="text-xl font-black tracking-wide text-[#00E676]">UServe Admin</h1>
          <p className="text-[11px] text-emerald-200/60 font-medium">Barangay Management Panel</p>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => selectTab('manage')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'manage'
                ? 'bg-[#005C38] text-white'
                : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
            }`}
          >
            Manage Events
          </button>

          <button
            onClick={() => selectTab('incidents')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'incidents'
                ? 'bg-[#005C38] text-white'
                : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
            }`}
          >
            Community Reports
          </button>

          <button
            onClick={() => selectTab('approvals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'approvals'
                ? 'bg-[#005C38] text-white'
                : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
            }`}
          >
            Admin Approvals
          </button>
          <button
  onClick={() => selectTab('approved')}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
    activeTab === 'approved'
      ? 'bg-[#005C38] text-white'
      : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
  }`}
>
  Approved Users
</button>

          <button
            onClick={() => selectTab('officials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'officials'
                ? 'bg-[#005C38] text-white'
                : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
            }`}
          >
            Manage Officials
          </button>

          <button
            onClick={() => selectTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'news'
                ? 'bg-[#005C38] text-white'
                : 'text-emerald-100/70 hover:bg-[#004A2D] hover:text-white'
            }`}
          >
            Manage News
          </button>
        </nav>
      </aside>
    </>
  );
}