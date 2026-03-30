import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download, Plus, Search, Filter, Loader2 } from 'lucide-react';

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

export default function Invoices() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);
  
  const filtered = invoices.filter(inv => filter === 'all' || inv.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">Paid</span>;
      case 'pending': return <span className="bg-yellowish/40 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-sunglow/40">Pending</span>;
      case 'overdue': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Overdue</span>;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex gap-8 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-hot-orange" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-slate-900 leading-none mb-2 text-hot-orange">Financials</h2>
          <p className="text-slate-500 font-medium">Manage and generate invoices with ease.</p>
        </div>
        <button className="px-6 py-3 bg-hot-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-sunglow transition-all shadow-md hover:-translate-y-0.5">
          <Plus className="w-5 h-5" /> Generate Invoice
        </button>
      </div>

      <div className="glass-card flex-1 min-h-0 rounded-[40px] p-8 shadow-sm border border-yellowish/40 flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8 pb-6 border-b border-yellowish/30 shrink-0">
          <div className="flex flex-wrap gap-2 bg-white/50 p-1.5 rounded-full border border-yellowish/50 shadow-inner">
            {['all', 'paid', 'pending', 'overdue'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients or IDs..." 
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-yellowish/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sunglow/50 shadow-inner font-medium text-slate-700"
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 bg-white/50 backdrop-blur-sm z-10">
              <tr className="border-b border-yellowish/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="pb-4 pl-4 w-1/4">Invoice ID</th>
                <th className="pb-4 w-1/3">Client Name</th>
                <th className="pb-4 w-1/6">Amount</th>
                <th className="pb-4 w-1/6">Issued Date</th>
                <th className="pb-4 pr-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-slate-700">
              {filtered.map(inv => (
                <tr key={inv.id} className="border-b border-slate-100 hover:bg-white transition-colors group cursor-pointer bg-white/30">
                  <td className="py-5 pl-4 flex items-center gap-3">
                    <FileText className="w-4 h-4 text-hot-orange shrink-0" />
                    {inv.id}
                  </td>
                  <td className="py-5 text-slate-900">{inv.client}</td>
                  <td className="py-5 text-slate-900">{inv.amount}</td>
                  <td className="py-5 text-slate-500 font-medium">{inv.date}</td>
                  <td className="py-5 pr-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      {getStatusBadge(inv.status)}
                      <button className="text-slate-300 hover:text-hot-orange transition-colors md:opacity-0 md:group-hover:opacity-100">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium bg-white/20">
                    No invoices found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
