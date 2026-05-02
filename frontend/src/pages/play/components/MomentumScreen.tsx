import { motion } from 'framer-motion'

interface Player {
  name: string
  score: number
  prevRank: number
  currentRank: number
  streak: number
}

// Mock leaderboard with biggest climber highlight
const MOCK_PLAYERS: Player[] = [
  { name: '🦊 FoxTrot',   score: 4800, prevRank: 4, currentRank: 1, streak: 3 },
  { name: '🚀 RocketBoy', score: 4200, prevRank: 2, currentRank: 2, streak: 1 },
  { name: '💎 DiamondZ',  score: 3900, prevRank: 1, currentRank: 3, streak: 0 },
  { name: '🧠 BrainWave', score: 3500, prevRank: 6, currentRank: 4, streak: 2 },
  { name: '🌈 RainbowGal',score: 3100, prevRank: 5, currentRank: 5, streak: 0 },
]

interface MomentumScreenProps {
  questionCorrect: boolean
  playerScore: number
  playerStreak: number
  onNext: () => void
  isLastQuestion: boolean
}

export function MomentumScreen({ questionCorrect, playerScore, playerStreak, onNext, isLastQuestion }: MomentumScreenProps) {
  const biggestClimber = MOCK_PLAYERS.reduce((best, p) => {
    const climb = p.prevRank - p.currentRank
    const bestClimb = best.prevRank - best.currentRank
    return climb > bestClimb ? p : best
  })
  const biggestClimb = biggestClimber.prevRank - biggestClimber.currentRank

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem',
        padding: '1.5rem', borderRadius: '1.75rem',
        background: 'rgba(10,14,30,0.92)', border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      }}
    >
      {/* Result header */}
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
          style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
        >
          {questionCorrect ? '🎉' : '😢'}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontWeight: 900, fontSize: '1.5rem',
            color: questionCorrect ? '#34d399' : '#f43f5e',
            textShadow: `0 0 20px ${questionCorrect ? 'rgba(52,211,153,0.5)' : 'rgba(244,63,94,0.5)'}`,
          }}
        >
          {questionCorrect ? 'Correct!' : 'Wrong Answer'}
        </motion.p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          Your score: <strong style={{ color: '#f8fafc' }}>{playerScore.toLocaleString()}</strong>
        </p>
      </div>

      {/* Biggest Climber highlight */}
      {biggestClimb > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 280 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '1.25rem', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '2rem' }}>🏆</span>
          <div>
            <p style={{ fontWeight: 800, color: '#c4b5fd', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Biggest Climber
            </p>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f8fafc' }}>
              {biggestClimber.name}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
              Jumped {biggestClimb} rank{biggestClimb > 1 ? 's' : ''} ↑ #{biggestClimber.currentRank}
            </p>
          </div>
        </motion.div>
      )}

      {/* Live leaderboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Leaderboard
        </p>
        {MOCK_PLAYERS.map((p, i) => {
          const rankDelta = p.prevRank - p.currentRank
          const isOnFire = p.streak >= 3
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 1rem', borderRadius: '0.875rem',
                background: i === 0 ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span style={{ fontWeight: 900, fontSize: '1.1rem', minWidth: 24, color: i === 0 ? '#c4b5fd' : 'rgba(255,255,255,0.4)' }}>
                #{p.currentRank}
              </span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: '0.9rem' }}>
                {p.name}
                {isOnFire && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    style={{ marginLeft: '0.4rem' }}
                  >
                    🔥
                  </motion.span>
                )}
              </span>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc' }}>
                {p.score.toLocaleString()}
              </span>
              {rankDelta !== 0 && (
                <motion.span
                  initial={{ opacity: 0, y: rankDelta > 0 ? 8 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  style={{
                    fontSize: '0.75rem', fontWeight: 800,
                    color: rankDelta > 0 ? '#34d399' : '#f43f5e',
                    minWidth: 28, textAlign: 'right',
                  }}
                >
                  {rankDelta > 0 ? `↑${rankDelta}` : `↓${Math.abs(rankDelta)}`}
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Player streak fire banner */}
      {playerStreak >= 3 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 350 }}
          style={{
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            borderRadius: '1rem', padding: '0.75rem 1.25rem',
            textAlign: 'center', fontWeight: 900, fontSize: '1rem',
            color: '#fff', boxShadow: '0 0 30px rgba(249,115,22,0.55)',
          }}
        >
          🔥 {playerStreak}x Streak! You're on FIRE!
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96, rotate: -1 }}
        onClick={onNext}
        style={{
          padding: '1rem', borderRadius: '1.1rem', border: 'none',
          background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
          color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
          boxShadow: '0 0 30px rgba(6,182,212,0.4)',
        }}
      >
        {isLastQuestion ? '🎊 Play Again!' : 'Next Question →'}
      </motion.button>
    </motion.div>
  )
}
