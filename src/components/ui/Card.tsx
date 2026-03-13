import { motion } from 'framer-motion'
import { cardHoverVariants } from '@/utils/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  glow?: boolean
  onClick?: () => void
  as?: 'div' | 'article' | 'section' | 'li'
}

/**
 * Reusable glassmorphism Card component.
 * Supports hover lift animation and optional glow effect.
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
  glow = false,
  onClick,
  as: Tag = 'div',
}: CardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const baseClasses = [
    'relative overflow-hidden rounded-2xl',
    'bg-surface/60 backdrop-blur-md',
    'border border-border',
    'transition-colors duration-300',
    glow ? 'hover:border-accent-blue/30' : 'hover:border-border-light',
    onClick ? 'cursor-pointer' : '',
    className,
  ].join(' ')

  if (hoverable && !prefersReducedMotion) {
    return (
      <motion.div
        className={baseClasses}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        style={{
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Inner glow on hover */}
        {glow && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(79,142,247,0.08) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
        )}
        {children}
      </motion.div>
    )
  }

  return (
    <Tag
      className={baseClasses}
      onClick={onClick}
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {children}
    </Tag>
  )
}
