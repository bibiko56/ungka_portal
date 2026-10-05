import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import JoinAuthModal from '../components/JoinAuthModal';

export default function Volunteer() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // State to track which event is currently opened in the modal
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);
  
  // Calendar state (defaults to current month/year)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const { user } = useAuth();
  const { alert } = useModal();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching events for calendar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

const handleJoinEvent = async (eventId) => {
  if (!user) {
    setShowAuthModal(true);
    return;
  }

    // Fallback logic to find the name or use part of the email
    const userName = user.name || user.username || user.fullName || user.email.split('@')[0];

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id || user.id,
          name: userName,
          email: user.email
        })
      });

      const data = await res.json();
      if (res.ok) {
        await alert('Successfully joined the event!', 'success');
      } else {
        await alert(data.error || 'Failed to join event.', 'danger');
      }
    } catch (err) {
      console.error('Error joining event:', err);
      await alert('Server error while joining event.', 'danger');
    }
  };

  // Helper to format dates nicely: "Month Day, Year" (e.g., "October 27, 2026")
  const formatDateString = (dateStr) => {
    if (!dateStr) return 'Upcoming';
    // Handles 'YYYY-MM-DD' cleanly avoiding timezone shifts
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Match events to dates
  const getEventsForDay = (dayNum) => {
    return events.filter((e) => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return (
        d.getDate() === dayNum &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
  };

  const selectedEvents = selectedDateStr
    ? events.filter((e) => e.date === selectedDateStr)
    : events;

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* 🟢 SECTION 1: CALENDAR EVENTS HEADER */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-[#013220] tracking-tight inline-block border-b-2 border-[#013220] pb-1">
            Calendar Events
          </h1>
        </div>

        {/* 🟢 CALENDAR & DAILY LIST CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Daily Events Schedule List (Scrollable if more than 4 events) */}
          <div className="lg:col-span-5 space-y-4">
            {loading ? (
              <p className="text-xs text-gray-400">Loading schedule...</p>
            ) : events.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No scheduled events found.</p>
            ) : (
              <div className="max-h-[420px] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-[#013220]">
                {selectedEvents.map((evt) => (
                  <div key={evt._id} className="space-y-2">
                    <span className="text-xs font-bold text-gray-700 block">
                      {formatDateString(evt.date)}
                    </span>
                    <div className="bg-white border-2 border-[#013220] text-[#013220] p-3.5 rounded-2xl flex items-center gap-3 shadow-sm hover:bg-emerald-50 transition-colors">
                      <div className="bg-[#013220] px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-emerald-200 whitespace-nowrap">
                        {evt.time || 'All Day'}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold leading-snug">{evt.title}</h4>
                        <p className="text-[10px] text-gray-600 line-clamp-1">{evt.tagline || evt.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Calendar Component */}
          <div className="lg:col-span-7 bg-white border-2 border-[#013220] text-[#013220] p-6 rounded-3xl shadow-xl">
            {/* Calendar Controls */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrevMonth}
                className="text-xs font-bold flex items-center gap-1 text-[#013220] hover:text-emerald-600 transition-colors"
              >
                ⇐ Preview
              </button>
              <h2 className="text-xl font-bold tracking-wide text-[#013220]">
                {monthNames[month]} <span className="font-extrabold">{year}</span>
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-xs font-bold flex items-center gap-1 text-[#013220] hover:text-emerald-600 transition-colors"
              >
                Next ⇒
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-emerald-800/80 mb-3">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 text-center gap-y-2 text-xs font-semibold">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 text-transparent">00</div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const hasEvents = getEventsForDay(dayNum).length > 0;

                return (
                  <div key={dayNum} className="flex justify-center items-center py-1">
                    <button
                      onClick={() => {
                        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                        setSelectedDateStr(formattedDate);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        hasEvents
                          ? 'bg-[#013220] text-white font-black scale-105 shadow-md'
                          : 'hover:bg-emerald-100 text-[#013220]'
                      }`}
                    >
                      {dayNum}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🟢 SECTION 2: ALL UPCOMING EVENTS LIST */}
        <div className="space-y-6 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-black text-[#013220]">All Upcoming Events</h2>
          
          {events.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No events scheduled at the moment.</p>
          ) : (
            events.map((evt) => {
              const descriptionText = evt.description || '';
              const shouldTruncate = descriptionText.length > 150;

              return (
                <div key={evt._id} className="bg-white p-6 rounded-3xl shadow-lg space-y-4">
                  <h3 className="text-lg font-black text-[#013220] uppercase">{evt.title}</h3>
                  
                  {/* Render images for each event */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {evt.images && evt.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={`${import.meta.env.VITE_API_URL}${img}`} 
                        alt={evt.title} 
                        className="w-full h-40 object-cover rounded-2xl"
                      />
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-emerald-800 uppercase">{evt.tagline}</p>
                  
                  {/* Truncated preview text */}
                  <p className="text-xs text-gray-600">
                    {shouldTruncate ? `${descriptionText.slice(0, 150)}...` : descriptionText}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span>📅 {formatDateString(evt.date)}</span>
                      <span>⏰ {evt.time}</span>
                      <span>📍 {evt.location}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSelectedModalEvent(evt)}
                        className="px-4 py-2 rounded-full border-2 border-[#013220] text-[#013220] font-bold text-xs hover:bg-emerald-50 transition-colors"
                      >
                        See Details
                      </button>
                      <button 
                        onClick={() => handleJoinEvent(evt._id)}
                        className="px-4 py-2 rounded-full bg-[#013220] text-white font-bold text-xs hover:bg-[#002214] transition-colors shadow-sm"
                      >
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* 🟢 POP-UP MODAL OVERLAY WITH CLICK-OUTSIDE-TO-CLOSE */}
      {selectedModalEvent && (
        <div 
          onClick={() => setSelectedModalEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-gray-900 uppercase">Event Details</h3>
              <button 
                onClick={() => setSelectedModalEvent(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-[#013220] uppercase">{selectedModalEvent.title}</h2>

              {/* Modal Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedModalEvent.images && selectedModalEvent.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={`${import.meta.env.VITE_API_URL}${img}`} 
                    alt={selectedModalEvent.title} 
                    className="w-full h-36 object-cover rounded-2xl border"
                  />
                ))}
              </div>

              {selectedModalEvent.tagline && (
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  {selectedModalEvent.tagline}
                </p>
              )}
              
              <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedModalEvent.description}
              </div>

              <div className="flex flex-col gap-2 text-xs text-gray-600 font-medium pt-3 border-t border-gray-100 bg-gray-50 p-3 rounded-2xl">
                <span>📅 <strong>Date:</strong> {formatDateString(selectedModalEvent.date)}</span>
                <span>⏰ <strong>Time:</strong> {selectedModalEvent.time}</span>
                <span>📍 <strong>Location:</strong> {selectedModalEvent.location}</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button 
                onClick={() => setSelectedModalEvent(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleJoinEvent(selectedModalEvent._id)}
                className="bg-[#004A2D] hover:bg-[#003822] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Join Event
              </button>
            </div>

          </div>
        </div>
      )}
      {showAuthModal && (
        <JoinAuthModal onClose={() => setShowAuthModal(false)} />
      )}

    </div>
  );
}