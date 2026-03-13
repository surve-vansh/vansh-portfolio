# Surve Vansh — Portfolio Website

A production-grade personal portfolio for **Surve Vansh**, a Frontend Developer & BCA Student.  
Built with React, TypeScript, Vite, Tailwind CSS, Three.js, and Framer Motion.

[![CI](https://github.com/survevansh/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/survevansh/portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Live Demo

🌐 **[survevansh.dev](https://survevansh.dev)**

---

## Features

| Feature | Details |
|---|---|
| ⚡ **Performance** | Lighthouse 90+, code-split bundles, lazy loading |
| 🎨 **Design** | Dark-first UI, glassmorphism, gradient accents |
| 🌀 **Animations** | Framer Motion scroll reveals, micro-interactions |
| 🧊 **3D Background** | Three.js WebGL particles with mouse parallax |
| ♿ **Accessibility** | WCAG AA, semantic HTML, ARIA, keyboard nav |
| 📱 **Responsive** | Mobile-first, 320px → 1536px |
| 🔒 **Security** | XSS-sanitized forms, strict security headers |
| 🧪 **Tested** | Vitest unit tests, coverage reports |
| 🚀 **Deploy-ready** | Vercel config with caching & rewrites |

---

## Tech Stack

```
React 18          — UI framework with Concurrent Features
TypeScript 5      — Full type safety across the codebase
Vite 5            — Lightning-fast dev server & build tool
Tailwind CSS 3    — Utility-first styling with custom tokens
Three.js          — WebGL-powered 3D hero background
Framer Motion 11  — Production-grade animations
React Router 6    — Client-side routing with lazy loading
Vitest            — Unit testing framework
ESLint + Prettier — Code quality enforcement
```

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── projects.json          # Static project data
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Responsive nav + mobile menu
│   │   │   └── Footer.tsx     # Footer with social links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Three.js + typewriter
│   │   │   ├── AboutSection.tsx     # Bio + animated stats
│   │   │   ├── SkillsSection.tsx    # Filterable skill bars
│   │   │   ├── ProjectsSection.tsx  # Project card grid
│   │   │   ├── JourneySection.tsx   # Animated timeline
│   │   │   └── ContactSection.tsx   # Validated form
│   │   ├── three/
│   │   │   ├── HeroScene.tsx        # Instanced particle scene
│   │   │   └── HeroBackground.tsx   # Alternative particles
│   │   └── ui/
│   │       ├── Button.tsx      # Multi-variant button
│   │       ├── Card.tsx        # Glassmorphism card
│   │       ├── Badge.tsx       # Tech stack tag
│   │       ├── ProjectCard.tsx # Full project card
│   │       ├── LoadingScreen.tsx
│   │       ├── SectionHeader.tsx
│   │       └── SectionReveal.tsx   # Scroll animation wrapper
│   ├── data/
│   │   ├── projects.ts         # Project definitions
│   │   ├── skills.ts           # Skill groups & levels
│   │   └── journey.ts          # Timeline entries
│   ├── hooks/
│   │   ├── useContactForm.ts
│   │   ├── useMousePosition.ts
│   │   ├── usePrefersReducedMotion.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useWebGL.ts
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── test/
│   │   └── setup.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── animations.ts       # Framer Motion variants
│       └── validation.ts       # Form validation + sanitization
├── design-tokens.json          # Full design token export
├── .github/workflows/ci.yml   # GitHub Actions pipeline
├── .lighthouserc.json          # Lighthouse CI thresholds
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20 LTS recommended)
- **npm** 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/survevansh/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |
| `npm run format` | Format all files with Prettier |
| `npm test` | Run Vitest in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

---

## Customization

### Updating Personal Info

**Name, bio, title** → `src/components/sections/HeroSection.tsx`, `AboutSection.tsx`

**Skills** → `src/data/skills.ts`  
```ts
{ name: 'React', level: 85, category: 'frontend', color: '#61dafb' }
```

**Projects** → `src/data/projects.ts`  
```ts
{
  id: 'my-project',
  title: 'My Project',
  techStack: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...',
  status: 'completed',
}
```

**Journey/Timeline** → `src/data/journey.ts`

**Social links** → `src/components/layout/Footer.tsx` (SOCIAL_LINKS array)

**Email** → `src/components/sections/ContactSection.tsx`

### Design Tokens

All colors, typography, and spacing live in:
- `tailwind.config.js` — Tailwind-integrated tokens
- `design-tokens.json` — Standalone reference format
- `src/styles/globals.css` — CSS custom properties

### Replacing the Avatar

Add your photo to `public/avatar.jpg` then update `AboutSection.tsx`:
```tsx
<img src="/avatar.jpg" alt="Surve Vansh" className="w-full h-full object-cover rounded-full" />
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production domain
vercel --prod
```

**Or connect via Vercel Dashboard:**
1. Import your GitHub repository at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy → Your site is live in ~30 seconds

The included `vercel.json` configures:
- SPA client-side routing rewrites
- Long-term asset caching headers (`Cache-Control: immutable, max-age=31536000`)
- Security headers (CSP, X-Frame-Options, etc.)

### Other Platforms

**Netlify:**
```bash
npm run build
# Drag-drop the `dist/` folder to netlify.com/drop
# Or: netlify deploy --dir=dist --prod
```

**GitHub Pages:**
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## Accessibility

This portfolio targets **WCAG 2.1 Level AA** compliance:

- ✅ Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- ✅ Skip-to-content link (activates on Tab)
- ✅ All interactive elements have accessible labels (`aria-label`, `aria-describedby`)
- ✅ Form errors announced via `role="alert"` and `aria-invalid`
- ✅ Color contrast ratio ≥ 4.5:1 for all text
- ✅ Keyboard navigation with visible focus states (`:focus-visible`)
- ✅ `prefers-reduced-motion` disables all animations
- ✅ Live regions (`aria-live`) for dynamic content (typewriter, form status)
- ✅ All images have meaningful `alt` attributes

---

## Performance

Optimization strategies used:

| Strategy | Implementation |
|---|---|
| Code splitting | React lazy + Suspense for route chunks |
| Three.js isolation | Lazy-loaded in separate chunk |
| Image optimization | Lazy loading + correct aspect ratios |
| Font loading | `font-display: swap`, preconnect hints |
| Bundle analysis | Manual chunk splitting in `vite.config.ts` |
| Asset caching | 1-year immutable cache for hashed assets |
| Pixel ratio cap | `Math.min(devicePixelRatio, 2)` in WebGL |
| GPU acceleration | `will-change: transform` on animated elements |
| Passive listeners | `{ passive: true }` on scroll handlers |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| WebGL unsupported | ✅ CSS gradient fallback |

---

## License

MIT © 2024 Surve Vansh
