import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Hash, Zap, Heart, MessageSquare, Trophy } from 'lucide-react'
import { NicknameInput } from './NicknameInput'
import { JoinButton } from './JoinButton'
import { JoinStateFeedback } from './JoinStateFeedback'

interface GamePinCardProps {
  gamePin: string
  nickname: string
  onPinChange: (value: string) => void
  onNicknameChange: (value: string) => void
  onJoin: () => void
  status: 'idle' | 'joining' | 'error'
  onAvatarChange?: (avatar: string) => void
}

const REACTIONS = [
  { emoji: '🔥', icon: <Zap size={14} />, color: '#f97316' },
  { emoji: '👏', icon: <Trophy size={14} />, color: '#fbbf24' },
  { emoji: '😂', icon: <MessageSquare size={14} />, color: '#67e8f9' },
  { emoji: '❤️', icon: <Heart size={14} />, color: '#ec4899' },
];

export function GamePinCard({
  gamePin,
  nickname,
  onPinChange,
  onNicknameChange,
  onJoin,
  status,
  onAvatarChange
}: GamePinCardProps) {
  const [isReady, setIsReady] = useState(false);
  const controls = useAnimation();
  const isPinComplete = gamePin.length === 6;

  useEffect(() => {
    if (isPinComplete && status === 'idle' && !isReady) {
      onJoin();
    }
  }, [gamePin, isPinComplete, onJoin, status, isReady]);

  useEffect(() => {
    if (status === 'error') {
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
  }, [status, controls]);

  return (
    <motion.div
      animate={controls} 
      style={{
        display: 'flex', flexDirection: 'column', gap: '2rem',
        padding: '2.5rem', borderRadius: '1.5rem',
        background: 'rgba(26,26,46,0.85)', backdropFilter: 'blur(40px)',
        border: `2px solid ${isPinComplete && status !== 'error' ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isPinComplete && status !== 'error' ? '0 0 40px rgba(16,185,129,0.2)' : '0 24px 80px rgba(0,0,0,0.5)',
        position: 'relative', overflow: 'hidden', transition: 'border-color 300ms, box-shadow 300ms',
        zIndex: 10
      }}
    >
      <div style={{ position: 'absolute', top: -100, right: -100, width: 200, height: 200, background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
        <label htmlFor="gamePin" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.6)', marginLeft: '0.25rem' }}>Game PIN</label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Hash size={24} style={{ position: 'absolute', left: '1.25rem', color: isPinComplete ? '#34d399' : 'rgba(148,163,184,0.3)', transition: 'color 200ms' }} />
          <input id="gamePin" type="text" maxLength={6} placeholder="Enter 6-digit PIN" value={gamePin} onChange={(e) => onPinChange(e.target.value.replace(/\D/g, ''))}
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(31,22,51,0.9)', border: '2px solid', borderColor: status === 'error' ? '#f87171' : isPinComplete ? 'rgba(16,185,129,0.6)' : 'rgba(54,45,89,0.9)', borderRadius: '1rem', padding: '1.25rem 1.25rem 1.25rem 3.5rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.2em', color: '#f8fafc', textAlign: 'center', outline: 'none', transition: 'all 200ms', boxShadow: isPinComplete && status !== 'error' ? '0 0 20px rgba(16,185,129,0.3)' : 'none' }}
          />
        </div>
      </div>

      <NicknameInput value={nickname} onChange={onNicknameChange} isReady={isReady} onToggleReady={() => setIsReady(!isReady)} onAvatarChange={onAvatarChange} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.5)', marginLeft: '0.25rem' }}>Send Hype</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          {REACTIONS.map(r => (
            <motion.button key={r.emoji} whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.9 }}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '1.1rem' }}>{r.emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <JoinStateFeedback status={status} />
      <JoinButton onClick={onJoin} status={status} isPinComplete={isPinComplete} isReady={isReady} />
    </motion.div>
  )
}
