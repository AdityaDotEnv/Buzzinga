import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flag, Volume2, VolumeX, Flame } from 'lucide-react'
import { EmojiBurst, HypeBar } from './components/EmojiBurst'
import { LockedInCard } from './components/LockedInCard'
import { AnswerBarChart, ArchitectMascot } from './components/HostSuspense'
import { MomentumScreen } from './components/MomentumScreen'

/* ── Types ── */
type Phase = 'blastoff' | 'question' | 'locked' | 'timesup' | 'result'

interface Question {
  id: number; text: string
  options: [string, string, string, string]; correct: number
}

const QUESTIONS: Question[] = [
  { id: 1, text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
  { id: 2, text: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 },
  { id: 3, text: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correct: 1 },
  { id: 4, text: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Da Vinci', 'Donatello'], correct: 2 },
  { id: 5, text: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3 },
]

const TOTAL_Q = QUESTIONS.length
const TIMER_SECONDS = 20
const MOCK_PLAYERS = 8

const SHAPE_CONFIG = [
  { color: '#e11d48', glow: 'rgba(225,29,72,0.45)', label: '▲' },
  { color: '#2563eb', glow: 'rgba(37,99,235,0.45)',  label: '◆' },
  { color: '#f59e0b', glow: 'rgba(245,158,11,0.45)', label: '●' },
  { color: '#16a34a', glow: 'rgba(22,163,74,0.45)',  label: '■' },
]

/* ── Circular SVG Timer ── */
function CircularTimer({ remaining, total }: { remaining: number; total: number }) {
  const R = 52; const C = 2 * Math.PI * R
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
          <motion.circle cx="60" cy="60" r={R} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
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

/* ── Fire Edge ── */
function FireEdge() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div key={i}
          animate={{ opacity: [0, 1, 0], y: [-16, -64], scale: [0.4, 1, 0] }}
          transition={{ duration: 1.1, delay: i * 0.07, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: `${(i / 28) * 100}%`, bottom: 0,
            width: 9, height: 18, background: `hsl(${14 + (i % 5) * 12},100%,58%)`,
            borderRadius: '50% 50% 30% 30%', filter: 'blur(2px)',
          }}
        />
      ))}
      {/* edge glow borders */}
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(249,115,22,0.35)', pointerEvents: 'none', borderRadius: 0 }} />
    </div>
  )
}

/* ── Blast-Off ── */
function BlastOffOverlay({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState<3 | 2 | 1 | 0>(3)
  useEffect(() => {
    const t = setTimeout(() => {
      if (count > 0) setCount(c => (c - 1) as any)
      else onDone()
    }, count === 0 ? 700 : 1000)
    return () => clearTimeout(t)
  }, [count, onDone])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,7,18,0.95)', backdropFilter: 'blur(14px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
      <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 1.1 }}
        style={{ fontSize: '5.5rem' }}>⚡</motion.div>
      <AnimatePresence mode="wait">
        <motion.div key={count}
          initial={{ scale: 2.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.3, opacity: 0, y: -24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          style={{ fontSize: count === 0 ? '4.5rem' : '8rem', fontWeight: 900, color: '#fff', lineHeight: 1,
            textShadow: '0 0 50px #06b6d4, 0 0 100px rgba(6,182,212,0.35)' }}>
          {count === 0 ? 'Buzzinga!' : count}
        </motion.div>
      </AnimatePresence>
      <motion.div animate={{ scaleX: [0, 1] }} transition={{ duration: 3, ease: 'linear' }}
        style={{ height: 4, width: 260, background: 'linear-gradient(90deg,#06b6d4,#ec4899)', borderRadius: 2, transformOrigin: 'left' }} />
      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Get ready!</span>
    </motion.div>
  )
}

