# Vercel Deployment Guide

Step-by-step guide to deploy the Surve Vansh portfolio to Vercel.

---

## Option A: Deploy via Vercel Dashboard (Recommended)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial portfolio release"
git remote add origin https://github.com/survevansh/portfolio.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **survevansh/portfolio**
4. Configure the project:

| Setting | Value |
|---|---|
| Framework Preset | **Vite** |
| Root Directory | `.` (default) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Click **Deploy**

Your site will be live at `https://portfolio-survevansh.vercel.app` in ~30 seconds.

### 3. Add Custom Domain

1. In Vercel Dashboard → **Settings → Domains**
2. Add `survevansh.dev`
3. Update DNS at your domain registrar:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

4. Vercel auto-provisions SSL certificate within minutes.

---

## Option B: Deploy via CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Authenticate
vercel login

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

---

## Environment Variables

No environment variables are required for the current portfolio.

If you add a real contact form API, add these in **Vercel Dashboard → Settings → Environment Variables**:

```
VITE_CONTACT_API_URL=https://your-api.vercel.app/api/contact
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_key
```

Then access in code:
```ts
const apiUrl = import.meta.env.VITE_CONTACT_API_URL
```

---

## Serverless Contact Form API

To make the contact form actually send emails, create a Vercel Serverless Function:

```
api/
└── contact.ts
```

```ts
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Send email via Resend, SendGrid, or Nodemailer
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'portfolio@survevansh.dev',
    //   to: 'vansh@example.com',
    //   subject: `Portfolio Contact: ${name}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    // })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
```

Update the form submission in `ContactSection.tsx`:
```ts
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sanitizedData),
})

if (!response.ok) throw new Error('API error')
```

---

## Automatic Deployments

With GitHub connected:

| Branch | Deployment |
|---|---|
| `main` | Production (`survevansh.dev`) |
| `develop` | Preview URL (auto-generated) |
| Pull requests | Preview URL per PR |

Every push to `main` triggers an automatic production deployment.

---

## Performance After Deployment

Run a Lighthouse audit on the live URL:

```bash
npx lighthouse https://survevansh.dev \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-report.html
```

Expected scores:
- Performance: **92–96**
- Accessibility: **97–100**
- Best Practices: **100**
- SEO: **95–100**

---

## Vercel.json Explained

The included `vercel.json` configures:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
**Why:** React Router is client-side only. Without this, refreshing `/about` would return a 404. This rewrites all routes to `index.html` so React Router handles routing.

```json
"headers": [
  {
    "source": "/assets/(.*)",
    "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
  }
]
```
**Why:** Vite content-hashes all asset filenames (`main.abc123.js`). Since the hash changes with every build, assets can be cached permanently — meaning repeat visitors load the site instantly from browser cache.

Security headers included:
- `X-Content-Type-Options: nosniff` — Prevents MIME sniffing attacks
- `X-Frame-Options: DENY` — Prevents clickjacking via iframes
- `X-XSS-Protection: 1; mode=block` — Legacy XSS filter for older browsers
- `Referrer-Policy: strict-origin-when-cross-origin` — Controls referrer leakage
- `Permissions-Policy` — Disables camera, mic, geolocation access
