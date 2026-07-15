# FECTURE.md - App Architecture & Structure

## 1. Project Structure

```
loknath-art-centre/
├── app/                          # Next.js App Router
│   ├── account/
│   │   ├── orders/page.tsx       # User order history
│   │   ├── wishlist/page.tsx     # User wishlist
│   │   └── page.tsx              # Account dashboard
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard (complex)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Auth callback handler
│   ├── payment/
│   │   └── page.tsx              # Payment page with QR
│   ├── store/
│   │   └── page.tsx              # E-commerce store
│   ├── globals.css               # Global styles + design tokens
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── auth/
│   │   └── auth-context.tsx       # Auth context provider
│   ├── effects/
│   │   ├── floating-particles.tsx # Particle effects
│   │   └── click-splash.tsx       # Click effects
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── toaster.tsx
│   │   ├── accordion.tsx
│   │   └── section-heading.tsx
│   │   └── brush-divider.tsx
│   ├── admin-orders-panel.tsx     # Admin order management
│   ├── admin-reports.tsx         # Admin reports
│   ├── client-effects.tsx        # Client-only effects
│   ├── loading-screen.tsx        # Loading overlay
│   ├── order-outcome-overlay.tsx # Order success overlay
│   └── order-success-modal.tsx  # Order confirmation
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase client (browser)
│   │   └── server.ts             # Supabase server client
│   └── utils.ts                  # Utility functions (cn)
│
├── public/
│   ├── icon.png                  # Site icon
│   ├── robots.txt                # SEO
│   └── sitemap.xml               # SEO
│
├── docs/                         # This documentation
├── supabase/
│   └── schema.sql                 # Database schema
│
├── __tests__/                    # Test files
├── e2e-flow.mjs                  # E2E test script
├── e2e-screenshots/              # E2E screenshots
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.mjs                # Next.js config
├── tailwind.config.ts             # Tailwind config
├── postcss.config.mjs             # PostCSS config
├── vitest.config.ts              # Vitest config
└── .gitignore                    # Git ignore rules
```

---

## 2. Tech Stack Summary

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Database | Supabase | - |
| Auth | Supabase Auth | - |
| State | React Context + useState | React 19 |

### UI & Animation

| Library | Purpose | Version |
|---------|---------|---------|
| Radix UI | Headless UI primitives | 1.x |
| Framer Motion | Animations | 11.x |
| GSAP | Advanced animations | 3.x |
| Lucide React | Icons | 0.469.x |
| embla-carousel | Carousels | 8.x |

### Utilities

| Library | Purpose |
|---------|---------|
| class-variance-authority | Variant handling |
| clsx | Conditional classes |
| tailwind-merge | Tailwind merge |
| qrcode | QR code generation |
| react-intersection-observer | Scroll animations |

### Testing

| Library | Purpose |
|---------|---------|
| Vitest | Test runner |
| @testing-library/react | React testing |
| jsdom | DOM simulation |

---

## 3. Design System Tokens

### CSS Variables (in `globals.css`)

```css
:root {
  /* Colors - Orange primary */
  --primary: 18 100% 60%;        /* #FF6B35 */
  
  /* Colors - Purple secondary */
  --secondary: 263 84% 58%;      /* #8B5CF6 */
  
  /* Colors - Pink accent */
  --accent: 333 100% 67%;        /* #FF5C8A */
  
  /* Neutrals */
  --background: 36 100% 97%;    /* Cream */
  --foreground: 30 25% 12%;     /* Ink */
  --muted: 30 30% 92%;
  --muted-foreground: 30 15% 40%;
  
  /* Semantic */
  --destructive: 0 84% 60%;
  --border: 30 25% 88%;
  --ring: 18 100% 60%;
  
  /* Radius */
  --radius: 1rem;
}
```

### Tailwind Color Mapping

| Token | Usage |
|-------|-------|
| `bg-cream-100` | Background |
| `text-ink-500` | Primary text |
| `text-ink-400` | Secondary text |
| `text-palette-orange` | Primary accent |
| `text-palette-purple` | Secondary accent |
| `text-palette-rose` | Tertiary accent |

---

## 4. Database Schema (Supabase)

### Tables Created:

1. **accounts** - User accounts (id, name, email, password, role)
2. **students** - Student profile data
3. **products** - Store products
4. **orders** - Customer orders
5. **purchases** - Purchase records
6. **reports** - Report generation
7. **cart_items** - Persistent cart
8. **wishlists** - User wishlists
9. **profiles** - Admin settings (UPI ID, business name)
10. **student_details** - Real-time student database
11. **income_report** - Income tracking

### Key Relationships:

```
accounts (1) ──< students
accounts (1) ──< orders
accounts (1) ──< purchases
accounts (1) ──< cart_items
accounts (1) ──< wishlists
accounts (1) ──< profiles
orders (1) ──< purchases
products (1) ──< purchases
```

---

## 5. API Routes

### Server Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/auth/callback` | GET | Handle OAuth callback |

### Client-Side Data

All data fetching happens via Supabase client:
- Direct table queries (`supabase.from().select()`)
- Real-time subscriptions (`supabase.channel()`)
- Auth state (`supabase.auth`)

---

## 6. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 7. Build & Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check |
| `npm run test` | Run tests |
| `npm run test:watch` | Watch mode tests |

---

## 8. Folder Structure Principles

1. **Feature-based organization** - Components grouped by feature
2. **Atomic design** - UI components in `/ui` folder
3. **Page routes** - App router uses `/app` for pages
4. **Shared utilities** - `/lib` for utilities
5. **Documentation** - `/docs` for project docs (this file)
6. **Tests** - Co-located or in `__tests__`