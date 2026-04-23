import { motion, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { animationVariants } from '../../lib/animation-variants'

type ScrollRevealProps = {
  children: ReactNode
  variant?: 'title' | 'body' | 'card'
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  variant = 'body',
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null)

  const selectedVariant: Variants = {
    ...animationVariants[variant],
    visible: {
      ...animationVariants[variant].visible,
      transition: {
        ...animationVariants[variant].visible,
        delay: delay,
      } as Record<string, unknown>,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={selectedVariant}
      className={className}
    >
      {children}
    </motion.div>
  )
}