import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Clock } from 'lucide-react';

const PLOT_HEIGHT = 220; // px, height of the chart area

const zoneLabel = (zone) => (zone === 'unknown' ? 'No zone' : zone.replace('zone-', 'Zone '));

function StatCard({ icon: Icon, label, value, onClick }) {
  const content = (
    <>
      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="text-3xl font-black text-gray-900 leading-tight">{value}</p>
      </div>
    </>
  );

  const base = 'bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex items-center gap-4';

  return onClick ? (
    <button
      onClick={onClick}
      className={`${base} w-full hover:border-emerald-700/40 hover:shadow-md transition-all`}
    >
      {content}
    </button>
  ) : (
    <div className={base}>{content}</div>
  );
}

export default function DashboardOverview({ goToTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || `Couldn't load the dashboard (error ${res.status}).`);
        }
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <p className="text-xs text-gray-500 italic">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 text-xs font-semibold p-4 rounded-2xl border border-red-200">
        {error}
      </div>
    );
  }

  const zones = stats.zones || [];
  const maxCount = Math.max(0, ...zones.map((z) => z.count));

  // Round the top of the scale up so the grid lines land on whole numbers
  const scaleMax = Math.max(4, Math.ceil(maxCount / 4) * 4);
  const ticks = [4, 3, 2, 1, 0].map((i) => (scaleMax / 4) * i);

  const topZones = maxCount > 0 ? zones.filter((z) => z.count === maxCount) : [];
  const summary =
    maxCount === 0
      ? 'No registered residents yet.'
      : topZones.length === 1
      ? `${zoneLabel(topZones[0].zone)} has the most residents (${maxCount}).`
      : `${topZones.length} zones are tied for the most residents (${maxCount} each).`;

  const chartDescription = zones.map((z) => `${zoneLabel(z.zone)}: ${z.count}`).join(', ');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-xs text-gray-500 font-medium">Overview of registered residents</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total registered" value={stats.totalUsers} />
        <StatCard
          icon={UserPlus}
          label={`Registered in ${new Date().getFullYear()}`}
          value={stats.registeredThisYear}
        />
        <StatCard
          icon={Clock}
          label="Waiting for approval"
          value={stats.pendingApprovals}
          onClick={goToTab ? () => goToTab('approvals') : undefined}
        />
      </div>

      {/* Residents per zone */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 sm:p-6">
        <h2 className="text-base font-black text-gray-900">Residents per zone</h2>
        <p className="text-xs text-gray-500 mb-6">{summary}</p>

        <div className="flex gap-3 pt-5" role="img" aria-label={`Residents per zone. ${chartDescription}`}>
          {/* Y axis */}
          <div className="relative w-6 flex-shrink-0 text-[10px] text-gray-400" style={{ height: PLOT_HEIGHT }}>
            {ticks.map((tick) => (
              <span
                key={tick}
                className="absolute right-0"
                style={{ bottom: `${(tick / scaleMax) * 100}%`, transform: 'translateY(50%)' }}
              >
                {tick}
              </span>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            {/* Plot area */}
            <div className="relative" style={{ height: PLOT_HEIGHT }}>
              {ticks.map((tick) => (
                <div
                  key={tick}
                  className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                  style={{ bottom: `${(tick / scaleMax) * 100}%` }}
                />
              ))}

              <div className="absolute inset-0 flex items-end">
                {zones.map(({ zone, count }) => {
                  const barHeight = count === 0 ? 4 : Math.round((count / scaleMax) * PLOT_HEIGHT);
                  const isTop = maxCount > 0 && count === maxCount;
                  return (
                    <div
                      key={zone}
                      className="flex flex-col items-center justify-end"
                      style={{ width: `${100 / zones.length}%` }}
                    >
                      <span className="text-[11px] font-bold text-gray-700 mb-1">{count}</span>
                      <div
                        className={`w-7 sm:w-10 rounded-t-xl transition-all ${
                          count === 0 ? 'bg-gray-200' : isTop ? 'bg-emerald-800' : 'bg-emerald-400'
                        }`}
                        style={{ height: barHeight }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X axis labels */}
            <div className="flex mt-2">
              {zones.map(({ zone }) => (
                <span
                  key={zone}
                  className="text-[10px] sm:text-xs font-semibold text-gray-500 text-center"
                  style={{ width: `${100 / zones.length}%` }}
                >
                  {zoneLabel(zone)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}