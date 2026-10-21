import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin, Calendar, Phone, Bell, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/getInitials';
import { imgUrl, formatPhone, formatDate, zoneLabel } from '../utils/profile';

const API = import.meta.env.VITE_API_URL;
const RECENT_MS = 14 * 24 * 60 * 60 * 1000; // news and events from the last 14 days

const getJson = async (url) => {
  try {
    const res = await fetch(url);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
};

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(null); // null = not loaded yet

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json().catch(() => ({}));

        if (res.status === 401) {
          // session expired -> back to login
          logout();
          navigate('/login/user');
          return;
        }
        if (!res.ok) throw new Error(data.message || `Couldn't load your profile (error ${res.status}).`);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNotifs = async () => {
    const next = !showNotifs;
    setShowNotifs(next);
    if (next && notifs === null) {
      const cutoff = Date.now() - RECENT_MS;
      const [news, events] = await Promise.all([getJson(`${API}/api/news`), getJson(`${API}/api/events`)]);
      const list = [];
      (Array.isArray(news) ? news : []).forEach((n) => {
        const time = new Date(n.createdAt || n.date).getTime();
        if (time >= cutoff) list.push({ id: `n-${n._id}`, label: 'New article', title: n.title, time, path: `/news/${n._id}` });
      });
      (Array.isArray(events) ? events : []).forEach((e) => {
        const time = new Date(e.createdAt).getTime();
        if (time >= cutoff) list.push({ id: `e-${e._id}`, label: 'New event', title: e.title, time, path: '/volunteer' });
      });
      list.sort((a, b) => b.time - a.time);
      setNotifs(list);
    }
  };

  if (loading) {
    return <p className="text-center text-sm text-gray-500 italic py-24">Loading your profile...</p>;
  }

  if (error || !profile) {
    return (
      <div className="max-w-md mx-auto my-24 bg-red-50 text-red-700 text-sm font-semibold p-4 rounded-2xl border border-red-200">
        {error || 'Could not load your profile.'}
      </div>
    );
  }

  const isAdmin = profile.role === 'admin';
  const address = ['Ungka II, Pavia, Iloilo', !isAdmin && zoneLabel(profile.zone)].filter(Boolean).join(', ');
  const activities = profile.activities || [];
  const photo = imgUrl(profile.profileImage);

  return (
    <div className="bg-white py-12 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Card */}
        <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center text-center px-6 pt-10 pb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-emerald-700 overflow-hidden flex items-center justify-center">
              {photo ? (
                <img src={photo} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-white">{getInitials(profile.fullName)}</span>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-bold text-emerald-900">{profile.fullName}</h1>
            <p className="text-sm text-gray-500">{isAdmin ? 'Administrator' : 'Resident'}</p>
          </div>

          <div className="border-t border-emerald-100 px-6 sm:px-10 py-6">
            {/* Actions */}
            <div className="flex justify-end gap-2 mb-6">
              <button
                type="button"
                onClick={toggleNotifs}
                aria-expanded={showNotifs}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 text-[11px] font-semibold transition-colors"
              >
                <Bell className="w-3.5 h-3.5" /> Notification
              </button>
              <Link
                to="/settings"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit Profile
              </Link>
            </div>

            {showNotifs && (
              <div className="mb-6 rounded-xl bg-white border border-emerald-100 overflow-hidden">
                <p className="px-4 py-2.5 text-xs font-bold text-emerald-900 border-b border-emerald-100">Recent updates</p>
                {notifs === null ? (
                  <p className="px-4 py-4 text-xs text-gray-500 italic">Loading...</p>
                ) : notifs.length === 0 ? (
                  <p className="px-4 py-4 text-xs text-gray-500">You're all caught up.</p>
                ) : (
                  <ul className="max-h-56 overflow-y-auto divide-y divide-emerald-100">
                    {notifs.map((n) => (
                      <li key={n.id}>
                        <Link to={n.path} className="block px-4 py-2.5 hover:bg-emerald-100/60 transition-colors">
                          <span className="block text-[10px] font-semibold text-emerald-700">{n.label}</span>
                          <span className="block text-xs leading-snug text-gray-800">{n.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className={`grid grid-cols-1 gap-8 ${isAdmin ? '' : 'sm:grid-cols-2'}`}>
              {/* Personal details */}
              <div>
                <h2 className="text-lg font-bold text-emerald-900 mb-4">Personal Details</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" />
                    <span className="break-all">{profile.email}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" />
                    <span>{address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" />
                    <span>Joined since {formatDate(profile.createdAt)}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" />
                    <span>{formatPhone(profile.phoneNumber)}</span>
                  </li>
                </ul>
              </div>

              {/* Activities joined (residents only) */}
              {!isAdmin && (
                <div>
                  <h2 className="text-lg font-bold text-emerald-900 mb-4">Activities Joined</h2>
                  {activities.length === 0 ? (
                    <p className="text-sm text-gray-600">
                      You haven't joined any activities yet.{' '}
                      <Link to="/volunteer" className="underline text-emerald-700 hover:text-emerald-900">
                        Browse events
                      </Link>
                    </p>
                  ) : (
                    <ul className="space-y-2.5 text-sm text-gray-800">
                      {activities.map((a) => (
                        <li key={a._id}>
                          <span className="block">{a.title}</span>
                          {formatDate(a.date) && (
                            <span className="block text-[11px] text-gray-500">{formatDate(a.date)}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}