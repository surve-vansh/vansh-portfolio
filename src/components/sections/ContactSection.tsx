import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainerVariants, staggerChildVariants } from '@/utils/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { useContactForm } from '@/hooks/useContactForm'

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'vansh@survevansh.dev',
    href: 'mailto:vansh@survevansh.dev',
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/survevansh',
    href: 'https://github.com/survevansh',
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/survevansh',
    href: 'https://linkedin.com/in/survevansh',
  },
]

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        {props.required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-text-primary placeholder-text-muted text-sm
          transition-all duration-200 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30
          ${error ? 'border-red-500/60 bg-red-500/5' : 'border-border hover:border-border-light'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

function Textarea({ label, error, id, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        {props.required && <span className="sr-only"> (required)</span>}
      </label>
      <textarea
        id={id}
        className={`w-full px-4 py-3 rounded-xl bg-surface-2 border text-text-primary placeholder-text-muted text-sm
          transition-all duration-200 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30
          resize-none min-h-[140px]
          ${error ? 'border-red-500/60 bg-red-500/5' : 'border-border hover:border-border-light'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactSection() {
  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, resetForm } =
    useContactForm()

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-label="Contact me">
      {/* Background */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <div className="section-container">
        <SectionHeader
          label="// contact.send()"
          title="Let's Work Together"
          subtitle="Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact info sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerChildVariants} className="glass-card p-6 space-y-5">
              <h3 className="font-display font-bold text-base text-text-primary">
                Contact Info
              </h3>

              <div className="space-y-4" role="list" aria-label="Contact information">
                {contactInfo.map(info => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 group"
                    aria-label={`${info.label}: ${info.value}`}
                    role="listitem"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-muted group-hover:text-accent-blue group-hover:border-accent-blue/40 group-hover:bg-accent-blue/10 transition-all duration-200 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono">{info.label}</p>
                      <p className="text-sm font-medium text-text-secondary group-hover:text-accent-blue transition-colors duration-200 truncate">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerChildVariants} className="glass-card p-6">
              <h3 className="font-display font-bold text-sm text-text-primary mb-3">
                Availability
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className="text-sm text-green-400 font-medium">Open to work</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Available for freelance projects, internships, and full-time frontend positions.
                Response time: within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <motion.div
                className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                role="status"
                aria-live="polite"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-green-400/15 border border-green-400/30 flex items-center justify-center text-2xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  ✓
                </motion.div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-text-secondary mb-6 max-w-xs">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <Button variant="secondary" size="sm" onClick={resetForm}>
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-6 md:p-8 space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <h3 className="font-display font-bold text-base text-text-primary sr-only">
                  Send a Message
                </h3>

                <Input
                  id="name"
                  name="name"
                  label="Your Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  autoComplete="name"
                />

                <Input
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  autoComplete="email"
                />

                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Tell me about your project, idea, or just say hello..."
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                />

                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-text-muted">
                    <span className="text-red-400">*</span> Required fields. I'll respond within 24h.
                  </p>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    size="md"
                    rightIcon={
                      !isSubmitting ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                        </svg>
                      ) : null
                    }
                    aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
