import { motion } from 'framer-motion'

interface QuestionCardProps {
  question: string
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <motion.div 
      layoutId="qcard"
      style={{ 
        width: '100%', 
        padding: '1.6rem 1.75rem', 
        borderRadius: '1.5rem',
        background: 'rgba(13,18,38,0.8)', 
        backdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.1)', 
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        textAlign: 'center' 
      }}>
      <p style={{ fontSize: 'clamp(1.15rem,3vw,1.65rem)', fontWeight: 700, lineHeight: 1.45, color: '#f1f5f9', margin: 0 }}>
        {question}
      </p>
    </motion.div>
  )
}
