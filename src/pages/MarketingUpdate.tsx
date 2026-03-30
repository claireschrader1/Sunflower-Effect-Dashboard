import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Image as ImageIcon, Link2, Globe, FileText, CheckCircle2 } from 'lucide-react';

export default function MarketingUpdate({ title, icon: Icon }: { title: string, icon: any }) {
  const [status, setStatus] = useState<'idle' | 'publishing' | 'success'>('idle');

  const handlePublish = () => {
    setStatus('publishing');
    setTimeout(() => setStatus('success'), 1500);
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="flex justify-center items-start h-[calc(100vh-12rem)]">
      <div className="w-full max-w-3xl glass-card rounded-[40px] p-10 shadow-sm border border-yellowish/40 relative overflow-hidden">
        
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 bg-green-500 text-white p-3 flex items-center justify-center gap-2 font-bold text-sm tracking-widest uppercase z-10"
          >
            <CheckCircle2 className="w-5 h-5" /> Update Live Successfully
          </motion.div>
        )}

        <div className="flex items-center gap-4 mb-8 border-b border-yellowish/30 pb-6">
          <div className="w-14 h-14 bg-sunglow rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <Icon className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">{title}</h2>
            <p className="text-slate-500 font-medium">Keep your audience engaged with fresh content.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePublish(); }}>
          
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Announcement Title / Subject</label>
            <input 
              type="text" 
              placeholder="E.g., New Dramatherapy Term Starting Soon!" 
              className="w-full px-5 py-4 bg-white/50 border border-yellowish/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sunglow/50 shadow-inner text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Content Body</label>
            <textarea 
              rows={6}
              placeholder="What do you want to share with the world today?" 
              className="w-full px-5 py-4 bg-white/50 border border-yellowish/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sunglow/50 shadow-inner text-slate-700 font-medium resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button type="button" className="flex-1 py-4 border-2 border-dashed border-yellowish/50 bg-white/30 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-hot-orange hover:border-hot-orange transition-colors flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4" /> Add Header Image
            </button>
            <button type="button" className="flex-1 py-4 border-2 border-dashed border-yellowish/50 bg-white/30 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-hot-orange hover:border-hot-orange transition-colors flex items-center justify-center gap-2">
              <Link2 className="w-4 h-4" /> Add Action Link
            </button>
          </div>

          <div className="pt-6 border-t border-yellowish/30 flex justify-end gap-4">
            <button type="button" className="px-6 py-3 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-slate-800 transition-colors">
              Save Draft
            </button>
            <button 
              type="submit" 
              disabled={status === 'publishing'}
              className="px-8 py-3 bg-hot-orange text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-sunglow transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {status === 'publishing' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {status === 'publishing' ? 'Publishing...' : `Publish to ${title.split(' ')[0]}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
