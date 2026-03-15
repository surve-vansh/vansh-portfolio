import { motion } from 'framer-motion'
import { staggerContainerVariants, staggerChildVariants } from '@/utils/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import { journeyItems } from '@/data/journey'
import type { JourneyItem } from '@/types'

const typeConfig = {
  education: { label: 'Education', color: 'accent-blue', icon: '🎓' },
  project: { label: 'Project', color: 'accent-purple', icon: '🚀' },
  learning: { label: 'Learning', color: 'accent-cyan', icon: '📚' },
  achievement: { label: 'Achievement', color: 'green-400', icon: '🏆' },
}

const colorMap: Record<string, string> = {
  'accent-blue': '#4f8ef7',
  'accent-purple': '#a78bfa',
  'accent-cyan': '#22d3ee',
  'green-400': '#4ade80',
}

interface TimelineItemProps {
  item: JourneyItem
  index: number
  isLast: boolean
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const config = typeConfig[item.type]
  const accentColor = colorMap[config.color]
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={staggerChildVariants}
      className={`relative flex gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      aria-label={`${item.title} at ${item.organization}, ${item.period}`}
    >
      {/* Desktop: Left/Right content */}
      <div className={`hidden md:block md:w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <motion.div
          className="inline-block w-full p-5 text-left glass-card"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {config.icon} {config.label}
            </span>
            <span className="font-mono text-xs text-text-muted">{item.period}</span>
          </div>

          <h3 className="font-display font-bold text-base text-text-primary mb-0.5">
            {item.title}
          </h3>
          <p className="mb-2 text-xs font-medium" style={{ color: accentColor }}>
            {item.organization}
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>

          {item.highlights && (
            <ul className="mt-3 space-y-1" role="list" aria-label="Key highlights">
              {item.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-xs text-text-muted" role="listitem">
                  <span style={{ color: accentColor }} aria-hidden="true">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center flex-shrink-0 md:w-16">
        <motion.div
          className="z-10 flex items-center justify-center w-10 h-10 text-base border-2 rounded-full bg-background"
          style={{ borderColor: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          aria-hidden="true"
        >
          {config.icon}
        </motion.div>
        {!isLast && (
          <div
            className="absolute flex-1 w-px h-full top-10"
            style={{
              background: `linear-gradient(to bottom, ${accentColor}40, transparent)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Desktop: placeholder right side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" aria-hidden="true" />

      {/* Mobile card */}
      <div className="flex-1 pb-8 md:hidden">
        <div className="p-5 glass-card">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {config.icon} {config.label}
            </span>
            <span className="font-mono text-xs text-text-muted">{item.period}</span>
          </div>
          <h3 className="font-display font-bold text-base text-text-primary mb-0.5">
            {item.title}
          </h3>
          <p className="mb-2 text-xs font-medium" style={{ color: accentColor }}>
            {item.organization}
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
          {item.highlights && (
            <ul className="mt-3 space-y-1">
              {item.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-xs text-text-muted">
                  <span style={{ color: accentColor }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function JourneySection() {
  return (
    <section id="journey" className="relative overflow-hidden section-padding" aria-label="Learning journey and experience">
      <div className="section-container">
        <SectionHeader
          label="// journey.log"
          title="Learning Journey"
          subtitle="My path through education, projects, and continuous learning — each milestone shaping who I am as a developer."
          align="center"
          className="mb-16"
        />

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div
            className="absolute hidden w-px -translate-x-1/2 md:block left-1/2 top-5 bottom-5"
            style={{
              background: 'linear-gradient(to bottom, transparent, #1e1e2e 10%, #1e1e2e 90%, transparent)',
            }}
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-12">
            {journeyItems.map((item, i) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={i}
                isLast={i === journeyItems.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
