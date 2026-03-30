import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Search, Bell, Menu, X, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { SECTIONS } from '../lib/constants';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = SECTIONS.find(s => s.path === location.pathname) || SECTIONS[0];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Close sidebar and notifications on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsNotificationsOpen(false);
    setIsSearching(false);
    setSearchQuery('');
  }, [location.pathname]);

  const mockNotifications = [
    { id: 1, title: 'New Enquiry from Sarah Jenkins', time: '10 mins ago', type: 'enquiry', unread: true },
    { id: 2, title: 'Booking confirmed: Emma Wilson', time: '1 hour ago', type: 'booking', unread: true },
    { id: 3, title: 'Invoice INV-2026-001 Pad', time: '2 hours ago', type: 'invoice', unread: false },
  ];

  const filteredSections = SECTIONS.filter(
    s => s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-cream overflow-hidden">
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-screen w-72 bg-white border-r border-yellowish/50 flex flex-col z-40 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0 cursor-pointer rounded-full sunflower-gradient flex items-center justify-center shadow-lg" onClick={() => navigate('/')}>
                <Sun className="text-white w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-hot-orange leading-none uppercase tracking-tighter" onClick={() => navigate('/')}>
                Sunflower<br/><span className="text-sunglow cursor-pointer">Effect</span>
              </h1>
            </div>
            <button className="lg:hidden text-slate-400 hover:text-hot-orange" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar h-[calc(100vh-200px)]">
            <nav className="space-y-1">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 mt-4 px-2">Primary</p>
              {SECTIONS.slice(0, 5).map((item) => (
                <NavLink 
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                    isActive 
                      ? 'bg-hot-orange text-white shadow-md' 
                      : 'text-slate-600 hover:bg-yellowish/20 hover:text-hot-orange'
                  }`}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.name}
                </NavLink>
              ))}
              
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 mt-6 px-2">Operations</p>
              {SECTIONS.slice(5).map((item) => (
                <NavLink 
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all group ${
                    isActive 
                      ? 'bg-yellowish border border-sunglow/30 text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:bg-yellowish/10 hover:text-hot-orange'
                  }`}
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform opacity-70" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="mt-auto p-4 lg:p-8 border-t border-yellowish/30 shrink-0 bg-white">
          <div className="bg-yellowish/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-white border-2 border-sunglow flex items-center justify-center shadow-inner">
              <Sun className="text-hot-orange w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">Claire Schrader</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">Dramatherapist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Persistent Header */}
        <header className="flex justify-between items-center px-6 lg:px-12 py-6 lg:py-8 bg-cream/90 backdrop-blur-md border-b border-yellowish/20 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-500 hover:text-hot-orange bg-white rounded-lg shadow-sm border border-yellowish/50" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-3xl font-black text-hot-orange mb-1 truncate">{currentSection.name === 'Daily Briefing' ? 'Good morning, Claire.' : currentSection.name}</h2>
              {currentSection.name === 'Daily Briefing' && (
                <p className="text-slate-500 font-medium italic text-sm">"Every sunflower follows the light, and so shall you."</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4 relative">
            <div className="relative z-30">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              {isSearching && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10" 
                  onClick={() => { setSearchQuery(''); setIsSearching(false); }}
                >
                  <XCircle className="w-4 h-4 text-slate-300 hover:text-hot-orange" />
                </button>
              )}
              <input 
                type="text" 
                value={searchQuery}
                onFocus={() => setIsSearching(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..." 
                className="pl-10 pr-9 py-2 bg-white border border-yellowish/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sunglow/50 w-48 lg:w-64 shadow-sm transition-all"
              />
              {/* Search Dropdown Results */}
              {isSearching && searchQuery.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-xl border border-yellowish/50 overflow-hidden z-50">
                  <div className="max-h-64 overflow-y-auto">
                    {filteredSections.length > 0 ? (
                      filteredSections.map(s => (
                        <div 
                          key={s.id} 
                          onClick={() => {navigate(s.path); setSearchQuery(''); setIsSearching(false);}}
                          className="px-4 py-3 hover:bg-yellowish/10 flex items-center justify-between cursor-pointer border-b border-slate-50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <s.icon className="w-4 h-4 text-hot-orange" />
                            <span className="text-sm font-bold text-slate-700">{s.name}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-slate-300" />
                        </div>
                      ))
                    ) : (
                       <div className="p-4 text-center text-xs font-bold text-slate-400">No results found for "{searchQuery}"</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 bg-white border border-yellowish/50 rounded-full hover:bg-yellowish/20 transition-colors relative shadow-sm"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-hot-orange rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-14 w-80 bg-white rounded-3xl shadow-2xl border border-yellowish/50 overflow-hidden z-50">
                  <div className="p-4 border-b border-yellowish/30 flex justify-between items-center bg-cream/30">
                    <h4 className="font-black text-slate-900">Notifications</h4>
                    <span className="text-[10px] font-black uppercase text-hot-orange tracking-widest cursor-pointer hover:text-sunglow">Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-slate-50 last:border-0 hover:bg-yellowish/5 cursor-pointer transition-colors flex items-start gap-3 ${n.unread ? 'bg-white' : 'opacity-60 grayscale'}`}>
                        <div className={`mt-0.5 rounded-full p-1.5 ${n.unread ? 'bg-hot-orange/10 text-hot-orange' : 'bg-slate-100 text-slate-400'}`}>
                          {n.type === 'enquiry' ? <Sun className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className={`text-sm mb-1 leading-tight ${n.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>{n.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-hot-orange transition-colors">View All History</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Search backdrop */}
        {isSearching && (
          <div 
            className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] z-10"
            onClick={() => setIsSearching(false)}
          />
        )}
        
        {/* Notifications backdrop */}
        {isNotificationsOpen && (
          <div 
            className="absolute inset-0 bg-transparent z-10"
            onClick={() => setIsNotificationsOpen(false)}
          />
        )}

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-12 pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
