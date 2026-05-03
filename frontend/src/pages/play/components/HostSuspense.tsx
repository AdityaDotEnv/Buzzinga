import { motion } from 'framer-motion'

interface AnswerBarChartProps {
  answered: number   // how many have answered (without revealing choices)
  total: number      // total players
}

// Host suspense bar: shows % answered without revealing choices
export function AnswerBarChart({ answered, total }: AnswerBarChartProps) {
  const pct = total > 0 ? (answered / total) * 100 : 0

  return (
    <div style={{
      width: '100%', padding: '0.85rem 1.25rem', borderRadius: '1rem',
      background: 'rgba(15,20,40,0.7)', border: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Answers in
        </span>
        <motion.span
          key={answered}
          initial={{ scale: 1.4, color: '#fbbf24' }}
          animate={{ scale: 1, color: '#f8fafc' }}
          style={{ fontWeight: 900, fontSize: '1rem' }}
        >
          {answered} / {total}
        </motion.span>
      </div>

      <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #06b6d4, #7c3aed)',
            boxShadow: '0 0 12px rgba(6,182,212,0.5)',
          }}
        />
      </div>

      {/* Dot per player answered */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < answered ? 1 : 0.4, opacity: i < answered ? 1 : 0.2 }}
            transition={{ delay: i < answered ? i * 0.04 : 0, type: 'spring', stiffness: 400 }}
            style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < answered ? '#06b6d4' : 'rgba(255,255,255,0.15)',
              boxShadow: i < answered ? '0 0 6px rgba(6,182,212,0.7)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface MascotProps { timeLeft: number; totalTime: number }

// Architect mascot — expression changes based on timer
export function ArchitectMascot({ timeLeft, totalTime }: MascotProps) {
  const ratio = timeLeft / totalTime
  const emoji = ratio > 0.5 ? '😎' : ratio > 0.25 ? '😅' : timeLeft <= 3 ? '😱' : '😬'
  const isLow = timeLeft <= 5

  return (
    <motion.div
      animate={isLow
        ? { rotate: [-6, 6, -6], scale: [1, 1.1, 1] }
        : { y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: isLow ? 0.5 : 2, ease: 'easeInOut' }}
      style={{ fontSize: '2.8rem', lineHeight: 1, display: 'inline-block', position: 'relative' }}
    >
      {emoji}
      {isLow && (
        <motion.span
          animate={{ opacity: [0, 1, 0], x: [0, 6, 4], y: [0, -4, -8] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ position: 'absolute', top: -4, right: -12, fontSize: '0.85rem' }}
        >
          💧
        </motion.span>
      )}
    </motion.div>
  )
}
