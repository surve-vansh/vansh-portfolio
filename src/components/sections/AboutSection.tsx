import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerChildVariants, slideLeftVariants, slideRightVariants } from '@/utils/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

const highlights = [
  { icon: '⚡', label: 'Fast', desc: 'Performance-first approach' },
  { icon: '♿', label: 'Accessible', desc: 'WCAG compliant' },
  { icon: '📱', label: 'Responsive', desc: 'Mobile-first design' },
  { icon: '🎨', label: 'Aesthetic', desc: 'Pixel-perfect UIs' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden section-padding" aria-label="About me">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-96 h-96 bg-accent-purple/5 blur-3xl" aria-hidden="true" />

      <div className="section-container">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text content */}
          <motion.div
            className="space-y-6"
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              label="// about.me"
              title="Crafting the Web's Future"
              subtitle="I'm a Frontend Developer and BCA student passionate about building exceptional digital experiences that are fast, accessible, and beautiful."
            />

            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Currently pursuing a{' '}
                <span className="font-medium text-text-primary">Bachelor of Computer Applications</span>,
                I dedicate my time to mastering the craft of frontend development — from pixel-perfect
                layouts to smooth, performant animations.
              </p>
              <p>
                My focus is on the React ecosystem: building scalable component architectures,
                implementing modern state management patterns, and crafting delightful user
                experiences with{' '}
                <span className="font-medium text-accent-blue">Framer Motion</span>,{' '}
                <span className="font-medium text-accent-purple">Three.js</span>, and{' '}
                <span className="font-medium text-accent-cyan">Tailwind CSS</span>.
              </p>
              <p>
                When I'm not coding, I'm exploring new design trends, contributing to open-source
                projects, or diving into DSA to sharpen my problem-solving skills.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                as="a"
                href="/vansh-portfolio.pdf"
                download="portfolio.pdf"
                variant="primary"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                }
                aria-label="Download resume PDF"
              >
                Download Resume
              </Button>
              <Button
                as="a"
                href="https://github.com/survevansh"
                variant="secondary"
                leftIcon={
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
                aria-label="View GitHub profile"
              >
                GitHub
              </Button>
            </div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Profile card */}
            <div className="relative p-6 glass-card md:p-8">
              {/* Glow accent */}
              <div className="absolute w-32 h-32 rounded-full pointer-events-none -top-4 -right-4 bg-accent-blue/10 blur-2xl" aria-hidden="true" />

              {/* Avatar placeholder */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-border">
                <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-2xl font-bold text-white rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple font-display shadow-glow-md" aria-label="Surve Vansh avatar">
                  SV
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-text-primary">Surve Vansh</h3>
                  <p className="text-sm text-text-secondary">Frontend Developer</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
                    <span className="font-mono text-xs text-green-400">Open to work</span>
                  </div>
                </div>
              </div>

              {/* Highlight badges */}
              <div className="grid grid-cols-2 gap-3 mb-6" role="list" aria-label="Key qualities">
                {highlights.map(h => (
                  <div
                    key={h.label}
                    className="flex items-start gap-3 p-3 border rounded-xl bg-surface-2 border-border"
                    role="listitem"
                  >
                    <span className="text-xl" aria-hidden="true">{h.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-text-primary">{h.label}</p>
                      <p className="text-xs text-text-muted">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack snippet */}
              <div className="p-4 font-mono text-xs border text-text-muted bg-surface rounded-xl border-border" aria-label="Current tech stack code snippet">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-text-muted">stack.ts</span>
                </div>
                <pre className="overflow-x-auto text-xs leading-relaxed">
                  <code>
                    <span className="text-accent-purple">const</span>
                    <span className="text-text-secondary"> stack </span>
                    <span className="text-accent-blue">= </span>
                    {'{\n'}
                    {'  '}
                    <span className="text-accent-cyan">frontend</span>
                    {': ['}
                    <span className="text-green-400">"React"</span>
                    {', '}
                    <span className="text-green-400">"TypeScript"</span>
                    {'],\n'}
                    {'  '}
                    <span className="text-accent-cyan">styling</span>
                    {': '}
                    <span className="text-green-400">"Tailwind"</span>
                    {',\n'}
                    {'  '}
                    <span className="text-accent-cyan">animation</span>
                    {': '}
                    <span className="text-green-400">"Framer"</span>
                    {',\n'}
                    {'  '}
                    <span className="text-accent-cyan">3d</span>
                    {': '}
                    <span className="text-green-400">"Three.js"</span>
                    {',\n}'}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
