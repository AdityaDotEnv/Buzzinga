import { motion } from 'framer-motion'

interface AnswerGridProps {
  options: string[]
  selected: number | null
  phase: 'blastoff' | 'question' | 'locked' | 'timesup' | 'result'
  onAnswer: (idx: number) => void
}

export const SHAPE_CONFIG = [
  { color: '#e11d48', glow: 'rgba(225,29,72,0.45)', label: '▲' },
  { color: '#2563eb', glow: 'rgba(37,99,235,0.45)', label: '◆' },
  { color: '#f59e0b', glow: 'rgba(245,158,11,0.45)', label: '●' },
  { color: '#16a34a', glow: 'rgba(22,163,74,0.45)', label: '■' },
]

export function AnswerGrid({ options, selected, phase, onAnswer }: AnswerGridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', width: '100%' }}>
      {options.map((opt, idx) => {
        const cfg = SHAPE_CONFIG[idx]
        const isSelected = selected === idx
        const dimmed = phase === 'locked' && !isSelected
        
        return (
          <motion.button 
            key={idx} 
            id={`answer-${idx}`}
            onClick={() => onAnswer(idx)}
            disabled={phase === 'locked'}
            whileHover={phase === 'question' ? { scale: 1.03, y: -3 } : {}}
            whileTap={phase === 'question' ? { scale: 0.95, rotate: -1 } : {}}
            animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={isSelected ? { repeat: Infinity, duration: 1.15 } : {}}
            style={{
              minHeight: 76, 
              borderRadius: '1.2rem',
              background: `linear-gradient(135deg,${cfg.color}20,${cfg.color}42)`,
              border: `2px solid ${isSelected ? cfg.color : dimmed ? 'rgba(255,255,255,0.04)' : `${cfg.color}60`}`,
              boxShadow: isSelected ? `0 0 30px ${cfg.glow},inset 0 1px 0 rgba(255,255,255,0.12)` : 'none',
              color: '#f8fafc', 
              cursor: phase === 'question' ? 'pointer' : 'default',
              opacity: dimmed ? 0.28 : 1,
              transition: 'opacity 280ms,border-color 280ms,box-shadow 280ms',
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.7rem',
              padding: '1rem 1.2rem', 
              textAlign: 'left',
              fontSize: 'clamp(0.88rem,2.5vw,1rem)', 
              fontWeight: 600,
            }}>
            <span style={{ 
              fontSize: '1.4rem', 
              minWidth: '1.8rem', 
              textAlign: 'center',
              filter: isSelected ? `drop-shadow(0 0 8px ${cfg.color})` : 'none' 
            }}>
              {cfg.label}
            </span>
            <span>{opt}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
