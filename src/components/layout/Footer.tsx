import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/surve-vansh',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/surve-vansh-1a5a43323/',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/survevansh',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative border-t border-border bg-surface/30" role="contentinfo">
      {/* Top glow line */}
      <div className="absolute top-0 w-64 h-px -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" aria-hidden="true" />

      <div className="py-12 section-container md:py-16">
        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple font-display shadow-glow-sm">
                SV
              </div>
              <span className="font-bold font-display text-text-primary">
                Surve<span className="text-accent-blue">.</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              Frontend Developer crafting beautiful, performant web experiences with React, TypeScript, and modern tooling.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200 border rounded-lg w-9 h-9 bg-surface-2 text-text-secondary border-border hover:text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/10"
                  aria-label={`Visit ${link.label} profile`}
                  role="listitem"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 font-mono text-xs font-medium tracking-widest uppercase text-text-muted">
              Navigation
            </h3>
            <ul className="space-y-2" role="list">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition-colors duration-200 text-text-secondary hover:text-accent-blue group"
                  >
                    <span className="w-1 h-1 transition-colors duration-200 rounded-full bg-accent-blue/40 group-hover:bg-accent-blue" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium tracking-widest uppercase text-text-muted">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:vansh@survevansh.dev"
                className="flex items-center gap-2 text-sm transition-colors duration-200 text-text-secondary hover:text-accent-blue group"
                aria-label="Send email to vansh@survevansh.dev"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                vansh@survevansh.dev
              </a>
              <p className="flex items-center gap-2 text-sm text-text-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                India
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                <span className="font-medium text-green-400">Available for opportunities</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-border sm:flex-row">
          <p className="text-xs text-center text-text-muted sm:text-left">
            © {new Date().getFullYear()} Surve Vansh. Crafted with{' '}
            <span className="text-accent-blue" aria-label="love">♥</span>{' '}
            using React, TypeScript & Three.js
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center transition-all duration-200 border rounded-lg w-9 h-9 bg-surface-2 text-text-muted border-border hover:text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/10"
            aria-label="Scroll to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
