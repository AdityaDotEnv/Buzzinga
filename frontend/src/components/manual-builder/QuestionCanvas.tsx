import React from 'react';
import { QuestionCardPlaceholder } from './QuestionCardPlaceholder';
import { Plus } from 'lucide-react';

export function QuestionCanvas() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Questions <span className="text-slate-500 font-normal text-lg ml-2">(2)</span></h2>
      </div>

      <div className="flex flex-col gap-6">
        <QuestionCardPlaceholder index={1} />
        <QuestionCardPlaceholder index={2} />
      </div>

      <button className="w-full py-6 rounded-[24px] border-2 border-dashed border-white/10 hover:border-pink-500/50 bg-white/[0.02] hover:bg-pink-500/5 text-slate-400 hover:text-pink-400 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
          <Plus size={20} strokeWidth={2.5} />
        </div>
        Add Question
      </button>
    </div>
  );
}
