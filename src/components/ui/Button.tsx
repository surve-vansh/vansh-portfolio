import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  as?: 'button' | 'a'
  href?: string
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-glow-sm hover:shadow-glow-md',
  secondary: 'bg-surface-2 text-text-primary border border-border hover:border-accent-blue/40 hover:text-accent-blue',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface',
  outline: 'border border-accent-blue/40 text-accent-blue hover:bg-accent-blue/10',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      as: Tag = 'button',
      href,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center font-medium rounded-xl
      transition-all duration-200 focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 focus-visible:outline-accent-blue
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      no-select
    `

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    if (Tag === 'a' && href) {
      return (
        <motion.a
          href={href}
          className={combinedClasses}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={combinedClasses}
        whileHover={!disabled ? { scale: 1.03 } : {}}
        whileTap={!disabled ? { scale: 0.97 } : {}}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
