import React from 'react';
import { Clock, Trophy, Shuffle, PlayCircle } from 'lucide-react';

export function QuestionSettingsSidebar() {
  return (
    <div className="glass-card w-full rounded-[24px] p-6 flex flex-col gap-8 sticky top-24">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Quiz Settings</h3>
        <p className="text-sm text-slate-400">Configure default behavior for your quiz questions.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Time Limit */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={18} />
            <span className="font-medium text-sm">Time per question</span>
          </div>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:ring-2 focus:ring-pink-500/50">
            <option value="10">10 seconds</option>
            <option value="20" selected>20 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">1 minute</option>
          </select>
        </div>

        {/* Points */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy size={18} />
            <span className="font-medium text-sm">Points Mode</span>
          </div>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:ring-2 focus:ring-pink-500/50">
            <option value="standard" selected>Standard (1000 max)</option>
            <option value="double">Double Points</option>
            <option value="none">No Points</option>
          </select>
        </div>

        {/* Randomize */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Shuffle size={18} />
            <span className="font-medium text-sm">Randomize answers</span>
          </div>
          <button className="w-12 h-6 bg-pink-500 rounded-full relative transition-colors shadow-[0_0_10px_rgba(236,72,153,0.3)]">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10 my-2" />

        {/* Pacing */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <PlayCircle size={18} />
            <span className="font-medium text-sm">Pacing</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex">
            <button className="flex-1 py-2 px-3 bg-white/10 text-white text-sm font-medium rounded-lg shadow-sm">Host Paced</button>
            <button className="flex-1 py-2 px-3 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium rounded-lg transition-colors">Player Paced</button>
          </div>
        </div>
      </div>
    </div>
  );
}
