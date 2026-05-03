import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Loader2, Heart } from 'lucide-react'

interface JoinButtonProps {
  onClick: () => void
  status: 'idle' | 'joining' | 'error'
  isPinComplete: boolean
  isReady?: boolean
}

export function JoinButton({ onClick, status, isPinComplete, isReady }: JoinButtonProps) {
  const isJoining = status === 'joining'
  const isActive = isPinComplete && !isJoining && !isReady
  
  return (
    <motion.button
      onClick={onClick}
      disabled={isJoining || !isPinComplete || isReady}
      whileTap={isActive ? { scale: 0.9 } : {}}
      animate={isReady ? {
        scale: [1, 1.03, 1],
        boxShadow: ['0 0 10px rgba(16,185,129,0.2)', '0 0 24px rgba(16,185,129,0.5)', '0 0 10px rgba(16,185,129,0.2)']
      } : isActive ? {
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 0 12px rgba(225,86,124,0.3)',
          '0 0 28px rgba(225,86,124,0.65)',
          '0 0 12px rgba(225,86,124,0.3)',
        ],
      } : {
        scale: 1,
        boxShadow: '0 0 0px rgba(225,86,124,0)',
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
        width: '100%', height: '3.5rem', borderRadius: '0.85rem',
        border: isReady ? '1px solid #10b981' : isPinComplete ? '1px solid rgb(187,69,102)' : '1px solid rgba(255,255,255,0.08)',
        background: isReady ? 'rgba(16,185,129,0.1)' : isPinComplete ? 'rgb(225,86,124)' : 'rgba(255,255,255,0.05)',
        color: isReady ? '#34d399' : isPinComplete ? '#fff' : 'rgba(148,163,184,0.5)',
        fontSize: '0.95rem', fontWeight: 700, fontFamily: 'inherit', letterSpacing: '0.06em', textTransform: 'uppercase',
        cursor: isPinComplete && !isReady ? 'pointer' : 'not-allowed',
        opacity: isPinComplete ? 1 : 0.5,
        transition: 'all 300ms',
      }}
    >
      <AnimatePresence mode="wait">
        {isReady ? (
          <motion.span key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={18} fill="currentColor" style={{ animation: 'pulse 1.5s infinite' }} />
            Waiting for Host...
          </motion.span>
        ) : isJoining ? (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            Joining Room...
          </motion.span>
        ) : (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gamepad2 size={18} />
            Join Game
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
