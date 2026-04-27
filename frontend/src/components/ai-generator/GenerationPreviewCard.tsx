import React from 'react';
import { CheckCircle2, Copy, Play } from 'lucide-react';

export function GenerationPreviewCard() {
  return (
    <div className="glass-card w-full h-full min-h-[500px] rounded-[24px] sm:rounded-[32px] border border-white/10 relative flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          Quiz Draft Preview
        </h3>
        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium">
          <CheckCircle2 size={14} />
          Draft generated successfully
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-sm text-slate-400 mb-2">Question 1</div>
            <div className="text-lg font-medium text-white mb-4">What planet is known as the "Red Planet"?</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Venus</div>
              <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">B. Mars ✓</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">C. Jupiter</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">D. Saturn</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="text-sm text-slate-400 mb-2">Question 2</div>
            <div className="text-lg font-medium text-white mb-4">Who was the first person to walk on the Moon?</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Yuri Gagarin</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">B. Buzz Aldrin</div>
              <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">C. Neil Armstrong ✓</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">D. Michael Collins</div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080c18] pointer-events-none" />
            <div className="text-sm text-slate-400 mb-2">Question 3</div>
            <div className="text-lg font-medium text-white mb-4">What is the largest galaxy in the Local Group?</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Milky Way</div>
              <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">B. Andromeda ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
        <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white font-medium transition-colors flex items-center justify-center gap-2">
          <Copy size={18} /> Copy to Manual Builder
        </button>
        <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Play size={18} fill="currentColor" /> Preview Game
        </button>
      </div>

    </div>
  );
}
