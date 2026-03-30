import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, MoreVertical, GripVertical, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'idea' | 'in-progress' | 'done';
}

export default function PromotionKanban({ title, icon: Icon }: { title: string, icon: any }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Brainstorm 5 new hooks for shorts', status: 'idea' },
    { id: '2', title: 'Edit "Anxiety Management" interview', status: 'in-progress' },
    { id: '3', title: 'Publish Confidence Course Promo', status: 'done' },
  ]);

  const TaskColumn = ({ title: colTitle, status }: { title: string, status: Task['status'] }) => (
    <div className="flex-1 flex flex-col glass-card rounded-[32px] p-6 shadow-sm border border-yellowish/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
          {colTitle}
          <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">
            {tasks.filter(t => t.status === status).length}
          </span>
        </h3>
        <button className="text-slate-400 hover:text-hot-orange transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 min-h-[300px]">
        {tasks.filter(t => t.status === status).map((task) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl p-4 shadow-sm border group cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
              status === 'done' ? 'border-green-200 bg-green-50/50' : 'border-slate-100 hover:border-yellowish'
            }`}
          >
            <div className="flex gap-3">
              <GripVertical className="w-4 h-4 text-slate-300 mt-1 cursor-grab" />
              <div className="flex-1">
                <p className={`font-bold text-sm leading-tight mb-2 ${status === 'done' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </p>
                {status === 'done' && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>
              <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-hot-orange rounded-xl flex items-center justify-center shadow-lg rotate-3">
            <Icon className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 leading-none mb-1">{title} Tracker</h2>
            <p className="text-slate-500 font-medium text-sm">Organize campaigns and keep your promotional pipelines flowing.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white border border-yellowish rounded-full font-black text-xs uppercase tracking-widest hover:bg-yellowish/20 transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        <TaskColumn title="Brainstorm & Ideas" status="idea" />
        <TaskColumn title="In Progress Work" status="in-progress" />
        <TaskColumn title="Published & Live" status="done" />
      </div>
    </div>
  );
}
