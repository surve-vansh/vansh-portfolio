import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'interactive-3d-portfolio',
    title: 'Interactive 3D Portfolio',
    description:
      'A cutting-edge portfolio website with WebGL-powered 3D animations, particle systems, and immersive scroll experiences.',
    longDescription:
      'Built with Three.js and React, this portfolio features real-time 3D rendering, custom shader materials, interactive particle systems, and smooth scroll-driven animations. Performance optimized with LOD management and GPU instancing.',
    techStack: ['React', 'Three.js', 'TypeScript', 'Framer Motion', 'GLSL', 'Vite'],
    githubUrl: 'https://github.com/survevansh/3d-portfolio',
    liveUrl: 'https://vpixel-studio.netlify.app/',
    videoUrl: 'https://example.com/demo-video-1.mp4',
    imageUrl: '/projects/portfolio-preview.png',
    featured: true,
    status: 'completed',
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    description:
      'A responsive Netflix-style website that replicates the layout and UI of the Netflix homepage with movie sections and interactive navigation.',
    longDescription:
      'A frontend clone of the Netflix homepage built to practice responsive layouts and modern UI design. The project includes a hero banner, categorized movie sections, and hover effects on movie cards. It focuses on clean CSS styling and responsive layouts across mobile, tablet, and desktop devices.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/survevansh/netflix-clone',
    liveUrl: 'https://cinelix-vibe.netlify.app/',
    imageUrl: '/projects/netflix-clone-preview.png',
    featured: true,
    status: 'completed',
  },
  {
    id: 'react-ecommerce-spa',
    title: 'React eCommerce SPA',
    description:
      'A modern single-page eCommerce application built with React featuring reusable components and responsive UI.',
    longDescription:
      'A React-based eCommerce frontend built using component-based architecture. The application displays product listings and reusable UI components with a responsive layout. The project demonstrates React fundamentals, component structure, and modern frontend development practices.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/survevansh/react-ecommerce-spa',
    liveUrl: 'https://shope-verse.netlify.app/',
    imageUrl: '/projects/react-ecommerce-preview.png',
    featured: true,
    status: 'completed',
  },
]
