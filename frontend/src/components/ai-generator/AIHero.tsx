import React from 'react';
import { Sparkles } from 'lucide-react';

export function AIHero() {
  return (
    <div className="w-full text-center flex flex-col items-center gap-4 py-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold tracking-wide uppercase mb-2">
        <Sparkles size={16} /> AI Studio
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        Generate a Quiz with AI
      </h1>
      <p className="text-slate-400 text-lg sm:text-xl max-w-2xl">
        Describe your topic, target audience, and difficulty. Our AI will draft a complete, ready-to-play quiz in seconds.
      </p>
    </div>
  );
}
