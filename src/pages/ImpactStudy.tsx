import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, HeartPulse, Activity } from 'lucide-react';

const weeklyData = [
  { name: 'Week 1', confidence: 40, clients: 12 },
  { name: 'Week 2', confidence: 55, clients: 15 },
  { name: 'Week 3', confidence: 68, clients: 18 },
  { name: 'Week 4', confidence: 85, clients: 20 },
  { name: 'Week 5', confidence: 92, clients: 22 },
];

export default function ImpactStudy() {
  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-12rem)] pb-8 overflow-y-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Overall Wellbeing Score', value: '+34%', icon: HeartPulse },
          { label: 'Active Course Participants', value: '45', icon: Users },
          { label: 'Confidence Leap', value: '88/100', icon: TrendingUp },
          { label: 'Session Engagement', value: '92%', icon: Activity },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-[32px] p-6 shadow-sm border border-yellowish/40 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-yellowish/30 text-hot-orange flex items-center justify-center mb-4">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-card rounded-[40px] p-8 shadow-sm border border-yellowish/40 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Patient Confidence Tracker</h3>
              <p className="text-slate-500 text-sm font-medium">Aggregated weekly data from the ongoing impact study.</p>
            </div>
            <button className="px-5 py-2 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm">
              Generate Report
            </button>
          </div>
          
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6900" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6900" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="confidence" stroke="#FF6900" strokeWidth={3} fillOpacity={1} fill="url(#colorConfidence)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Client Bar Chart */}
        <div className="sunflower-gradient rounded-[40px] p-8 shadow-xl flex flex-col text-white">
          <div className="mb-6">
            <h3 className="text-xl font-black leading-tight mb-1">Weekly Check-ins</h3>
            <p className="text-white/80 text-sm font-medium">Consistency across 5 weeks.</p>
          </div>
          
          <div className="flex-1 w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} 
                  contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#fff', color: '#FF6900', fontWeight: 'bold' }} 
                />
                <Bar dataKey="clients" fill="rgba(255,255,255,0.9)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
