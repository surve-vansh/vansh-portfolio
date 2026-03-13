import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainerVariants, staggerChildVariants, fadeUpVariants } from '@/utils/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import { skillGroups } from '@/data/skills'
import type { SkillCategory } from '@/types'

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  programming: 'Programming',
  tools: 'Tools',
  concepts: 'Concepts',
}

interface SkillBarProps {
  name: string
  level: number
  color: string
}

function SkillBar({ name, level, color }: SkillBarProps) {
  return (
    <motion.div
      className="group"
      variants={staggerChildVariants}
      role="meter"
      aria-label={`${name}: ${level}% proficiency`}
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono text-text-muted">{level}%</span>
      </div>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden border border-border">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        />
      </div>
    </motion.div>
  )
}

interface SkillTagProps {
  name: string
  color: string
}

function SkillTag({ name, color }: SkillTagProps) {
  return (
    <motion.span
      variants={staggerChildVariants}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-2 border border-border text-sm font-medium text-text-secondary hover:text-text-primary hover:border-opacity-60 transition-all duration-200 cursor-default"
      style={{ '--tag-color': color } as React.CSSProperties}
      whileHover={{ scale: 1.05, borderColor: `${color}40` }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
        aria-hidden="true"
      />
      {name}
    </motion.span>
  )
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend')

  const activeGroup = skillGroups.find(g => g.category === activeCategory)!

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Skills">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <div className="section-container">
        <SectionHeader
          label="// skills.map()"
          title="My Tech Stack"
          subtitle="Technologies and tools I use to bring ideas to life — from component architecture to deployment."
          align="center"
          className="mb-12"
        />

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          role="tablist"
          aria-label="Skill categories"
        >
          {skillGroups.map(group => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={`px-5 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
                activeCategory === group.category
                  ? 'bg-accent-blue/15 border-accent-blue/40 text-accent-blue shadow-glow-sm'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:border-border-light'
              }`}
              role="tab"
              aria-selected={activeCategory === group.category}
              aria-controls={`panel-${group.category}`}
              id={`tab-${group.category}`}
            >
              {categoryLabels[group.category]}
            </button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id={`panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {activeCategory === 'frontend' || activeCategory === 'programming' ? (
              /* Bar view for measurable skills */
              <div className="max-w-2xl mx-auto glass-card p-6 md:p-8">
                <motion.div
                  className="space-y-5"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {activeGroup.skills.map(skill => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color || '#4f8ef7'}
                    />
                  ))}
                </motion.div>
              </div>
            ) : (
              /* Tag cloud view for tools & concepts */
              <motion.div
                className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                role="list"
                aria-label={`${categoryLabels[activeCategory]} skills`}
              >
                {activeGroup.skills.map(skill => (
                  <div key={skill.name} role="listitem">
                    <SkillTag name={skill.name} color={skill.color || '#4f8ef7'} />
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* All-skills marquee strip */}
        <div className="mt-16 overflow-hidden" aria-hidden="true">
          <p className="text-xs font-mono text-center text-text-muted mb-4 tracking-widest uppercase">
            Technologies I work with
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: [0, -800] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            >
              {[...skillGroups.flatMap(g => g.skills), ...skillGroups.flatMap(g => g.skills)].map(
                (skill, i) => (
                  <span
                    key={`${skill.name}-${i}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-muted whitespace-nowrap"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    {skill.name}
                  </span>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
