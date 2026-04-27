import React from 'react';

export function QuizMetadataPanel() {
  return (
    <div className="glass-card w-full rounded-[24px] p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-semibold text-white">Quiz Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Quiz Title</label>
            <input 
              type="text" 
              placeholder="e.g. History 101: Midterm Review" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea 
              rows={3}
              placeholder="Add a short description so players know what to expect..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Category Tags</label>
            <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-wrap gap-2 min-h-[50px] items-center">
              <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                Education <button className="text-slate-400 hover:text-white">&times;</button>
              </span>
              <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                History <button className="text-slate-400 hover:text-white">&times;</button>
              </span>
              <input type="text" placeholder="Add tag..." className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-24" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 text-sm text-slate-300 transition-colors">Beginner</button>
              <button className="bg-pink-500/20 border border-pink-500/50 rounded-xl py-2 text-sm text-pink-300 transition-colors">Intermediate</button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 text-sm text-slate-300 transition-colors">Advanced</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
