# design.md - Design System

## 1. Color Palette

### Primary Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|------|
| `palette-orange` | #FF6B35 | 18, 100%, 60% | Primary CTA, prices, accents |
| `palette-purple` | #8B5CF6 | 263, 84%, 58% | Secondary elements, admin |
| `palette-rose` | #FF5C8A | 333, 100%, 67% | Accent, highlights |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| `cream-100` | #FFF9F2 | Background |
| `cream-200` | #FFF3E6 | Cards, surfaces |
| `ink-500` | #2D261B | Primary text |
| `ink-400` | #5C5347 | Secondary text |
| `ink-300` | #8A8177 | Muted text |
| `ink-200` | #C4BDB3 | Borders |
| `ink-100` | #E8E4DD | Dividers |
| `ink-50` | #F5F2ED | Subtle backgrounds |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| `emerald-500` | #10B981 | Success states |
| `amber-500` | #F59E0B | Warning states |
| `red-500` | #EF4444 | Error/destructive |
| `blue-500` | #3B82F6 | Info states |

---

## 2. Tailwind Configuration

### Color Extensions

```typescript
// tailwind.config.ts
colors: {
  palette: {
    orange: '#FF6B35',
    purple: '#8B5CF6',
    rose: '#FF5C8A',
  },
  cream: {
    50: '#FFFCF8',
    100: '#FFF9F2',
    200: '#FFF3E6',
  },
  ink: {
    50: '#F5F2ED',
    100: '#E8E4DD',
    200: '#C4BDB3',
    300: '#8A8177',
    400: '#5C5347',
    500: '#2D261B',
  },
}
```

### Custom Utilities

```css
/* Global utilities added in globals.css */
.bg-cream-100 { background-color: #FFF9F2; }
.bg-cream-200 { background-color: #FFF3E6; }
.text-ink-500 { color: #2D261B; }
.text-ink-400 { color: #5C5347; }
.text-palette-orange { color: #FF6B35; }
.text-palette-purple { color: #8B5CF6; }
```

---

## 3. Typography

### Font Families

| Name | Type | Usage |
|------|------|-------|
| `font-display` | Bengali/Display | Headings, titles |
| `font-sans` | System/UI | Body text, buttons |

### Font Source
- Primary: System fonts (Sans-serif stack)
- Bengali: Native Bengali font support
- Display accent: Caveat (handwritten style via CSS)

### Tailwind Font Mapping

```typescript
// In tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  sans: ['system-ui', '-apple-system', 'sans-serif'],
}
```

### Heading Styles (via CSS classes)

| Class | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `heading-xl` | 5xl-8xl | Bold | 0.95 |
| `heading-lg` | 4xl-6xl | Bold | Tight |
| `heading-md` | 3xl-5xl | Bold | Tight |
| `heading-sm` | 2xl-3xl | Semibold | Normal |

---

## 4. Spacing System

### Base Scale (Tailwind)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Compact elements |
| `space-3` | 12px | Related elements |
| `space-4` | 16px | Standard spacing |
| `space-5` | 20px | Section padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Large gaps |
| `space-12` | 48px | Section gaps |
| `space-16` | 64px | Hero sections |

### Container Widths

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | 100% (max 1280px) | Mobile first |
| sm | 640px | Small screens |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

---

## 5. Border Radius

### Radius Scale

| Name | Value | Usage |
|------|-------|-------|
| `rounded` | 4px | Small elements |
| `rounded-lg` | 8px | Buttons, inputs |
| `rounded-xl` | 12px | Cards |
| `rounded-2xl` | 16px | Modals, panels |
| `rounded-3xl` | 24px | Sections |
| `rounded-full` | 9999px | Pills, circles |

### CSS Variable

```css
:root {
  --radius: 1rem; /* Default 16px (rounded-2xl) */
}
```

---

## 6. Shadows

### Shadow Scale

| Name | Value | Usage |
|------|-------|-------|
| `shadow-sm` | 0 1px 2px | Subtle |
| `shadow` | 0 4px 6px | Default cards |
| `shadow-md` | 0 6px 12px | Elevated |
| `shadow-lg` | 0 12px 24px | Modals |
| `shadow-xl` | 0 20px 40px | Hero sections |

### Custom Shadows

```css
.shadow-orange-500\/20 {
  box-shadow: 0 10px 40px -10px rgba(255, 107, 53, 0.2);
}
```

---

## 7. Gradients

### Background Gradients

```css
/* Hero gradient */
.bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500

/* Surface gradients */
.bg-gradient-to-br from-palette-purple via-palette-rose to-palette-orange

/* Soft backgrounds */
.bg-gradient-to-b from-orange-50 to-pink-50
```

### Mesh Gradients (CSS)

```css
.watercolor-bg {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 45%),
    radial-gradient(circle at 20% 80%, rgba(255, 92, 138, 0.1) 0%, transparent 40%);
}
```

---

## 8. Effects & Textures

### Paper Textures (SVG-based)

```css
.paper-texture {
  background-image: url("data:image/svg+xml,...");
}

.canvas-texture {
  background-image: url("data:image/svg+xml,...");
}
```

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
```

### Brush Effects

```css
.brush-divider {
  height: 12px;
  background: linear-gradient(90deg, transparent 0%, currentColor 15%, currentColor 85%, transparent 100%);
  border-radius: 999px;
}
```

---

## 9. Animations

### Transitions

| Name | Duration | Easing |
|------|----------|--------|
| Default | 150ms | ease |
| Fast | 100ms | ease-out |
| Normal | 200ms | ease-in-out |
| Slow | 300ms | ease |

### Custom Animations

```css
/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Brush stroke */
@keyframes brush-stroke {
  to { stroke-dashoffset: 0; }
}
```

### Available Animation Classes

| Class | Effect |
|--------|--------|
| `.float-1`, `.float-2`, `.float-3` | Floating elements |
| `.reveal` | Scroll reveal |
| `.hover-glow` | Hover glow effect |
| `.tilt-card` | 3D tilt on hover |

---

## 10. Responsive Breakpoints

### Standard Tailwind Breakpoints

```css
/* Mobile first - min-width */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Custom Cursor (Desktop Only)

```css
@media (hover: hover) and (pointer: fine) {
  * { cursor: none; }
  .custom-cursor { /* Custom cursor styles */ }
}
```

---

## 11. Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Normal flow |
| Dropdown | 40 | Dropdowns |
| Sticky | 50 | Sticky headers |
| Modal | 100 | Dialogs, modals |
| Popover | 200 | Tooltips, popovers |
| Toast | 300 | Toast notifications |
| Overlay | 400 | Backdrop overlays |
| Cursor | 9999 | Custom cursor |

---

## 12. Usage Examples

### Button Variants

```tsx
// Primary (orange gradient)
<button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
  Action
</button>

// Secondary (purple)
<button className="bg-palette-purple text-white">
  Secondary
</button>

// Outline
<button className="border border-ink-200 text-ink-500">
  Outline
</button>
```

### Card Component

```tsx
<div className="rounded-2xl bg-white shadow-md p-6 border border-ink-100">
  {/* Card content */}
</div>
```

### Text Styles

```tsx
<h1 className="heading-xl text-ink-500">Main Heading</h1>
<h2 className="heading-lg text-ink-500">Section Title</h2>
<p className="text-ink-400">Body text</p>
<p className="text-sm text-ink-300">Small text</p>
```