import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerChildVariants } from '@/utils/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden section-padding" aria-label="Projects">
      {/* Background */}
      <div className="absolute right-0 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none top-1/2 w-96 h-96 bg-accent-blue/5 blur-3xl" aria-hidden="true" />

      <div className="section-container">
        <div className="flex flex-col gap-6 mb-12 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            label="// projects.featured"
            title="Selected Work"
            subtitle="A curated selection of projects that showcase my skills in building modern, performant web applications."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Button
              as="a"
              href="https://github.com/surve-vansh?tab=repositories"
              variant="secondary"
              size="sm"
              rightIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              }
              aria-label="View all projects on GitHub"
            >
              View All
            </Button>
          </motion.div>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          role="list"
          aria-label="Featured projects"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={staggerChildVariants} role="listitem">
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 font-mono text-sm text-text-muted">
            More projects available on GitHub →
          </p>
          <Button
            as="a"
            href="https://github.com/surve-vansh?tab=repositories"
            variant="outline"
            leftIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            }
            aria-label="Browse all repositories on GitHub"
          >
            Browse All Repositories
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
