# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run Next.js ESLint
npm run start    # Start production server after build
```

There is no test suite in this project.

## Architecture

This is a **Next.js 14 App Router** site for Aenon Church (Tarnaka, Hyderabad). It is a static/SSG-friendly site — no backend, database, or API routes. All content is hardcoded in page files.

**Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, Lucide React.

**Font:** "Neue Montreal" — loaded via `@font-face` in `globals.css` from `.otf` files in `public/fonts/`. All font-family references in Tailwind (`font-sans`, `font-nav`, `font-display`) resolve to Neue Montreal.

### Route structure

```
src/app/
  layout.tsx              # Root layout: wraps all pages in MaintenanceGate > Navbar > main > Footer
  page.tsx                # Homepage
  about/page.tsx          # About Aenon
  about/vision/           # Vision & Mission sub-page
  about/expect/           # What to Expect sub-page
  about/leadership/       # Leadership sub-page
  sermons/page.tsx        # Sermons (embeds YouTube playlist)
  ministries/page.tsx     # Ministries overview
  ministries/mens|womens|youth|kids/   # Individual ministry pages
  believe/page.tsx        # What We Believe
  believe/gospel/         # What Is the Gospel?
  believe/statement/      # Statement of Faith
  events/page.tsx         # Events & announcements
  give/page.tsx           # Online giving
  contact/page.tsx        # Contact & directions
  volunteer/page.tsx      # Volunteer application
  prayer-request/page.tsx # Prayer request form
```

### Key components

- **`MaintenanceGate`** (`src/components/MaintenanceGate.tsx`) — wraps the entire app. When `MAINTENANCE_ENABLED = true`, it shows a maintenance splash page instead of the site. Admin preview bypass: click the logo 5 times on the maintenance page, then enter the bypass secret (`aenon-preview-2026`) to get a 5-minute timed preview session stored in a cookie. **To take the site live, set `MAINTENANCE_ENABLED = false`.**

- **`Navbar`** — fixed, transparent navbar that transitions to a frosted-glass pill on scroll. Contains dropdown menus for desktop and a full-screen overlay accordion for mobile.

- **`useReveal` / `RevealObserver`** (`src/components/useReveal.ts`) — scroll-driven reveal utility. Elements with the `.reveal` CSS class start hidden (opacity 0, translateY 40px) and become `.visible` when they enter the viewport via `IntersectionObserver`. Most pages set up this observer inline in a `useEffect` rather than using the hook.

### Styling conventions

All custom design tokens are in `tailwind.config.js`:

- **`navy-{950,900,800,700,600}`** — primary dark palette (navy-950 `#06090F` is the darkest background)
- **`accent-{700,600,500,400,300}`** — red/crimson accent (accent-500 `#D42B2B` is primary CTA color)
- **`silver-{100,200,300,400,500}`** — light grays for backgrounds and muted text

Reusable component classes are defined in `globals.css` under `@layer components`:

| Class | Purpose |
|---|---|
| `.section-padding` | Responsive horizontal padding |
| `.section-gap` | Responsive vertical padding for page sections |
| `.heading-xl/lg/md/sm` | Typographic scale for headings |
| `.label-text` | Small uppercase tracking label (section eyebrow) |
| `.body-lg/md` | Body text in silver-500/400 |
| `.btn-primary` | Red filled rounded-full button |
| `.btn-outline` | Navy bordered rounded-full button (hover → red) |
| `.btn-white` | White filled rounded-full button (for dark backgrounds) |
| `.card-dark` / `.card-light` | Glassmorphism dark card / white card with border |
| `.noise-bg` | Adds a subtle SVG noise texture via `::after` pseudo-element |
| `.divider` | Horizontal gradient separator line |
| `.youtube-container` | 16:9 responsive iframe wrapper |

### Page patterns

Every page follows the same structure:
1. `'use client'` directive (most pages need it for the reveal `useEffect`)
2. A dark navy hero section with `pt-40` to clear the fixed navbar
3. Alternating `bg-white` and `bg-silver-100` content sections
4. `.reveal` and `.reveal-delay-{1-4}` classes on elements for scroll animations
5. No data fetching — all content is hardcoded JSX

### External integrations

- **YouTube** — sermon embeds use `https://www.youtube.com/embed?listType=user_uploads&list=aenonchurch` to auto-load the latest upload. The channel handle is `@aenonchurch`.
- **Google Maps** — embedded iframe on homepage and contact page.
- **`next.config.js`** — remote image patterns allowlisted for `images.unsplash.com`, `img.youtube.com`, `i.ytimg.com`.

### Deployment notes

The site is built for static hosting (no server-side rendering required). The `MaintenanceGate` component replaced a previous middleware-based approach specifically to maintain compatibility with static hosting platforms.
