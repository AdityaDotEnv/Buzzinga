import React from 'react';

export function BuilderHero() {
  return (
    <div className="w-full relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Build Your Quiz From Scratch</h1>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold tracking-wide uppercase text-pink-300">
              Draft Mode
            </span>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            Design your questions, define correct answers, and set the perfect pacing for your audience.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-inner">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Setup Progress</span>
            <span className="text-sm font-semibold text-white">1/4 Complete</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-pink-500 flex items-center justify-center">
            <span className="text-xs font-bold">25%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
