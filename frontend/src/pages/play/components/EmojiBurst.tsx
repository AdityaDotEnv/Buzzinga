import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BurstEmoji {
  id: number
  emoji: string
  x: number
}

const HYPE_EMOJIS = ['🔥', '⚡', '💥', '🎉', '👏', '😱', '🚀', '💎', '🤩', '❤️']

// Simulates socket-emitted emojis from players
export function EmojiBurst() {
  const [bursts, setBursts] = useState<BurstEmoji[]>([])
  const [idCounter, setIdCounter] = useState(0)

  useEffect(() => {
    // Mock: fire a random emoji every 800–2400ms
    const schedule = () => {
      const delay = 800 + Math.random() * 1600
      const t = setTimeout(() => {
        const emoji = HYPE_EMOJIS[Math.floor(Math.random() * HYPE_EMOJIS.length)]
        const x = 5 + Math.random() * 90 // % from left
        setBursts(prev => [...prev, { id: idCounter + Date.now(), emoji, x }])
        setIdCounter(c => c + 1)
        schedule()
      }, delay)
      return t
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [])

  // Auto-remove after animation
  const remove = (id: number) => setBursts(prev => prev.filter(b => b.id !== id))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40, overflow: 'hidden' }}>
      <AnimatePresence>
        {bursts.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: '100vh', x: `${b.x}vw`, opacity: 1, scale: 0.6 }}
            animate={{ y: '-10vh', opacity: [1, 1, 0], scale: [0.6, 1.2, 0.9] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            onAnimationComplete={() => remove(b.id)}
            style={{ position: 'absolute', bottom: 0, fontSize: '2rem',
              filter: 'drop-shadow(0 0 8px rgba(255,200,0,0.6))' }}
          >
            {b.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Quick-tap hype buttons for player view
const QUICK_REACTIONS = ['🔥', '👏', '😂', '❤️', '💎']

export function HypeBar() {
  const [flashes, setFlashes] = useState<number[]>([])

  const tap = (idx: number) => {
    setFlashes(prev => [...prev, idx])
    setTimeout(() => setFlashes(prev => prev.filter(f => f !== idx)), 600)
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
      {QUICK_REACTIONS.map((emoji, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.8, rotate: -10 }}
          onClick={() => tap(i)}
          style={{
            background: flashes.includes(i) ? 'rgba(255,200,0,0.2)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${flashes.includes(i) ? 'rgba(255,200,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '0.75rem', padding: '0.5rem 0.75rem',
            fontSize: '1.25rem', cursor: 'pointer',
            transition: 'background 200ms, border-color 200ms',
          }}
        >
          {emoji}
        </motion.button>
      ))}
    </div>
  )
}
