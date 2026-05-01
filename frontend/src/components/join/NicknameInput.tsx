import React, { useState } from 'react'
import { Shuffle, User, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const FUN_NICKNAMES = [
  'CosmicRacer', 'QuizWizard', 'NeonFox', 'StarChaser', 'BrainBlast',
  'LightSpeed', 'PixelKnight', 'TurboMind', 'GalacticAce', 'ZapMaster',
]

const AVATARS = ['🦊', '🦉', '🚀', '🧠', '🌈', '💎', '👾', '🐱'];

interface NicknameInputProps {
  value: string;
  onChange: (value: string) => void;
  isReady: boolean;
  onToggleReady: () => void;
  onAvatarChange?: (avatar: string) => void;
}

export function NicknameInput({ value, onChange, isReady, onToggleReady, onAvatarChange }: NicknameInputProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleAvatarSelect = (a: string) => {
    setSelectedAvatar(a);
    onAvatarChange?.(a);
  };

  const randomize = () => {
    const pick = FUN_NICKNAMES[Math.floor(Math.random() * FUN_NICKNAMES.length)]
    onChange(pick)
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    setSelectedAvatar(randomAvatar);
    onAvatarChange?.(randomAvatar);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.6)', marginLeft: '0.25rem' }}>
          Pick an Avatar
        </span>
        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem', scrollbarWidth: 'none' }} className="custom-scrollbar">
          {AVATARS.map(a => (
            <motion.button
              key={a}
              onClick={() => handleAvatarSelect(a)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                flexShrink: 0, width: 42, height: 42, borderRadius: '12px',
                background: selectedAvatar === a ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${selectedAvatar === a ? '#a855f7' : 'rgba(255,255,255,0.08)'}`,
                fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'all 200ms'
              }}
            >
              {a}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="nickname" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.6)', marginLeft: '0.25rem' }}>
          Player Nickname
        </label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <User size={16} style={{ position: 'absolute', left: '1rem', color: 'rgba(148,163,184,0.4)', pointerEvents: 'none' }} />
          <input id="nickname" type="text" placeholder="Choose a nickname" value={value} onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(21,15,35,0.7)', border: '1px solid rgba(106,95,193,0.3)', borderRadius: '0.75rem', padding: '0.75rem 3rem 0.75rem 2.5rem', color: '#f8fafc', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', transition: 'border-color 180ms' }}
          />
          <button type="button" onClick={randomize} title="Randomize nickname"
            style={{ position: 'absolute', right: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '0.5rem', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', cursor: 'pointer' }}>
            <Shuffle size={14} />
          </button>
        </div>
      </div>

      <motion.button onClick={onToggleReady} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.8rem', borderRadius: '0.75rem', background: isReady ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isReady ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`, color: isReady ? '#34d399' : 'rgba(148,163,184,0.7)', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', transition: 'all 200ms' }}
      >
        <CheckCircle2 size={18} style={{ color: isReady ? '#10b981' : 'rgba(148,163,184,0.4)' }} />
        {isReady ? "I'm Ready!" : "Mark as Ready"}
      </motion.button>
    </div>
  )
}
