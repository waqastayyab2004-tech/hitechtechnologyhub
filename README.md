# HiTecH Technology HUB by Waqas

A modern, production-ready personal technology website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

**Live site:** https://www.hitechtechnologyhub.com

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Blog | Markdown + gray-matter + remark |
| Deployment | Static export (GitHub Pages / Cloudflare / Netlify / Vercel) |

---

## Project Structure

```
hitechtechnologyhub/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout, SEO metadata, OG tags
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── topics/             # 12 topics grid
│   ├── projects/           # Project cards
│   ├── blog/               # Blog listing + [slug] pages
│   ├── resources/          # AI tools grid
│   ├── contact/            # Contact form
│   ├── loading.tsx         # Loading spinner
│   └── not-found.tsx       # 404 page
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # BackToTop, ScrollReveal, LoadingSpinner
│   ├── home/               # Hero, TopicsPreview, Newsletter
│   └── projects/           # ProjectsPreview
├── content/blog/           # Markdown blog posts
├── lib/blog.ts             # Blog post parser
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
└── styles/globals.css
```

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone or navigate to the project
cd ~/Desktop/claude-MCP/hitechtechnologyhub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory — ready for any static host.

---

## Adding Blog Posts

Create a new `.md` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2026-07-10"
excerpt: "One paragraph summary shown on blog listing page."
tags: ["AI", "Automation"]
author: "Waqas Syed"
readTime: "5 min read"
featured: false
---

# Your Post Title

Your content here in Markdown...
```

The file name becomes the URL slug. `my-new-post.md` → `/blog/my-new-post`

Run `npm run build` to include the new post in the static export.

---

## Deployment Guide

### Option 1: Vercel (Recommended — Easiest)

1. Push project to GitHub
2. Go to https://vercel.com → New Project → Import your repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

**Custom domain:**
- Vercel Dashboard → Project → Settings → Domains
- Add `hitechtechnologyhub.com` and `www.hitechtechnologyhub.com`
- Update your DNS: add Vercel's nameservers or CNAME records
- HTTPS: automatic via Let's Encrypt

### Option 2: Cloudflare Pages

1. Push to GitHub
2. Cloudflare Dashboard → Pages → Create a Project → Connect GitHub
3. Build command: `npm run build`
4. Output directory: `out`
5. Deploy

**Custom domain:**
- Cloudflare Pages → Custom domains → Add domain
- If domain is on Cloudflare DNS, it's instant
- HTTPS: automatic

### Option 3: Netlify

1. Push to GitHub
2. Netlify → New site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy site

**Custom domain:**
- Site settings → Domain management → Add custom domain
- Update DNS CNAME: `www` → `<your-site>.netlify.app`
- HTTPS: automatic via Let's Encrypt

### Option 4: GitHub Pages

1. In `next.config.ts`, set `basePath: '/hitechtechnologyhub'` if using a project page
2. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

3. GitHub repo → Settings → Pages → Source: `gh-pages` branch

---

## Custom Domain Setup

### DNS Configuration (example for Cloudflare)

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 (Vercel IP) |
| CNAME | www | cname.vercel-dns.com |

For Netlify:
| Type | Name | Value |
|------|------|-------|
| CNAME | www | your-site-name.netlify.app |

### HTTPS
All platforms above (Vercel, Cloudflare, Netlify) provision HTTPS automatically via Let's Encrypt. No manual setup required.

---

## SEO & Metadata

All pages include:
- `<title>` and `<meta name="description">`
- Open Graph tags (title, description, image, URL)
- Twitter Card metadata
- Canonical URLs
- `robots.txt` allowing all crawlers
- `sitemap.xml` listing all pages and blog posts

To update the domain in metadata, search for `hitechtechnologyhub.com` and replace with your actual domain.

---

## Customization

### Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  accent: {
    blue: '#3B82F6',      // Change primary accent
    yellow: '#FACC15',    // Change secondary accent
  }
}
```

### Social Links
Edit `components/layout/Footer.tsx` and `app/contact/ContactClient.tsx` — update the `href` values for LinkedIn, GitHub, Facebook.

### About Page
Edit `app/about/page.tsx` — update roles, skills, timeline.

### Projects
Edit `app/projects/page.tsx` and `components/projects/ProjectsPreview.tsx` — update the `projects` array.

---

## Performance

- Static export: no server required, CDN-friendly
- Google Fonts loaded via CSS `@import` (swap display)
- Framer Motion tree-shaken in production
- Images: SVG-only (no external image dependencies)
- Tailwind CSS purged in production (only used classes bundled)

---

## License

MIT — free to use and modify.

---

*Built by Waqas Syed — SAP IT System Engineer, AI Enthusiast, Riyadh KSA*
