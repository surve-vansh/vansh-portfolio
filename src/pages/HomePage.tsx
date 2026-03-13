import { lazy, Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'

// Lazy load sections below the fold for better initial load performance
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'))
const JourneySection = lazy(() => import('@/components/sections/JourneySection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))

// Minimal skeleton placeholder while sections load
function SectionSkeleton() {
  return (
    <div className="section-padding" aria-hidden="true">
      <div className="section-container space-y-8">
        <div className="h-4 w-24 bg-surface-2 rounded-full animate-pulse" />
        <div className="h-10 w-64 bg-surface-2 rounded-xl animate-pulse" />
        <div className="h-4 w-96 max-w-full bg-surface-2 rounded-full animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-2 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Hero is loaded eagerly (above the fold) */}
      <HeroSection />

      {/* All other sections are lazy loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <JourneySection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
