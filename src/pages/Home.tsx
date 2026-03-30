import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../lib/constants';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section: Daily Briefing */}
      <section className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-80 rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer"
          onClick={() => navigate('/booking')}
        >
          <img 
            src="https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&q=80&w=1920" 
            alt="Sunflower" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-hot-orange/80 to-transparent flex flex-col justify-center p-12">
            <div className="max-w-md">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 shadow-sm">
                Daily Briefing
              </span>
              <h3 className="text-5xl font-black text-white leading-tight mb-6 drop-shadow-md">
                You have 3 new enquiries and a session at 2 PM.
              </h3>
              <button 
                className="px-8 py-4 bg-white text-hot-orange rounded-full font-black text-sm uppercase tracking-widest hover:bg-sunglow hover:text-white transition-all shadow-xl"
              >
                View Schedule
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SECTIONS.slice(1).map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate(section.path)}
            className="glass-card p-6 rounded-[32px] group cursor-pointer shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className={`w-12 h-12 shrink-0 ${section.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
              <section.icon className="text-white w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">
              {section.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium mb-6 flex-grow flex-1">
              Manage your {section.name.toLowerCase()} and keep the momentum going.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-black text-hot-orange uppercase tracking-widest">Open Studio</span>
              <ChevronRight className="w-4 h-4 text-hot-orange group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
        
        {/* Add New Section Button */}
        <button className="border-2 border-dashed border-yellowish/50 bg-white/30 backdrop-blur-sm rounded-[32px] p-6 flex flex-col items-center justify-center gap-4 hover:bg-yellowish/10 hover:border-sunglow transition-colors group min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-yellowish/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Plus className="w-6 h-6 text-sunglow" />
          </div>
          <span className="text-xs font-black text-sunglow uppercase tracking-widest">Add Section</span>
        </button>
      </div>

      {/* Recent Activity / Insights */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[40px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b border-yellowish/20 pb-4">
            <h3 className="text-2xl font-black text-slate-900">Recent Enquiries</h3>
            <button 
              className="text-xs font-black text-hot-orange uppercase tracking-widest hover:text-sunglow transition-colors"
              onClick={() => navigate('/enquiry')}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl hover:bg-white transition-colors cursor-pointer group shadow-sm hover:shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-yellowish/30 flex items-center justify-center font-bold text-hot-orange border border-sunglow/20">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">Potential Client {i}</p>
                    <p className="text-xs text-slate-500 italic">"Interested in the Confidence Course..."</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400">2h ago</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-hot-orange transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="sunflower-gradient rounded-[40px] p-8 text-white flex flex-col justify-between shadow-xl ring-1 ring-white/20 group cursor-pointer hover:shadow-2xl transition-all" onClick={() => navigate('/impact')}>
          <div>
            <h3 className="text-2xl font-black mb-2">Weekly Growth</h3>
            <p className="text-white/80 text-sm font-medium">Your creative impact is blooming.</p>
          </div>
          <div className="py-8 relative">
            <div className="flex items-end gap-2 h-32 relative z-10">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-white/30 rounded-t-lg hover:bg-white/80 transition-colors shadow-sm group-hover:bg-white/40"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-hot-orange/20 to-transparent pointer-events-none rounded-b-xl z-0"></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-4xl font-black tracking-tighter drop-shadow-sm">+24%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">Engagement</p>
            </div>
            <TrendingUp className="w-10 h-10 opacity-60 drop-shadow-sm group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>
    </>
  );
}
