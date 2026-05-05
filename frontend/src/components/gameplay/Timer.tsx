import { motion } from 'framer-motion'

interface TimerProps {
  remaining: number
  total: number
}

export function Timer({ remaining, total }: TimerProps) {
  const R = 52
  const C = 2 * Math.PI * R
  const progress = Math.max(0, remaining) / total
  const dash = progress * C
  const isLow = remaining <= 3
  const hue = Math.round(progress * 180)
  const color = `hsl(${hue},100%,55%)`

  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <motion.div
        animate={isLow ? { scale: [1, 1.07, 1] } : { scale: 1 }}
        transition={isLow ? { repeat: Infinity, duration: 0.55 } : {}}
        style={{ position: 'absolute', inset: 0 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
          <motion.circle 
            cx="60" cy="60" r={R} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`} strokeDashoffset={C * 0.25}
            animate={{ strokeDasharray: `${dash} ${C}`, stroke: color }}
            transition={{ duration: 0.5, ease: 'linear' }}
            style={{ filter: `drop-shadow(0 0 7px ${color})` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span key={remaining} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ fontSize: '1.8rem', fontWeight: 900, color: isLow ? '#f43f5e' : '#f8fafc', lineHeight: 1 }}>
            {Math.max(0, remaining)}
          </motion.span>
          <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>sec</span>
        </div>
      </motion.div>
      {isLow && (
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.14, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ position: 'absolute', inset: -7, borderRadius: '50%', border: '2px solid #f43f5e', filter: 'blur(2px)', pointerEvents: 'none' }} />
      )}
    </div>
  )
}
