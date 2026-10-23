# Aenon Church website

Next.js 14 (App Router) marketing/ministry site for Aenon Church, Tarnaka,
Hyderabad. No database or backend — content is static JSX plus one external
data source (YouTube). Hosted on Vercel, connected to this GitHub repo;
pushing/merging to `main` triggers a production deploy automatically.

## Conventions established in this codebase

- **Styling**: Tailwind, with custom utility classes in `src/app/globals.css`
  (`section-padding`, `section-gap`, `heading-xl/lg/md/sm`, `label-text`,
  `body-lg/md`, `btn-primary/outline/white`, `card-light/dark`). Reuse these
  instead of ad hoc spacing/typography.
- **Scroll-reveal animation**: nearly every page has a `useEffect` that wires
  an `IntersectionObserver` to add a `.visible` class to any `.reveal`
  element when it scrolls into view (see `globals.css` for the CSS). This
  means content wrapped in `.reveal` is invisible until actually scrolled
  past — expected behavior, not a bug, and it also means a single
  `fullPage` screenshot taken without scrolling will show blank sections.
- **Server/Client split for pages needing both metadata and hooks**: Next.js
  App Router won't let a `'use client'` file export `metadata`. Pages that
  need a real per-page `<title>` *and* the scroll-reveal hook (or other
  client-only behavior) are split into a server `page.tsx` (exports
  `metadata`, renders the client component) plus a client
  `XxxContent.tsx` (`'use client'`, holds the actual hooks/markup). See
  `src/app/terms/`, `src/app/sermons/`, `src/app/conference2026/` for the
  pattern.
- **MaintenanceGate** (`src/components/MaintenanceGate.tsx`): a site-wide
  gate controlled by the `MAINTENANCE_ENABLED` constant at the top of the
  file (currently `false`, i.e. the live site is up). When `true`, it blocks
  all page content — including in SSR output — until a visitor enters the
  admin bypass code (now checked server-side via
  `src/app/api/maintenance-bypass/route.ts`, not in client code).
- **External data (YouTube)**: `src/lib/youtube.ts` fetches from
  youtube.com/aenonchurch via the YouTube Data API v3. Every function in
  that file **must** degrade gracefully (return `null` on any failure —
  missing key, bad key, quota, network) because callers fall back to a
  static default (`LATEST_SERMON_VIDEO_ID` in `src/lib/config.ts`, or a
  hardcoded `FALLBACK_SERMONS` array). Never let a YouTube API failure
  break a page. "Qualifying sermon" = duration > 50 minutes AND not a
  livestream (checked via the `liveStreamingDetails` field, which is
  present even on an archived/VOD past broadcast, not just a live one).
- **Secrets**: never commit a real secret or paste one into chat. Real
  values go in the hosting provider's (Vercel) environment variables
  dashboard for production, or this session's own "Network secrets" /
  environment settings (cloud environment menu → Edit) if a session needs
  one to test against the real API. `.env.example` documents variable
  names only, with empty values.
- **Workflow**: feature branch → push → open a PR → merge via PR (not a
  direct push to `main`), unless explicitly told otherwise. `main` is what
  Vercel deploys to production from.
- **Form submissions (Resend)**: the Contact, Volunteer, and Prayer Request
  forms (`src/app/contact`, `src/app/volunteer`, `src/app/prayer-request`)
  each POST JSON to their own route handler
  (`src/app/api/{contact,volunteer,prayer-request}/route.ts`), which
  validates required fields server-side and calls `sendFormEmail()` in
  `src/lib/email.ts` (a thin wrapper around the `resend` SDK). Unlike
  `youtube.ts`, this **must not** fail silently — a send failure throws and
  the route returns a non-2xx status so the page can show the visitor an
  error instead of a false "Message Sent!". Requires `RESEND_API_KEY`,
  `CONTACT_EMAIL_TO` (staff inbox), and `CONTACT_EMAIL_FROM` (an address on
  a domain verified in the Resend dashboard) — see `.env.example`. All
  three set/verified in Vercel and Resend as of 2026-10-23, but an actual
  end-to-end send (submit on the live site → email arrives) hasn't been
  confirmed back in conversation yet.
- **Honeypot spam protection**: each of the three forms above has a hidden
  `name="website"` input (`sr-only`, `tabIndex={-1}`, `aria-hidden`) that
  real visitors never see or fill. Each route handler checks it *before*
  calling Resend — if filled, it returns a fake `{ ok: true }` without
  sending, so bots don't learn to adapt. This is bot-pattern detection
  only, not rate limiting — there's no per-IP throttling (see open items).
  Each route also rejects an oversized request body up front and caps
  individual field lengths (`src/lib/formValidation.ts`,
  `MAX_FIELD_LENGTHS`/`isRequestBodyTooLarge`/`isValidEmail`) — client-side
  `maxLength` is cosmetic only, so these are the limits that actually hold
  against a direct POST to the API route.
