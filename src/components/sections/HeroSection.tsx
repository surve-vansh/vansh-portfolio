import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { staggerContainerVariants, staggerChildVariants } from '@/utils/animations'
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

  // Typewriter effect — unchanged from original
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
      className="relative flex items-center min-h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Three.js Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />
        <div className="absolute inset-0 translate-x-1/2 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40" aria-hidden="true" />

      {/* Gradient fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full pb-16 section-container pt-28 md:pt-36 md:pb-24">
        {/*
          Two-column layout on md+:
            left  → all existing text + CTAs  (flex-1)
            right → profile photo             (shrink-0)
          Single column on mobile: photo stacks below text
        */}
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between lg:gap-16">

          {/* ── LEFT: Text content (unchanged) ──────────────────────────────── */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div variants={staggerChildVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-medium border rounded-full bg-surface/80 border-border backdrop-blur-sm text-text-secondary">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                Available for freelance &amp; full-time opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={staggerChildVariants}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-2">
                <span className="block text-text-primary">Hey, I'm</span>
                <span className="block gradient-text">Surve Vansh</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div variants={staggerChildVariants} className="mt-4 mb-6">
              <p
                className="font-mono text-lg md:text-xl text-text-secondary"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-accent-blue">{'>'}</span>{' '}
                <span>{displayed}</span>
                <span className="cursor-blink text-accent-blue ml-0.5" aria-hidden="true">|</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={staggerChildVariants}
              className="max-w-xl mb-8 text-base leading-relaxed md:text-lg text-text-secondary"
            >
              Passionate about building{' '}
              <span className="font-medium text-text-primary">responsive, high-performance</span>{' '}
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
                    <path d="M5 12h14M12 5l7 7-7 7" />
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
                  <span className="text-2xl font-bold font-display md:text-3xl text-text-primary">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-text-muted">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Profile photo ─────────────────────────────────────────── */}
          <motion.div
            className="flex justify-center flex-shrink-0 md:justify-end"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 40, filter: 'blur(8px)' }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <div className="relative">

              {/*
                Layered glow rings behind the photo.
                Three concentric rings, each slightly larger and more transparent.
              */}
              {/* Outermost ring — accent-purple */}
              <div
                className="absolute inset-0 rounded-full scale-[1.18] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 180deg, #4f8ef7, #a78bfa, #22d3ee, #4f8ef7)',
                  opacity: 0.15,
                  filter: 'blur(16px)',
                }}
                aria-hidden="true"
              />

              {/* Middle ring — slow spin */}
              <motion.div
                className="absolute inset-0 rounded-full scale-[1.08] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, #4f8ef7 0%, transparent 40%, #a78bfa 70%, transparent 100%)',
                  opacity: 0.25,
                }}
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />

              {/*
                Gradient border ring — visible 2px ring using padding trick.
                The p-[2px] creates the border; inside is the dark bg that makes
                the gradient border look crisp against the photo.
              */}
              <div
                className="relative rounded-full p-[2.5px]"
                style={{
                  background: 'linear-gradient(135deg, #4f8ef7 0%, #a78bfa 50%, #22d3ee 100%)',
                }}
              >
                {/* Dark inner ring to separate border from photo */}
                <div className="rounded-full p-[3px] bg-background">

                  
                  <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden">
                    <img
                      src="/vansh-profile.png"
                      alt="Surve Vansh — Frontend Developer"
                      className="object-cover object-top w-full h-full"
                      loading="eager"
                      decoding="async"
                      width={340}
                      height={340}
                    />

                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 40px rgba(10,10,15,0.45)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/*
                Floating "status" badge — bottom-left of the photo.
                Mirrors the "Available" badge style from the existing design.
              */}
              <motion.div
                className="absolute -bottom-3 -left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/90 border border-border backdrop-blur-sm text-text-secondary shadow-card"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden="true" />
                Open to work
              </motion.div>

              {/*
                Tech stack badge — top-right of the photo.
                A small tasteful label showing primary tech.
              */}
              <motion.div
                className="absolute -top-3 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/90 border border-accent-blue/30 backdrop-blur-sm text-accent-blue shadow-card"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47m-6.28-.64c.3-.09.63-.17.98-.24-.3-.62-.56-1.27-.78-1.91-.6.31-1.06.67-1.34 1.06.29.38.7.75 1.14 1.09m.29.51c.27.06.57.11.88.16l-.3-.51-.29-.51c-.11.29-.22.58-.29.86m4.66-6.31c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 00-2.4-.36C6.39 6.41 6.58 7.88 7.09 10c.78-.18 1.6-.3 2.46-.36.39-.56.8-1.09 1.24-1.58M12 6.3c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 9.3l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 6.3 12.6 6.3 12 6.3m4.92 3.46c-.3-.09-.63-.17-.98-.24.3-.62.56-1.27.78-1.91.6.31 1.06.67 1.34 1.06-.29.38-.7.75-1.14 1.09m-1.17 1.79l.3-.51.29-.51c.11.29.22.58.29.86-.27.06-.57.11-.88.16l.3-.51-.3.51zm1.75 2.13c-.27-.06-.57-.11-.88-.16l.3.51.29.51c.11-.29.22-.58.29-.86m-1.28.24c-.3.09-.63.17-.98.24l.3-.51c.27-.09.54-.19.81-.3l-.13.57zm1.04 1.09c-.29.38-.7.75-1.14 1.09l.29.51c.63-.38 1.06-.84 1.14-1.06l-.29-.54zm-7.05 2.95c.6-.38 1.01-.84 1.09-1.06l-.29-.54c-.27.16-.56.31-.86.44l.06.16-.29.54.29-.54zm2.98.53c.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47-.54-.03-1.11-.03-1.71-.03-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47l-.81 1.5.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03z"/>
                </svg>
                React Dev
              </motion.div>

              {/* Ambient glow below the photo */}
              <div
                className="absolute w-3/4 h-16 -translate-x-1/2 rounded-full pointer-events-none -bottom-8 left-1/2"
                style={{
                  background: 'radial-gradient(ellipse, rgba(79,142,247,0.18) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
          {/* ── END: Profile photo ───────────────────────────────────────────── */}

        </div>
      </div>

      {/* ── Scroll indicator (unchanged) ────────────────────────────────────── */}
      <motion.div
        className="absolute z-10 flex flex-col items-center gap-2 -translate-x-1/2 bottom-8 left-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Scroll</span>
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
