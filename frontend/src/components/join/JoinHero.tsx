import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export function JoinHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.25rem',
        position: 'relative',
      }}
    >
      {/* Ambient glow behind hero — relative, not absolute page overlay */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 520, height: 260,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.18), transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Floating mascot / character */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: '3.5rem',
          lineHeight: 1,
          filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.5))',
          position: 'relative', zIndex: 1,
        }}
      >
        🚀
      </motion.div>

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.3rem 1rem',
        borderRadius: '999px',
        background: 'rgba(139,92,246,0.12)',
        border: '1px solid rgba(139,92,246,0.3)',
        color: '#c4b5fd',
        fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        position: 'relative', zIndex: 1,
      }}>
        <Zap size={11} fill="currentColor" /> Live Multiplayer
      </div>

      {/* Heading */}
      <h1 style={{
        margin: 0,
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        color: '#f8fafc',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        maxWidth: 'none',
        position: 'relative', zIndex: 1,
      }}>
        Join a{' '}
        <span style={{
          background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Live Quiz
        </span>
      </h1>

      {/* Sub */}
      <p style={{
        margin: 0,
        color: 'rgba(148,163,184,0.85)',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        maxWidth: '36ch',
        position: 'relative', zIndex: 1,
      }}>
        Enter a game PIN and jump into the action in seconds.
      </p>
    </motion.section>
  )
}
