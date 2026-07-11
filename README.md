# Loknath Art Centre

A premium, artistic, and emotionally inspiring website for a professional drawing school. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Tech

- **Next.js 15** App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS** with custom design tokens
- **Framer Motion** for animations
- **Lucide React** icons
- **Embla Carousel** for product / artwork carousels
- **Radix UI** primitives (Dialog, Tabs, Accordion, Toast)

## Features

- Sticky glassmorphism navbar (mobile + desktop)
- Hero with massive Bengali typography and parallax
- Animated statistics
- 8-card "Why choose us" grid
- About section with teacher bio + handwritten quote
- 18 interactive course cards
- Masonry gallery with category filter + lightbox
- Featured artwork carousel
- Premium art store with featured products + 6 shop features
- 6 event cards
- Testimonial carousel
- 6 blog posts
- Animated FAQ accordion
- Contact form + Google Maps embed
- Premium gradient CTA banner
- Artistic footer with newsletter
- Custom paint-brush cursor
- Watercolor splash on click
- Floating particles that drift with mouse
- Dark mode toggle
- Fully responsive (mobile-first)
- SEO metadata
- Lazy-loaded images
- Accessibility labels

## Design system

- **Background:** warm white `#FFF9F2`
- **Ink:** deep brown `#2D261B`
- **Accent palette:** orange, purple, pink, blue, yellow
- **Bengali font:** Hind Siliguri
- **English font:** Poppins
- **Handwritten accent:** Caveat

## Folder structure

```
app/         Next.js App Router (layout, page, globals.css, icon)
components/
  effects/   Custom cursor, floating particles, click splash
  sections/  Hero, Stats, About, Courses, Gallery, Store, Events, etc.
  ui/        Button, Card, Dialog, Tabs, Input, Toaster, etc.
  navbar.tsx Sticky glassmorphism navbar
  footer.tsx Artistic footer
  theme-provider.tsx Light/dark theme
lib/         utils.ts, data.ts (mock content)
public/      robots.txt, sitemap.xml
```
