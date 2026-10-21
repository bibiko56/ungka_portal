const API = import.meta.env.VITE_API_URL;

// "/uploads/abc.jpg" -> "http://localhost:5000/uploads/abc.jpg"
export const imgUrl = (path) =>
  !path ? '' : /^(https?:|blob:|data:)/.test(path) ? path : `${API}${path}`;

// "RJ S. Gregori" -> { firstName: "RJ S.", lastName: "Gregori" }
export const splitName = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] || '', lastName: '' };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
};

// "09131682447" -> "+639131682447"
export const formatPhone = (phone = '') => {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `+63${digits.slice(1)}`;
  if (digits.startsWith('63')) return `+${digits}`;
  return `+63${digits}`;
};

export const formatDate = (value) => {
  const d = new Date(value);
  return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// "zone-6" -> "Zone 6"
export const zoneLabel = (zone = '') => (zone ? zone.replace('zone-', 'Zone ') : '');