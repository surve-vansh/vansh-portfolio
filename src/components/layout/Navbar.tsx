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

  setTimeout(() => {
    const el = document.querySelector(href)

    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth"
      })
    }
  }, 350)

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
        className="flex items-center justify-between h-16 section-container md:h-20"
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
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white transition-shadow duration-300 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple font-display shadow-glow-sm group-hover:shadow-glow-md">
            SV
          </div>
          <span className="hidden font-bold font-display text-text-primary sm:block">
            Surve<span className="text-accent-blue">.</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <motion.ul
          className="items-center hidden gap-1 md:flex"
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
                    className="absolute inset-0 border rounded-lg bg-accent-blue/10 border-accent-blue/20"
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
          className="items-center hidden gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 md:flex rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple shadow-glow-sm hover:shadow-glow-md hover:scale-105 active:scale-95"
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
          className="relative flex items-center justify-center w-10 h-10 transition-colors duration-200 rounded-lg md:hidden text-text-secondary hover:text-text-primary hover:bg-surface"
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
            className="border-t md:hidden border-border bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1 py-4 section-container" role="list">
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
                  className="w-full px-4 py-3 text-sm font-medium text-center text-white rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple"
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