- **Security headers**: `next.config.js`'s `headers()` sets a
  Content-Security-Policy plus `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Strict-Transport-Security`, and `Permissions-Policy`
  on every route. The CSP's `script-src`/`style-src` include
  `'unsafe-inline'` deliberately: almost every page here is statically
  prerendered at build time, so a per-request nonce (the usual way to drop
  `'unsafe-inline'`) can never match what's baked into that static HTML —
  nonce-based CSP needs dynamic rendering, which this site doesn't use.
  Verified with a real headless-browser run (no CSP console violations,
  mobile menu + YouTube facade still interactive) before this was committed.
- **ESLint**: `.eslintrc.json` extends `next/core-web-vitals` and pinned to
  `eslint@^8` + `eslint-config-next@14.2.35` (matching the installed `next`
  version exactly — `eslint-config-next` is tightly coupled to the `next`
  version it ships alongside). `@typescript-eslint/no-unused-vars` is
  explicitly enabled (off by default in `core-web-vitals`) since catching
  dead imports/vars was the main point of setting this up. `npm run lint`
  now runs non-interactively and exits 0.
- **`.reveal` gotcha**: the scroll-reveal `useEffect` queries
  `document.querySelectorAll('.reveal')` once, on mount, and observes only
  those elements. Anything that mounts later — a conditionally-rendered
  success/error state after a form submit, for example — will never be
  observed, so if it carries the `.reveal` class it stays at
  `opacity: 0` forever (looks like blank space, not an error). Don't put
  `.reveal` on content that only appears after user interaction; reserve
  it for content present at initial render. Separately, `.reveal` also
  carries `contain: paint` — needed because its CSS `transform` triggers a
  Chromium/WebKit bug where text-selection highlights bleed past the
  element into following content; don't remove it.
- **Homepage promo system**: `SiteChrome` (wraps all pages, in
  `src/app/layout.tsx`) renders `AnnouncementBar` only on `/`, dismissible
  via a `localStorage` flag. `PromoModal` (rendered from `HomeContent.tsx`,
  homepage only) is the "You're Invited" lightbox cross-promoting
  `/conference2026` and `/gracefestivals2026`. This is currently the only
  way `/conference2026` is reachable from the homepage — it's still not in
  the primary nav or footer.

## Known open items (as of 2026-10-23)

- **No per-IP rate limiting on the form API routes.** The honeypot (see
  above) stops basic bots but not someone deliberately hammering
  `/api/{contact,volunteer,prayer-request}` by hand — nothing currently
  caps volume per visitor. Serverless functions here are stateless between
  invocations, so real rate limiting needs either Vercel's own Firewall
  rate-limit rules (dashboard config, no code/new dependency — the better
  fit for this "no backend" site) or an external store like Upstash Redis
  (adds a dependency). Nobody's set up the Firewall rules yet — this is
  dashboard configuration in Vercel's project settings, not something a
  session working in this repo checkout can do. Steps: Vercel dashboard →
  project → Firewall tab → add a rate-limit rule scoped to
  `/api/contact`, `/api/volunteer`, `/api/prayer-request` (e.g. a handful
  of requests per IP per minute) → Save, then confirm it's enabled for
  Production (not just Preview).
- **`npm audit` still reports 9–12 vulnerabilities (2 moderate, 6–9 high, 1
  critical) depending on whether dev deps are installed.** `npm audit fix`
  (no `--force`) was run and resolved 5 of the original 14 (`sharp`,
  `source-map-js`, `picomatch`, `browserslist`, `nanoid`) — build verified
  green after. Everything left over traces to exactly two root packages,
  both requiring a major-version `--force` bump: **Next.js 14→16** (the
  critical CVE plus most of the highs) and **Tailwind 3→4** (the
  moderates). Both are significant breaking-change rewrites (Next 16
  changes async request APIs/caching defaults; Tailwind 4 drops the JS
  config format entirely) on a site with no test suite — deliberately
  left for an explicit decision rather than forced blind. `npm audit` for
  the exact current count/detail.
- **Security headers and ESLint are now set up** — see the two new bullets
  above in "Conventions established in this codebase". Still open: the
  `<img>` → `next/image` warnings `next lint` surfaces in `about/page.tsx`
  and the four `ministries/*/page.tsx` pages (performance only, not a
  correctness/dead-code issue — left alone since switching to `next/image`
  needs explicit width/height and wasn't asked for here).
- **Verify in production** (not yet confirmed there, only on Vercel
  previews, since this sandbox can't reach youtube.com/img.youtube.com/
  google.com/maps to test directly): the Latest Sermon embed shows a real
  video, the Recent Sermons 3×3 grid shows real non-Short/non-livestream
  sermons, and the conference page's Google Maps embed actually renders.
- **Confirm `YOUTUBE_API_KEY` is scoped to Production in Vercel**, not just
  Preview — this was fixed for Preview but Production scope was never
  explicitly confirmed in conversation.
