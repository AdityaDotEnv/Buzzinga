import React from 'react';
import { Sparkles, GraduationCap, Hash, Wand2 } from 'lucide-react';
import { PromptChipGroup } from './PromptChipGroup';
import { motion } from 'framer-motion';

export function PromptComposerCard() {
  return (
    <motion.div
      className="flex flex-col h-full backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 pointer-events-none rounded-3xl" />

      <div className="relative z-10 flex flex-col gap-6 h-full">
        {/* Card header */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Prompt</h2>
          <p className="text-slate-400 text-sm">Provide details about what you want to test.</p>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-slate-300">Topic or Subject</label>
          <div className="relative">
            <textarea
              rows={4}
              placeholder="e.g. Space Exploration, JavaScript Trivia, World History..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none shadow-inner"
            />
            <div className="absolute bottom-3 right-3">
              <Sparkles className="text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Chips */}
        <PromptChipGroup />

        {/* Grade + Questions row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <GraduationCap size={16} /> Grade / Level
            </label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer transition-colors hover:bg-white/10">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Hash size={16} /> Number of Questions
            </label>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              <button className="flex-1 py-2 rounded-lg text-sm font-medium bg-white/10 text-white shadow-sm">5</button>
              <button className="flex-1 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors">10</button>
              <button className="flex-1 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors">15</button>
            </div>
          </div>
        </div>

        {/* Generate button — pinned to bottom */}
        <div className="mt-auto pt-2">
          <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
            <Wand2 size={20} /> Generate Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
}
