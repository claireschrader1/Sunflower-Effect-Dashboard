import React from 'react';
import { motion } from 'motion/react';
import { SECTIONS } from '../lib/constants';

interface PlaceholderProps {
  sectionId: string;
}

export function Placeholder({ sectionId }: PlaceholderProps) {
  const section = SECTIONS.find(s => s.id === sectionId);

  if (!section) return <div>Section not found</div>;

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-[40px] p-12 text-center max-w-lg w-full"
      >
        <div className={`w-20 h-20 ${section.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
          <section.icon className="text-white w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">{section.name}</h2>
        <p className="text-slate-500 font-medium mb-8">
          This functional area is currently under development. Soon, you will be able to manage your {section.name.toLowerCase()} right here.
        </p>
        <button className="px-8 py-3 bg-hot-orange text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-sunglow hover:text-white transition-all shadow-lg">
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
