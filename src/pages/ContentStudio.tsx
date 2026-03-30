import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PenTool, Image as ImageIcon, Link2, List, ListOrdered, Type, Eye, Save, Send, Share2, MoreHorizontal, LayoutTemplate, Loader2 } from 'lucide-react';

interface ContentDraft {
  id: string;
  title: string;
  type: string;
  lastSaved: string;
  status: string;
}

export default function ContentStudio() {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [contentTitle, setContentTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setDrafts(data);
        if(data.length > 0) {
          setActiveDraftId(data[0].id);
          setContentTitle(data[0].title);
        }
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleUpdateTitle = async () => {
    if (!activeDraftId) return;
    try {
      await fetch(`/api/content/${activeDraftId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: contentTitle })
      });
      setDrafts(prev => prev.map(d => d.id === activeDraftId ? { ...d, title: contentTitle } : d));
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex gap-8 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-hot-orange" />
      </div>
    );
  }

  const activeDraft = drafts.find(d => d.id === activeDraftId);

  return (
    <div className="flex gap-8 h-[calc(100vh-12rem)]">
      {/* Sidebar: Document List */}
      <div className="w-1/4 min-w-[300px] flex flex-col glass-card rounded-[40px] p-6 shadow-sm border border-yellowish/40">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-sunglow" />
            Studio
          </h2>
          <button className="p-2 bg-yellowish/20 hover:bg-yellowish/40 text-hot-orange rounded-full transition-colors border border-sunglow/30 backdrop-blur-sm">
            <LayoutTemplate className="w-4 h-4" />
          </button>
        </div>

        <button className="w-full py-3 mb-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md">
          + New Document
        </button>

        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
          {drafts.map((draft) => (
            <div 
              key={draft.id} 
              onClick={() => {
                setActiveDraftId(draft.id);
                setContentTitle(draft.title);
              }}
              className={`p-4 rounded-[24px] cursor-pointer transition-all border ${
                draft.id === activeDraftId 
                  ? 'bg-yellowish/30 border-sunglow/50 shadow-sm' 
                  : 'bg-white hover:bg-yellowish/10 border-transparent shadow-sm hover:border-yellowish/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/50 px-2 py-0.5 rounded-md border border-slate-100">
                  {draft.type}
                </span>
                <button className="text-slate-400 hover:text-slate-700">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <h4 className="font-bold text-slate-900 leading-tight mb-2 truncate">{draft.title}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Saved: {draft.lastSaved}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col glass-card rounded-[40px] shadow-sm border border-yellowish/40 bg-white/80 overflow-hidden">
        
        {/* Editor Toolbar Header */}
        <div className="px-8 py-5 border-b border-yellowish/40 bg-white/50 backdrop-blur-md flex flex-wrap lg:flex-nowrap justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-2 bg-yellowish/30 rounded-full shrink-0">
              <Type className="w-5 h-5 text-hot-orange" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{activeDraft?.type}</p>
              <input 
                type="text" 
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                className="text-lg font-black text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full truncate"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex bg-slate-100 rounded-full p-1 mr-4">
              <button 
                onClick={() => setActiveTab('write')}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'write' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <span className="flex items-center gap-1.5"><PenTool className="w-3 h-3" /> Write</span>
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> Preview</span>
              </button>
            </div>
            
            <button className="text-slate-400 hover:text-slate-700 transition-colors p-2" onClick={handleUpdateTitle}>
              <Save className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex px-5 py-2.5 bg-hot-orange text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-sunglow transition-all shadow-md items-center gap-2">
              <Send className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        {/* Editor Toolbar (Formatting) */}
        {activeTab === 'write' && (
          <div className="px-8 py-3 border-b border-yellowish/20 bg-white/40 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 transition-colors"><Type className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1"></div>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 font-bold transition-colors">B</button>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 italic transition-colors">I</button>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 underline transition-colors">U</button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1"></div>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 transition-colors"><List className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 transition-colors"><ListOrdered className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1"></div>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 transition-colors"><Link2 className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-yellowish/20 rounded-lg text-slate-600 transition-colors"><ImageIcon className="w-4 h-4" /></button>
          </div>
        )}

        {/* Text Area */}
        <div className="flex-1 p-8 bg-white/60 overflow-y-auto min-h-0">
          {activeTab === 'write' ? (
            <textarea 
              className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-slate-700 leading-relaxed font-medium placeholder:text-slate-300 placeholder:italic text-lg"
              placeholder="Start drafting your masterpiece..."
              defaultValue="Many people find that traditional talk therapy doesn't quite get to the root of their anxiety. This is where Dramatherapy offers a totally different approach..."
            />
          ) : (
            <div className="prose prose-slate prose-lg max-w-3xl mx-auto">
              <h1>{contentTitle}</h1>
              <p className="lead">Many people find that traditional talk therapy doesn't quite get to the root of their anxiety. This is where Dramatherapy offers a totally different approach...</p>
              <p>By engaging the body and the imagination...</p>
              {/* Fake content for preview */}
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse mt-6"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse mt-4"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse mt-4"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
