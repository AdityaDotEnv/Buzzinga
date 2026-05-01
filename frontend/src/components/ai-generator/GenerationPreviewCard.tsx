import React from 'react';
import { CheckCircle2, ClipboardCopy, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function GenerationPreviewCard() {
  return (
    <motion.div
      className="flex flex-col h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      {/* Header */}
      <div className="px-8 py-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
        <h3 className="text-lg font-semibold text-white">Quiz Draft Preview</h3>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium">
          <CheckCircle2 size={13} />
          Draft generated
        </div>
      </div>

      {/* Scrollable questions list */}
      <div className="flex-1 px-8 py-6 overflow-y-auto max-h-[600px] custom-scrollbar flex flex-col gap-4 min-h-0">
        {/* Question 1 */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Question 1</div>
          <div className="text-base font-semibold text-white mb-4">What planet is known as the "Red Planet"?</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Venus</div>
            <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">B. Mars ✓</div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">C. Jupiter</div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">D. Saturn</div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Question 2</div>
          <div className="text-base font-semibold text-white mb-4">Who was the first person to walk on the Moon?</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Yuri Gagarin</div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">B. Buzz Aldrin</div>
            <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">C. Neil Armstrong ✓</div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">D. Michael Collins</div>
          </div>
        </div>

        {/* Question 3 — faded preview */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 opacity-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080c18]/80 pointer-events-none" />
          <div className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Question 3</div>
          <div className="text-base font-semibold text-white mb-4">What is the largest galaxy in the Local Group?</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm">A. Milky Way</div>
            <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm">B. Andromeda ✓</div>
          </div>
        </div>
      </div>

      {/* Footer actions — pinned to bottom via mt-auto on scrollable flex-1 */}
      <div className="px-8 py-5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between gap-4 shrink-0">
        <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white font-medium transition-colors flex items-center justify-center gap-2">
          <ClipboardCopy size={17} /> Copy to Builder
        </button>
        <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Play size={17} fill="currentColor" /> Preview Game
        </button>
      </div>
    </motion.div>
  );
}
