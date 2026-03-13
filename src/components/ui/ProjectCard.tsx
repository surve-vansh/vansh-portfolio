import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ProjectCardProps {
  project: Project
  index: number
}

const STATUS_CONFIG = {
  completed: { label: 'Completed', color: 'bg-green-500' },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-500' },
  planned: { label: 'Planned', color: 'bg-text-muted' },
}

const GRADIENT_VARIANTS = [
  'linear-gradient(135deg, rgba(79,142,247,0.2) 0%, rgba(99,102,241,0.1) 50%, rgba(167,139,250,0.2) 100%)',
  'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(79,142,247,0.1) 50%, rgba(99,102,241,0.2) 100%)',
  'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(244,114,182,0.1) 50%, rgba(99,102,241,0.15) 100%)',
]

/**
 * Project card component with animated image placeholder, tech stack badges,
 * hover overlay with links, and status indicator.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const status = STATUS_CONFIG[project.status]

  return (
    <motion.article
      className="relative flex flex-col overflow-hidden transition-colors duration-300 border group rounded-2xl bg-surface/60 backdrop-blur-sm border-border hover:border-accent-blue/30"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)' }}
      initial={!prefersReducedMotion ? { opacity: 0, y: 40 } : {}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      whileHover={!prefersReducedMotion ? { y: -6 } : {}}
    >
      {/* Preview image area */}
      <div className="relative overflow-hidden aspect-video bg-surface-2">
        <div className="absolute inset-0" style={{ background: GRADIENT_VARIANTS[index % 3] }} />
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Fake browser dots */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 border rounded-2xl bg-surface/80 border-border backdrop-blur-sm">
            <ProjectIcon index={index} />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-0 bg-background/80 backdrop-blur-sm group-hover:opacity-100">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-xl bg-accent-blue hover:bg-accent-blue/90"
            aria-label={`View live demo of ${project.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-xl bg-surface border-border text-text-primary hover:border-accent-blue/40"
            aria-label={`Source code for ${project.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon />
            GitHub
          </a>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/90 border border-border backdrop-blur-sm">
          <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
          <span className="font-mono text-[10px] text-text-secondary">{status.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="mb-2 text-lg font-semibold transition-colors duration-200 font-display text-text-primary group-hover:text-accent-blue">
          {project.title}
        </h3>

        <p className="flex-1 mb-4 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="inline-flex items-center px-3 py-1 font-mono text-xs font-medium transition-colors duration-200 border rounded-full bg-surface-2 border-border text-text-secondary hover:border-accent-blue/40 hover:text-accent-blue"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
            aria-label={`Source code for ${project.title}`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Source
          </a>
          <span className="text-border" aria-hidden="true">·</span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-blue transition-colors"
            aria-label={`Live demo of ${project.title}`}
          >
            <ExternalLinkIcon className="w-3.5 h-3.5" />
            Live Demo
          </a>
          {project.videoUrl && (
            <>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-purple transition-colors"
                aria-label={`Video demo of ${project.title}`}
              >
                <PlayIcon className="w-3.5 h-3.5" />
                Video
              </a>
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── Icon components ────────────────────────────────────────────────────────────

function ProjectIcon({ index }: { index: number }) {
  if (index === 0) return (
    <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
  if (index === 1) return (
    <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
  return (
    <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ExternalLinkIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function PlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
