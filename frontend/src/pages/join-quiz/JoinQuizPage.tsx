import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../store/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import '../../App.css'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { JoinHero } from '../../components/join/JoinHero'
import { GamePinCard } from '../../components/join/GamePinCard'
import { RoomPreviewCard } from '../../components/join/RoomPreviewCard'
import { SuccessToast } from '../../components/join/SuccessToast'
import { roomApi } from '../../services/api'

type JoinStatus = 'idle' | 'joining' | 'error' | 'success'

const AVATAR_COLORS: Record<string, string> = {
  '🦊': '#f97316', '🦉': '#a855f7', '🚀': '#38bdf8', '🧠': '#ec4899',
  '🌈': '#fbbf24', '💎': '#67e8f9', '👾': '#34d399', '🐱': '#f472b6'
};

/* ── Starfield Particle ── */
function Star() {
  const x = useMemo(() => Math.random() * 100 + '%', []);
  const y = useMemo(() => Math.random() * 100 + '%', []);
  const size = useMemo(() => Math.random() * 2 + 1, []);

  return (
    <motion.div
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: '-10%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 15, repeat: Infinity, delay: Math.random() * 15, ease: 'linear' }}
      style={{
        position: 'absolute', left: x, width: size, height: size,
        background: '#fff', borderRadius: '50%', filter: 'blur(1px)',
      }}
    />
  );
}

export function JoinQuizPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [gamePin, setGamePin] = useState('')
  const [nickname, setNickname] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('🦊')
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('idle')
  const [showToast, setShowToast] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const isPinValid = gamePin.length === 6;
  const avatarColor = AVATAR_COLORS[selectedAvatar] || '#ec4899';

  const handleJoin = async () => {
    if (!gamePin || !nickname) { setJoinStatus('error'); return; }
    setJoinStatus('joining');
    
    try {
      const res = await roomApi.join(gamePin, nickname);
      if (res.message === 'Joined successfully') {
        dispatch(setAuth({ hostSecret: '', role: 'player' }));
        setJoinStatus('success');
        setShowToast(true);
        setTimeout(() => setIsCountingDown(true), 1500);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      setJoinStatus('error');
      setTimeout(() => setJoinStatus('idle'), 2000);
    }
  }

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isCountingDown && countdown === 0) {
      navigate('/live')
    }
  }, [isCountingDown, countdown, navigate])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      color: '#f8fafc', position: 'relative', overflowX: 'hidden', background: '#0a0a1a'
    }}>
      
      <motion.div
        animate={{
          background: isCountingDown 
            ? `radial-gradient(circle at 50% 50%, ${avatarColor}44 0%, #0a0a1a 100%)`
            : [
              `radial-gradient(circle at 20% 20%, ${isPinValid ? '#10b981' : avatarColor}33 0%, #0a0a1a 50%, #0a0a1a 100%)`,
              `radial-gradient(circle at 80% 80%, ${isPinValid ? '#10b981' : '#06b6d4'}33 0%, #0a0a1a 50%, #0a0a1a 100%)`,
              `radial-gradient(circle at 20% 80%, ${isPinValid ? '#10b981' : avatarColor}33 0%, #0a0a1a 50%, #0a0a1a 100%)`,
              `radial-gradient(circle at 20% 20%, ${isPinValid ? '#10b981' : avatarColor}33 0%, #0a0a1a 50%, #0a0a1a 100%)`,
            ],
          filter: isCountingDown ? 'blur(40px)' : 'blur(0px)'
        }}
        transition={{ 
          background: { duration: isCountingDown ? 0.5 : 20, repeat: isCountingDown ? 0 : Infinity, ease: 'linear' },
          filter: { duration: 1 }
        }}
        style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: isCountingDown ? 0.8 : 0.4 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>

      <AnimatePresence>
        {isCountingDown && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'radial-gradient(circle, transparent 20%, #0a0a1a 100%)', pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{showToast && <SuccessToast message={`Welcome, ${nickname || 'Player'}!`} onClose={() => setShowToast(false)} />}</AnimatePresence>

      <AnimatePresence>
        {isCountingDown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(8,12,24,0.4)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <motion.span key={countdown} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ fontSize: '14rem', fontWeight: 900, color: '#fff', textShadow: `0 0 40px ${avatarColor}` }}>
                {countdown === 0 ? 'GO!' : countdown}
              </motion.span>
              <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 1 }} style={{ height: 4, background: avatarColor, borderRadius: 2, width: '200px' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} brandHref="/" onLaunch={() => {}} />

      <motion.main
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem', gap: '3rem', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <JoinHero />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ width: '100%', maxWidth: '500px' }}>
          <GamePinCard 
            gamePin={gamePin} 
            nickname={nickname} 
            onPinChange={setGamePin} 
            onNicknameChange={(v) => setNickname(v)} 
            onJoin={handleJoin} 
            status={joinStatus === 'success' ? 'idle' : joinStatus} 
            onAvatarChange={setSelectedAvatar}
          />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ width: '100%', maxWidth: '500px' }}>
          <RoomPreviewCard />
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  )
}
