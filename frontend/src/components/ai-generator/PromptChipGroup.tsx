import React from 'react';

const SUGGESTIONS = [
  'Biology Review',
  'JavaScript Trivia',
  'World History'
];

export function PromptChipGroup() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Try these</span>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button 
            key={suggestion}
            className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
