interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

/**
 * Tech stack badge/tag component used in project cards and skill displays.
 */
export default function Badge({ children, color, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1',
        'text-xs font-mono font-medium',
        'rounded-full border transition-colors duration-200',
        'bg-surface-2 border-border text-text-secondary',
        'hover:border-accent-blue/40 hover:text-accent-blue',
        className,
      ].join(' ')}
      style={color ? { color, borderColor: `${color}30` } : undefined}
    >
      {children}
    </span>
  )
}
