import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Flag, Volume2, VolumeX, Flame, X, Users, Trophy } from 'lucide-react'
import { useSelector } from 'react-redux'
import { socket } from '../../services/socket'
import { EmojiBurst, HypeBar } from './components/EmojiBurst'
import { AnswerBarChart, ArchitectMascot } from './components/HostSuspense'
import { Timer } from '../../components/gameplay/Timer'
import { QuestionCard } from '../../components/gameplay/QuestionCard'
import { AnswerGrid, SHAPE_CONFIG } from '../../components/gameplay/AnswerGrid'
import { AnswerFeedback } from '../../components/gameplay/AnswerFeedback'
import { ExitModal } from '../../components/gameplay/ExitModal'

/* ── Types ── */
type Phase = 'blastoff' | 'question' | 'locked' | 'timesup' | 'result'

interface Question {
  id: number; text: string
  options: [string, string, string, string]; correct: number
}

// Note: State now comes from Socket.IO


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
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const role = useSelector((state: any) => state.auth.role)
  const nickname = location.state?.nickname || (role === 'host' ? 'HOST' : `Player_${Math.floor(Math.random() * 1000)}`)

  const [gameState, setGameState] = useState<any>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [sound, setSound] = useState(true)
  const [isExitOpen, setIsExitOpen] = useState(false)
  
  const prevPhaseRef = useRef<string>('waiting')

  useEffect(() => {
    socket.connect()
    socket.emit('join-room', { roomCode, nickname })

    socket.on('state-update', (state) => {
      console.log('Socket state update:', state)
      setGameState(state)

      // Reset local selection when moving to a new question
      if (state.phase === 'question' && prevPhaseRef.current !== 'question') {
        setSelected(null)
      }
      
      // Update local score/streak if provided in player list
      if (role !== 'host') {
        const me = state.players?.find((p: any) => p.nickname === nickname)
        if (me) {
          setScore(me.score)
          // Streak logic could be server-side too, but we keep local for now or sync
        }
      }

      prevPhaseRef.current = state.phase
    })

    return () => {
      socket.off('state-update')
      socket.disconnect()
    }
  }, [roomCode, nickname, role])

  if (!gameState) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06080f', color: '#fff' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
          <Flag size={48} color="#06b6d4" />
        </motion.div>
      </div>
    )
  }

  const { phase, timer, currentQuestionIndex, totalQuestions, players, question } = gameState
  const answeredCount = players?.filter((p: any) => p.answered).length || 0
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  const handleAnswer = (idx: number) => {
    if (phase !== 'question' || selected !== null || role === 'host') return
    setSelected(idx)
    socket.emit('submit-answer', { roomCode, answerIndex: idx })
    
    // Local streak calculation for UI feedback
    const correct = idx === question.correct
    if (correct) setStreak(s => s + 1)
    else setStreak(0)
  }


  const handleExit = () => setIsExitOpen(true)
  const confirmExit = () => navigate('/')

  const progressPct = totalQuestions ? (currentQuestionIndex / totalQuestions) * 100 : 0

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

      {/* Blast-off — server drives phases, so no local blastoff needed */}

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
            <div style={{ fontWeight: 900, fontSize: '1rem' }}>{currentQuestionIndex + 1}<span style={{ color: 'rgba(255,255,255,0.28)' }}> / {totalQuestions}</span></div>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem' }}>
            <button onClick={() => setSound(s => !s)} title="Toggle sound"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.7rem', padding: '0.45rem', cursor: 'pointer', color: '#f8fafc', display: 'flex' }}>
              {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button onClick={handleExit} title="Exit quiz"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '0.7rem', padding: '0.45rem', cursor: 'pointer', color: '#ef4444', display: 'flex' }}>
              <X size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <AnimatePresence mode="wait">
        {(phase === 'question' || phase === 'locked' || phase === 'result') && (
          <motion.main key={`q-${currentQuestionIndex}`}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '1.25rem 1rem 5rem', gap: '1.25rem',
              maxWidth: 820, margin: '0 auto', width: '100%', position: 'relative', zIndex: 5 }}>

            {/* Timer row */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <Timer remaining={timer} total={15} />
              </div>

              {/* Mascot in center (host drama) */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <ArchitectMascot timeLeft={timer} totalTime={15} />
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
              <AnswerBarChart answered={answeredCount} total={players?.length || 1} />
            )}

            {/* Question card */}
            <QuestionCard question={question?.text || ''} />

            {/* Answer Grid */}
            {phase !== 'result' && (
              <AnswerGrid 
                options={question?.options || []} 
                selected={selected} 
                phase={selected !== null ? 'locked' : phase} 
                onAnswer={handleAnswer} 
              />
            )}

            {/* Feedback & Result Screen */}
            <AnswerFeedback 
              phase={phase}
              selected={selected}
              selectedColor={selected !== null ? SHAPE_CONFIG[selected].color : undefined}
              selectedGlow={selected !== null ? SHAPE_CONFIG[selected].glow : undefined}
              answerTime={0}
              totalTime={15}
              questionCorrect={selected === question?.correct}
              playerScore={score}
              playerStreak={streak}
              onNext={() => {}}
              isLastQuestion={isLastQuestion}
              isHostView={role === 'host'}
              players={players}
            />

            {/* Hype bar — always visible when active */}
            {(phase === 'question' || phase === 'locked') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: 380 }}>
                <HypeBar />
              </motion.div>
            )}
          </motion.main>
        )}

        {phase === 'ended' && (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '2rem' }}>
            <Trophy size={100} color="#fbbf24" />
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Quiz Finished!</h2>
            <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', opacity: 0.6, textAlign: 'center' }}>Final Leaderboard</h3>
              {players?.sort((a: any, b: any) => b.score - a.score).map((p: any, i: number) => (
                <div key={p.nickname} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                   <span>{i+1}. {p.nickname}</span>
                   <span style={{ fontWeight: 800 }}>{p.score}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', borderRadius: '1rem', background: '#06b6d4', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Back to Home</button>
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

      {/* Streak Counter */}
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

      {/* Exit Modal */}
      <ExitModal 
        isOpen={isExitOpen} 
        onClose={() => setIsExitOpen(false)} 
        onConfirm={confirmExit} 
      />
    </div>
  )
}
