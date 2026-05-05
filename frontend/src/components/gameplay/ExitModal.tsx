import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, LogOut, X } from 'lucide-react'

interface ExitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ExitModal({ isOpen, onClose, onConfirm }: ExitModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 300, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1.5rem',
            background: 'rgba(5,7,18,0.85)',
            backdropFilter: 'blur(12px)'
          }}
        >
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0 }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{
              width: '100%',
              maxWidth: 400,
              background: 'rgba(13,18,38,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1.75rem',
              padding: '2rem',
              position: 'relative',
              zIndex: 310,
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              textAlign: 'center'
            }}
          >
            <div 
              style={{ 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                background: 'rgba(239,68,68,0.1)', 
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <AlertCircle size={32} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
              Exit Quiz?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem' }}>
              Are you sure you want to leave? Your current progress and streak will be lost.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1.1rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444, #991b1b)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 24px rgba(239,68,68,0.25)'
                }}
              >
                <LogOut size={18} />
                Yes, Exit Quiz
              </motion.button>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1.1rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#f8fafc',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>

            {/* Close button top right */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.25)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
