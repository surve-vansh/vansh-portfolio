import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }, [prefersReducedMotion])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-card'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="section-container flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }) }}
          className="flex items-center gap-2 group"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Surve Vansh - Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-sm shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
            SV
          </div>
          <span className="font-display font-bold text-text-primary hidden sm:block">
            Surve<span className="text-accent-blue">.</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <motion.ul
          className="hidden md:flex items-center gap-1"
          role="list"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <motion.button
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  activeSection === link.href
                    ? 'text-accent-blue'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                aria-current={activeSection === link.href ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-accent-blue/10 border border-accent-blue/20"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </motion.ul>

        {/* Desktop CTA */}
        <motion.a
          href="#contact"
          onClick={e => { e.preventDefault(); handleNavClick('#contact') }}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Contact me"
        >
          <span>Let's Talk</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <div className="w-5 flex flex-col gap-1.5" aria-hidden="true">
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="section-container py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeSection === link.href
                        ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-2"
              >
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full px-4 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-center"
                >
                  Let's Talk
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
