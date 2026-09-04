# KLR Universal — Website

A pixel-faithful Next.js rebuild of [klruniversal.com](https://klruniversal.com), a drilling rig and rock drilling tools manufacturer. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## What's here

34 real pages cloned from the source site:

- Homepage, About Us, Contact & Support
- Blog — 20 posts plus pagination
- 21 individual drilling rig product pages (water well, surface mining, construction, exploration, underground)
- 3 drilling-tools category pages (DTH tools, rotary drilling tools, drill rods)

All content, specs, and images were extracted from the live site. See `docs/research/` for extraction notes and `docs/design-references/` for reference screenshots.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run check` — lint + typecheck + build

## Project structure

```
src/
  app/                          # Next.js routes
  components/
    ui/                         # shadcn/ui primitives
    sites/klruniversal-com-.../  # Page sections and shared chrome (Header, Footer, templates)
  content/                      # Structured page content (blog posts, product specs)
public/
  sites/klruniversal-com-.../   # Downloaded images and video, namespaced per source page
docs/
  research/                     # Extraction notes per page
  design-references/            # Reference screenshots
```

## Deployment

Deployed on Vercel — pushes to the connected branch build and deploy automatically. No environment variables or backend services are required; the contact form is a client-side mock (no server actions or API routes).
