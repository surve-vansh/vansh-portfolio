# Performance Checklist — Surve Vansh Portfolio

Target: **Lighthouse Score 90+** across Performance, Accessibility, Best Practices, SEO.

---

## Core Web Vitals Targets

| Metric | Target | Status |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | ✅ |
| **FID** (First Input Delay) | < 100ms | ✅ |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ✅ |
| **FCP** (First Contentful Paint) | < 1.8s | ✅ |
| **TBT** (Total Blocking Time) | < 300ms | ✅ |
| **INP** (Interaction to Next Paint) | < 200ms | ✅ |

---

## Bundle Optimization

- [x] **Code splitting** — React lazy() + Suspense for route-level chunks
- [x] **Vendor chunking** — Three.js, Framer Motion, React split into separate chunks
- [x] **Tree shaking** — Only used Three.js modules imported (not the full package)
- [x] **Minification** — Vite uses esbuild + Rollup for minimal output
- [x] **Compression** — Vercel auto-gzip/brotli compression on all assets
- [x] **No moment.js / large date libraries** — Date formatted with native APIs

### Chunk Size Budget

| Chunk | Target | Notes |
|---|---|---|
| `vendor` (React) | < 150KB gzipped | Core framework |
| `three` | < 250KB gzipped | Lazy-loaded only on hero mount |
| `framer` | < 80KB gzipped | Split from main bundle |
| `index` (app) | < 100KB gzipped | Component + business logic |

---

## Asset Optimization

- [x] **Images** — WebP format preferred, fallback to PNG/JPG
- [x] **Lazy loading images** — `loading="lazy"` on below-fold images
- [x] **Explicit dimensions** — width + height attributes prevent layout shift
- [x] **Favicon** — SVG favicon (scalable, tiny file size)
- [x] **Font loading** — `font-display: swap` via Google Fonts URL
- [x] **Font preconnect** — `<link rel="preconnect">` for fonts.googleapis.com

---

## Network Optimization

- [x] **Long-term caching** — Vite content-hashes all asset filenames
- [x] **Cache headers** — `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`
- [x] **CDN delivery** — Vercel Edge Network automatically
- [x] **HTTP/2 push** — Vercel handles multiplexing
- [x] **Prefetch** — React Router prefetches lazy chunks on link hover (via Suspense)
- [x] **No render-blocking resources** — All scripts are `type="module"` (deferred)

---

## Rendering Performance

- [x] **React 18 Concurrent Mode** — Non-urgent updates don't block main thread
- [x] **Avoid layout thrashing** — No forced synchronous layouts in JS
- [x] **Passive event listeners** — scroll handlers use `{ passive: true }`
- [x] **GPU compositing** — Animated elements use `transform` + `opacity` only
- [x] **will-change** — Applied to Three.js canvas and animated hero elements
- [x] **Pixel ratio cap** — `Math.min(devicePixelRatio, 2)` in WebGL renderer
- [x] **requestAnimationFrame** — All Three.js animations use RAF correctly
- [x] **Cleanup on unmount** — RAF cancelled, event listeners removed, geometries disposed

---

## Three.js / WebGL Specifics

- [x] **Instanced mesh** — Single draw call for 80 particles (GPU instancing)
- [x] **Dynamic draw usage** — `instanceMatrix.setUsage(THREE.DynamicDrawUsage)`
- [x] **Pixel ratio limit** — Never exceeds 2x even on high-DPI screens
- [x] **Geometry disposal** — All geometries/materials disposed on component unmount
- [x] **WebGL fallback** — CSS gradient background shown if WebGL unsupported
- [x] **Reduced motion** — Three.js animation loop pauses in reduced-motion mode
- [x] **Alpha canvas** — `alpha: true` so Three.js blends with background
- [x] **powerPreference** — `'high-performance'` hint to GPU driver

---

## CSS Performance

- [x] **Tailwind purge** — Only used classes included in production build
- [x] **No unused CSS** — Zero dead CSS rules in production
- [x] **CSS transforms** — All animations use `transform`, never `top/left/width`
- [x] **Backdrop blur** — Used sparingly; limited to nav and cards only
- [x] **contain: layout** — Applied to Three.js canvas parent

---

## HTML / Head Optimization

- [x] **Meta viewport** — `width=device-width, initial-scale=1.0`
- [x] **Open Graph tags** — Complete OG + Twitter card metadata
- [x] **Canonical URL** — `<link rel="canonical">` prevents duplicate indexing
- [x] **Structured data** — JSON-LD Person schema for rich results
- [x] **robots meta** — `index, follow` for all pages
- [x] **Theme color** — `<meta name="theme-color">` for mobile browser chrome

---

## Monitoring

Tools to run periodically:

```bash
# Lighthouse CLI
npx lighthouse https://survevansh.dev --view

# Bundle analyzer
npx vite-bundle-visualizer

# WebPageTest
# https://www.webpagetest.org/?url=survevansh.dev

# Chrome DevTools Performance tab
# Record → check for long tasks, layout shifts, large paints
```
