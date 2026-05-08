import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy, Shuffle, PlayCircle, Rocket } from 'lucide-react';
import { LaunchModal } from '../shared/LaunchModal';

interface Props {
  onSaveDraft?: () => void;
  isSaving?: boolean;
  timeLimit: number;
  setTimeLimit: (t: number) => void;
}

export function QuestionSettingsSidebar({ onSaveDraft, isSaving, timeLimit, setTimeLimit }: Props) {
  const [showLaunch, setShowLaunch] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      className="custom-scrollbar"
      style={{
        position: 'sticky', top: '7rem',
        maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto',
        borderRadius: '1.25rem', padding: '1.5rem',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 24px 80px rgba(2,6,23,0.3)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <motion.div
            animate={{ boxShadow: ['0 0 6px rgba(236,72,153,0.4)', '0 0 14px rgba(236,72,153,0.8)', '0 0 6px rgba(236,72,153,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899', flexShrink: 0 }}
          />
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>Control Tower</h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(148,163,184,0.6)', lineHeight: 1.5 }}>
          Configure default behavior for all questions.
        </p>
      </div>

      {/* Time */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(203,213,225,0.8)', fontSize: '0.82rem', fontWeight: 600 }}>
          <Clock size={15} /> Time per Question
        </div>
        <select 
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '0.65rem', padding: '0.65rem 1rem', color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value={10}>10 seconds</option>
          <option value={20}>20 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
        </select>
      </div>

      {/* Points */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(203,213,225,0.8)', fontSize: '0.82rem', fontWeight: 600 }}>
          <Trophy size={15} /> Points Mode
        </div>
        <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '0.65rem', padding: '0.65rem 1rem', color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}>
          <option>Standard (1000 max)</option>
          <option>Double Points</option>
          <option>No Points</option>
        </select>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

      {/* Randomize */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(203,213,225,0.8)', fontSize: '0.82rem', fontWeight: 600 }}>
          <Shuffle size={15} /> Randomize Answers
        </div>
        <button style={{ width: 44, height: 24, borderRadius: '999px', background: '#ec4899', border: 'none', cursor: 'pointer', position: 'relative', boxShadow: '0 0 10px rgba(236,72,153,0.35)' }}>
          <div style={{ position: 'absolute', right: 4, top: 4, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} />
        </button>
      </div>

      {/* Pacing */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(203,213,225,0.8)', fontSize: '0.82rem', fontWeight: 600 }}>
          <PlayCircle size={15} /> Pacing
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.65rem', padding: '0.2rem', gap: '0.2rem' }}>
          {['Host Paced', 'Player Paced'].map((p, i) => (
            <button key={p} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', color: i === 0 ? '#f8fafc' : 'rgba(148,163,184,0.6)', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Save draft */}
      <motion.button
        onClick={onSaveDraft}
        disabled={isSaving}
        whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(236,72,153,0.5)' }}
        whileTap={{ scale: 0.96 }}
        style={{ width: '100%', padding: '0.85rem', borderRadius: '0.85rem', background: isSaving ? 'rgba(236,72,153,0.3)' : 'linear-gradient(135deg, #ec4899, #a855f7)', border: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 700, fontFamily: 'inherit', cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: '0 0 16px rgba(236,72,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', opacity: isSaving ? 0.7 : 1 }}
      >
        {isSaving ? 'Saving...' : '✨ Save Draft'}
      </motion.button>

      {/* Launch Live Game */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(16,185,129,0.5)' }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setShowLaunch(true)}
        style={{ width: '100%', padding: '0.85rem', borderRadius: '0.85rem', background: 'linear-gradient(135deg, #10b981, #06b6d4)', border: 'none', color: '#022c22', fontSize: '0.88rem', fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 0 16px rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
      >
        <Rocket size={16} /> Launch Live Game
      </motion.button>

      <AnimatePresence>
        {showLaunch && <LaunchModal onClose={() => setShowLaunch(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
