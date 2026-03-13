import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/utils/animations'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <span className="section-label" aria-label={`Section: ${label}`}>
        {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
