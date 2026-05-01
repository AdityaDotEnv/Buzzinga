import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Share2, Users, Play, Check, Zap, Clock, FlaskConical, Binary, BookOpen, Music, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Icons mapping for Topic ── */
const TOPIC_ICONS: Record<string, any> = {
  'Biology': FlaskConical,
  'Science': FlaskConical,
  'JavaScript': Binary,
  'Tech': Binary,
  'History': BookOpen,
  'Pop Culture': Music,
  'Default': Zap
};

/* ── Mock avatars ── */
const MOCK_NAMES = ['Riya', 'Aditya', 'Sam', 'Priya', 'Max', 'Zara', 'Leo', 'Nina'];
const AVATAR_COLORS = ['#ec4899','#f97316','#67e8f9','#a78bfa','#fbbf24','#34d399','#f472b6','#38bdf8'];

function PinDigit({ digit, index }: { digit: string; index: number }) {
  return (
    <motion.span
      key={digit + index}
      initial={{ scale: 0, rotateY: 90, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.07 }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 56, height: 72,
        borderRadius: '0.75rem',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc',
        letterSpacing: 0,
        boxShadow: '0 0 18px rgba(249,115,22,0.18)',
      }}
    >
      {digit}
    </motion.span>
  );
}

interface LaunchModalProps {
  onClose: () => void;
  quizTitle?: string;
  questionCount?: number;
  grade?: string;
  topic?: string;
}

export function LaunchModal({ onClose, quizTitle, questionCount, grade, topic }: LaunchModalProps) {
  const navigate = useNavigate();
  const [pin] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const [copied, setCopied] = useState(false);
  const [wink, setWink] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(30);
  const [hostPaced, setHostPaced] = useState(true);
  const [players, setPlayers] = useState<{ name: string; color: string }[]>([]);
  const [ding, setDing] = useState(false);

  const TopicIcon = (topic && TOPIC_ICONS[Object.keys(TOPIC_ICONS).find(k => topic.includes(k)) || 'Default']) || Zap;

  useEffect(() => {
    const t = setTimeout(() => setDing(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let i = 0;
    const addPlayer = () => {
      if (i >= MOCK_NAMES.length) return;
      setPlayers(p => [...p, { name: MOCK_NAMES[i], color: AVATAR_COLORS[i % AVATAR_COLORS.length] }]);
      i++;
      setTimeout(addPlayer, 1200 + Math.random() * 800);
    };
    const t = setTimeout(addPlayer, 1500);
    return () => clearTimeout(t);
  }, []);

  const copyPin = useCallback(() => {
    navigator.clipboard.writeText(pin).catch(() => {});
    setCopied(true);
    setWink(true);
    setTimeout(() => { setCopied(false); setWink(false); }, 2000);
  }, [pin]);

  const BTN: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
    padding: '0.65rem 1.25rem', borderRadius: '0.75rem',
    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
    transition: 'background 180ms, border-color 180ms',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 540,
          borderRadius: '1.75rem',
          background: 'linear-gradient(145deg, rgba(15,23,42,0.97), rgba(8,12,24,0.97))',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.4rem 1.75rem',
          background: 'rgba(255,255,255,0.025)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <motion.div
              animate={ding ? { scale: [1, 1.4, 0.9, 1.15, 1], rotate: [0, -15, 15, -8, 0] } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '1.3rem' }}
            >
              🚀
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Launching {quizTitle || 'Live Game'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'rgba(148,163,184,0.6)', fontWeight: 600 }}>
                  {questionCount || '0'} Questions
                </span>
                {grade && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    padding: '0.1rem 0.4rem', borderRadius: '4px',
                    background: 'rgba(236,72,153,0.1)', color: '#f9a8d4',
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase'
                  }}>
                    <ShieldCheck size={10} /> {grade}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.6)', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* PIN display */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.55)' }}>
              Game PIN
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {pin.split('').map((d, i) => <PinDigit key={i} digit={d} index={i} />)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <motion.div
                animate={wink ? { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42, borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fb923c', fontSize: '1.4rem'
                }}
              >
                <TopicIcon size={24} />
              </motion.div>

              <button onClick={copyPin} style={{
                ...BTN,
                background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${copied ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.1)'}`,
                color: copied ? '#34d399' : '#e2e8f0',
              }}>
                {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy PIN</>}
              </button>

              <button style={{ ...BTN, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#fb923c' }}>
                <Share2 size={15} /> Share Link
              </button>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Users size={13} /> Max Players: {maxPlayers}
              </label>
              <input type="range" min={5} max={100} step={5} value={maxPlayers} onChange={e => setMaxPlayers(Number(e.target.value))} style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(203,213,225,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Clock size={13} /> Pacing
              </label>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.65rem', padding: '0.2rem', gap: '0.2rem' }}>
                {[['Host', true], ['Self', false]].map(([label, val]) => (
                  <button key={String(label)} onClick={() => setHostPaced(val as boolean)} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.45rem', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', border: 'none', transition: 'all 180ms', background: hostPaced === val ? 'rgba(236,72,153,0.2)' : 'transparent', color: hostPaced === val ? '#f9a8d4' : 'rgba(148,163,184,0.6)' }}>{label} Paced</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem 1.25rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399' }}>Waiting Room</span>
              </div>
              <motion.span key={players.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc' }}>{players.length} / {maxPlayers} joined</motion.span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', minHeight: 36 }}>
              <AnimatePresence>
                {players.map((p, i) => (
                  <motion.div key={p.name + i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} style={{ width: 36, height: 36, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#fff', boxShadow: `0 0 10px ${p.color}55`, border: '2px solid rgba(255,255,255,0.15)' }}>{p.name[0]}</motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(16,185,129,0.5)' }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/live')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', width: '100%', padding: '1.05rem', background: 'linear-gradient(135deg, #10b981, #06b6d4)', border: 'none', borderRadius: '1rem', color: '#022c22', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 20px rgba(16,185,129,0.35)' }}>
            <Zap size={19} fill="currentColor" /> Start Quiz Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
