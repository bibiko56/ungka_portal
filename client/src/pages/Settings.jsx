import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogOut, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import ImagePicker from '../components/ImagePicker';
import { changePasswordRules } from '../utils/validatePassword';
import { splitName } from '../utils/profile';

const API = import.meta.env.VITE_API_URL;
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const inputClass =
  'w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200';
const labelClass = 'block text-xs font-semibold text-emerald-900 mb-1.5';
const pillBtn =
  'px-8 py-2.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-60';

/* ------------------------------ Account tab ------------------------------ */
function AccountTab() {
  const { alert } = useModal();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [existingImage, setExistingImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/auth/profile`, { headers: authHeader() });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || 'Could not load your account.');
        setForm({
          ...splitName(data.fullName),
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
        });
        setExistingImage(data.profileImage || '');
      } catch (err) {
        setLoadError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (imageFile) fd.append('image', imageFile);
    fd.append('existingImage', existingImage); // empty string = photo was removed

    try {
      const res = await fetch(`${API}/api/auth/profile`, {
        method: 'PUT',
        headers: authHeader(),
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not save your changes.');

      // keep the navbar / session in sync with the new details
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, ...data.user }));
      window.dispatchEvent(new Event('user-updated'));

      setExistingImage(data.user.profileImage || '');
      setImageFile(null);
      await alert('Your account details were updated.', 'success');
    } catch (err) {
      await alert(err.message, 'danger');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500 italic">Loading your account...</p>;
  if (loadError) return <p className="text-sm text-red-600 font-semibold">{loadError}</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-emerald-900">Account Setting</h2>
        <p className="text-[11px] text-gray-500">Manage your personal account information</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className={labelClass}>First Name:</label>
          <input type="text" required value={form.firstName} onChange={set('firstName')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last Name:</label>
          <input type="text" required value={form.lastName} onChange={set('lastName')} className={inputClass} />
        </div>

        <div className="space-y-5">
          <div>
            <label className={labelClass}>Email Address:</label>
            <input type="email" required value={form.email} onChange={set('email')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone Number:</label>
            <input
              type="tel"
              required
              placeholder="09123456789"
              value={form.phoneNumber}
              onChange={set('phoneNumber')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="sm:pl-4">
          <ImagePicker
            label="Profile Photo"
            existing={existingImage ? [existingImage] : []}
            onExistingChange={(arr) => setExistingImage(arr[0] || '')}
            files={imageFile ? [imageFile] : []}
            onFilesChange={(arr) => setImageFile(arr[0] || null)}
            rounded="rounded-full"
            thumb="w-24 h-24"
          />
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={saving}
          className={`${pillBtn} bg-emerald-700 hover:bg-emerald-800 text-white`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

/* --------------------------- Change Password tab -------------------------- */
function PasswordField({ label, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-900"
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function PasswordTab() {
  const { alert } = useModal();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [saving, setSaving] = useState(false);

  // Design order: case, number/symbol, length, match, spaces
  const [caseRule, symbolRule, lengthRule, spaceRule] = changePasswordRules;
  const rules = [
    { label: caseRule.label, met: caseRule.test(next) },
    { label: symbolRule.label, met: symbolRule.test(next) },
    { label: lengthRule.label, met: lengthRule.test(next) },
    { label: 'match in both fields', met: next.length > 0 && next === repeat },
    { label: spaceRule.label, met: next.length > 0 && spaceRule.test(next) },
  ];
  const allMet = rules.every((r) => r.met);

  const reset = () => {
    setCurrent('');
    setNext('');
    setRepeat('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!current) return alert('Please enter your current password.', 'danger');
    if (!allMet) return alert('Your new password does not meet all the requirements yet.', 'danger');

    setSaving(true);
    try {
      const res = await fetch(`${API}/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not change your password.');
      reset();
      await alert('Your password was changed.', 'success');
    } catch (err) {
      await alert(err.message, 'danger');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-md">
      <h2 className="text-lg font-bold text-emerald-900">Change Password</h2>

      <PasswordField label="Current Password:" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <PasswordField label="New Password:" value={next} onChange={(e) => setNext(e.target.value)} />
      <PasswordField label="Repeat Password:" value={repeat} onChange={(e) => setRepeat(e.target.value)} />

      <div className="flex gap-4 pt-1">
        <button
          type="submit"
          disabled={saving}
          className={`${pillBtn} bg-emerald-700 hover:bg-emerald-800 text-white`}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={reset} className={`${pillBtn} bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50`}>
          Cancel
        </button>
      </div>

      <div className="text-xs text-gray-700 pt-2">
        <p className="mb-1">Password must:</p>
        <ul className="space-y-0.5">
          {rules.map((rule) => (
            <li
              key={rule.label}
              className={`flex items-center gap-2 ${rule.met ? 'text-emerald-700 font-semibold' : 'text-gray-600'}`}
            >
              {rule.met ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <span className="w-3.5 text-center">•</span>}
              {rule.label}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

/* ---------------------------------- Page ---------------------------------- */
export default function Settings() {
  const [tab, setTab] = useState('account');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabClass = (key) =>
    `w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
      tab === key
        ? 'bg-emerald-50 text-emerald-800'
        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'
    }`;

  return (
    <div className="bg-white">
      <div className="px-4 py-10 md:py-14">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row rounded-2xl border border-emerald-100 overflow-hidden bg-white">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0 p-6 flex flex-col bg-white border-b md:border-b-0 md:border-r border-emerald-100">
            <div className="mb-6 md:mb-10">
              <h1 className="text-base font-bold text-emerald-900">Settings</h1>
              <p className="text-[11px] text-gray-500">Manage your personal setting</p>
            </div>

            <nav className="space-y-2 flex-1">
              <button type="button" onClick={() => setTab('account')} className={tabClass('account')}>
                <User className="w-4 h-4" /> Account
              </button>
              <button type="button" onClick={() => setTab('password')} className={tabClass('password')}>
                <Lock className="w-4 h-4" /> Change Password
              </button>
            </nav>

          </aside>

          {/* Content */}
          <section className="flex-1 p-6 sm:p-8 min-h-[26rem]">
            {tab === 'account' ? <AccountTab /> : <PasswordTab />}
          </section>
        </div>
      </div>
      <div className="h-12" />
    </div>
  );
}