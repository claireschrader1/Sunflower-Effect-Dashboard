import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Search, Phone, Calendar, ArrowRight, CheckCircle2, Clock, Loader2 } from 'lucide-react';

type EnquiryStatus = 'new' | 'contacted' | 'booked';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  course: string;
  message: string;
  status: EnquiryStatus;
}

export default function EnquiryManagement() {
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetch('/api/enquiries')
      .then(res => res.json())
      .then(data => {
        setEnquiries(data);
        if (data.length > 0) setSelectedEnquiry(data[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch enquiries:', err);
        setIsLoading(false);
      });
  }, []);

  const handleUpdateStatus = async (newStatus: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const updated = await res.json();
      
      setEnquiries(prev => prev.map(e => e.id === updated.id ? updated : e));
      setSelectedEnquiry(updated);
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredEnquiries = enquiries.filter(e => filter === 'all' || e.status === filter);

  const getStatusBadge = (status: EnquiryStatus) => {
    switch(status) {
      case 'new': return <span className="bg-hot-orange/20 text-hot-orange border border-hot-orange/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> New</span>;
      case 'contacted': return <span className="bg-sunglow/20 text-yellow-600 border border-sunglow/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Contacted</span>;
      case 'booked': return <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Booked</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-hot-orange" />
      </div>
    );
  }

  return (
    <div className="h-full min-h-[calc(100vh-12rem)] flex gap-6">
      
      {/* Left List Pane */}
      <div className="w-1/3 min-w-[350px] glass-card rounded-[32px] p-6 flex flex-col shadow-sm border border-yellowish/40">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-hot-orange" />
            Inbox
            <span className="bg-hot-orange text-white text-[10px] px-2 py-0.5 rounded-full ml-1 shadow-sm">
              {enquiries.filter(e => e.status === 'new').length}
            </span>
          </h3>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search enquiries..." 
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-yellowish/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sunglow/50 focus:bg-white transition-all shadow-inner"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide shrink-0">
          {['all', 'new', 'contacted', 'booked'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as EnquiryStatus | 'all')}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                filter === f 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                  : 'bg-white/80 text-slate-500 hover:bg-yellowish/30 border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedEnquiry(enquiry)}
              className={`p-4 rounded-[24px] cursor-pointer transition-all border ${
                selectedEnquiry?.id === enquiry.id 
                  ? 'bg-yellowish/80 border-sunglow shadow-md' 
                  : 'bg-white/80 hover:bg-white border-transparent shadow-sm hover:shadow'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 truncate pr-2">{enquiry.name}</h4>
                <div className="shrink-0">{getStatusBadge(enquiry.status)}</div>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate mb-2">{enquiry.course}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>{enquiry.date}</span>
              </div>
            </motion.div>
          ))}
          {filteredEnquiries.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-medium text-sm">
              No enquiries match this filter.
            </div>
          )}
        </div>
      </div>

      {/* Right Detail Pane */}
      <div className="flex-1 glass-card rounded-[40px] p-8 shadow-sm flex flex-col border border-yellowish/40">
        {selectedEnquiry ? (
          <>
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-yellowish/30">
              <div className="flex gap-5 items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hot-orange to-sunglow flex items-center justify-center text-white text-xl font-black shadow-lg shrink-0">
                  {selectedEnquiry.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 truncate">{selectedEnquiry.name}</h2>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5 hover:text-hot-orange cursor-pointer transition-colors"><Mail className="w-4 h-4 ml-1 flex-shrink-0" /> <span className="truncate">{selectedEnquiry.email}</span></span>
                    <span className="flex items-center gap-1.5 hover:text-hot-orange cursor-pointer transition-colors"><Phone className="w-4 h-4 ml-1 flex-shrink-0" /> {selectedEnquiry.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                {getStatusBadge(selectedEnquiry.status)}
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  {selectedEnquiry.date}
                </span>
              </div>
            </div>

            <div className="mb-8 overflow-y-auto">
              <h4 className="text-[10px] font-black text-hot-orange uppercase tracking-widest mb-3 px-2">Enquiry Details</h4>
              <div className="bg-white/80 rounded-[24px] p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-yellowish/40 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-sunglow/20">
                    Course Interest: <span className="text-hot-orange ml-1">{selectedEnquiry.course}</span>
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  "{selectedEnquiry.message}"
                </p>
              </div>
            </div>

            {/* Reply / Action Area */}
            <div className="mt-auto pt-6 border-t border-yellowish/30 shrink-0">
              <div className="flex flex-col xl:flex-row gap-3 mb-4">
                <button 
                  onClick={() => handleUpdateStatus('contacted')}
                  disabled={isUpdating || selectedEnquiry.status === 'contacted'}
                  className="flex-1 py-4 bg-hot-orange text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-sunglow hover:shadow-lg hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-hot-orange/30 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Mail className="w-5 h-5" /> Mark as Replied
                </button>
                <button 
                  onClick={() => handleUpdateStatus('booked')}
                  disabled={isUpdating || selectedEnquiry.status === 'booked'}
                  className="flex-1 py-4 bg-white text-slate-800 border-2 border-yellowish/50 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-yellowish/20 hover:border-sunglow transition-all shadow-sm focus:ring-4 focus:ring-sunglow/30 disabled:opacity-50"
                  >
                  <Calendar className="w-5 h-5" /> Convert to Booking
                </button>
              </div>
              <p className="text-center text-xs text-slate-400 font-medium italic">
                Converting to booking will automatically schedule an open slot.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Mail className="w-16 h-16 mb-4 opacity-50 text-yellowish" />
            <p className="text-lg font-bold">Select an enquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
