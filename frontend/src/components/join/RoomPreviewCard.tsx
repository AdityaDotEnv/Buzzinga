import { motion } from 'framer-motion'
import { Users, Clock, Trophy } from 'lucide-react'

interface RoomPreviewCardProps {
  title?: string;
  host?: string;
  players?: number;
  maxPlayers?: number;
  questions?: number;
  status?: string;
}

export function RoomPreviewCard({ 
  title = "Science Trivia Night", 
  host = "Dr. Quizzo", 
  players = 12, 
  maxPlayers = 50, 
  questions = 20, 
  status = "Waiting…" 
}: RoomPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      whileHover={{
        rotate: 1,
        boxShadow: '0 0 40px rgba(103,232,249,0.2)',
        transition: { duration: 0.2 },
      }}
      style={{
        display: 'flex',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(15,23,42,0.85))',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 16px 48px rgba(2,6,23,0.4)',
        cursor: 'default',
        width: '100%'
      }}
    >
      {/* Tear-off stub — left dashed border */}
      <div style={{
        width: '0.75rem',
        flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(103,232,249,0.15), rgba(167,139,250,0.15))',
        borderRight: '2px dashed rgba(255,255,255,0.12)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: '1rem',
      }}>
        {/* Stub notches */}
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(8,12,24,0.9)', marginLeft: -1 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(8,12,24,0.9)', marginLeft: -1 }} />
      </div>

      {/* Main ticket body */}
      <div style={{ flex: 1, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(148,163,184,0.5)',
          }}>
            Room Preview
          </span>

          {/* Live pulse badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.2rem 0.65rem',
            borderRadius: '999px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px rgba(16,185,129,0.7)',
              }}
            />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {status === 'Active' ? 'Active' : 'Waiting'}
            </span>
          </div>
        </div>

        {/* Quiz info */}
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
            {title}
          </h3>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'rgba(148,163,184,0.6)' }}>
            Host: {host}
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)' }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={13} style={{ color: '#67e8f9' }} />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Players</div>
              <div style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 600 }}>{players} / {maxPlayers}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={13} style={{ color: '#a78bfa' }} />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Status</div>
              <div style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 600 }}>{status}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Trophy size={13} style={{ color: '#fbbf24' }} />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Questions</div>
              <div style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 600 }}>{questions}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
