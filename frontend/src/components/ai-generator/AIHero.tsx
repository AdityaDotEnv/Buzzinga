import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIHero() {
  return (
    <motion.div
      className="w-full text-center flex flex-col items-center gap-4 py-8 mb-12"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold tracking-wide uppercase mb-2">
        <Sparkles size={16} /> AI Studio
      </div>

      {/*
        Use an explicit Tailwind font-size so the global h1 clamp
        (up to 5.8rem) doesn't make the page hero absurdly large.
        text-5xl = 3rem, text-6xl = 3.75rem at lg — fits the two-column layout.
      */}
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
        style={{ maxWidth: 'none', letterSpacing: '-0.03em', lineHeight: 1.1 }}
      >
        Generate a Quiz with AI
      </h1>

      <p className="text-slate-400 text-lg sm:text-xl max-w-2xl">
        Describe your topic, target audience, and difficulty. Our AI will draft a complete, ready-to-play quiz in seconds.
      </p>
    </motion.div>
  );
}
