import { motion, AnimatePresence } from 'framer-motion'

interface LockedInCardProps {
  selectedColor: string
  selectedGlow: string
  answerTime: number // seconds taken to answer
  totalTime: number
}

// Pulsing loading bar + 'Answer Confirmed' badge + Speed multiplier
export function LockedInCard({ selectedColor, selectedGlow, answerTime, totalTime }: LockedInCardProps) {
  const isFast = answerTime <= 2
  const isMedium = answerTime <= 6

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        width: '100%', maxWidth: 420,
        borderRadius: '1.5rem', overflow: 'hidden',
        background: 'rgba(10,14,30,0.9)',
        border: `1px solid ${selectedColor}55`,
        boxShadow: `0 0 40px ${selectedGlow}`,
      }}
    >
      {/* Pulsing color bar */}
      <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, transparent, ${selectedColor}, transparent)`,
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: totalTime * 0.4, ease: 'linear' }}
          style={{ height: '100%', background: selectedColor, opacity: 0.4 }}
        />
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        {/* Mascot with sweat state */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
          style={{ fontSize: '3rem', lineHeight: 1 }}
        >
          ⚡
        </motion.div>

        {/* Answer Confirmed badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: `${selectedColor}22`, border: `1px solid ${selectedColor}88`,
            borderRadius: '999px', padding: '0.4rem 1.1rem',
            color: selectedColor, fontWeight: 800, fontSize: '0.85rem',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}
        >
          ✓ Answer Confirmed
        </motion.div>

        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', margin: 0 }}>
          Waiting for other players…
        </p>

        {/* Speed multiplier popup */}
        <AnimatePresence>
          {isFast && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: [0, -3, 3, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                borderRadius: '0.75rem', padding: '0.5rem 1.25rem',
                fontWeight: 900, fontSize: '1rem', color: '#fff',
                boxShadow: '0 0 24px rgba(251,191,36,0.55)',
                letterSpacing: '0.02em',
              }}
            >
              ⚡ FAST! Speed Bonus!
            </motion.div>
          )}
          {!isFast && isMedium && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(52,211,153,0.15)',
                border: '1px solid rgba(52,211,153,0.4)',
                borderRadius: '0.75rem', padding: '0.4rem 1rem',
                fontWeight: 700, fontSize: '0.85rem', color: '#34d399',
              }}
            >
              👍 Good Speed
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