/* ══════════════════════ MAIN PAGE ══════════════════════ */
export function RoomCodePage() {
  const roomCode = 'LIVE01'
  const [phase, setPhase] = useState<Phase>('blastoff')
  const [qIndex, setQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [selected, setSelected] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [sound, setSound] = useState(true)
  const [answered, setAnswered] = useState(0) // mock host bar
  const [answerTime, setAnswerTime] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef(Date.now())

  const q = QUESTIONS[qIndex]
  const clearTimer = useCallback(() => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const goTimesUp = useCallback(() => {
    clearTimer()
    setPhase('timesup')
    setTimeout(() => setPhase('result'), 1800)
  }, [clearTimer])

  /* Timer tick */
  useEffect(() => {
    if (phase !== 'question') return
    if (timeLeft <= 0) { goTimesUp(); return }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return clearTimer
  }, [phase, timeLeft, goTimesUp, clearTimer])

  /* Mock: simulate other players answering over time */
  useEffect(() => {
    if (phase !== 'question') return
    setAnswered(0)
    const trickle = setInterval(() => {
      setAnswered(prev => Math.min(prev + Math.floor(Math.random() * 2), MOCK_PLAYERS - 1))
    }, 1800)
    return () => clearInterval(trickle)
  }, [phase, qIndex])

  /* Soundscape hook — placeholder: would drive Web Audio API pitch/tempo */
  useEffect(() => {
    if (!sound || phase !== 'question') return
    // SOUND_HOOK: tension_music.setTempo(1 + (1 - timeLeft / TIMER_SECONDS) * 0.6)
    // SOUND_HOOK: tension_music.setPitch(1 + (1 - timeLeft / TIMER_SECONDS) * 0.4)
  }, [timeLeft, sound, phase])

  const handleBlastOffDone = () => { setPhase('question'); setTimeLeft(TIMER_SECONDS); startTimeRef.current = Date.now() }

  const handleAnswer = (idx: number) => {
    if (phase !== 'question') return
    clearTimer()
    const taken = Math.round((Date.now() - startTimeRef.current) / 1000)
    setAnswerTime(taken)
    setSelected(idx)
    setAnswered(MOCK_PLAYERS) // all answered on lock-in (mock)
    setPhase('locked')
    const correct = idx === q.correct
    if (correct) { setStreak(s => s + 1); setScore(s => s + Math.max(500, (TIMER_SECONDS - taken) * 80)) }
    else setStreak(0)
  }

  const handleNext = () => {
    if (qIndex < TOTAL_Q - 1) {
      setQIndex(i => i + 1); setSelected(null); setPhase('question')
      setTimeLeft(TIMER_SECONDS); startTimeRef.current = Date.now()
    } else {
      setQIndex(0); setSelected(null); setStreak(0); setScore(0); setPhase('blastoff')
    }
  }

  const progressPct = (qIndex / TOTAL_Q) * 100

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#06080f',
      color: '#f8fafc', fontFamily: "'Inter','Outfit',system-ui,sans-serif", position: 'relative', overflowX: 'hidden' }}>

      {/* BG Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(6,182,212,0.14),transparent 70%)' }} />
      </div>

      {/* Emoji burst layer (always active during gameplay) */}
      {(phase === 'question' || phase === 'locked') && <EmojiBurst />}

      {/* Fire edges on streak ≥ 3 */}
      {streak >= 3 && phase === 'question' && <FireEdge />}

      {/* Blast-off */}
      <AnimatePresence>{phase === 'blastoff' && <BlastOffOverlay onDone={handleBlastOffDone} />}</AnimatePresence>

      {/* ── Top Bar ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.06)' }}>
          <motion.div animate={{ width: `${progressPct}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg,#06b6d4,#ec4899)', borderRadius: '0 3px 3px 0' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.65rem 1.1rem', background: 'rgba(6,8,20,0.82)', backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Room</div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#06b6d4' }}>{roomCode}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Question</div>
            <div style={{ fontWeight: 900, fontSize: '1rem' }}>{qIndex + 1}<span style={{ color: 'rgba(255,255,255,0.28)' }}> / {TOTAL_Q}</span></div>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem' }}>
            <button onClick={() => setSound(s => !s)} title="Toggle sound"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.7rem', padding: '0.45rem', cursor: 'pointer', color: '#f8fafc', display: 'flex' }}>
              {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button title="Report question"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.7rem', padding: '0.45rem', cursor: 'pointer', color: '#fb7185', display: 'flex' }}>
              <Flag size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <AnimatePresence mode="wait">
        {(phase === 'question' || phase === 'locked' || phase === 'result') && (
          <motion.main key={`q-${qIndex}`}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '1.25rem 1rem 5rem', gap: '1.25rem',
              maxWidth: 820, margin: '0 auto', width: '100%', position: 'relative', zIndex: 5 }}>

            {/* Timer row */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <CircularTimer remaining={phase === 'locked' || phase === 'result' ? 0 : timeLeft} total={TIMER_SECONDS} />
              </div>

              {/* Mascot in center (host drama) */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <ArchitectMascot timeLeft={phase === 'locked' ? 0 : timeLeft} totalTime={TIMER_SECONDS} />
              </div>

              {/* Score */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Score</div>
                <motion.div key={score} initial={{ scale: 1.4, color: '#fbbf24' }} animate={{ scale: 1, color: '#f8fafc' }}
                  style={{ fontWeight: 900, fontSize: '1.75rem', lineHeight: 1 }}>
                  {score.toLocaleString()}
                </motion.div>
              </div>
            </div>

            {/* Host answer count bar */}
            {(phase === 'question' || phase === 'locked') && (
              <AnswerBarChart answered={answered} total={MOCK_PLAYERS} />
            )}

            {/* Question card */}
            <motion.div layoutId="qcard"
              style={{ width: '100%', padding: '1.6rem 1.75rem', borderRadius: '1.5rem',
                background: 'rgba(13,18,38,0.8)', backdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(1.15rem,3vw,1.65rem)', fontWeight: 700, lineHeight: 1.45, color: '#f1f5f9', margin: 0 }}>
                {q.text}
              </p>
            </motion.div>

            {/* Answer Grid */}
            {phase !== 'result' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', width: '100%' }}>
                {q.options.map((opt, idx) => {
                  const cfg = SHAPE_CONFIG[idx]
                  const isSelected = selected === idx
                  const dimmed = phase === 'locked' && !isSelected
                  return (
                    <motion.button key={idx} id={`answer-${idx}`}
                      onClick={() => handleAnswer(idx)}
                      disabled={phase === 'locked'}
                      whileHover={phase === 'question' ? { scale: 1.03, y: -3 } : {}}
                      whileTap={phase === 'question' ? { scale: 0.95, rotate: -1 } : {}}
                      animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={isSelected ? { repeat: Infinity, duration: 1.15 } : {}}
                      style={{
                        minHeight: 76, borderRadius: '1.2rem',
                        background: `linear-gradient(135deg,${cfg.color}20,${cfg.color}42)`,
                        border: `2px solid ${isSelected ? cfg.color : dimmed ? 'rgba(255,255,255,0.04)' : `${cfg.color}60`}`,
                        boxShadow: isSelected ? `0 0 30px ${cfg.glow},inset 0 1px 0 rgba(255,255,255,0.12)` : 'none',
                        color: '#f8fafc', cursor: phase === 'question' ? 'pointer' : 'default',
                        opacity: dimmed ? 0.28 : 1,
                        transition: 'opacity 280ms,border-color 280ms,box-shadow 280ms',
                        display: 'flex', alignItems: 'center', gap: '0.7rem',
                        padding: '1rem 1.2rem', textAlign: 'left',
                        fontSize: 'clamp(0.88rem,2.5vw,1rem)', fontWeight: 600,
                      }}>
                      <span style={{ fontSize: '1.4rem', minWidth: '1.8rem', textAlign: 'center',
                        filter: isSelected ? `drop-shadow(0 0 8px ${cfg.color})` : 'none' }}>
                        {cfg.label}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Locked-in card */}
            <AnimatePresence>
              {phase === 'locked' && selected !== null && (
                <LockedInCard
                  selectedColor={SHAPE_CONFIG[selected].color}
                  selectedGlow={SHAPE_CONFIG[selected].glow}
                  answerTime={answerTime}
                  totalTime={TIMER_SECONDS}
                />
              )}
            </AnimatePresence>

            {/* Hype bar — always visible when active */}
            {(phase === 'question' || phase === 'locked') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 380 }}>
                <HypeBar />
              </motion.div>
            )}

            {/* Momentum result screen */}
            <AnimatePresence>
              {phase === 'result' && (
                <MomentumScreen
                  questionCorrect={selected === q.correct}
                  playerScore={score}
                  playerStreak={streak}
                  onNext={handleNext}
                  isLastQuestion={qIndex === TOTAL_Q - 1}
                />
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* ── Time's Up Splash ── */}
      <AnimatePresence>
        {phase === 'timesup' && (
          <motion.div initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.25 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1rem',
              background: 'rgba(5,7,18,0.9)', backdropFilter: 'blur(14px)' }}>
            <motion.div animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 0.38 }} style={{ fontSize: '4.5rem' }}>⏱️</motion.div>
            <motion.p animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 0.65 }}
              style={{ fontSize: '3.2rem', fontWeight: 900, color: '#f43f5e', textShadow: '0 0 35px rgba(244,63,94,0.65)', margin: 0 }}>
              Time's Up!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Streak Counter ── */}
      {streak > 0 && (phase === 'question' || phase === 'locked') && (
        <motion.div key={streak} initial={{ scale: 0.55, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ position: 'fixed', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 60,
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.55rem 1.4rem', borderRadius: '999px',
            background: streak >= 3 ? 'linear-gradient(135deg,#f97316,#ef4444)' : 'rgba(251,191,36,0.13)',
            border: `1px solid ${streak >= 3 ? '#f97316' : 'rgba(251,191,36,0.38)'}`,
            boxShadow: streak >= 3 ? '0 0 32px rgba(249,115,22,0.55)' : 'none',
            color: '#fff', fontWeight: 800, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
          <Flame size={15} style={{ color: streak >= 3 ? '#fff' : '#fbbf24' }} />
          {streak >= 3 ? `${streak}x FIRE STREAK! 🔥` : `${streak}x Streak`}
        </motion.div>
      )}
    </div>
  )
}
