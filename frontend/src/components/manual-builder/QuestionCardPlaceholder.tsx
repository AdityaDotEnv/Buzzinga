import React from 'react';
import { GripVertical, Image as ImageIcon, Copy, Trash2, MoreVertical } from 'lucide-react';

export function QuestionCardPlaceholder({ index = 1 }: { index?: number }) {
  return (
    <div className="glass-card rounded-[24px] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-slate-300 cursor-grab">
            <GripVertical size={18} />
          </button>
          <span className="text-sm font-semibold text-slate-300">Question {index}</span>
          
          <div className="h-4 w-px bg-white/10 mx-2" />
          
          {/* Question type segment control placeholder */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-medium bg-white/10 rounded-md text-white shadow-sm">Multiple Choice</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">True/False</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">Poll</button>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Copy size={16} /></button>
          <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><MoreVertical size={16} /></button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex gap-4 items-start">
          <textarea 
            rows={2} 
            placeholder="Type your question here..." 
            className="flex-1 text-xl sm:text-2xl font-medium bg-transparent border-none outline-none text-white placeholder-slate-600 resize-none"
            defaultValue={index === 1 ? "What is the primary function of a mitochondria?" : ""}
          />
          <button className="w-16 h-16 shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 border-dashed flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white transition-colors">
            <ImageIcon size={20} />
            <span className="text-[10px] font-medium">Media</span>
          </button>
        </div>

        {/* Answers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'A', color: 'from-rose-500/20 to-rose-600/20', border: 'border-rose-500/30' },
            { label: 'B', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
            { label: 'C', color: 'from-amber-500/20 to-amber-600/20', border: 'border-amber-500/30' },
            { label: 'D', color: 'from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/30', correct: true },
          ].map((ans) => (
            <div key={ans.label} className={`relative flex items-center p-1 rounded-xl border ${ans.correct ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-500/10' : `border-white/10 bg-white/5 hover:bg-white/10`} transition-all group/ans`}>
              <div className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${ans.color} border ${ans.border} flex items-center justify-center font-bold text-lg text-white ml-1`}>
                {ans.label}
              </div>
              <input 
                type="text" 
                placeholder={`Answer ${ans.label}...`}
                className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder-slate-500"
              />
              <button className={`absolute right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${ans.correct ? 'border-emerald-500 bg-emerald-500' : 'border-white/20 bg-transparent hover:border-white/40'}`}>
                {ans.correct && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
