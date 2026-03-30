import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, Plus, ChevronLeft, ChevronRight, MapPin, Video, Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  type: string;
  time: string;
  duration: string;
  location: 'Zoom' | 'In-Person';
}

export default function BookingManagement() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 12)); // Mocking March 12, 2026
  const [bookings, setBookings] = useState<Record<string, Booking[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch bookings:', err);
        setIsLoading(false);
      });
  }, []);

  // Helper to get days in month
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, (_, i) => i + 1);
  const selectedDayBookings = bookings[currentDate.getDate().toString()] || [];

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex gap-8 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-hot-orange" />
      </div>
    );
  }

  return (
    <div className="flex gap-8 h-[calc(100vh-12rem)]">
      {/* Calendar View */}
      <div className="w-2/3 flex flex-col glass-card rounded-[40px] p-8 shadow-sm border border-yellowish/40">
        
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-yellowish/30 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-900 leading-none">Schedule</h2>
            <p className="text-slate-500 font-medium mt-2">Manage your sessions and block out personal time.</p>
          </div>
          <button className="px-6 py-3 bg-hot-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-sunglow transition-all shadow-md hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> New Booking
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h3 className="text-xl font-black text-hot-orange uppercase tracking-widest">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button className="p-2 bg-yellowish/20 hover:bg-yellowish/40 text-slate-700 rounded-full transition-colors border border-sunglow/30 backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 bg-yellowish/20 hover:bg-yellowish/40 text-slate-700 rounded-full transition-colors border border-sunglow/30 backdrop-blur-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 gap-3 min-h-0 overflow-y-auto pr-2 custom-scrollbar auto-rows-[1fr]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={`${day}-${i}`} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for start of month (mocking spacing for March 2026 logic) */}
          {[1,2,3,4,5].map(empty => <div key={`empty-${empty}`} />)}

          {days.map(day => {
            const isSelected = day === currentDate.getDate();
            const hasBooking = bookings[day.toString()];
            
            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                className={`relative rounded-[20px] transition-all flex flex-col items-center justify-center border-2 py-4 ${
                  isSelected 
                    ? 'bg-hot-orange text-white border-transparent shadow-xl' 
                    : hasBooking 
                      ? 'bg-white hover:border-yellowish border-transparent shadow-sm' 
                      : 'bg-white/40 hover:bg-white/80 border-transparent'
                }`}
              >
                <span className={`text-lg font-black ${isSelected ? 'text-white' : 'text-slate-700'}`}>{day}</span>
                
                {hasBooking && (
                  <div className="flex gap-1 mt-1 justify-center">
                    {hasBooking.map((_, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-sunglow'}`} />
                    ))}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Daily Agenda Pane */}
      <div className="w-1/3 flex flex-col glass-card rounded-[40px] p-6 shadow-sm border border-yellowish/40">
        <h3 className="text-lg font-black text-slate-900 border-b border-yellowish/30 pb-4 mb-6 shrink-0">
          {currentDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>

        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 min-h-0">
          {selectedDayBookings.length > 0 ? (
            selectedDayBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-yellowish/30 text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-sunglow/20 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-hot-orange" /> {booking.time}
                  </div>
                  <span className="text-xs font-bold text-slate-400">{booking.duration}</span>
                </div>
                
                <h4 className="text-xl font-black text-slate-900 mb-1">{booking.clientName}</h4>
                <p className="text-sm font-medium text-slate-500 mb-4">{booking.type}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <span className={`text-[10px] uppercase font-black tracking-widest flex items-center gap-1 px-2 py-1 rounded-md ${
                    booking.location === 'Zoom' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {booking.location === 'Zoom' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {booking.location}
                  </span>
                  
                  <button className="ml-auto text-hot-orange text-xs font-black uppercase tracking-widest hover:text-sunglow opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
              <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <CalendarIcon className="w-10 h-10 opacity-30" />
              </div>
              <p className="font-bold">No sessions scheduled for this day.</p>
              <button className="text-xs font-bold text-hot-orange uppercase hover:text-sunglow transition-colors tracking-widest border-b border-hot-orange/30 pb-0.5">
                Block Out Time
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
