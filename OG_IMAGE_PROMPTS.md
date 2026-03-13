# Open Graph Image Prompts

These prompts are ready to use with image generation tools (Midjourney, DALL-E 3, Stable Diffusion, Figma, or custom code) to create the `og-image.png` (1200×630px) used in social media link previews.

---

## Recommended Dimensions

| Use | Size | Format |
|---|---|---|
| Open Graph (og:image) | 1200 × 630px | PNG or WebP |
| Twitter Card | 1200 × 628px | PNG |
| LinkedIn | 1200 × 627px | PNG |
| Discord embed | 1200 × 630px | PNG |
| Favicon | 32 × 32px (SVG) | SVG (already created) |

---

## Primary OG Image Prompt

**For DALL-E 3 / Midjourney / Stable Diffusion XL:**

```
A sleek, dark-themed developer portfolio open graph image for "Surve Vansh — Frontend Developer".
Dark background #0a0a0f. Left side: large bold white name "Surve Vansh" in geometric sans-serif font, 
below it "Frontend Developer · React · TypeScript" in smaller accent blue text. 
Right side: abstract 3D floating geometric shapes (icosahedra, octahedra) in neon blue #4f8ef7 
and purple #a78bfa with wireframe style and soft glow effects. 
Bottom: row of tech icons (React, TypeScript, Tailwind, Three.js logos). 
Overall style: premium Silicon Valley startup, glassmorphism elements, subtle grid overlay, 
gradient ambient light. Wide 1200x630 format, photorealistic quality.
```

---

## Alternative Prompt — Minimal Version

```
Clean, minimal dark open graph card for a developer portfolio. 
Background: very dark navy #0a0a0f with subtle dot grid. 
Large text: "Surve Vansh" in white bold display font (left-aligned, large). 
Subtitle: "Frontend Developer & BCA Student" in medium gray. 
Right side: a glowing blue-purple gradient orb/sphere (abstract). 
Small monospace text in bottom corner: "React · TypeScript · Three.js · Tailwind". 
1200x630px, professional, minimalist, no clutter.
```

---

## Code-Generated OG Image (Recommended)

Generate the OG image programmatically with **@vercel/og** or **satori** for pixel-perfect branding:

```tsx
// api/og.tsx (Vercel Edge Function)
import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #1e1e2e 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.4,
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,142,247,0.3) 0%, rgba(167,139,250,0.1) 50%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1 }}>
          {/* Status badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(79,142,247,0.1)',
              border: '1px solid rgba(79,142,247,0.3)',
              borderRadius: '100px',
              padding: '6px 16px',
              width: 'fit-content',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#8888aa', fontSize: '14px', fontFamily: 'monospace' }}>
              Available for Work
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #f0f0fa 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Surve Vansh
          </h1>

          {/* Title */}
          <p style={{ color: '#4f8ef7', fontSize: '24px', margin: 0, fontFamily: 'monospace' }}>
            Frontend Developer · React · TypeScript
          </p>

          {/* Description */}
          <p style={{ color: '#8888aa', fontSize: '18px', margin: 0, maxWidth: '560px', lineHeight: 1.5 }}>
            Building responsive, high-performance web applications with modern technologies.
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {['React', 'TypeScript', 'Three.js', 'Tailwind CSS'].map(tag => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(30,30,46,0.8)',
                  border: '1px solid #1e1e2e',
                  borderRadius: '8px',
                  color: '#8888aa',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* URL */}
          <p style={{ color: '#44445a', fontSize: '14px', margin: '24px 0 0', fontFamily: 'monospace' }}>
            survevansh.dev
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

---

## Social Preview Screenshots

After deploying, verify your OG images using:

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **OpenGraph.xyz**: https://www.opengraph.xyz/url/https://survevansh.dev
