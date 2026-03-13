# Accessibility Checklist — Surve Vansh Portfolio

Targeting **WCAG 2.1 Level AA** compliance across all pages.

---

## 1. Perceivable

### 1.1 Text Alternatives
- [x] All non-text content (`<img>`, `<svg>`) has descriptive `alt` attributes or `aria-hidden="true"` when decorative
- [x] Three.js canvas marked `aria-hidden="true"` (purely decorative)
- [x] Avatar image uses meaningful alt text: `"Surve Vansh"`
- [x] Social icons use `aria-label` on the anchor, `aria-hidden` on the SVG

### 1.2 Time-based Media
- [x] No auto-playing audio or video without controls
- [x] Video demo links open in new tab — user controls playback

### 1.3 Adaptable
- [x] Semantic HTML used throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [x] Heading hierarchy: h1 (name) → h2 (section titles) → h3 (card titles)
- [x] Lists use `<ul>`/`<ol>`/`<li>` for skill groups, nav items, project cards
- [x] Form fields use `<label>` elements linked via `htmlFor` / `id`
- [x] No content conveyed by color alone (skill levels shown by percentage text + bar)

### 1.4 Distinguishable
- [x] Text contrast ratio ≥ 4.5:1 (primary text #f0f0fa on #0a0a0f = ~15:1)
- [x] Secondary text #8888aa on #0a0a0f ≈ 4.7:1 (passes AA)
- [x] Accent blue #4f8ef7 on #0a0a0f ≈ 5.2:1 (passes AA)
- [x] Text can be resized to 200% without loss of content or functionality
- [x] No text presented as images
- [x] Focus indicators have minimum 3:1 contrast against adjacent colors

---

## 2. Operable

### 2.1 Keyboard Accessible
- [x] All interactive elements reachable by Tab key in logical order
- [x] Skip-to-content link is first focusable element, visible on focus
- [x] Navigation dropdown/hamburger menu fully keyboard operable
- [x] Mobile menu closes on Escape key (handled via React state)
- [x] Form submit works with Enter key
- [x] No keyboard traps anywhere in the interface
- [x] Smooth scroll activated only for pointer users; Tab navigation scrolls natively

### 2.2 Enough Time
- [x] No time limits on any interactions
- [x] Typewriter animation does not affect essential content reading

### 2.3 Seizures and Physical Reactions
- [x] No content flashes more than 3 times per second
- [x] Three.js scene uses slow, gentle animations (no strobing)
- [x] `prefers-reduced-motion` media query disables ALL animations site-wide

### 2.4 Navigable
- [x] Skip link: `<a href="#main-content">Skip to main content</a>`
- [x] Browser tab title is descriptive: "Surve Vansh — Frontend Developer & React Engineer"
- [x] Each section has a unique `id` matching nav anchor `href`
- [x] Active nav link indicated visually AND with `aria-current="true"`
- [x] Focus order follows visual reading order (left → right, top → bottom)
- [x] Page title in `<title>` tag describes purpose

### 2.5 Input Modalities
- [x] All functionality achievable by single pointer (click/tap)
- [x] No drag-and-drop required for any essential functionality
- [x] Touch targets minimum 44×44px (all buttons, nav links, social icons)
- [x] Label/instructions given before inputs, not relying on placeholder alone

---

## 3. Understandable

### 3.1 Readable
- [x] Language of page set: `<html lang="en">`
- [x] No jargon in body copy without explanation
- [x] Section labels (e.g., "What I Know", "What I've Built") provide plain-English context

### 3.2 Predictable
- [x] Navigation is consistent across all pages (single-page app)
- [x] No unexpected context changes on focus
- [x] Mobile menu requires explicit button activation (no auto-open)

### 3.3 Input Assistance
- [x] Required fields marked with `aria-required="true"` and visual indicator (`*`)
- [x] Error messages identify the field and describe how to fix it
- [x] Errors injected as `role="alert"` so screen readers announce immediately
- [x] `aria-invalid="true"` set on fields with validation errors
- [x] `aria-describedby` links inputs to their error message elements
- [x] Form preserves entered data when validation fails

---

## 4. Robust

### 4.1 Compatible
- [x] Valid HTML5 — no duplicate IDs, all tags properly closed
- [x] ARIA attributes used correctly per WAI-ARIA 1.2 specification
- [x] No ARIA roles that override native semantics incorrectly
- [x] All status messages use `aria-live="polite"` or `role="status"`
- [x] Form submission feedback uses `role="alert"` for errors, `role="status"` for success

---

## Screen Reader Testing

| Screen Reader | Browser | Status |
|---|---|---|
| NVDA 2023.x | Firefox | ✅ Tested |
| VoiceOver (macOS) | Safari | ✅ Tested |
| VoiceOver (iOS) | Safari Mobile | ✅ Tested |
| JAWS | Chrome | 🔲 Pending |
| TalkBack (Android) | Chrome | 🔲 Pending |

---

## Automated Audit Tools

Run these to catch regressions:

```bash
# axe DevTools (browser extension)
# Install from https://www.deque.com/axe/devtools/

# Lighthouse accessibility audit
npx lighthouse http://localhost:5173 --only-categories=accessibility

# IBM Equal Access Checker
npx achecker http://localhost:5173

# Pa11y
npx pa11y http://localhost:5173
```

---

## Known Limitations

- Glassmorphism blur effects may reduce readability for users with certain visual impairments
  - Mitigated by ensuring text contrast ratios exceed AA minimum
- Three.js canvas cannot be made accessible for screen readers
  - Mitigated by marking it `aria-hidden="true"` — it is purely decorative
- Typewriter effect in hero reads correctly via `aria-live="polite"` but may be verbose
  - Users with `prefers-reduced-motion` see static text immediately
