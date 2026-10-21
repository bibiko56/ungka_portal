import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;
const RECENT_MS = 14 * 24 * 60 * 60 * 1000; // news and events from the last 14 days
const REFRESH_MS = 2 * 60 * 1000; // re-check every 2 minutes

const getJson = async (url, token) => {
  try {
    const res = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const timeAgo = (time) => {
  const seconds = Math.floor((Date.now() - time) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

// Items with `persistent` are tasks (e.g. pending approvals): they count as unread until handled.
const isUnread = (item, since) => item.persistent || item.time > since;

export default function NotificationBell() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const seenKey = `notifSeenAt:${user?.id || user?._id || 'anon'}`;

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [seenAt, setSeenAt] = useState(() => Number(localStorage.getItem(seenKey)) || 0);
  const [highlightSince, setHighlightSince] = useState(0);
  const wrapRef = useRef(null);

  const load = useCallback(async () => {
    const cutoff = Date.now() - RECENT_MS;
    const list = [];

    const [news, events] = await Promise.all([
      getJson(`${API}/api/news`),
      getJson(`${API}/api/events`),
    ]);

    (Array.isArray(news) ? news : []).forEach((n) => {
      const time = new Date(n.createdAt || n.date).getTime();
      if (time >= cutoff) {
        list.push({ id: `news-${n._id}`, label: 'New article', title: n.title, time, path: `/news/${n._id}` });
      }
    });

    (Array.isArray(events) ? events : []).forEach((e) => {
      const time = new Date(e.createdAt).getTime();
      if (time >= cutoff) {
        list.push({ id: `event-${e._id}`, label: 'New event', title: e.title, time, path: '/volunteer' });
      }
    });

    if (isAdmin) {
      const [pending, incidents] = await Promise.all([
        getJson(`${API}/api/auth/pending`, token),
        getJson(`${API}/api/incidents`),
      ]);

      const pendingAccounts = Array.isArray(pending) ? pending.length : 0;
      const openReports = Array.isArray(incidents)
        ? incidents.filter((i) => i.status === 'Pending').length
        : 0;

      if (pendingAccounts > 0) {
        list.push({
          id: 'pending-accounts',
          label: 'Needs review',
          title: `${pendingAccounts} ${pendingAccounts === 1 ? 'account is' : 'accounts are'} waiting for approval`,
          time: Date.now(),
          persistent: true,
          tab: 'approvals',
        });
      }

      if (openReports > 0) {
        list.push({
          id: 'pending-reports',
          label: 'Needs review',
          title: `${openReports} incident ${openReports === 1 ? 'report is' : 'reports are'} waiting for review`,
          time: Date.now(),
          persistent: true,
          tab: 'incidents',
        });
      }
    }

    list.sort((a, b) => Number(!!b.persistent) - Number(!!a.persistent) || b.time - a.time);
    setItems(list);
  }, [isAdmin, token]);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      load();
      setHighlightSince(seenAt); // keep new items highlighted while the list is open
      const now = Date.now();
      setSeenAt(now);
      localStorage.setItem(seenKey, String(now));
    }
    setOpen((prev) => !prev);
  };

  const openItem = (item) => {
    setOpen(false);
    if (item.tab) navigate('/admin/dashboard', { state: { tab: item.tab } });
    else navigate(item.path);
  };

  const unreadCount = items.filter((item) => isUnread(item, seenAt)).length;

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={toggle}
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative p-2 rounded-full text-emerald-900 hover:bg-emerald-50 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold leading-4 text-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-gray-500">You're all caught up.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => openItem(item)}
                    className="w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        isUnread(item, highlightSince) ? 'bg-emerald-600' : 'bg-transparent'
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold text-emerald-800">{item.label}</span>
                      <span className="block text-sm text-gray-800 leading-snug line-clamp-2">{item.title}</span>
                      <span className="block text-[11px] text-gray-400 mt-0.5">
                        {item.persistent ? 'Now' : timeAgo(item.time)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}