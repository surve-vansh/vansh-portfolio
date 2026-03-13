import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { fadeUpVariants, staggerContainerVariants, staggerChildVariants } from '@/utils/animations'
import Button from '@/components/ui/Button'

// Lazy load Three.js background to improve initial paint
const HeroBackground = lazy(() => import('@/components/three/HeroBackground'))

// Rotating title words
const roles = ['Frontend Developer', 'React Engineer', 'UI Craftsman', 'BCA Student']

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(roles[0])
      return
    }

    const currentRole = roles[roleIndex]

    if (isTyping) {
      if (displayed.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1))
        }, 60)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1800)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 30)
        return () => clearTimeout(timeout)
      } else {
        setRoleIndex(prev => (prev + 1) % roles.length)
        setIsTyping(true)
      }
    }
  }, [displayed, isTyping, roleIndex, prefersReducedMotion])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* CSS fallback gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent translate-x-1/2" />

        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-0 opacity-40" aria-hidden="true" />

      {/* Gradient fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 section-container w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <motion.div
          className="max-w-4xl"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Available badge */}
          <motion.div variants={staggerChildVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-surface/80 border border-border backdrop-blur-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              Available for freelance & full-time opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={staggerChildVariants}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-2">
              <span className="text-text-primary block">Hey, I'm</span>
              <span className="gradient-text block">Surve Vansh</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={staggerChildVariants} className="mt-4 mb-6">
            <p className="font-mono text-lg md:text-xl text-text-secondary" aria-live="polite" aria-atomic="true">
              <span className="text-accent-blue">{'>'}</span>{' '}
              <span>{displayed}</span>
              <span className="cursor-blink text-accent-blue ml-0.5" aria-hidden="true">|</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerChildVariants}
            className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mb-8"
          >
            Passionate about building{' '}
            <span className="text-text-primary font-medium">responsive, high-performance</span>{' '}
            web applications with modern technologies. Turning complex ideas into elegant,
            accessible digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerChildVariants} className="flex flex-wrap gap-4 mb-12">
            <Button
              as="a"
              href="#projects"
              size="lg"
              variant="primary"
              rightIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              }
              aria-label="View my projects"
            >
              View Projects
            </Button>
            <Button
              as="a"
              href="#contact"
              size="lg"
              variant="secondary"
              aria-label="Contact me"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerChildVariants}
            className="flex flex-wrap gap-8"
            role="list"
            aria-label="Quick statistics"
          >
            {[
              { value: '3+', label: 'Projects Built' },
              { value: '8+', label: 'Technologies' },
              { value: '1+', label: 'Year Experience' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-0.5" role="listitem">
                <span className="font-display font-bold text-2xl md:text-3xl text-text-primary">
                  {stat.value}
                </span>
                <span className="text-xs text-text-muted font-mono">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
          animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-2 rounded-full bg-accent-blue/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
