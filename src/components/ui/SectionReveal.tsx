import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { fadeUpVariants } from '@/utils/animations'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

/**
 * Wrapper component that reveals its children with a scroll-triggered animation.
 * Automatically disabled for users who prefer reduced motion.
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const directionVariants = {
    up: { hidden: { opacity: 0, y: 40, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  }

  const variants = directionVariants[direction]

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
        ...variants,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
