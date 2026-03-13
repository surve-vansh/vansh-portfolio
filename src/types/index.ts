// Project types
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  videoUrl?: string
  imageUrl: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
}

// Skill types
export interface Skill {
  name: string
  level: number // 0-100
  category: SkillCategory
  icon?: string
  color?: string
}

export type SkillCategory = 'frontend' | 'programming' | 'tools' | 'concepts'

export interface SkillGroup {
  category: SkillCategory
  label: string
  skills: Skill[]
}

// Experience / Journey types
export interface JourneyItem {
  id: string
  title: string
  organization: string
  period: string
  description: string
  type: 'education' | 'project' | 'learning' | 'achievement'
  highlights?: string[]
}

// Navigation types
export interface NavLink {
  label: string
  href: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  message?: string
}

// Animation variants
export interface AnimationVariant {
  hidden: Record<string, unknown>
  visible: Record<string, unknown>
}

// Social link types
export interface SocialLink {
  label: string
  href: string
  icon: string
}
