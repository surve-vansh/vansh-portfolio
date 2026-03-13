import type { SkillGroup } from '@/types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', level: 85, category: 'frontend', color: '#61dafb' },
      { name: 'JavaScript (ES6+)', level: 88, category: 'frontend', color: '#f7df1e' },
      { name: 'HTML5', level: 92, category: 'frontend', color: '#e34f26' },
      { name: 'CSS3', level: 90, category: 'frontend', color: '#1572b6' },
      { name: 'Tailwind CSS', level: 88, category: 'frontend', color: '#38bdf8' },
      { name: 'Responsive Design', level: 90, category: 'frontend', color: '#a78bfa' },
      { name: 'Vite', level: 80, category: 'frontend', color: '#646cff' },
    ],
  },
  {
    category: 'programming',
    label: 'Programming',
    skills: [
      { name: 'Java', level: 70, category: 'programming', color: '#ed8b00' },
      { name: 'Python', level: 50, category: 'programming', color: '#3776ab' },
      { name: 'Data Structures', level: 40, category: 'programming', color: '#4f8ef7' },
      { name: 'Algorithms', level: 40, category: 'programming', color: '#22d3ee' },
    ],
  },
  {
    category: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git', level: 82, category: 'tools', color: '#f05032' },
      { name: 'GitHub', level: 85, category: 'tools', color: '#ffffff' },
      { name: 'VS Code', level: 92, category: 'tools', color: '#007acc' },
    ],
  },
  {
    category: 'concepts',
    label: 'Concepts',
    skills: [
      { name: 'Component Architecture', level: 85, category: 'concepts', color: '#4f8ef7' },
      { name: 'Performance Optimization', level: 78, category: 'concepts', color: '#a78bfa' },
      { name: 'Accessibility (a11y)', level: 75, category: 'concepts', color: '#22d3ee' },
      { name: 'API Integration', level: 80, category: 'concepts', color: '#6366f1' },
      { name: 'Modern UI/UX', level: 82, category: 'concepts', color: '#f472b6' },
    ],
  },
]
