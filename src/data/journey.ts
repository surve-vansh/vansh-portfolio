import type { JourneyItem } from '@/types'

export const journeyItems: JourneyItem[] = [
  {
    id: 'bca-start',
    title: 'Started BCA Program',
    organization: 'University',
    period: '2023 — Present',
    description:
      'Enrolled in Bachelor of Computer Applications, diving deep into computer science fundamentals, programming paradigms, and software engineering principles.',
    type: 'education',
    highlights: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Software Engineering',
    ],
  },
  {
    id: 'react-journey',
    title: 'Deep Dive into React Ecosystem',
    organization: 'Self-Learning',
    period: '2023 — Present',
    description:
      'Mastered React, TypeScript, and the modern frontend toolchain. Built multiple projects exploring advanced patterns like context, custom hooks, and performance optimization.',
    type: 'learning',
    highlights: [
      'React 18 with Concurrent Features',
      'TypeScript for type safety',
      'Vite for blazing-fast builds',
      'Framer Motion animations',
    ],
  },
  {
    id: 'first-portfolio',
    title: 'Built First 3D Portfolio',
    organization: 'Personal Project',
    period: '2024',
    description:
      'Created an immersive 3D portfolio website using Three.js and React, featuring custom shaders, particle systems, and scroll-driven animations.',
    type: 'project',
    highlights: [
      'Three.js & WebGL',
      'Custom GLSL shaders',
      'Lighthouse score: 95+',
      'Mobile-first responsive',
    ],
  },
  {
    id: 'tailwind-mastery',
    title: 'Mastered Tailwind CSS',
    organization: 'Self-Learning',
    period: '2023',
    description:
      'Adopted utility-first CSS workflow with Tailwind. Built complex UI components, design systems, and responsive layouts at production quality.',
    type: 'learning',
    highlights: [
      'Custom design tokens',
      'Component variants',
      'Dark mode support',
      'Animation utilities',
    ],
  },
  {
    id: 'java-learning',
    title: 'Java & OOP Fundamentals',
    organization: 'BCA Curriculum',
    period: '2023',
    description:
      'Studied object-oriented programming principles through Java, gaining solid understanding of classes, inheritance, polymorphism, and design patterns.',
    type: 'education',
    highlights: [
      'OOP Principles',
      'Design Patterns',
      'Collections Framework',
      'Exception Handling',
    ],
  }
]
