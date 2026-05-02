import { motion } from 'framer-motion';

export function BuilderHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1.5rem',
        padding: '2rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.06), transparent)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '1.5rem',
        background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.12), transparent 60%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Left: mascot + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Animated architect mascot */}
          <motion.div
            animate={{ rotate: [-3, 3, -3], y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '2.8rem', lineHeight: 1, filter: 'drop-shadow(0 0 16px rgba(236,72,153,0.4))' }}
          >
            ✏️
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '-0.03em',
                maxWidth: 'none',
                lineHeight: 1.15,
              }}>
                Build Your Quiz From Scratch
              </h1>
              <span style={{
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                background: 'rgba(236,72,153,0.15)',
                border: '1px solid rgba(236,72,153,0.3)',
                color: '#f9a8d4',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Draft Mode
              </span>
            </div>
            <p style={{
              margin: 0,
              color: 'rgba(148,163,184,0.75)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}>
              Design questions, define correct answers, and set the perfect pacing for your audience.
            </p>
          </div>
        </div>

        {/* Right: progress ring */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          padding: '0.85rem 1.25rem',
          borderRadius: '1rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.55)' }}>
              Setup Progress
            </span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>1 / 4 Complete</span>
          </div>

          {/* SVG progress ring */}
          <motion.svg
            width={52} height={52} viewBox="0 0 52 52"
            animate={{ filter: ['drop-shadow(0 0 4px rgba(236,72,153,0.3))', 'drop-shadow(0 0 10px rgba(236,72,153,0.7))', 'drop-shadow(0 0 4px rgba(236,72,153,0.3))'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            <circle
              cx="26" cy="26" r="22" fill="none"
              stroke="#ec4899" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22 * 0.25} ${2 * Math.PI * 22}`}
              transform="rotate(-90 26 26)"
            />
            <text x="26" y="31" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="800">25%</text>
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}
